import React, { useState } from "react";

/*
 PacketSize:
 - Inputs: header size (bytes), payload size (bytes)
 - Output: total bytes, total bits, MTU warning if > 1500 bytes
 - Demonstrates numeric parsing and simple checks
*/

export default function PacketSize(){
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [result, setResult] = useState(null);

  const compute = (e) => {
    e && e.preventDefault();
    const h = Math.max(0, parseInt(header, 10) || 0);
    const p = Math.max(0, parseInt(payload, 10) || 0);
    const totalBytes = h + p;
    const totalBits = totalBytes * 8;
    const mtuWarning = totalBytes > 1500;
    setResult({ h, p, totalBytes, totalBits, mtuWarning });
  };

  return (
    <div className="card card-theme question-box">
      <h5>Packet Size Calculator</h5>
      <p className="small-muted">Enter header &amp; payload sizes (bytes). Useful to check MTU and bit sizes.</p>

      <form onSubmit={compute} className="row g-2 align-items-center">
        <div className="col-md-4">
          <input className="form-control form-control-theme" placeholder="Header (bytes)" value={header} onChange={(e)=>setHeader(e.target.value)} />
        </div>
        <div className="col-md-4">
          <input className="form-control form-control-theme" placeholder="Payload (bytes)" value={payload} onChange={(e)=>setPayload(e.target.value)} />
        </div>
        <div className="col-md-4">
          <button className="btn btn-gold w-100" type="submit">Compute</button>
        </div>
      </form>

      {result && (
        <div className="result mt-3">
          <div><strong>Total bytes:</strong> {result.totalBytes} B</div>
          <div><strong>Total bits:</strong> {result.totalBits} bits</div>
          <div className="small-muted">Header: {result.h} B • Payload: {result.p} B</div>
          {result.mtuWarning ? <div style={{marginTop:6, color:"#ffd966"}}><strong>Warning:</strong> Packet exceeds common MTU (1500 B).</div> : <div style={{marginTop:6}}>MTU OK.</div>}
        </div>
      )}
    </div>
  );
}
