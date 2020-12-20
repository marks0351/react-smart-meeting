import { MeetingRoom, StoreInterface } from "SmartMeetings/store/store.interface";
import { areConflictingTimeRanges } from "SmartMeetings/utils/date.utils";

export const useMeetingRooms = (startDate: string | undefined, endDate: string | undefined,store: StoreInterface, buildingId?: number)=>{
    const meetingsStore = store.meetings
    const allMeetings = buildingId ? meetingsStore.filter( each => each.buildingId === buildingId): meetingsStore
    const meetingsInThatTime = startDate && endDate ? allMeetings.filter((eachMeeting)=>{
        return areConflictingTimeRanges([eachMeeting.startTime, eachMeeting.endTime], [startDate, endDate])
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