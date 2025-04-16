import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { GET_PAST_EVENTS, GET_UPCOMING_EVENTS } from "../../api/events";
import { useQuery } from "@apollo/client";
import Loading from "../Loading";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "../Events/verticalTimeline.css";
// Extend dayjs with custom parse format plugin
dayjs.extend(customParseFormat);

const apiMap = {
  PAST: GET_PAST_EVENTS,
  UPCOMING: GET_UPCOMING_EVENTS,
};

const EventsTimeline = ({type}) => {
  const contentStyle1 = {
    // background: "linear-gradient(135deg, #dadbf8,#d6a4ac)",
    background:" linear-gradient(135deg, #d3d3d3, #f0f0f0)",
    color: "#1f2937",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
  };

  const contentStyle2 = {
    // background:" linear-gradient(135deg,rgb(218, 201, 201),rgb(218, 201, 201), #ffffff)",
    background:" linear-gradient(135deg, #d3d3d3, #f0f0f0)",
    color: "#1f2937",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
  };


  // Function to get the ordinal suffix for a given day
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th'; // Covers 11th to 19th
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const { loading, error, data } = useQuery(apiMap[type]);

  // Loading state
  if (loading) return <Loading className={"relative min-h-screen"} />;
  // Error state
  if (error) return <p className="text-red-500">Error fetching events. Please try again later.</p>;

  const events = data?.event || [];
  
  // No events found
  if (events.length === 0) {
    return <p className="my-10 text-gray-400">No events found</p>;
  }

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => new Date(b?.date) - new Date(a?.date));

  return (
    <div className="font-body relative">
      <VerticalTimeline lineColor="rgb(107 114 128)" animate={true} layout="2-columns">
        {sortedEvents.map((item, index) => {
          const styleler = index%2 ===0 ? contentStyle1:contentStyle2;
          return(
          <VerticalTimelineElement
            key={index}
            className="vertical-timeline-element--work"
            contentStyle={styleler}
            contentArrowStyle={{ borderRight: "7px solid #898a8d"  }}
            date={`${dayjs(item?.date).date()}${getOrdinalSuffix(dayjs(item?.date).date())} ${dayjs(item?.date).format('MMMM YYYY')}`}
            // iconStyle={{ background: "#000", color: "#1f2937" , borderRadius:"100%" }}
            icon={
              <img
                src={item?.coverPhoto?.url}
                className="rounded-full h-full w-full object-cover hover:rotate-6 transition-all"
                alt="avatar"
              />
            }
          >
            <h2 className="vertical-timeline-element-title">{item?.title}</h2>
      
              <pre className="text-wrap font-sans text-gray-800 text-base">
                {item?.excerpt}
              </pre>
            
            <div className="w-full flex justify-center items-center mt-9 ">
              {/* <div className="date-badge">
                {item?.date}
              </div> */}
              {type === "UPCOMING" && (
                <button
                  className="apply-button "
                  onClick={() => window.open(item?.link)}
                >
                  Apply Now!
                </button>
              )}
            </div>
          </VerticalTimelineElement>
        )})}
      </VerticalTimeline>
    </div>
  );
};

export default EventsTimeline;