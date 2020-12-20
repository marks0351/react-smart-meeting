import { MeetingRoom, StoreInterface } from "SmartMeetings/store/store.interface";
import { getTimeFromDate, timeInRange } from "SmartMeetings/utils/date.utils";

export const useMeetingRooms = (startDate: string | undefined, endDate: string | undefined,store: StoreInterface, buildingId?: number)=>{
    const meetingsStore = store.meetings
    const allMeetings = buildingId ? meetingsStore.filter( each => each.buildingId === buildingId): meetingsStore
    const meetingsInThatTime = startDate && endDate ? allMeetings.filter((eachMeeting)=>{
        const meetStart = getTimeFromDate(eachMeeting.startTime)
        const meetEnd = getTimeFromDate(eachMeeting.endTime)
        const start = getTimeFromDate(startDate)
        const end = getTimeFromDate(endDate)
        const first = timeInRange(meetStart,start, end) 
        const second = timeInRange(meetEnd,start, end)
        const third = timeInRange(start,meetStart, meetEnd)
        const fourth = timeInRange(end,meetStart, meetEnd)
        return first || second || third || fourth
    }) : allMeetings;
    const roomsStore = store.meetingRooms
    const roomIdsThatAreOccupied = meetingsInThatTime.map(each => each.meetingRoomId)
    const availableMeetingRooms: MeetingRoom[]= startDate && endDate ? roomsStore.filter((eachRoom)=>{
        const validRoom = buildingId ? eachRoom.buildingId === buildingId : true
        return validRoom && !roomIdsThatAreOccupied.includes(eachRoom.id)
    }) : [];
    return {
        availableMeetingRooms,
    }
}