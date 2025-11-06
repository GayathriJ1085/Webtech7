import React, { useState } from "react";
import PacketSize from "./components/PacketSize";
import Sanitizer from "./components/Sanitizer";
import LabTracker from "./components/LabTracker";
import SensorConv from "./components/SensorConv";
import AttemptCounter from "./components/AttemptCounter";

/*
  exp7web — GoldenLab: CS Lab Assistant
  Selection logic: take last 4 digits of RegNo → (lastFour % 5) + 1
*/

export default function App() {
  const [regno, setRegno] = useState("");
  const [selected, setSelected] = useState(1);

  // Compute question using only last 4 digits of the registration number
  const computeQuestion = (value) => {
    if (!value) {
      setSelected(1);
      return;
    }

    // Extract last 4 digits only
    const lastFour = value.slice(-4);
    const n = parseInt(lastFour, 10);

    if (isNaN(n)) {
      setSelected(1);
      return;
    }

    // Compute selected component number
    const q = (n % 5) + 1;
    setSelected(q);
  };

  return (
    <div className="container">
      <div className="app-header">
        <div className="brand">exp7web — GoldenLab (CS Lab Assistant)</div>
        <div className="small-muted">
          Utilities: Networking • Sanitization • Tracker • Sensor Conv • Counter
        </div>
      </div>

      <div className="card card-theme p-3 mb-3">
        <div className="row align-items-center">
          <div className="col-md-6">
            <label className="form-label small-muted">
              Enter Registration Number (e.g., URK23CS1085)
            </label>
            <input
              className="form-control form-control-theme"
              placeholder="URK23CS1085"
              value={regno}
              onChange={(e) => {
                setRegno(e.target.value);
                computeQuestion(e.target.value);
              }}
            />
            <div className="small-muted mt-2">
              Last 4 digits used:{" "}
              <strong>{regno ? regno.slice(-4) : "----"}</strong> → Selected tool:{" "}
              <strong>{selected}</strong>
            </div>
          </div>

          <div className="col-md-6 text-md-end mt-3 mt-md-0">
            <div className="btn-group" role="group">
              <button className="btn btn-gold" onClick={() => setSelected(1)}>
                Packet
              </button>
              <button className="btn btn-silver" onClick={() => setSelected(2)}>
                Sanitize
              </button>
              <button className="btn btn-gold" onClick={() => setSelected(3)}>
                Tracker
              </button>
              <button className="btn btn-silver" onClick={() => setSelected(4)}>
                Sensor
              </button>
              <button className="btn btn-gold" onClick={() => setSelected(5)}>
                Attempts
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Display selected tool */}
      <div>
        {selected === 1 && <PacketSize />}
        {selected === 2 && <Sanitizer />}
        {selected === 3 && <LabTracker />}
        {selected === 4 && <SensorConv />}
        {selected === 5 && <AttemptCounter />}
      </div>

      <footer className="mt-4 small-muted text-center">
        GoldenLab — developed as part of exp7web experiment to demonstrate state,
        events, and conditional rendering.
      </footer>
    </div>
  );
}
