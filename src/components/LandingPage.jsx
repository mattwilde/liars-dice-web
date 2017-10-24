import React from 'react';
import { Card, CardTitle, CardMedia, CardText } from 'material-ui/Card';
import PublicHeader from './PublicHeader';
import landingImage from './../images/liars-dice-landing.jpg';

const LandingPage = () => (
  <div>
   <PublicHeader />
    <Card className="container">
      <CardTitle title="LIARS DICE X" subtitle="The next generation of Liar's Dice" />
      <CardMedia>
        <img src={landingImage} alt="" />
      </CardMedia>
      <CardText>
        Get your dice on, son!
      </CardText>
    </Card>
  </div>
);

export default LandingPage;