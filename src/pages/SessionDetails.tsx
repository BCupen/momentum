import {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router";
import {useSessionStore} from "../data/sessionStore.tsx";
import {formatTime} from "../utils/helpers.ts";

export const SessionDetails = () => {
    const sessions = useSessionStore(state => state.sessions);
    const updateLatestSessionDetails = useSessionStore(state => state.updateLatestSessionDetails);
    const deleteLatestSession = useSessionStore(state => state.deleteLatestSession);
    const navigate = useNavigate();

    const latestSession = useMemo(() => {
        if (!sessions.length) return null
        return sessions[sessions.length - 1]
    }, [sessions]);

    const [sessionName, setSessionName] = useState("");
    const [sessionNote, setSessionNote] = useState("");

    useEffect(() => {
        setSessionName(latestSession?.name ?? "");
        setSessionNote(latestSession?.note ?? "");
    }, [latestSession]);

    const handleSaveSession = () => {
        if (!latestSession) return

        updateLatestSessionDetails({
            name: sessionName.trim(),
            note: sessionNote.trim(),
        });
        navigate("/insights");
    };

    const handleDeleteSession = () => {
        deleteLatestSession();
        navigate("/");
    };

    return (
        <main>
            <h2 className="text-lg font-semibold text-text-primary mb-4">Session Details</h2>

            <form onSubmit={(e) => {
                e.preventDefault();
                handleSaveSession();
            }}
            className="flex flex-col items-start text-text-primary gap-3">

                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="session-name" className="text-text-muted">Session Name:</label>
                    <input id="session-name"
                           type="text"
                           value={sessionName}
                           onChange={(e) => setSessionName(e.target.value)}
                           className="rounded-lg focus:outline-none border border-blue-500 p-2 w-full"
                           placeholder="Enter Session Name"
                    />
                </div>


                <div className="flex flex-col gap-1 w-full">
                    <label className="text-text-muted">Duration</label>
                    <p>{latestSession ? formatTime(latestSession.duration) : "No session to save"}</p>
                </div>


                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="session-note" className="text-text-muted">Notes (optional):</label>
                    <textarea id="session-note"
                              maxLength={255}
                              value={sessionNote}
                              onChange={(e) => setSessionNote(e.target.value)}
                              className="rounded-lg h-32 focus:outline-none border border-blue-500 p-2 w-full"
                              placeholder="Something useful from your session"
                    />
                </div>

                <div className="flex flex-row-reverse justify-evenly w-full gap-2 mt-8">
                    <button type="submit"
                            disabled={!latestSession}
                            className="w-1/2 rounded-lg bg-blue-600 text-text-primary p-3 cursor-pointer font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >Save Session</button>
                    <button type="button"
                        onClick={handleDeleteSession}
                        disabled={!latestSession}
                        className="w-1/2 rounded-lg border-2 border-red-800 text-red-800 font-semibold p-3 cursor-pointer"
                    >
                        Delete Session
                    </button>
                </div>

            </form>
        </main>
    )
}
