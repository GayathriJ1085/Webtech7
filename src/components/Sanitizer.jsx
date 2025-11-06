import React, { useState } from "react";

/*
 Sanitizer:
 - Input: raw identifier or device ID string
 - Outputs:
    - sanitized (removes invalid chars)
    - snake_case and kebab-case
    - whether it is a valid C/Java identifier: /^[A-Za-z_][A-Za-z0-9_]*$/
*/

function toSnake(s){
  return s
    .replace(/[\W_]+/g, " ")
    .trim()
    .split(/\s+/)
    .map(w => w.toLowerCase())
    .join("_");
}
function toKebab(s){
  return s
    .replace(/[\W_]+/g, " ")
    .trim()
    .split(/\s+/)
    .map(w => w.toLowerCase())
    .join("-");
}

export default function Sanitizer(){
  const [raw, setRaw] = useState("");
  const [san, setSan] = useState(null);

  const process = () => {
    const trimmed = raw.trim();
    // sanitized: keep letters, digits and underscore, replace others with underscore
    const sanitized = trimmed.replace(/[^A-Za-z0-9_]+/g, "_").replace(/^_+|_+$/g,"");
    const snake = toSnake(trimmed);
    const kebab = toKebab(trimmed);
    const validIdentifier = /^[A-Za-z_][A-Za-z0-9_]*$/.test(sanitized);
    setSan({ sanitized, snake, kebab, validIdentifier });
  };

  return (
    <div className="card card-theme question-box">
      <h5>Identifier Sanitizer & Formatter</h5>
      <p className="small-muted">Sanitize names (variables, device IDs) and produce snake / kebab forms. Useful before generating code or config files.</p>

      <div className="row g-2">
        <div className="col-md-9">
          <input className="form-control form-control-theme" placeholder="Type raw identifier or device name" value={raw} onChange={(e)=>setRaw(e.target.value)} />
        </div>
        <div className="col-md-3">
          <button className="btn btn-silver w-100" onClick={process}>Sanitize</button>
        </div>
      </div>

      {san && (
        <div className="result mt-3">
          <div><strong>Sanitized:</strong> {san.sanitized || "<empty>"}</div>
          <div><strong>snake_case:</strong> {san.snake || "<empty>"}</div>
          <div><strong>kebab-case:</strong> {san.kebab || "<empty>"}</div>
          <div className="small-muted mt-1">Valid C/Java identifier? <strong>{san.validIdentifier ? "Yes" : "No"}</strong></div>
        </div>
      )}
    </div>
  );
}
