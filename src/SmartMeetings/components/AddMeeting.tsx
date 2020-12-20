import React, { useState } from 'react'
import { CreateMeeting } from './CreateMeeting'

export const AddMeeting: React.FC<any> = ()=>{
    const [createMode, setCreateMode] = useState(false)
    return <>
        {!createMode && <button onClick={()=> setCreateMode(true)}>Add New Meeting</button>}
        {createMode && <>
            <CreateMeeting onCreate={()=>setCreateMode(false)}></CreateMeeting>
        </>}
    </>
}