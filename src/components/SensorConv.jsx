import React, { useState } from "react";

/*
 SensorConv:
 - Convert Celsius <-> Fahrenheit
 - Example ADC mapping: LM35 (10 mV/°C), 10-bit ADC (0-1023), Vref default 5V
 - Shows formulas and computed ADC value for a given temperature
*/

export default function SensorConv(){
  const [c, setC] = useState("");
  const [f, setF] = useState(null);
  const [vref, setVref] = useState("5"); // volts

  const toF = () => {
    const nc = parseFloat(c);
    if (isNaN(nc)) { setF(null); return; }
    setF((nc * 9/5) + 32);
  };

  const computeADC = () => {
    const nc = parseFloat(c);
    const nvref = parseFloat(vref) || 5;
    if (isNaN(nc)) return null;
    // LM35: 10 mV per °C -> mV = C * 10
    const mV = nc * 10;
    const V = mV / 1000;
    const adc = Math.round((V / nvref) * 1023);
    return { mV, V, adc };
  };

  const adcRes = computeADC();

  return (
    <div className="card card-theme question-box">
      <h5>Sensor Unit Converter</h5>
      <p className="small-muted">Convert Celsius ↔ Fahrenheit and compute example ADC reading for LM35 (10 mV/°C).</p>

      <div className="row g-2 align-items-center">
        <div className="col-md-4">
          <input className="form-control form-control-theme" placeholder="Celsius" value={c} onChange={(e)=>setC(e.target.value)} />
        </div>
        <div className="col-md-3">
          <button className="btn btn-gold w-100" onClick={toF}>→ Fahrenheit</button>
        </div>

        <div className="col-md-5">
          <input className="form-control form-control-theme" placeholder="ADC Vref (V)" value={vref} onChange={(e)=>setVref(e.target.value)} />
        </div>
      </div>

      {f !== null && <div className="result mt-3">Fahrenheit: {f.toFixed(2)} °F</div>}

      {adcRes !== null && (
        <div className="result mt-3">
          <div><strong>LM35 mapping:</strong> {adcRes.mV.toFixed(2)} mV → {adcRes.V.toFixed(4)} V</div>
          <div><strong>ADC (10-bit, Vref={vref}V):</strong> {adcRes.adc}</div>
          <div className="small-muted mt-1">Formulas: mV = C * 10 ; ADC = round((V / Vref) * 1023)</div>
        </div>
      )}
    </div>
  );
}
