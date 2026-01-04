import {useMemo, useState} from "react";
import {useSessionStore} from "../data/sessionStore.tsx";
import {getIntensityColor, groupDailySessions} from "../utils/helpers.ts";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
]

type CalendarCell = {
    date: Date | null;
}

export const Calendar = () => {
    const [ today ] = useState<Date>(() => new Date());
    const sessions = useSessionStore(state => state.sessions);
    const dailyTotals = useMemo(() => {
        return groupDailySessions(sessions);
    }, [sessions]);
    console.log(sessions);

    const cells: CalendarCell[] = useMemo(() => {
        const firstDay= new Date(today.getFullYear(), today.getMonth(), 1)
        const startDay = firstDay.getDay();
        const daysOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

        const monthCells: CalendarCell[] = []

        for (let i = 0; i < startDay; i++){
            monthCells.push({ date: null });
        }

        for (let day = 1; day <= daysOfMonth; day++){
            monthCells.push({ date: new Date(today.getFullYear(), today.getMonth(), day) })
        }

        while (monthCells.length % 7 !== 0) {
            monthCells.push({ date: null })
        }
        return monthCells

    }, [today])



    return (
        <div className="mt-6 w-full flex flex-col items-center gap-2 justify-center bg-slate-950 text-text-primary rounded-lg p-5">
            <h3 className="text-xl font-bold leading-2">{months[today.getMonth()]}</h3>
            <div className="grid grid-cols-7 w-full mt-2">
                {weekDays.map(day => (
                    <div key={day} className=" rounded-lg text-center">{day.substring(0,3)}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 w-full gap-1 place-items-center">
                {cells.map((cell, idx) => {
                    const dateKey = cell.date
                        ? cell.date.toISOString().split("T")[0]
                        : null;

                    const totalMs = dateKey
                        ? dailyTotals[dateKey] ?? 0
                        : 0;
                    // console.log(`${dateKey}: ${totalMs}`)

                    const heatClass = getIntensityColor(totalMs);

                    return (
                        <div
                            key={idx}
                            className={`aspect-square w-8 rounded-md flex items-center justify-center text-sm ${heatClass}`}
                        >
                            {cell.date ? cell.date.getDate() : ""}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}