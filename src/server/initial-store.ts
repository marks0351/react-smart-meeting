import { Building, Meeting, MeetingRoom } from "./store.interface";

const buildings: Building[] = [{
    id: 1,
    name: 'EDC - NE/SE America',
},{
    id: 2,
    name: 'EDC - Europe',
},{
    id: 3,
    name: 'EDC - Asia',
}]


const meetingRooms: MeetingRoom[] = [{
    id: 1,
    name: 'Chicago',
    buildingId: 1,
},{
    id: 2,
    name: 'New York',
    buildingId: 1,
},{
    id: 3,
    name: 'London',
    buildingId: 2,
},{
    id: 4,
    name: 'Amsterdam',
    buildingId: 2,
},{
    id: 5,
    name: 'Beijing',
    buildingId: 3,
}]

const meetings: Meeting[] = [{
    id: 1,
    startTime: new Date(new Date().setHours(19,0,0,0)).toISOString(),
    endTime: new Date(new Date().setHours(20,0,0,0)).toISOString(),
    title: 'First Meeting',
    description: 'Meeting to have some fun',
    meetingRoomId: 1,
    buildingId: 1
}]

export default {
    buildings,
    meetingRooms,
    meetings
}