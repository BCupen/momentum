import {Timer} from "./components/Timer.tsx";
import {SnowballCanvas} from "./components/Snowball.tsx";

export const App = () => {
    return (
        <div className="w-full md:max-w-md  bg-slate-900 p-5">
            <h1 className="font-bold text-text-primary w-full text-center text-2xl">Momentum</h1>

            <main className="flex flex-col gap-9 mt-9">
                <SnowballCanvas />
                <Timer />
            </main>
        </div>
    )
}
