import {useSessionStore} from "../data/sessionStore.tsx";
import {useSessionClock} from "../data/hooks.tsx";

export const Timer = () => {
    const { startTime, startSession, endSession, sessionActive} = useSessionStore()
    const now = useSessionClock()

    const elapsedTime = startTime && now ? now - startTime : 0

    const handleTimerClick = () => {
        if (!sessionActive) {
            startSession()
        } else {
            endSession()
        }
    }

    const minutes = String(Math.floor(elapsedTime / 60000)).padStart(2, '0')
    const seconds = String(Math.floor((elapsedTime % 60000) / 1000)).padStart(2, '0')

    return (
        <div className="text-white font-bold flex flex-col gap-2">
            <button className="bg-blue-200 p-3 rounded-md max-w-sm"
             onClick={() => handleTimerClick()}>
                {`${sessionActive ? 'End': 'Start'}`} Timer</button>

            <span className="inline-flex">
                <p>{minutes}</p>
                <p>:</p>
                <p>{seconds}</p>
            </span>

        </div>
    )

}