import {useSessionStore} from "../data/sessionStore.tsx";

export const SessionList = () => {
    const sessions = useSessionStore(state => state.sessions);
    return (
        <ul>
            {sessions.map((session) => (
                <li className="border-b border-gray-400">
                    <p>{session.duration}</p>
                </li>
            ))}
        </ul>
    )
}