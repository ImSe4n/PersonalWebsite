import { useEffect, useRef, useState } from "react";

export default function CursorEffect() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const mouse = useRef({ x: -200, y: -200 });
  const lag = useRef({ x: -200, y: -200 });
  const rafRef = useRef(null);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    const tick = () => {
      lag.current.x += (mouse.current.x - lag.current.x) * 0.12;
      lag.current.y += (mouse.current.y - lag.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.left = mouse.current.x - 5 + "px";
        dotRef.current.style.top  = mouse.current.y - 5 + "px";
      }
      if (ringRef.current) {
        ringRef.current.style.left = lag.current.x - 20 + "px";
        ringRef.current.style.top  = lag.current.y - 20 + "px";
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className={`cursor-ring${pressed ? " pressed" : ""}`} />
      <div ref={dotRef}  className={`cursor-dot${pressed  ? " pressed" : ""}`} />
    </>
  );
}
