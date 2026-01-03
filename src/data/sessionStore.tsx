import { create} from "zustand/react";
import { persist} from "zustand/middleware";

type CompletedSession = {
    startTime: number;
    endTime: number;
    duration: number;
}

type SessionStore = {
    sessionActive: boolean;
    startTime: number | null;

    sessions: CompletedSession[];

    startSession: () => void;
    endSession: () => void;
}



export const useSessionStore = create<SessionStore>()(
    persist(
        (set, get) => ({
            sessionActive: false,
            startTime: null,
            sessions: [],

            startSession: () =>
                set({
                    sessionActive: true,
                    startTime: Date.now(),
                }),

            endSession: () => {
                const { startTime, sessions } = get()

                if (!startTime) return

                const endTime = Date.now()
                const duration = endTime - startTime

                set({
                    sessionActive: false,
                    startTime: null,
                    sessions: [
                        ...sessions,
                        { startTime, endTime, duration },
                    ],
                })
            },
        }),
        {
            name: "momentum-sessions",
            partialize: (state) => ({
                sessions: state.sessions,
            }),
        }
    )
)
