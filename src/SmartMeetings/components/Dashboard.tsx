import React from 'react';
import { AddMeeting } from './AddMeeting';
import { BuildingsDashboard } from './BuildingsDashboard';

export const Dashboard: React.FC<any> = ()=>{
    return <>
        <BuildingsDashboard></BuildingsDashboard>
        <AddMeeting></AddMeeting>
    </>
}