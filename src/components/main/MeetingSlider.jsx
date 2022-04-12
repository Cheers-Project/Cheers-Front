import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { useQuery } from 'react-query';

import * as meetingAPI from 'api/meeting';

import MeetingItem from 'components/main/MeetingItem';

const MeetingSlider = () => {
  const { data: meetingList } = useQuery(
    ['meeting'],
    meetingAPI.searchRecentMeeting,
    {
      refetchOnWindowFocus: false,
    },
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <MeetingSliderWrapper>
      <div>
        <h3 className="sub-title">최신 등록 모임</h3>
      </div>
      <StyledSlider {...settings}>
        {meetingList?.meeting.map((meeting) => {
          return <MeetingItem meeting={meeting} key={meeting._id} />;
        })}
      </StyledSlider>
    </MeetingSliderWrapper>
  );
};

const MeetingSliderWrapper = styled.section`
  position: relative;
  padding: 3rem 0 6rem 0;
  .sub-title {
    font-size: 2rem;
    font-weight: 600;
    margin: 0 0 1.5rem 1rem;
  }
`;

const StyledSlider = styled(Slider)`
  .slick-track {
    height: 40rem;
    display: flex;
    padding: 1rem 0;
  }
  .slick-slide {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.1);
    border-radius: 1rem;
    margin: 0 1rem;
    padding: 0.5rem 1rem;
    > * {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  }

  .slick-dots button::before,
  .slick-dots .slick-active button::before {
    color: #c22d77;
  }
`;

export default MeetingSlider;
