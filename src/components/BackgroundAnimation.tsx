import { useEffect, useRef } from 'react';

interface BackgroundAnimationProps {
    isDark: boolean;
}

const BackgroundAnimation = ({ isDark }: BackgroundAnimationProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        // 设置画布尺寸
        const setDimensions = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        setDimensions();
        window.addEventListener('resize', setDimensions);

        // 动画函数
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 设置背景
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            if (isDark) {
                gradient.addColorStop(0, '#0f172a');
                gradient.addColorStop(1, '#1e1b4b');
            } else {
                gradient.addColorStop(0, '#dbeafe');
                gradient.addColorStop(1, '#eff6ff');
            }
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 绘制多个波浪
            const waves = [
                { amplitude: 20, frequency: 0.02, speed: 0.03, color: isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.15)' },
                { amplitude: 15, frequency: 0.03, speed: 0.02, color: isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(59, 130, 246, 0.1)' },
                { amplitude: 25, frequency: 0.01, speed: 0.04, color: isDark ? 'rgba(79, 70, 229, 0.15)' : 'rgba(59, 130, 246, 0.07)' }
            ];

            waves.forEach(wave => {
                ctx.beginPath();

                // 起点
                ctx.moveTo(0, canvas.height / 2);

                // 波浪高度基于屏幕高度
                const waveHeight = canvas.height / 2;
                const { amplitude, frequency, speed } = wave;

                for (let x = 0; x < canvas.width; x++) {
                    const y = Math.sin(x * frequency + time * speed) * amplitude + waveHeight;
                    ctx.lineTo(x, y);
                }

                // 完成波形
                ctx.lineTo(canvas.width, canvas.height);
                ctx.lineTo(0, canvas.height);
                ctx.closePath();
                ctx.fillStyle = wave.color;
                ctx.fill();
            });

            time += 0.05;
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', setDimensions);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isDark]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-[-1] transition-colors duration-500"
        />
    );
};

export default BackgroundAnimation;