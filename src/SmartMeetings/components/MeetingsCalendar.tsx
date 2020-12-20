import React, { useState } from 'react'
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Meeting, MeetingRoom } from 'SmartMeetings/store/store.interface';

interface MeetingsCalendarProps{
    meetingRooms: MeetingRoom[]
    meetings: Meeting[]
}

export const MeetingsCalendar: React.FC<MeetingsCalendarProps> = ({meetingRooms, meetings})=>{
    const localizer = momentLocalizer(moment)
    const [view, setView] = useState<any>('day')
    const resourceMap = meetingRooms.map((eachRoom)=>{
        return {
            resourceId: eachRoom.id,
            resourceTitle: eachRoom.name
        }
    })
    const resources = meetings.map((each)=>{
        return {
            ...each,
            resourceId: each.id,
            start: new Date(each.startTime),
            end: new Date(each.endTime),
            resourceTitle: each.title
        }
    })
    return <Calendar
    events={resources}
    resourceAccessor={'meetingRoomId'}
    view={view}
    localizer={localizer}
    views={['day']}
    onView={setView}
    step={60}
    defaultDate={new Date()}
    resources={resourceMap}
    resourceIdAccessor="resourceId"
    resourceTitleAccessor="resourceTitle"
/>
}