import {SnowballCanvas} from "../components/Snowball.tsx";
import {Timer} from "../components/Timer.tsx";

export const Session = () => {
    return (
        <main className="flex flex-col gap-9 mt-9">
            <SnowballCanvas />
            <Timer />
        </main>
    )
}