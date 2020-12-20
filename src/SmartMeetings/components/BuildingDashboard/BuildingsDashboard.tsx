import React, { useEffect, useState } from 'react';
import { BuildingComponent } from './BuildingComponent';
import './BuildingsDashboard.css'
import { Meeting, MeetingRoom, StoreInterface } from 'SmartMeetings/store/store.interface';
import { MeetingsCalendar } from './MeetingsCalendar';
import { useSelector } from 'react-redux';
import { SerialisedBuilding, useBuildingSerialiser } from 'SmartMeetings/hooks/useBuildingSerialiser';

export const BuildingsDashboard: React.FC<any> = ()=>{
    const [buildings, setBuildings] = useState<SerialisedBuilding[]>([])
    const [meetings, setMeetings] = useState<Meeting[]>([])
    const [meetingRooms, setMeetingRooms] = useState<MeetingRoom[]>([])
    const store = useSelector((state: StoreInterface) => state)

    useEffect(()=>{
        const serialisedBuildings = useBuildingSerialiser(store.buildings, store)
        setBuildings(serialisedBuildings)
        setMeetings(store.meetings)
        setMeetingRooms(store.meetingRooms)
    }, [store])
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