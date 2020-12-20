
export interface BuildingStoreInterface{
    buildings: Building[]
}

export interface MeetingRoomStoreInterface{
    meetingRooms: MeetingRoom[]
}

export interface Building{
    id: number
    name: string
}

export interface StoreInterface extends BuildingStoreInterface,MeetingRoomStoreInterface{
    meetings: Meeting[]
}

export interface MeetingRoom{
    id: number,
    name: string
    buildingId: number
}

export interface Meeting{
    id: number,
    title: string,
    description: string,
    startTime: string,
    endTime: string,
    meetingRoomId: number,
    buildingId: number
}