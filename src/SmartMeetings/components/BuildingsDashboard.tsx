import React, { useEffect, useState } from 'react';
import { getStore } from 'server/SM-backend';
import { serialiseBuildings, SerialisedBuilding } from 'SmartMeetings/serialiser/serialiser';
import { BuildingComponent } from './BuildingComponent';
import './BuildingDashboard.css'
import { Meeting, MeetingRoom } from 'server/store.interface';
import { MeetingsCalendar } from './MeetingsCalendar';

export const BuildingsDashboard: React.FC<any> = ()=>{
    const [buildings, setBuildings] = useState<SerialisedBuilding[]>([])
    const [meetings, setMeetings] = useState<Meeting[]>([])
    const [meetingRooms, setMeetingRooms] = useState<MeetingRoom[]>([])

    useEffect(()=>{
        const store = getStore()
        const serialisedBuildings = serialiseBuildings(store.buildings)
        setBuildings(serialisedBuildings)
        setMeetings(store.meetings)
        setMeetingRooms(store.meetingRooms)
    }, [])
    return <div className='dashboard-wrapper'>
        <div className='buildings-wrapper'>
            <div className='buildings-count'>Total number of Buildings: {buildings.length}</div>
            <div className='building-dashboard'>
                {buildings.map((eachBuilding)=>
                    <BuildingComponent store={eachBuilding}></BuildingComponent>
                )}
            </div>
        </div>
        <MeetingsCalendar meetingRooms={meetingRooms} meetings={meetings}></MeetingsCalendar>

    </div>
}