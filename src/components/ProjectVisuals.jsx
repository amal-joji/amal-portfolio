import React from 'react';
import { motion } from 'framer-motion';

// Visual 01: Satellite & Ocean Potential Fishing Zone Telemetry
export function OceanFishingVisual() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#061426] via-[#0b1d3a] to-[#040914] p-5 flex flex-col justify-between overflow-hidden select-none border-b border-cyan/20">
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: 'radial-gradient(#00cec9 1px, transparent 1px)',
          backgroundSize: '16px 16px'
        }}
      />

      {/* Bathymetry sonar rings */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-48 h-48 border border-cyan/20 rounded-full animate-ping opacity-20 pointer-events-none" />
      <div className="absolute right-10 top-1/2 -translate-y-1/2 w-36 h-36 border border-cyan/30 rounded-full" />
      <div className="absolute right-16 top-1/2 -translate-y-1/2 w-24 h-24 border border-cyan/40 rounded-full flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
      </div>

      {/* Top telemetry bar */}
      <div className="relative z-10 flex justify-between items-center text-[10px] font-mono tracking-wider text-cyan/70">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
          MODIS &bull; CMEMS &bull; GHRSST
        </span>
        <span className="text-cyan/90 font-semibold bg-cyan/10 px-2 py-0.5 rounded border border-cyan/20">
          PFZ PROBABILITY: 94.2%
        </span>
      </div>

      {/* Center visual: Ocean contour map simulation */}
      <div className="relative z-10 my-auto flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-[11px] font-mono text-cyan/80">LAT: 12.92° N &bull; LON: 80.12° E</p>
          <div className="flex gap-2 text-[10px] font-mono text-text-secondary">
            <span className="bg-dark-900/60 px-1.5 py-0.5 rounded border border-white/5">SST: 28.4°C</span>
            <span className="bg-dark-900/60 px-1.5 py-0.5 rounded border border-white/5">CHL-a: 0.82 mg/m³</span>
            <span className="bg-dark-900/60 px-1.5 py-0.5 rounded border border-white/5">DRIFT: 72H</span>
          </div>
        </div>

        {/* Mini probability heatmap wave */}
        <div className="h-10 w-24 flex items-end gap-1">
          {[40, 65, 30, 85, 95, 70, 90, 60].map((h, i) => (
            <div 
              key={i} 
              className="flex-1 bg-gradient-to-t from-cyan/40 to-cyan rounded-t-sm"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      {/* Bottom tag */}
      <div className="relative z-10 flex justify-between text-[9px] font-mono text-cyan/60 uppercase">
        <span>XGBoost Regression Model</span>
        <span>R²: 0.803 &bull; RMSE: 0.030</span>
      </div>
    </div>
  );
}

// Visual 02: ParkSense AI - Hotspot & Congestion Risk Matrix
export function ParkingAnalyticsVisual() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#071a12] via-[#0c2419] to-[#030d09] p-5 flex flex-col justify-between overflow-hidden select-none border-b border-emerald-500/20">
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.15) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center text-[10px] font-mono tracking-wider text-emerald-400/80">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          STREAMLIT &bull; SHAP EXPLAINER
        </span>
        <span className="bg-emerald-500/10 text-emerald-300 font-semibold px-2 py-0.5 rounded border border-emerald-500/20">
          HIGH RISK HOTSPOT DETECTED
        </span>
      </div>

      {/* Parking Sensor Slots Grid */}
      <div className="relative z-10 my-auto grid grid-cols-6 gap-2">
        {[
          { id: 'A1', occ: true, risk: '92%' },
          { id: 'A2', occ: true, risk: '87%' },
          { id: 'A3', occ: false, risk: '12%' },
          { id: 'B1', occ: true, risk: '78%' },
          { id: 'B2', occ: false, risk: '15%' },
          { id: 'B3', occ: true, risk: '95%' },
        ].map((slot) => (
          <div 
            key={slot.id} 
            className={`p-1.5 rounded border text-center font-mono ${
              slot.occ 
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' 
                : 'bg-dark-900/40 border-white/10 text-text-muted'
            }`}
          >
            <p className="text-[9px] font-bold">{slot.id}</p>
            <p className="text-[8px] opacity-75">{slot.occ ? 'BUSY' : 'FREE'}</p>
          </div>
        ))}
      </div>

      {/* SHAP bar impact */}
      <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-emerald-400/70">
        <span>FEATURE IMPACT: TIME_OF_DAY (+0.42)</span>
        <span>VIOLATION RISK: 88.4%</span>
      </div>
    </div>
  );
}

// Visual 03: Unified News Analyzer - NLP Pipeline & Sentiment Dial
export function NewsNLPVisual() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#160b24] via-[#211036] to-[#0c0514] p-5 flex flex-col justify-between overflow-hidden select-none border-b border-purple-500/20">
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(#a855f7 1px, transparent 1px)',
          backgroundSize: '14px 14px'
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center text-[10px] font-mono tracking-wider text-purple-300/80">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          TRANSFORMERS &bull; BERT &bull; TF-IDF
        </span>
        <span className="bg-purple-500/10 text-purple-200 font-semibold px-2 py-0.5 rounded border border-purple-500/20">
          TRUST SCORE: 96.8%
        </span>
      </div>

      {/* NLP Token Attention Visualizer */}
      <div className="relative z-10 my-auto space-y-2">
        <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
          <span className="bg-purple-900/60 text-purple-200 px-2 py-0.5 rounded border border-purple-500/30">
            [CLS]
          </span>
          <span className="bg-purple-800/80 text-white px-2 py-0.5 rounded font-bold border border-purple-400">
            VERIFIED_SOURCE
          </span>
          <span className="bg-purple-900/50 text-purple-200 px-2 py-0.5 rounded">
            POLITICS
          </span>
          <span className="bg-emerald-950/70 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
            SENTIMENT: +0.78
          </span>
          <span className="bg-purple-900/40 text-purple-300 px-2 py-0.5 rounded">
            [SEP]
          </span>
        </div>

        {/* Attention Matrix Bar */}
        <div className="w-full bg-dark-900/80 rounded-full h-1.5 overflow-hidden flex border border-white/5">
          <div className="bg-emerald-400 h-full w-[70%]" />
          <div className="bg-purple-400 h-full w-[20%]" />
          <div className="bg-rose-400 h-full w-[10%]" />
        </div>
      </div>

      {/* Bottom classification label */}
      <div className="relative z-10 flex justify-between text-[9px] font-mono text-purple-300/70 uppercase">
        <span>Multi-task Classification</span>
        <span>Fake News: &lt; 3.2% Probability</span>
      </div>
    </div>
  );
}

// Visual 04: Product Metrics & A/B Testing Analytics Platform
export function ABTestingAnalyticsVisual() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#081526] via-[#0e1e36] to-[#050b16] p-5 flex flex-col justify-between overflow-hidden select-none border-b border-sky-500/20">
      {/* Subtle coordinate grid */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            'linear-gradient(rgba(56, 189, 248, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.15) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      {/* Top telemetry */}
      <div className="relative z-10 flex justify-between items-center text-[10px] font-mono tracking-wider text-sky-300/90">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          PYTHON &bull; SQL &bull; T-TEST
        </span>
        <span className="bg-emerald-500/15 text-emerald-300 font-semibold px-2 py-0.5 rounded-chip border border-emerald-500/30">
          RETENTION LIFT: +6.8%
        </span>
      </div>

      {/* Center Variant A vs Variant B comparison bars */}
      <div className="relative z-10 my-auto space-y-2.5">
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-mono text-sky-200/80">
            <span>CONTROL (VARIANT A)</span>
            <span>BASELINE</span>
          </div>
          <div className="w-full h-2 bg-dark-900/70 rounded-full overflow-hidden border border-white/5">
            <div className="h-full w-[58%] bg-slate-400/70 rounded-full" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-mono text-sky-200">
            <span>TREATMENT (VARIANT B)</span>
            <span className="text-emerald-300 font-bold">+6.8% RETENTION</span>
          </div>
          <div className="w-full h-2 bg-dark-900/70 rounded-full overflow-hidden border border-white/5">
            <div className="h-full w-[76%] bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full" />
          </div>
        </div>
      </div>

      {/* Bottom stats */}
      <div className="relative z-10 flex justify-between text-[9px] font-mono text-sky-300/70 uppercase">
        <span>50,000+ User Interaction Records</span>
        <span>95% Confidence Interval</span>
      </div>
    </div>
  );
}
