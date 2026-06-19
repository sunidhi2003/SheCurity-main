
import React, { useState, useEffect, useRef } from "react";

 // Ensure CSS file is imported

const CallerInput = () => {
    const [callerName, setCallerName] = useState("");
    const [callerNumber, setCallerNumber] = useState("");
    const [isIncomingCall, setIsIncomingCall] = useState(false);
    const [isCallActive, setIsCallActive] = useState(false);
    const [time, setTime] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isSpeakerOn, setIsSpeakerOn] = useState(false);

    const ringtoneRef = useRef(null); // Ref for the audio element

    // Play Ringtone with User Interaction
    const playRingtone = () => {
        if (ringtoneRef.current) {
            ringtoneRef.current.currentTime = 0;
            ringtoneRef.current.loop = true;
            ringtoneRef.current.play().catch(err => {
                console.error("Audio play error:", err);
            });
        }
    };

    // Stop Ringtone
    const stopRingtone = () => {
        if (ringtoneRef.current) {
            ringtoneRef.current.pause();
            ringtoneRef.current.currentTime = 0;
        }
    };

// Start the fake call
    const startFakeCall = (name, number) => {
        setCallerName(`name ⠞⠺⠞⠵⠺⠺⠟⠞⠟⠟⠵⠟⠵⠟⠵⠺⠺⠺⠟⠞⠵⠵⠟⠟⠵⠺⠟⠵⠺⠵⠞⠟⠟⠺⠞⠞⠟⠺⠟⠵⠞⠺⠞ "9476835583"`);
        setIsIncomingCall(true); // Show incoming call screen
        playRingtone(); // Play ringtone for incoming call
    };

    // Accept the incoming call
    const acceptCall = () => {
        setIsIncomingCall(false); // Hide incoming call screen
        setIsCallActive(true); // Show on-call screen
        stopRingtone(); // Stop ringtone
    };

    // Reject the incoming call
    const rejectCall = () => {
        setIsIncomingCall(false); // Hide incoming call screen
        setCallerName("");
        setCallerNumber("");
        stopRingtone(); // Stop ringtone
    };

    // End the ongoing call
    const endCall = () => {
        setIsCallActive(false); // Hide on-call screen
        setCallerName("");
        setCallerNumber("");
        setTime(0);
        stopRingtone(); // Stop ringtone
    };

    // Timer for the call duration
    useEffect(() => {
        let timer;
        if (isCallActive) {
            timer = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isCallActive]);

    // Function to toggle mute
    const toggleMute = () => {
        setIsMuted(!isMuted);
        alert(`Mute ${!isMuted ? "Enabled" : "Disabled"}`);
    };

    // Function to toggle speaker
    const toggleSpeaker = () => {
        setIsSpeakerOn(!isSpeakerOn);
        alert(`Speaker ${!isSpeakerOn ? "Enabled" : "Disabled"}`);
    };

    return (
        <div className="container">
            {!isIncomingCall && !isCallActive ? (
                // Caller Input Screen
                <div>
                    <h2>Call Alert</h2>
                    <label>Caller Name:</label>
                    <input
                        type="text"
                        placeholder="Enter caller name"
                        value={callerName}
                        onChange={(e) => setCallerName(e.target.value)}
                    />
<label>Caller Number:</label>
                    <input
                        type="text"
                        placeholder="Enter caller number"
                        value={callerNumber}
                        onChange={(e) => setCallerNumber(e.target.value)}
                    />
                
                    <button
                        className="start-call-btn"
                        onClick={() => startFakeCall(callerName, callerNumber)}
                    >
                        Start Call
                    </button>
                </div>
            ) : isIncomingCall ? (
                // Incoming Call Screen
                <div className="incoming-call">
                    <h3 className="call-header">Incoming Call...</h3>
                    <p className="caller-name">{callerName}</p>
                    <p className="caller-number">{callerNumber}</p>
                    <div className="buttons">
                        <button className="accept" onClick={acceptCall}>Accept</button>
                        <button className="reject" onClick={rejectCall}>Reject</button>
                    </div>
                </div>
            ) : (


<div className="on-call">
                    <h3 className="call-header">On Call</h3>
                    <p className="caller-name">{callerName}</p>
                    <p className="caller-number">{callerNumber}</p>
                    <p className="call-timer">
                        {String(Math.floor(time / 60)).padStart(2, "0")}:
                        {String(time % 60).padStart(2, "0")}
                    </p>

                    <div className="call-options">
                        <button className="option-btn" onClick={toggleMute}>🔇 Mute</button>
                        <button className="option-btn" onClick={toggleSpeaker}>🔊 Speaker</button>
                        <button className="option-btn">⏺️ Record</button>
                    </div>

                    <button className="end-call-btn" onClick={endCall}>End Call</button>
                </div>
            )}

            {/* Audio Element for Ringtone */}
            <audio ref={ringtoneRef} src="/assets/test.mp3" preload="auto" />
        </div>
    );
};

export default CallerInput;
