import React, { useEffect } from 'react';
import { server } from 'server/SM-backend';
import { BuildingsDashboard } from './BuildingsDashboard';

export const Dashboard: React.FC<any> = ()=>{
    useEffect(()=>{
        server.initServer()
    }, [])
    return <>
        <BuildingsDashboard></BuildingsDashboard>
    </>
}