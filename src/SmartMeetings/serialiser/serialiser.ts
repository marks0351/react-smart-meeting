import { server } from "server/SM-backend";
import { Building, Meeting, MeetingRoom } from "server/store.interface";
import { getTimeFromDate, timeInRange } from "SmartMeetings/utils/date.utils";

export interface SerialisedBuilding extends Building{
    numberOfMeetings: number,
    meetingsToHappenToday: number
    meetingRooms: MeetingRoom[]
}

const store = server.getStore()

const getMeetings = (buildingId: number) =>{
    const meetings = store.meetings
    return meetings.filter((eachMeeting)=>{
        return eachMeeting.buildingId === buildingId
    })
}

const computeMeetingsToHappenToday = (meetings: Meeting[])=>{
    const end = new Date();
    end.setHours(23,59,59,999);
    const filteredMeetings = meetings.filter((eachMeeting)=>{
        const [startTime, endTime] = [new Date().toISOString(), end.toISOString()]
        return timeInRange(getTimeFromDate(eachMeeting.endTime), getTimeFromDate(startTime), getTimeFromDate(endTime))
    })
    return filteredMeetings.length
}

const getMeetingRoomsOfBuilding = (buildingId: number)=>{
    const meetingRooms = store.meetingRooms
    return meetingRooms.filter((eachRoom)=>{
        return eachRoom.buildingId === buildingId
    })
}

const serialiseBuilding = (buidling: Building): SerialisedBuilding=>{
    const meetingRooms = getMeetingRoomsOfBuilding(buidling.id)
    const meetings = getMeetings(buidling.id)
    let numberOfMeetings = meetings.length;
    let meetingsToHappenToday = computeMeetingsToHappenToday(meetings);
    return {...buidling, numberOfMeetings,meetingRooms, meetingsToHappenToday}
}

export const serialiseBuildings = (buidlings: Building[]): SerialisedBuilding[]=> {
    return buidlings.map(building => serialiseBuilding(building));
}