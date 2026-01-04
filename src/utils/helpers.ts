import type {CompletedSession} from "../data/sessionStore.tsx";

const HOURS_MS = 3600000;
const MINUTES_MS = 60000;
const SECONDS_MS = 1000;


export const formatTime = (time: number) => {
    const hours = Math.floor(time / HOURS_MS);
    const minutes = String(Math.floor((time % HOURS_MS) / MINUTES_MS)).padStart(2, '0')
    const seconds = String(Math.floor((time % MINUTES_MS) / SECONDS_MS)).padStart(2, '0')

    return hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
}


type DailyTotals = Record<string, number>;

export const groupDailySessions = (sessions: CompletedSession[]) => {
    return sessions.reduce((acc, session) => {
        const dateKey = new Date(session.startTime).toISOString().split(("T"))[0]
        acc[dateKey] = (acc[dateKey] ?? 0) + session.duration
        return acc;
    }, {} as DailyTotals)
}


export const getIntensityColor = (duration: number) => {
    if (!duration || duration == 0) {
        return 'bg-transparent'
    }
    if (duration < 30 * MINUTES_MS ) {
        return 'bg-blue-200'
    }
    if (duration < HOURS_MS) {
        return 'bg-blue-400'
    }
    if ( duration < 2 * HOURS_MS) {
        return 'bg-blue-500'
    }

    return 'bg-blue-600'
}