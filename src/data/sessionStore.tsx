import { create} from "zustand/react";

type Session = {
    sessionActive: boolean;
    startTime: number | null;
    endTime: number | null;
    duration: number | null;
    startSession: () => void;
    endSession: () => void;
}

export const useSessionStore = create<Session>((set) => ({
    sessionActive: false,
    startTime: null,
    endTime: null,
    duration: null,

    startSession: () => set({
        sessionActive: true,
        startTime: Date.now()
    }),

    endSession: () => set({
        sessionActive: false,
        endTime: Date.now(),
    })
}))