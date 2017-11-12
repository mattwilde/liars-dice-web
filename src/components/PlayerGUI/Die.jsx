import React from 'react'
import { Image  } from 'react-bootstrap';
import StarImage from "../../images/die/die_face_star.png";
import TwoImage from "../../images/die/die_face_two.png";
import ThreeImage from "../../images/die/die_face_three.png";
import FourImage from "../../images/die/die_face_four.png";
import FiveImage from "../../images/die/die_face_five.png";
import SixImage from "../../images/die/die_face_six.png";

const DIE_IMAGES = {
  1 : StarImage,
  2 : TwoImage,
  3 : ThreeImage, 
  4 : FourImage,
  5 : FiveImage,
  6 : SixImage
}
class Die extends React.Component {

  render() {
    console.log(this.props.die.face)
    const die = ( () => {
      if (this.props.die.lost) {
        //use a faded die image
        return <Image src={DIE_IMAGES[this.props.die.face]} alt="Die" responsive/>  
      }
      return <Image src={DIE_IMAGES[this.props.die.face]} alt="Die" responsive/>     
    });
    return(
      <Image src={DIE_IMAGES[this.props.die.face]} alt="Die" responsive/> 
      //{die}
    )
  }
}

export default Die