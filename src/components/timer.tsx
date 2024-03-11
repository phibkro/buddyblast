import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Button } from "./ui/button";

export function Timer({
  startTime,
  dafaultPlaying,
}: {
  startTime: number;
  dafaultPlaying: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(dafaultPlaying);
  const [minutes, setMinutes] = useState(Math.floor(startTime / 60));
  const [seconds, setSeconds] = useState(startTime % 60);
  const [time, setTime] = useState(startTime);
  const [key, setKey] = useState(0); // Add a key state

  useEffect(() => {
    setKey((prevKey) => prevKey + 1); // Increment key whenever time changes
  }, [time]);

  useEffect(() => {
    setTime(minutes * 60 + seconds || minutes * 60 || seconds || 0);
    setIsPlaying(dafaultPlaying);
  }, [dafaultPlaying, minutes, seconds]);

  return (
    <div>
      <div>
        <CountdownCircleTimer
          key={key} // Add key prop here
          isPlaying={isPlaying}
          duration={time}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
        >
          {({ remainingTime }) => (
            <p>
              {Math.floor(remainingTime / 60) +
                "m : " +
                (remainingTime % 60) +
                "s"}
            </p>
          )}
        </CountdownCircleTimer>
      </div>
      <div>
        <input
          type="number"
          min={0}
          value={minutes || 0}
          onChange={(e) => {
            setMinutes(parseInt(e.target.value));
          }}
        />
        <input
          type="number"
          max={59}
          min={0}
          value={seconds || 0}
          onChange={(e) => setSeconds(parseInt(e.target.value))}
        />
      </div>
      <div>
        <Button
          type="button"
          onClick={() => {
            setIsPlaying(!isPlaying);
          }}
        >
          {isPlaying ? "Pause" : "Start"}
        </Button>
        <Button
          onClick={() => {
            setIsPlaying(false);
            setMinutes(startTime / 60);
            setSeconds(startTime % 60);
            setKey((prevKey) => prevKey + 1); // Increment key to reset the timer
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
