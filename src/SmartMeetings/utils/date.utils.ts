import moment from "moment";

const timeFormat = "hh:mm:ss"

export const getTimeFromDate = (date: string, format = timeFormat)=>{
    return moment(date).format(format)
}

export const timeInRange = (inputTime: string, start: string, end: string, format = timeFormat)=>{
    const time = moment(inputTime,format),
    beforeTime = moment(start, format),
    afterTime = moment(end, format);
    return time.isBetween(beforeTime, afterTime) || time.isSame(beforeTime) || time.isSame(afterTime)
}