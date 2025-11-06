import React, { useState } from "react";

/*
 AttemptCounter:
 - Track attempts/retries (e.g., flashing firmware attempts)
 - Prevent negative counts
 - Demonstrates functional setState pattern
*/

export default function AttemptCounter(){
  const [count, setCount] = useState(0);

  return (
    <div className="card card-theme question-box">
      <h5>Attempt / Submission Counter</h5>
      <p className="small-muted">Track retries or attempts during lab activities. Decrement is clamped to 0.</p>

      <div className="d-flex gap-2 align-items-center">
        <button className="btn btn-silver" onClick={()=> setCount(prev => Math.max(0, prev - 1))}>-</button>
        <div style={{minWidth:70, textAlign:"center", fontWeight:700}}>{count}</div>
        <button className="btn btn-gold" onClick={()=> setCount(prev => prev + 1)}>+</button>
        <button className="btn btn-silver ms-3" onClick={()=> setCount(0)}>Reset</button>
      </div>

      <div className="small-muted mt-2">Use this to quickly count flashes, uploads or test attempts.</div>
    </div>
  );
}
