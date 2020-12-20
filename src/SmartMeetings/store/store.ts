import {createStore} from 'redux';
import initialStore from 'SmartMeetings/store/initial-store';
import reducer, { storeKey } from 'SmartMeetings/reducer/reducer';


const initStore = ()=>{
    const syncedState = localStorage.getItem(storeKey)
    if(!syncedState){
        localStorage.setItem(storeKey, JSON.stringify(initialStore))
        return initialStore
    }
    return JSON.parse(syncedState)
}
export const store = createStore(reducer, initStore())