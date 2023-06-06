import { isInRange } from "./isInRange";

export function eventCrossesMonths (monthCurr: number, monthStart: number, monthEnd: number, dayCurr: number, dayStart: number, dayEnd: number) {
    if (monthEnd - monthStart != 1)
        return false;
    
    let lastDayofMonth: number = 31;
    if (monthCurr == monthStart) {
        if (monthCurr in [4, 6, 9, 11])
            lastDayofMonth = 30;
        else if (monthCurr == 2)
            lastDayofMonth = 28;
        
        return isInRange(dayCurr, dayStart, lastDayofMonth);
    }

    if (monthCurr == monthEnd) {
        return isInRange(dayCurr, 1, dayEnd);
    }

    return false;
}
