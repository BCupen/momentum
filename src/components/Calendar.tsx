import {useMemo, useState} from "react";

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

    const cells: CalendarCell[] = useMemo(() => {
        const firstDay= new Date(today.getFullYear(), today.getMonth(), 1)
        const startDay = firstDay.getDay();
        const daysOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

        const monthCells: CalendarCell[] = []

        for (let i = 0; i < startDay; i++){
            monthCells.push({ date: null})
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
        <div className="mt-6 w-full flex flex-col items-center gap-2 justify-center">
            <h3 className="text-xl font-bold leading-2">{months[today.getMonth()]}</h3>
            <div className="grid grid-cols-7 w-full">
                {weekDays.map(day => (
                    <div key={day} className=" rounded-lg text-center">{day.substring(0,3)}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 w-full gap-1">
                {cells.map((cell, idx) => (
                    <div
                        key={idx}
                        className="text-center aspect-square flex items-center justify-center"
                    >
                        {cell.date ? cell.date.getDate() : ""}
                    </div> ))
                }
            </div>
        </div>
    )
}