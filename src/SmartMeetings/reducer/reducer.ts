import { StoreInterface } from "SmartMeetings/store/store.interface"

export const storeKey = 'smartMeeting'

export default (state: StoreInterface, action: any)=>{
    switch (action.type) {
        case 'CREATE_MEETING':
            const newMeeting = {
                id: new Date().getTime(),
                ...action.meetingDetails
            }
            const updateStore: StoreInterface = {
                ...state,
               meetings: [...state.meetings, newMeeting]
            }
            localStorage.setItem(storeKey, JSON.stringify(updateStore))
            return updateStore
        default:
            return state
    }
}