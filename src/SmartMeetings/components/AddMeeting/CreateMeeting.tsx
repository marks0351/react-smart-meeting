import React, { useReducer } from 'react'
import { Building, Meeting, MeetingRoom, StoreInterface } from 'SmartMeetings/store/store.interface'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import './CreateMeeting.css'
import moment from 'moment';
import { useMeetingRooms } from 'SmartMeetings/hooks/useMeetingRooms';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

interface CreateMeetingProps{
    onCreate: ()=>void
}

const initData: Partial<Meeting> = {
    title: '',
    description: '',
    buildingId: undefined,
    meetingRoomId: undefined,
    startTime: undefined,
    endTime: undefined
}

const createMeetReducer = (state: Partial<Meeting>, action: any)=>{
    switch (action.type) {
        case 'update':
            state = {
                ...state,
                [action.dataType]: action.value
            }
            return state
        default:
            return state
    }
}

export const CreateMeeting: React.FC<CreateMeetingProps> = ({onCreate})=>{
    const [meetData, setMeetData] = useReducer(createMeetReducer, initData)
    const store = useSelector((state: StoreInterface) => state)
    const {availableMeetingRooms} = useMeetingRooms(meetData.startTime, meetData.endTime, store, meetData.buildingId)
    const dispatch = useDispatch()
    const buildings = useSelector((state: StoreInterface) => state.buildings)
    const handleChange = (value: any, valueType: keyof Meeting)=>{
        setMeetData({
            type: 'update',
            dataType: valueType,
            value: value
        })
    }

    const createNewMeeting = ()=>{
        dispatch({
            type: 'CREATE_MEETING',
            meetingDetails: meetData
        })
        onCreate()
    }

    const isValidMeetData = ()=>{
        return (!!meetData.title && !!meetData.startTime && !!meetData.endTime && (meetData.startTime !== meetData.endTime) && !!meetData.buildingId && !!meetData.meetingRoomId)
    }

    const onMeetingRoomChange = (selection: MeetingRoom)=>{
        handleChange(selection.id, 'meetingRoomId')
        if(!meetData.buildingId){
            handleChange(selection.buildingId, 'buildingId')
        }
    }

    const onStartChange = (date: Date)=>{
        handleChange(date.toISOString(), 'startTime')
        if(meetData.endTime){
            const endDate = moment(meetData.endTime)
            const startDate = moment(date)
            if(startDate.isSameOrAfter(endDate)){
                handleChange(date.toISOString(), 'endTime')
            }
        }else{
            handleChange(date.toISOString(), 'endTime')
        }
    }

    const onEndChange = (date: Date)=>{
        handleChange(date.toISOString(), 'endTime')
        const endDate = moment(date)
        const startDate = moment(meetData.startTime)
        if(startDate.isSameOrAfter(endDate)){
            handleChange(null, 'endTime')
        }
    }
    return <div className='create-meeting-modal'>
        <div className='modal-content'>
            <form>
                <div className='create-meeting-form'>
                    <div>
                        Title: <input type='text' value={meetData.title} onChange={(evt)=> handleChange(evt.target.value, 'title')}></input>
                    </div>
                    <div>
                        Description: <input type='text' value={meetData.description} onChange={(evt)=> handleChange(evt.target.value, 'description')}></input>
                    </div>
                    <div>
                        Meeting Start Time: 
                        <DatePicker
                            minDate={moment().toDate()}
                            selected={meetData?.startTime ? moment(meetData?.startTime).toDate(): null}
                            onChange={onStartChange}
                            showTimeSelect
                            dateFormat="MMMM d, yyyy h:mm aa"
                        />
                    </div>
                    <div>
                        Meeting End Time: 
                        <DatePicker
                            minTime={moment(meetData.startTime).toDate()}
                            maxTime={new Date('1-1-3001')}
                            disabled={!meetData.startTime}
                            minDate={moment(meetData?.startTime).toDate()}
                            selected={meetData?.endTime ? moment(meetData?.endTime).toDate(): null}
                            onChange={onEndChange}
                            showTimeSelect
                            dateFormat="MMMM d, yyyy h:mm aa"
                        />
                    </div>
                    <div>
                        Building: 
                        <Select
                            className='custom-select'
                            isDisabled={!(!!meetData.startTime && !!meetData.endTime && meetData.startTime !== meetData.endTime)}
                            formatOptionLabel={(option)=> option.name}
                            onChange={(selection: Building)=>handleChange(selection.id, 'buildingId')}
                            options={buildings}
                        />
                    </div>
                    <div>
                        Available Meeting Rooms: 
                        <Select
                            className='custom-select'
                            isDisabled={!(!!meetData.startTime && !!meetData.endTime && meetData.startTime !== meetData.endTime)}
                            formatOptionLabel={(option)=> `${option.name} (Floor: ${option.floorNumber})`}
                            onChange={(selection: MeetingRoom)=>onMeetingRoomChange(selection)}
                            options={availableMeetingRooms}
                        />
                    </div>
                </div>
            </form>
            <button disabled={!isValidMeetData()} onClick={createNewMeeting}> Save</button>
            <button  onClick={onCreate}> Cancel</button>

            {!isValidMeetData() && <div className='warning-info'> 
                *Please Add All information needed(Title, Timings, Location) to create a meeting
            </div>}
        </div>
    </div>
}