import {Timer} from "./components/Timer.tsx";
import {SessionList} from "./components/SessionList.tsx";

export const App = () => {
    return (
        <div className="w-full h-screen text-white bg-black">
            Momentum
            <Timer />
            <SessionList />
        </div>
    )
}
