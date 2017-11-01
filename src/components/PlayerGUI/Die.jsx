import React from 'react'
import StarImage from "../../images/die/die_face_star.png";
import TwoImage from "../../images/die/die_face_two.png";
import ThreeImage from "../../images/die/die_face_three.png";
import FourImage from "../../images/die/die_face_four.png";
import FiveImage from "../../images/die/die_face_five.png";
import SixImage from "../../images/die/die_face_six.png";

const DIE_IMAGES = {
  'STAR'  : StarImage,
  'TWO'   : TwoImage,
  'THREE' : ThreeImage, 
  'FOUR'  : FourImage,
  'FIVE'  : FiveImage,
  'SIX'   : SixImage
}
class Die extends React.Component {

  render() {
    return(
    <div>
      <img src={DIE_IMAGES[this.props.dieValue]} alt=""/>        
    </div>
    )
  }
}

export default Die