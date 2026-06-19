import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import axios from "axios";
import "../styles/sos.css";

let mediaRecorder;
let recordedChunks = [];
let currentStream = null;
let recognitionInstance = null;

const EmailSOS = ({ onClose, isVisible }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | listening | recording | uploading | done | error
  const [battery, setBattery] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [location, setLocation] = useState(null);

  // Get battery status
  useEffect(() => {
    if (navigator.getBattery) {
      navigator.getBattery().then((bat) => {
        setBattery(Math.round(bat.level * 100));
        bat.addEventListener("levelchange", () => setBattery(Math.round(bat.level * 100)));
      });
    }
  }, []);

  // Get location with high accuracy
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("✅ Location obtained:", position.coords);
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error) => {
          console.error("❌ Location error:", error.message, error.code);
          // Try again with lower accuracy if high accuracy fails
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log("✅ Location obtained (low accuracy):", position.coords);
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy
              });
            },
            (err) => {
              console.error("❌ Location failed again:", err);
              setLocation({ error: "Location permission denied or unavailable" });
            },
            { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
          );
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setLocation({ error: "Geolocation not supported" });
    }
  }, []);

  // Countdown timer for recording
  useEffect(() => {
    if (isRecording) {
      setCountdown(15);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) { clearInterval(interval); return 0; }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRecording]);


  const stopRecognition = () => {

  if (recognitionInstance) {

    recognitionInstance.onend = null;

    recognitionInstance.stop();

    recognitionInstance = null;

    console.log("🎤 Voice recognition stopped");
  }

  setIsListening(false);
};

const stopCamera = () => {

  stopRecognition();

  if (currentStream) {

    currentStream.getTracks().forEach(track => {
      track.stop();
    });

    currentStream = null;

    console.log("📷 Camera stopped");
  }
}; 

  const startSOS = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("❌ Speech Recognition not supported in this browser!");
      return;
    }

    recognitionInstance = new SpeechRecognition();
const recognition = recognitionInstance;
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;
    setIsListening(true);
    setStatus("listening");

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('')
        .toLowerCase();
      
      console.log("Voice detected:", transcript);
      
      if (
        transcript.includes("help me security") ||
        transcript.includes("help me shecurity") ||
        transcript.includes("help me shrecurty") ||
        transcript.includes("help me") ||
        transcript.includes("help")
      ) {
        console.log("✅ SOS trigger word detected!");
         stopRecognition();
        setIsListening(false);
        startRecording();
      }
    };

    recognition.onerror = (event) => {

  console.error("Speech recognition error:", event);

  // Ignore automatic browser stop/network glitches
  if (
    event.error === "network" ||
    event.error === "aborted"
  ) {

    console.log("⚠️ Temporary speech issue");

    setTimeout(() => {

      try {

        if (status === "listening") {
          recognition.start();
        }

      } catch (e) {
        console.log("Restart prevented");
      }

    }, 1000);

    return;
  }

  stopRecognition();

  setIsListening(false);

  setStatus("idle");

  alert("Voice recognition error. Please try again.");
};

recognition.onend = () => {

  console.log("🎤 Recognition ended");

  if (
    isListening &&
    status === "listening"
  ) {

    setTimeout(() => {

      try {
        recognition.start();
      } catch (e) {
        console.log("Recognition restart blocked");
      }

    }, 500);
  }
};
    

    try {
      recognition.start();
      console.log("🎤 Voice recognition started");
    } catch (error) {
      console.error("Start error:", error);
      setIsListening(false);
      setStatus("idle");
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      currentStream = stream;
      mediaRecorder = new MediaRecorder(stream);
      recordedChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) recordedChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        stopCamera();
        await handleRecordingStop();
      };

      mediaRecorder.start();
      setIsRecording(true);
      setStatus("recording");

      setTimeout(() => {
        if (mediaRecorder && mediaRecorder.state === "recording") {
          mediaRecorder.stop();
        }
      }, 15000);
    } catch (err) {
      console.error("Media error:", err);
      setStatus("error");
      alert("Please allow camera & mic access!");
    }
  };

  const handleRecordingStop = async () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    recordedChunks = [];
    setIsRecording(false);
    setStatus("uploading");

    try {
      const videoURL = await uploadToCloudinary(blob);
      await sendEmail(videoURL);
      setStatus("done");
    } catch (err) {
      console.error("Upload/Email error:", err);
      setStatus("error");
    }
  };

  const uploadToCloudinary = async (blob) => {
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("upload_preset", "sos_upload");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dzyw945mk/video/upload",
      formData
    );
    return res.data.secure_url;
  };

  const sendEmail = async (videoURL) => {
    let locationText = "Location unavailable";
    
    if (location) {
      if (location.error) {
        locationText = location.error;
      } else if (location.latitude && location.longitude) {
        const mapsLink = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
        locationText = `${mapsLink}\nCoordinates: ${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`;
        if (location.accuracy) {
          locationText += `\nAccuracy: ${Math.round(location.accuracy)}m`;
        }
      }
    }

    const templateParams = {
      name: "SheCurity App",
      message: `🚨 EMERGENCY SOS ALERT 🚨

📹 Video Evidence: 
${videoURL}

📍 Location: 
${locationText}

🔋 Battery Level: ${battery ?? "N/A"}%
🕐 Timestamp: ${new Date().toLocaleString()}

⚠️ This is an automated emergency alert from SheCurity App.
Please respond immediately.`,
    };
    
    console.log("📧 Sending email with location:", locationText);
    await emailjs.send("service_pxazp2e", "template_5jklrst", templateParams, "g7obN8hPS2RWojc15");
  };

  const statusConfig = {
    idle: { icon: "🚨", text: "Ready to Activate", color: "#f43f5e", bg: "rgba(244,63,94,0.1)" },
    listening: { icon: "🎤", text: "Listening for 'Help'...", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
    recording: { icon: "🔴", text: `Recording... ${countdown}s`, color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
    uploading: { icon: "☁️", text: "Uploading Evidence...", color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
    done: { icon: "✅", text: "SOS Alert Sent!", color: "#22c55e", bg: "rgba(34,197,94,0.1)" },
    error: { icon: "❌", text: "Error — Try Again", color: "#f43f5e", bg: "rgba(244,63,94,0.1)" },
  };

  const current = statusConfig[status];
  useEffect(() => {

  return () => {
    stopCamera();
  };

}, [stopCamera]);

  if (!isVisible) return null;

  return (
    <div className="sos-overlay" onClick={(e) => e.target === e.currentTarget && onClose?.()}>
      <div className="sos-modal">
        {/* Close */}
        <button
  className="sos-modal__close"
  onClick={() => {
    stopCamera();
    onClose?.();
  }}
>
  ✕
</button>

        {/* Pulse Ring */}
        <div className={`sos-pulse-ring ${status === "recording" ? "sos-pulse-ring--active" : ""}`}>
          <div className="sos-pulse-ring__inner">
            <span className="sos-pulse-ring__icon">{current.icon}</span>
          </div>
        </div>

        <h2 className="sos-modal__title">SOS Emergency Alert</h2>
        <p className="sos-modal__subtitle">
          Say <strong>"Help"</strong> or press the button to trigger SOS
        </p>

        {/* Status Badge */}
        <div className="sos-status-badge" style={{ background: current.bg, color: current.color, borderColor: current.color }}>
          {current.text}
        </div>

        {/* Battery */}
        {battery !== null && (
          <div className="sos-battery">
            <span>🔋</span>
            <div className="sos-battery__bar">
              <div
                className="sos-battery__fill"
                style={{
                  width: `${battery}%`,
                  background: battery > 30 ? "#22c55e" : battery > 15 ? "#f59e0b" : "#ef4444"
                }}
              />
            </div>
            <span className="sos-battery__text">{battery}%</span>
          </div>
        )}

        {/* Location */}
        {location && (
          <div className="sos-battery" style={{ marginTop: "8px" }}>
            <span>📍</span>
            <span className="sos-battery__text" style={{ flex: 1, textAlign: "left", marginLeft: "8px", fontSize: "12px" }}>
              {location.error 
                ? location.error 
                : `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}${location.accuracy ? ` (±${Math.round(location.accuracy)}m)` : ''}`}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="sos-actions">
          {status === "idle" || status === "error" ? (
            <>
              <button className="sos-btn-voice" onClick={startSOS}>
                🎤 Voice Trigger
              </button>
              <button className="sos-btn-manual" onClick={startRecording}>
                🚨 Manual SOS
              </button>
            </>
          ) : status === "done" ? (
            <button className="sos-btn-done" onClick={onClose}>
              ✅ Close
            </button>
          ) : (
            <div className="sos-loading">
              <div className="sos-loading__spinner" />
              <span>{current.text}</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="sos-info">
          <div className="sos-info__item">📍 Location will be shared</div>
          <div className="sos-info__item">📧 Email alert to contacts</div>
          <div className="sos-info__item">🎥 15s video recorded</div>
        </div>
      </div>
    </div>
  );
};


export default EmailSOS;
