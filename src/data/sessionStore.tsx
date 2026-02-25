import { create} from "zustand/react";
import { persist} from "zustand/middleware";

export type CompletedSession = {
    startTime: number;
    endTime: number;
    duration: number;
    name?: string;
    note?: string;
}

type SessionStore = {
    sessionActive: boolean;
    startTime: number | null;

    sessions: CompletedSession[];

    startSession: () => void;
    endSession: () => void;
    updateLatestSessionDetails: (details: { name: string; note: string }) => void;
    deleteLatestSession: () => void;
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

            updateLatestSessionDetails: ({ name, note }) => {
                const { sessions } = get()

                if (!sessions.length) return

                const updatedSessions = [...sessions]
                const latest = updatedSessions[updatedSessions.length - 1]

                updatedSessions[updatedSessions.length - 1] = {
                    ...latest,
                    name,
                    note,
                }

                set({ sessions: updatedSessions })
            },

            deleteLatestSession: () => {
                const { sessions } = get()

                if (!sessions.length) return

                set({ sessions: sessions.slice(0, -1) })
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
