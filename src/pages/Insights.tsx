import {Calendar} from "../components/Calendar.tsx";
import {SessionList} from "../components/SessionList.tsx";
import {useState} from "react";
import {getLocalDateKey} from "../utils/helpers.ts";

export const Insights = () => {
    const [selectedDate, setSelectedDate] = useState<number>(() => Date.now());

    return (
        <main className="w-full flex flex-col gap-6 mb-14">
            <Calendar setSelectedDate={setSelectedDate} />
            <SessionList dateKey={getLocalDateKey(selectedDate)} />
        </main>
    )
}