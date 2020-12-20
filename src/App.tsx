import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dashboard } from 'SmartMeetings/components/Dashboard';

export const App: React.FC<any> =  ({ name }: any) => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch({
            type: 'INIT_STATE'
        })
    }, [])
    return <Dashboard></Dashboard>
};
