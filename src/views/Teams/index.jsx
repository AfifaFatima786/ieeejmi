import React, { useEffect, useState } from "react";
import {faker} from "@faker-js/faker";
import Card from "../../components/Teams/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
//import "swiper/swiper.min.css";
import 'swiper/css';
import 'swiper/css/navigation';
import "../../assets/css/swiper-navigation.css";
import { useMediaQuery } from "react-responsive";
import Execomm from "../../components/Teams/Execomm";
import { useQuery } from "@apollo/client";
import { GET_ALL_TEAM_NAMES } from "../../api/teams";
import Skeleton from "react-loading-skeleton";
import Team, { IndividualLoading } from "../../components/Teams/Team";

//SwiperCore.use([Navigation]);

function Teams() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const [currentTeam, setCurrentTeam] = useState("Content");
  const [teamNames, setTeamNames] = useState([]);
  const { loading, error, data } = useQuery(GET_ALL_TEAM_NAMES);

  useEffect(() => {
    setCurrentTeam(data?.__type?.enumValues[0]?.name);
    if (data?.__type?.enumValues.length > 0) {
      setTeamNames(
        data.__type.enumValues.filter((team) => team.name !== "Execomm")
      );
    }
  }, [data]);


  const handleSlideChange = (swiper) => {
    const teamNameIndex = (swiper.realIndex + teamNames.length) % teamNames.length;
    const teamName = teamNames[teamNameIndex]?.name;

    if (teamName) {
      setCurrentTeam(teamName);
    } else {
      setCurrentTeam(teamNames[0]?.name);
    }
  };
  return (
    <div className="font-body pt-28 flex flex-col justify-center items-center">
      <div className="">
        <h1 className="text-3xl border-b-2 pb-3">Meet Our Team</h1>
      </div>

      <div className="w-full p-4">
        <Execomm />
      </div>
      <div
        className="team-list"
        style={{
          width: "90vw",
        }}
      >
         <Swiper
      spaceBetween={50}
      slidesPerView={isTabletOrMobile ? 1 : 3}
      navigation
      centeredSlides
      loop
      modules={[Navigation]}
      onSlideChange={handleSlideChange}
      onSwiper={(swiper) => console.log({swiper})}
      slideToClickedSlide={false}
    >
      {loading ? (
        Array.from({ length: 8 }).map((_, index) => (
          <SwiperSlide className="text-center p-5 px-14" key={index}>
            <div className="p-6 header-team-list">
              <Skeleton height={50} width={200} />
            </div>
          </SwiperSlide>
        ))
      ) : (
        teamNames.map((item, index) => (
          <SwiperSlide className="text-center p-5 px-14" key={index}>
            <div className="p-6 header-team-list">
              {item.name.replace("_", " ")} Team
            </div>
          </SwiperSlide>
        ))
      )}
    </Swiper>
  );
      </div>
      {currentTeam ? (
        <div className="w-full flex flex-col justify-center items-center">
          <Team name={currentTeam} />
        </div>
      ) : (
        <IndividualLoading />
      )}
    </div>
  );
}

export default Teams;
