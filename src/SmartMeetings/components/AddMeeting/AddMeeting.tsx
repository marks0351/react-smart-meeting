import React, { useState } from 'react'
import { CreateMeeting } from './CreateMeeting'
import './AddMeeting.css'

export const AddMeeting: React.FC<any> = ()=>{
    const [createMode, setCreateMode] = useState(false)
    return <>
        <div className='add-button-wrapper'>
            {!createMode && <button onClick={()=> setCreateMode(true)}>Add New Meeting</button>}
        </div>
        {createMode && <>
            <CreateMeeting onCreate={()=>setCreateMode(false)}></CreateMeeting>
        </>}
    </>
}