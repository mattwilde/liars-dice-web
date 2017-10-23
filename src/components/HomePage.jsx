import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import PublicHeader from './PublicHeader';


const HomePage = () => (
  <div>
   <PublicHeader />
    <Card className="container">
      <CardTitle title="React Application" subtitle="This is the home page." />
    </Card>
  </div>
);

export default HomePage;