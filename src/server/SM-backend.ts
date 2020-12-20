import { StoreInterface } from "./store.interface"
import initialStore from './initial-store'

const defaultState: StoreInterface = initialStore

const storeKey = 'smartMeeting'

export const initServer = ()=>{
    const syncedState = localStorage.getItem(storeKey)
    if(!syncedState){
        localStorage.setItem(storeKey, JSON.stringify(defaultState))
    }
}
export const getStore  = (): StoreInterface=>{
    const syncedState = localStorage.getItem(storeKey)
    return syncedState ? JSON.parse(syncedState) : defaultState
}
export const syncStore  = (updatedStore: any)=>{
    localStorage.setItem(storeKey, JSON.stringify(updatedStore))
}
export const createMeeting = (meetingDetails: any) =>{
    const currentStore = getStore()
     const newMeeting = {
         id: new Date().getTime(),
         ...meetingDetails
     }
     const updateStore: StoreInterface = {
         ...currentStore,
        meetings: [...currentStore.meetings, newMeeting]
     }
     syncStore(updateStore) 
}