import React from 'react';
import requiredAuth from './required-auth';

const Dashboard = () =>
  <div>
    <h3>The Dashboard</h3>
  </div>;

export default requiredAuth(Dashboard);
