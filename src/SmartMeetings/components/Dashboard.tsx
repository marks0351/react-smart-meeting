import React, { useEffect } from 'react';
import { initServer } from 'server/SM-backend';
import { AddMeeting } from './AddMeeting';
import { BuildingsDashboard } from './BuildingsDashboard';

export const Dashboard: React.FC<any> = ()=>{
    useEffect(()=>{
        initServer()
    }, [])
    return <>
        <BuildingsDashboard></BuildingsDashboard>
        <AddMeeting></AddMeeting>
    </>
}