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
            ctx.fillStyle = "#020617";
            ctx.fillRect(0, 0, width, height);

            const radius = snowballRadius(elapsedMs);

            const seconds = elapsedMs / 1000;
            const travelSpeed = Math.min(30, seconds * 0.4);
            const distance = seconds * travelSpeed;
            const rotation = distance / radius;

            // base position
            const baseX = width / 2;
            const baseY = height / 2 + 40;

            // subtle horizontal drift
            const x = baseX + Math.sin(seconds * 0.6) * 12;
            const y = baseY;

            ctx.save();

            // move to center of snowball
            ctx.translate(x, y);

            // rotate for rolling effect
            ctx.rotate(rotation);

            // draw snowball
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
            ctx.fillStyle = "#e5e7eb";
            ctx.fill();

            // subtle texture lines (this makes rotation visible)
            ctx.strokeStyle = "rgba(0,0,0,0.08)";
            ctx.lineWidth = 2;

            for (let i = -radius; i <= radius; i += 10) {
                ctx.beginPath();
                ctx.moveTo(i, -radius);
                ctx.lineTo(i, radius);
                ctx.stroke();
            }

            ctx.restore();

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
