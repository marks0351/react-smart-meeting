import { StoreInterface } from "./store.interface"
import initialStore from './initial-store'

const defaultState: StoreInterface = initialStore

const storeKey = 'smartMeeting'

export const server = {
    initServer: ()=>{
        const syncedState = localStorage.getItem(storeKey)
        if(!syncedState){
            localStorage.setItem(storeKey, JSON.stringify(defaultState))
        }
    },
    getStore : (): StoreInterface=>{
        const syncedState = localStorage.getItem(storeKey)
        return syncedState ? JSON.parse(syncedState) : defaultState
    },
    syncStore : (updatedStore: any)=>{
        localStorage.setItem(storeKey, JSON.stringify(updatedStore))
    }
}