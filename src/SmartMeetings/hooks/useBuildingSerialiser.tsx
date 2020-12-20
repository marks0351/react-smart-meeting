import { Building, Meeting, MeetingRoom, StoreInterface } from "SmartMeetings/store/store.interface"
import { getTimeFromDate, timeInRange } from "SmartMeetings/utils/date.utils"

export interface SerialisedBuilding extends Building{
    numberOfMeetings: number,
    meetingsToHappenToday: number
    meetingRooms: MeetingRoom[]
    meetingsHappeningNow: number
}

export const useBuildingSerialiser = (buidlings: Building[], store: StoreInterface)=>{


    const getMeetings = (buildingId: number) =>{
        const meetings = store.meetings
        return meetings.filter((eachMeeting)=>{
            return eachMeeting.buildingId === buildingId
        })
    }
    
    const computeMeetingsToHappenNow = (meetings: Meeting[])=>{
        const filteredMeetings = meetings.filter((eachMeeting)=>{
            return timeInRange(getTimeFromDate(new Date().toISOString()), getTimeFromDate(eachMeeting.startTime), getTimeFromDate(eachMeeting.endTime))
        })
        return filteredMeetings.length
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
        const numberOfMeetings = meetings.length;
        const meetingsToHappenToday = computeMeetingsToHappenToday(meetings);
        const meetingsHappeningNow = computeMeetingsToHappenNow(meetings);
        return {...buidling, numberOfMeetings,meetingRooms, meetingsToHappenToday, meetingsHappeningNow}
    }

    return buidlings.map(building => serialiseBuilding(building));
}