"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(cursor, { x: mouseX - 6, y: mouseY - 6, duration: 0.1, ease: "power2.out" });
      gsap.to(follower, { x: mouseX - 18, y: mouseY - 18, duration: 0.25, ease: "power2.out" });
    };

    const onEnter = () => {
      gsap.to(cursor, { scale: 2, duration: 0.3 });
      gsap.to(follower, { scale: 1.5, borderColor: "rgba(201,168,76,0.8)", duration: 0.3 });
    };

    const onLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      gsap.to(follower, { scale: 1, borderColor: "rgba(201,168,76,0.4)", duration: 0.3 });
    };

    window.addEventListener("mousemove", moveCursor);

    const interactables = document.querySelectorAll("a, button, [data-hover]");
    interactables.forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-follower" ref={followerRef} />
    </>
  );
}
