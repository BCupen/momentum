import {Timer} from "./components/Timer.tsx";
import {SessionList} from "./components/SessionList.tsx";
import {Calendar} from "./components/Calendar.tsx";
import {SnowballCanvas} from "./components/Snowball.tsx";

export const App = () => {
    return (
        <div className="w-full md:max-w-md  text-white bg-black p-6">
            Momentum
            <Timer />
            <SessionList />
            <Calendar />
            <SnowballCanvas elapsedMs={1000} />
        </div>
    )
}
