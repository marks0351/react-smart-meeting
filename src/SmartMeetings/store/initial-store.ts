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
    floorNumber: 3
},{
    id: 2,
    name: 'New York',
    buildingId: 1,
    floorNumber: 2
},{
    id: 3,
    name: 'London',
    buildingId: 2,
    floorNumber: 1
},{
    id: 4,
    name: 'Amsterdam',
    buildingId: 2,
    floorNumber: 1
},{
    id: 5,
    name: 'Beijing',
    buildingId: 3,
    floorNumber: 2
}]

const meetings: Meeting[] = []

export default {
    buildings,
    meetingRooms,
    meetings
}