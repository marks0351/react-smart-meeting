import React from 'react';
import { AddMeeting } from './AddMeeting/AddMeeting';
import { BuildingsDashboard } from './BuildingDashboard/BuildingsDashboard';

export const Dashboard: React.FC<any> = ()=>{
    return <>
        <AddMeeting></AddMeeting>
        <BuildingsDashboard></BuildingsDashboard>
    </>
}