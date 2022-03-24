import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MeetSlider = () => {
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
          infinite: true,
          dots: true,
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
    <MeetSliderWrapper>
      <div>
        <h3 className="sub-title">내 주변 모임</h3>
      </div>
      <StyledSlider {...settings}>
        {/* SliderItem 영역 */}
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </StyledSlider>
    </MeetSliderWrapper>
  );
};

const MeetSliderWrapper = styled.section`
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
    background-color: #fff;
    box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.1);
    border-radius: 1rem;
    margin: 0 1rem;
    padding: 0.5rem;
  }

  .slick-dots button::before,
  .slick-dots .slick-active button::before {
    color: #c22d77;
  }
`;

export default MeetSlider;
