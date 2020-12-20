import React from 'react'
import { SerialisedBuilding } from 'SmartMeetings/hooks/useBuildingSerialiser'
import './BuildingComponent.css'

interface BuildingProps{
    store: SerialisedBuilding
}

export const BuildingComponent: React.FC<BuildingProps> = ({store})=>{
    return <>
        <div className='building'>
            <div className='building-name'> Building: {store.name}</div>
            <div className='building-name'> Total Meeting Rooms: {store.meetingRooms.length}</div>
            <div className='building-name'> Meetings Today: {store.numberOfMeetings}</div>
            <div className='building-name'> Meetings To Happen Today: {store.meetingsToHappenToday}</div>
            <div className='building-name'> Meetings Happening Now: {store.meetingsHappeningNow}</div>
        </div>
    </>
}