import {useSessionStore} from "../data/sessionStore.tsx";
import {useMemo} from "react";
import {formatTime, getLocalDateKey} from "../utils/helpers.ts";

interface SessionListProps {
    dateKey: string;
}

export const SessionList = ({dateKey}: SessionListProps) => {
    const sessions = useSessionStore(state => state.sessions);

    const sessionsToDate = useMemo(() => {
        return sessions.filter((session) => dateKey == getLocalDateKey(session.startTime))
    }, [dateKey, sessions]);

    return (
        <div>
            <h3 className="text-lg text-text-primary font-semibold tracking-wider">Details for date: {dateKey}</h3>
            <ul>
                {sessionsToDate.map((session) => (
                    <li className="border-b border-gray-400 text-text-primary py-1">
                        <p>{formatTime(session.duration)}</p>
                    </li>
                ))}
            </ul>
        </div>

    )
}