import {useEffect, useState} from "react";
import {useSessionStore} from "../data/sessionStore.tsx";
import {Link} from "react-router";

export const BottomNav = () => {
    const sessionActive = useSessionStore(s => s.sessionActive);
    const [hide, setHide] = useState(false);

    useEffect(() => {
        if (sessionActive) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setHide(true);
        } else {
            const t = setTimeout(() => setHide(false), 150);
            return () => clearTimeout(t);
        }
    }, [sessionActive]);

    return (
        <nav
            className={`
        fixed bottom-0 left-1/2 -translate-x-1/2 z-50
        w-[90%] lg:w-1/3 p-5 flex justify-evenly rounded-t-lg
        bg-slate-950
        transition-all duration-300 ease-out
        ${hide
                ? "translate-y-full opacity-0 pointer-events-none"
                : "translate-y-0 opacity-100"}
      `}
        >
            <Link to={'/'} className={`text-slate-200`}>Home</Link>
            <Link to={'/insights'} className={`text-slate-200`}>Calendar</Link>
            <Link to={'/settings'} className={`text-slate-200`}>Settings</Link>
        </nav>
    );
};
