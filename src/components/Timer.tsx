import {useSessionStore} from "../data/sessionStore.tsx";
import {useSessionClock} from "../data/hooks.tsx";
import {formatTime} from "../utils/helpers.ts";

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

    return (
        <div className="text-white font-bold flex flex-col items-center gap-6">


            <span className="tabular-nums w-full text-center">
                <p className="tabular-nums text-5xl">{formatTime(elapsedTime)}</p>
            </span>
            <button className="bg-blue-600 w-1/2 p-3 rounded-md text-text-primary"
                    onClick={() => handleTimerClick()}>
                {`${sessionActive ? 'End': 'Start'}`}</button>
        </div>
    )

}