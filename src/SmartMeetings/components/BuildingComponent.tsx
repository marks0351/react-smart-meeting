import React from 'react'
import { SerialisedBuilding } from 'SmartMeetings/serialiser/serialiser';
import './BuildingDashboard.css'

interface BuildingProps{
    store: SerialisedBuilding
}

export const BuildingComponent: React.FC<BuildingProps> = ({store})=>{
    return <>
        <div className='building'>
            <div className='building-name'> Building: {store.name}</div>
            <div className='building-name'> Meeting Rooms Free: {store.numberOfMeetings}</div>
            <div className='building-name'> Meetings To Happen: {store.meetingsToHappenToday}</div>
        </div>
    </>
}