'use client'
import { Html } from 'next/document';
import styles from './page.module.css';
import { useState, useRef } from 'react';

export default function Home() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); 

  const start = () => {
    if (!intervalRef.current) { 
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null; // Reset interval reference
    }
  };

  const reset = () => {
    stop(); // Stop the interval
    setSeconds(0); // Reset the seconds
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return { minutes, seconds };
  };

  const { minutes, seconds: displaySeconds } = formatTime(seconds);

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Count Down</h1>
      <div className={styles.timer}>
        <p id='first'>{String(minutes).padStart(2, '0')}</p>:
        <p id='second'>{String(displaySeconds).padStart(2, '0')}</p>
      </div>
      <div className={styles.buttons}>
        <button className = {styles.button}onClick={start}>Start</button>
        <button  className = {styles.button}onClick={stop}>Stop</button>
        <button  className = {styles.button}onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
