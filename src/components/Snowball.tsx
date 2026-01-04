import { useEffect, useRef } from "react";
import {useSessionStore} from "../data/sessionStore.tsx";
import {useSessionClock} from "../data/hooks.tsx";


export const SnowballCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { startTime} = useSessionStore()
    const now = useSessionClock()

    const elapsedMs= startTime && now ? now - startTime : 0

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let rafId: number;

        const draw = () => {
            const { width, height } = canvas;

            ctx.clearRect(0, 0, width, height);

            // background
            ctx.fillStyle = "#0f172a";
            ctx.fillRect(0, 0, width, height);

            // snowball
            const radius = snowballRadius(elapsedMs);

            ctx.beginPath();
            ctx.arc(width / 2, height / 2 + 40, radius, 0, Math.PI * 2);
            ctx.fillStyle = "#e5e7eb";
            ctx.fill();

            rafId = requestAnimationFrame(draw);
        };

        draw();

        return () => cancelAnimationFrame(rafId);
    }, [elapsedMs]);

    return (
        <canvas
            ref={canvasRef}
            width={300}
            height={300}
            className="rounded-xl"
        />
    );
};

function snowballRadius(elapsedMs: number) {
    const seconds = elapsedMs / 1000;
    return Math.min(80, 10 + Math.sqrt(seconds) * 6);
}
