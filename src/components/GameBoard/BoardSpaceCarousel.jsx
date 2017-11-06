import React from 'react';
import { Grid, Row, Col, Carousel, CarouselCaption, CarouselItem  } from 'react-bootstrap';

class BoardSpaceCarousel extends React.Component {
  render() {
    return(
      <Carousel>
        {this.props.boardTiles.map((tile,i) => 
          <Carousel.Item key={i}>
            {tile}
          </Carousel.Item>
        )}
      </Carousel>      
    )
  }
}

export default BoardSpaceCarousel