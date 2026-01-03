import {useSessionStore} from "./sessionStore.tsx";
import {useEffect, useState} from "react";

export const useSessionClock = () => {
    const sessionActive = useSessionStore(state => state.sessionActive);

    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        if (!sessionActive) return;
        let rafId: number;

        const loop = () => {
            setNow(Date.now());
            rafId = requestAnimationFrame(loop);
        }

        rafId = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(rafId)
    }, [sessionActive])

    return now;
}