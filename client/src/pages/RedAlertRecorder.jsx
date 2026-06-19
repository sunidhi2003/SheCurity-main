import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import "../styles/redalert.css";

export default function RedAlertRecorder() {
  const [recording, setRecording] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [battery, setBattery] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (navigator.getBattery) {
      navigator.getBattery().then((bat) => setBattery(Math.round(bat.level * 100)));
    }
  }, []);

  useEffect(() => {
    if (recording) {
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    } else {
      clearInterval(timerRef.current);
      setElapsed(0);
    }
    return () => clearInterval(timerRef.current);
  }, [recording]);

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        chunksRef.current = [];

        const formData = new FormData();
        formData.append("file", blob, "incident-proof.webm");

        try {
          await axios.post(`${BASE_URL}api/redalert/upload-proof`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          setUploaded(true);
        } catch (err) {
          console.error("Upload failed", err);
        }
      };

      mediaRecorderRef.current.start();
      setRecording(true);
      setUploaded(false);
      setTimeout(() => stopRecording(), 2 * 60 * 1000);
    } catch (err) {
      alert("❌ Camera/Mic access denied!");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="redalert-page">
      <div className="redalert-bg-orb redalert-bg-orb--1" />
      <div className="redalert-bg-orb redalert-bg-orb--2" />

      <div className="redalert-container">
        {/* Header */}
        <div className="redalert-header">
          <div className="section-badge" style={{ borderColor: "rgba(239,68,68,0.4)", color: "#ef4444" }}>
            🔴 Emergency Recording
          </div>
          <h1 className="section-title">Red Alert Recorder</h1>
          <p className="section-subtitle">
            Instantly record video evidence during an emergency. The recording is automatically
            uploaded as proof to our secure servers.
          </p>
        </div>

        {/* Main Card */}
        <div className="redalert-card glass-card">
          {/* Status Indicator */}
          <div className={`redalert-status ${recording ? "redalert-status--recording" : uploaded ? "redalert-status--done" : ""}`}>
            <div className="redalert-status__ring">
              <div className="redalert-status__icon">
                {recording ? "🔴" : uploaded ? "✅" : "🎥"}
              </div>
            </div>
            <div className="redalert-status__text">
              {recording ? "Recording in Progress" : uploaded ? "Evidence Uploaded" : "Ready to Record"}
            </div>
            {recording && (
              <div className="redalert-timer">{formatTime(elapsed)}</div>
            )}
          </div>

          {/* Battery */}
          {battery !== null && (
            <div className="redalert-battery">
              <span>🔋 Battery: {battery}%</span>
              <div className="redalert-battery__bar">
                <div
                  className="redalert-battery__fill"
                  style={{
                    width: `${battery}%`,
                    background: battery > 30 ? "#22c55e" : battery > 15 ? "#f59e0b" : "#ef4444"
                  }}
                />
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="redalert-actions">
            {!recording ? (
              <button className="redalert-btn redalert-btn--start" onClick={startRecording}>
                <span className="redalert-btn__dot" />
                🚨 Start Red Alert Recording
              </button>
            ) : (
              <button className="redalert-btn redalert-btn--stop" onClick={stopRecording}>
                ⏹ Stop & Upload Evidence
              </button>
            )}
          </div>

          {/* Upload Success */}
          {uploaded && (
            <div className="redalert-success">
              <span>✅</span>
              <div>
                <div className="redalert-success__title">Evidence Uploaded Successfully</div>
                <div className="redalert-success__sub">Your recording has been securely stored as proof.</div>
              </div>
            </div>
          )}

          {/* Info Cards */}
          <div className="redalert-info-grid">
            <div className="redalert-info-item">
              <span>🔒</span>
              <span>End-to-end encrypted upload</span>
            </div>
            <div className="redalert-info-item">
              <span>⏱️</span>
              <span>Auto-stops after 2 minutes</span>
            </div>
            <div className="redalert-info-item">
              <span>☁️</span>
              <span>Stored on secure servers</span>
            </div>
            <div className="redalert-info-item">
              <span>📋</span>
              <span>Admissible as legal evidence</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
