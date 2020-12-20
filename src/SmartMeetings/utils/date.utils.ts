import moment from "moment";

const timeFormat = "hh:mm:ss"

export const getTimeFromDate = (date: string, format = timeFormat)=>{
    return moment(date).format(format)
}

export const timeInRange = (inputTime: string, start: string, end: string, format = timeFormat)=>{
    const time = moment(inputTime,format),
    beforeTime = moment(start, format),
    afterTime = moment(end, format);
    return time.isBetween(beforeTime, afterTime)
}

export const areConflictingTimeRanges = (firstRange: string[], secondRange: string[] )=>{
    const [firstStart, firstEnd] = firstRange
    const [secondStart, secondEnd] = secondRange
    const meetStart = getTimeFromDate(firstStart)
    const meetEnd = getTimeFromDate(firstEnd)
    const start = getTimeFromDate(secondStart)
    const end = getTimeFromDate(secondEnd)
    const first = timeInRange(meetStart,start, end) 
    const second = timeInRange(meetEnd,start, end)
    const third = timeInRange(start,meetStart, meetEnd)
    const fourth = timeInRange(end,meetStart, meetEnd)
    return first || second || third || fourth || firstStart === secondStart || firstEnd === secondEnd
}