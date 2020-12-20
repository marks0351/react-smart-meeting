import React, { useEffect, useState } from 'react';
import { server } from 'server/SM-backend';
import { serialiseBuildings, SerialisedBuilding } from 'SmartMeetings/serialiser/serialiser';
import { BuildingComponent } from './BuildingComponent';
import './BuildingDashboard.css'

export const BuildingsDashboard: React.FC<any> = ()=>{
    const [buildings, setBuildings] = useState<SerialisedBuilding[]>([])
    useEffect(()=>{
        const store = server.getStore()
        const serialisedBuildings = serialiseBuildings(store.buildings)
        setBuildings(serialisedBuildings)
    }, [])
    return <>
        <div className='buildings-count'>Total number of Buildings: {buildings.length}</div>
        <div className='building-dashboard'>
            {buildings.map((eachBuilding)=>
                <BuildingComponent store={eachBuilding}></BuildingComponent>
            )}
        </div>
    </>
}