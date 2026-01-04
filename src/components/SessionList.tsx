import {useSessionStore} from "../data/sessionStore.tsx";

export const SessionList = () => {
    const sessions = useSessionStore(state => state.sessions);
    return (
        <ul>
            {sessions.map((session) => (
                <li className="border-b border-gray-400">
                    <p>{new Date(session.startTime).getDate()}</p>
                </li>
            ))}
        </ul>
    )
}