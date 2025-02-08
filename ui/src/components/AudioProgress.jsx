import { useEffect, useState } from "react";

const AudioProgress = ({ player, play , setPlay}) => {
    const [timestamp, setTimestamp] = useState([0, 0]);
    const [duration, setDuration] = useState([0, 0]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const audioProgress = document.getElementById("audio-progress");
        const interval = setInterval(() => {
            if (play) {
                setDuration(player.current ? [Math.floor(player.current.duration / 60), Math.floor(player.current.duration % 60)] : [0, 0]);
                setTimestamp(player.current.currentTime < player.current.duration ? [Math.floor(player.current.currentTime / 60), Math.floor(player.current.currentTime % 60)] : [0, 0]);
                if(player.current.duration > 0 && player.current.currentTime > 0){
                    const progressPercentage = player.current.currentTime < player.current.duration ? Math.floor(player.current.currentTime) * 100 / Math.floor(player.current.duration) : 0;
                    audioProgress.style.background = `linear-gradient(to right, orchid ${progressPercentage}%, white ${progressPercentage}%)`;
                }
            }
        }, 1);

        return () => clearInterval(interval);
    }, [play]);

    return (
        <div className="progress-bar">
            <input id="audio-progress" type="range" min={0} max={duration[0] * 60 + duration[1]} value={timestamp[0] * 60 + timestamp[1]} />
            <div className="timestamps">
                <p>{`${timestamp[0]}:${timestamp[1]}`}</p>
                <p>{`${duration[0]}:${duration[1]}`}</p>
            </div>
        </div>
    )
}

export default AudioProgress;