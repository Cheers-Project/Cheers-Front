import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { useQuery } from 'react-query';

import * as meetingAPI from 'api/meeting';
import useCurrentQuery from 'hooks/useCurrentQuery';
import MeetingItem from 'components/meeting/MeetingItem';

const MeetingSlider = () => {
  const { query } = useCurrentQuery();

  const { data: meetingList } = useQuery(
    ['meeting', query],
    meetingAPI.fetchMeeting,
    {
      refetchOnWindowFocus: false,
    },
  );

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
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
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 600;
    margin: 0 0 1.5rem 1rem;
    @media screen and (min-width: 768px) {
      font-size: ${({ theme }) => theme.fontSize.smTitle};
    }
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
    cursor: pointer;
    > * {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  }
  .slick-prev {
    left: unset;
    right: 5rem;
    top: -1rem;
  }
  .slick-next {
    right: 1rem;
    top: -1rem;
  }
  .slick-prev:before,
  .slick-next:before {
    font-size: ${({ theme }) => theme.fontSize.mdTitle};
    color: ${({ theme }) => theme.color.lightCherry};
    @media screen and (min-width: 768px) {
      font-size: ${({ theme }) => theme.fontSize.lgTitle};
    }
  }
`;

export default MeetingSlider;
