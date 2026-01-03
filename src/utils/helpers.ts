const HOURS_MS = 3600000;
const MINUTES_MS = 60000;
const SECONDS_MS = 1000;


export const formatTime = (time: number) => {
    const hours = Math.floor(time / HOURS_MS);
    const minutes = String(Math.floor((time % HOURS_MS) / MINUTES_MS)).padStart(2, '0')
    const seconds = String(Math.floor((time % MINUTES_MS) / SECONDS_MS)).padStart(2, '0')

    return `${hours}:${minutes}:${seconds}`
}