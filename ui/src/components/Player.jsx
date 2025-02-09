import musicPlaceholder from "../statics/images/music_placeholder.png";
import fastRewind from "../statics/images/fast-rewind.png";
import fastForward from "../statics/images/fast-forward.png";
import playIcon from "../statics/images/play.png";
import pauseIcon from "../statics/images/pause.png";
import previous from "../statics/images/previous.png";
import next from "../statics/images/next.png";
import volume from "../statics/images/volume.png";
import volumeOff from "../statics/images/volume-off.png";
import shuffle from "../statics/images/shuffle.png";
import repeat from "../statics/images/repeat.png";
import repeatOne from "../statics/images/repeat_one.png";
import favorite from "../statics/images/bookmark.png";
import share from "../statics/images/share.png";

import { useEffect, useRef, useState } from "react";
import AudioProgress from "./AudioProgress";


const Player = () => {
    const player = useRef(undefined);
    const [filesArray , setFilesArray] = useState([]);
    const [currentAudio, setCurrentAudio] = useState("");
    const [play, setPlay] = useState(false);
    const [audioName, setAudioName] = useState("");
    const [volumeValue, setVolumeValue] = useState(50);
    const [repeatAudio, setRepeatAudio] = useState(false);

    const handleToggle = (_event, data) => {
        setCurrentAudio(data);
        setTimeout(() => {
            setPlay(true);
        }, 1);
    }


    useEffect(() => {
        player.current = new Audio();
        window.electron.getFilesArray((_event , data)=>{
            setFilesArray(data);
        });
        window.electron.onToggle(handleToggle);
    }, []);

    useEffect(() => {
        player.current.src = currentAudio;
        setAudioName(currentAudio.split(/[\\/\.]/).slice(currentAudio.split(/[\\/\.]/).length - 2, currentAudio.split(/[\\/\.]/).length - 1));
        setPlay(false);
    }, [currentAudio]);

    useEffect(() => {
        const handleAudioEnd = () => {
            setPlay(false);
            if (repeatAudio) {
                setTimeout(() => {
                    setPlay(true);
                }, 1000);
            }
            else {
                const currentIndex = filesArray.indexOf(currentAudio);
                setCurrentAudio(filesArray[(currentIndex+1)%filesArray.length]);
                setTimeout(() => {
                    setPlay(true);
                }, 1000);
            }
            player.current.removeEventListener("ended", handleAudioEnd);
        };

        if (play) {
            player.current.play();
            player.current.addEventListener("ended", handleAudioEnd);
        }
        else {
            player.current.pause();
        }
    }, [play]);

    useEffect(() => {
        player.current.volume = volumeValue / 100;
    }, [volumeValue]);


    return (
        <>
            <div className="audio-info">
                <img src={musicPlaceholder} alt="" />
                <div className="info">
                    <h1>{audioName != "" ? audioName : "Relax, take a breath, and blend"}</h1>
                    <h3>Note</h3>
                </div>
            </div>
            <div className="play-bar">
                <div className="buttons-left">
                    <img onClick={() => {
                        player.current.currentTime -= 10;
                    }} src={fastRewind} alt="" />
                    <img src={previous} alt="" />
                    <img onClick={() => {
                        setPlay(prev => !prev);
                    }} className="play-button" src={play ? playIcon : pauseIcon} alt="" />
                    <img src={next} alt="" />
                    <img onClick={() => {
                        player.current.currentTime += 10;
                    }} src={fastForward} alt="" />
                </div>
            </div>
            <AudioProgress player={player} play={play} setPlay={setPlay} />
            <div className="volume-container">
                <img src={volumeValue > 0 ? volume : volumeOff} alt="" />
                <input onChange={(e) => {
                    setVolumeValue(e.currentTarget.value);
                }} type="range" min={0} max={100} />
            </div>
            <div className="control-buttons">
                <img src={shuffle} alt="" />
                <img onClick={(e) => {
                    setRepeatAudio(prev => !prev);
                }} src={repeatAudio ? repeatOne : repeat} alt="" />
                <img src={favorite} alt="" />
                <img src={share} alt="" />
            </div>
        </>
    );
}

export default Player;