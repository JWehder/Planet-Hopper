import React from "react";
import styled from "styled-components";
import { Carousel } from "react-bootstrap";

function PhotosCarousel({ photos }) {

    const carouselPhotos = photos.map((photo) => {
      return (
          <Carousel.Item interval={2000}>
          <PanelImage
            className="d-block w-100"
            src={photo}
            alt="listing photo"
          />
          </Carousel.Item>
      )
    })

    return (
        <Carousel>
          {carouselPhotos}
        </Carousel>
    )
}

export default PhotosCarousel;

const PanelImage = styled.img`
    border-radius: 10px;
    width: 190px;
    height: 150px;
`