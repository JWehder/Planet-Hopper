import React, { useState } from "react";
import styled from "styled-components";
import { Carousel } from "react-bootstrap";

function PhotosCarousel({ photos }) {
  const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => setIndex(selectedIndex)

    return (
        <Carousel autoPlay= {false} interval={null} activeIndex={index} onSelect={handleSelect}>
          {photos.map((photo) => (
          <Carousel.Item>
            <PanelImage
              className="d-block w-100"
              src={photo}
              alt="listing photo"
            />
          </Carousel.Item>
          )
          )}
        </Carousel>
    )
}

export default PhotosCarousel;

const PanelImage = styled.img`
    border-radius: 10px;
    width: 190px;
    height: 150px;
`