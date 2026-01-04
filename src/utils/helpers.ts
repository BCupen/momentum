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
        const dateKey = getLocalDateKey(session.startTime)
        acc[dateKey] = (acc[dateKey] ?? 0) + session.duration
        return acc;
    }, {} as DailyTotals)
}

export const  getLocalDateKey = (timestamp: number) => {
    const d = new Date(timestamp)

    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
}



export const getIntensityColor = (duration: number) => {
    if (!duration || duration == 0) {
        return 'bg-intensity-none'
    }
    if (duration < 30 * MINUTES_MS ) {
        return 'bg-intensity-low'
    }
    if (duration < 2 *HOURS_MS) {
        return 'bg-intensity-medium'
    }

    return 'bg-intensity-high'
}