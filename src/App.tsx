import {BottomNav} from "./components/BottomNav.tsx";
import {Route, Routes} from "react-router";
import {Session} from "./pages/Session.tsx";
import {Insights} from "./pages/Insights.tsx";

export const App = () => {
    return (
        <div className="relative min-h-dvh w-full md:max-w-md mx-auto bg-slate-900 p-5">
            <h1 className="font-bold text-text-primary w-full text-center text-2xl">Momentum</h1>

            <Routes>
                <Route index element={<Session />}/>
                <Route path={'/insights'} element={<Insights />}/>
            </Routes>


            <BottomNav />
        </div>
    )
}
