import { useState, useEffect, useMemo, useRef } from "react";

const GARMIN_DATA = [
  { lap: 1, time: "6:07", cumTime: "0:06:07", dist: 1, pace: "6:07", hr: 143, maxHr: 153, ascent: 1, descent: 9, power: 206, cal: 58, temp: 18 },
  { lap: 2, time: "13:17", cumTime: "0:19:24", dist: 1, pace: "13:17", hr: 152, maxHr: 177, ascent: 114, descent: 10, power: 132, cal: 124, temp: 15 },
  { lap: 3, time: "10:48", cumTime: "0:30:12", dist: 1, pace: "10:48", hr: 146, maxHr: 174, ascent: 70, descent: 45, power: 143, cal: 82, temp: 14 },
  { lap: 4, time: "9:35", cumTime: "0:39:47", dist: 1, pace: "9:35", hr: 141, maxHr: 165, ascent: 43, descent: 55, power: 136, cal: 68, temp: 12 },
  { lap: 5, time: "11:52", cumTime: "0:51:39", dist: 1, pace: "11:52", hr: 160, maxHr: 179, ascent: 120, descent: 26, power: 168, cal: 107, temp: 13 },
  { lap: 6, time: "13:25", cumTime: "1:05:05", dist: 1, pace: "13:25", hr: 167, maxHr: 179, ascent: 147, descent: 33, power: 131, cal: 128, temp: 13 },
  { lap: 7, time: "11:51", cumTime: "1:16:56", dist: 1, pace: "11:51", hr: 167, maxHr: 179, ascent: 102, descent: 37, power: 124, cal: 113, temp: 12 },
  { lap: 8, time: "14:55", cumTime: "1:31:51", dist: 1, pace: "14:55", hr: 157, maxHr: 181, ascent: 104, descent: 81, power: 100, cal: 118, temp: 14 },
  { lap: 9, time: "11:14", cumTime: "1:43:05", dist: 1, pace: "11:14", hr: 154, maxHr: 190, ascent: 73, descent: 53, power: 133, cal: 85, temp: 12 },
  { lap: 10, time: "11:52", cumTime: "1:54:57", dist: 1, pace: "11:52", hr: 158, maxHr: 175, ascent: 104, descent: 7, power: 155, cal: 88, temp: 11 },
  { lap: 11, time: "14:47", cumTime: "2:09:44", dist: 1, pace: "14:47", hr: 154, maxHr: 167, ascent: 121, descent: 1, power: 113, cal: 91, temp: 12 },
  { lap: 12, time: "17:06", cumTime: "2:26:50", dist: 1, pace: "17:06", hr: 158, maxHr: 176, ascent: 170, descent: 11, power: 115, cal: 119, temp: 11 },
  { lap: 13, time: "24:41", cumTime: "2:51:31", dist: 1, pace: "24:41", hr: 160, maxHr: 175, ascent: 261, descent: 0, power: 87, cal: 176, temp: 12 },
  { lap: 14, time: "22:01", cumTime: "3:13:32", dist: 1, pace: "22:01", hr: 137, maxHr: 186, ascent: 108, descent: 93, power: 53, cal: 108, temp: 15 },
  { lap: 15, time: "15:29", cumTime: "3:29:00", dist: 1, pace: "15:29", hr: 127, maxHr: 151, ascent: 0, descent: 238, power: 44, cal: 50, temp: 13 },
  { lap: 16, time: "12:33", cumTime: "3:41:33", dist: 1, pace: "12:33", hr: 135, maxHr: 170, ascent: 12, descent: 172, power: 49, cal: 54, temp: 13 },
  { lap: 17, time: "16:27", cumTime: "3:58:00", dist: 1, pace: "16:27", hr: 124, maxHr: 192, ascent: 8, descent: 47, power: 56, cal: 62, temp: 18 },
  { lap: 18, time: "5:22", cumTime: "4:03:22", dist: 1, pace: "5:22", hr: 186, maxHr: 191, ascent: 0, descent: 55, power: 209, cal: 65, temp: 16 },
  { lap: 19, time: "5:25", cumTime: "4:08:47", dist: 1, pace: "5:25", hr: 163, maxHr: 181, ascent: 0, descent: 66, power: 194, cal: 55, temp: 16 },
  { lap: 20, time: "4:59", cumTime: "4:13:46", dist: 1, pace: "4:59", hr: 157, maxHr: 162, ascent: 0, descent: 63, power: 216, cal: 47, temp: 16 },
  { lap: 21, time: "5:09", cumTime: "4:18:55", dist: 1, pace: "5:09", hr: 156, maxHr: 162, ascent: 0, descent: 78, power: 199, cal: 46, temp: 17 },
  { lap: 22, time: "5:03", cumTime: "4:23:58", dist: 1, pace: "5:03", hr: 160, maxHr: 166, ascent: 0, descent: 53, power: 215, cal: 50, temp: 18 },
  { lap: 23, time: "5:11", cumTime: "4:29:09", dist: 1, pace: "5:11", hr: 159, maxHr: 163, ascent: 0, descent: 47, power: 222, cal: 50, temp: 17 },
  { lap: 24, time: "6:39", cumTime: "4:35:48", dist: 1, pace: "6:39", hr: 149, maxHr: 165, ascent: 0, descent: 68, power: 165, cal: 51, temp: 18 },
  { lap: 25, time: "5:11", cumTime: "4:40:58", dist: 1, pace: "5:11", hr: 156, maxHr: 160, ascent: 0, descent: 83, power: 199, cal: 43, temp: 19 },
  { lap: 26, time: "5:57", cumTime: "4:46:55", dist: 1, pace: "5:57", hr: 152, maxHr: 161, ascent: 0, descent: 42, power: 197, cal: 50, temp: 20 },
  { lap: 27, time: "7:11", cumTime: "4:54:06", dist: 1, pace: "7:11", hr: 147, maxHr: 163, ascent: 3, descent: 31, power: 158, cal: 55, temp: 21 },
  { lap: 28, time: "6:07", cumTime: "5:00:13", dist: 1, pace: "6:07", hr: 149, maxHr: 157, ascent: 1, descent: 39, power: 200, cal: 55, temp: 22 },
  { lap: 29, time: "9:20", cumTime: "5:09:33", dist: 1, pace: "9:20", hr: 137, maxHr: 167, ascent: 12, descent: 20, power: 124, cal: 60, temp: 22 },
  { lap: 30, time: "5:42", cumTime: "5:15:15", dist: 0.79, pace: "7:14", hr: 150, maxHr: 161, ascent: 2, descent: 5, power: 178, cal: 47, temp: 21 },
];

const FUEL_LOG_INITIAL = [
  { time: "0:00", type: "drink", item: "スポーツドリンク 500ml", carbs: 35, water: 500, sodium: 200, note: "スタート前" },
  { time: "0:45", type: "gel", item: "エナジージェル", carbs: 25, water: 0, sodium: 50, note: "登り開始前" },
  { time: "1:15", type: "drink", item: "水 200ml + 塩タブ", carbs: 0, water: 200, sodium: 300, note: "" },
  { time: "1:45", type: "gel", item: "エナジージェル", carbs: 25, water: 0, sodium: 50, note: "山頂手前" },
  { time: "2:15", type: "drink", item: "スポーツドリンク 300ml", carbs: 21, water: 300, sodium: 150, note: "" },
  { time: "2:45", type: "food", item: "おにぎり", carbs: 40, water: 0, sodium: 400, note: "山頂で休憩" },
  { time: "3:15", type: "drink", item: "水 300ml", carbs: 0, water: 300, sodium: 0, note: "下り開始" },
  { time: "3:45", type: "gel", item: "エナジージェル", carbs: 25, water: 0, sodium: 50, note: "" },
  { time: "4:15", type: "drink", item: "スポーツドリンク 200ml", carbs: 14, water: 200, sodium: 100, note: "ラスト" },
];

const IDEAL_PLAN = {
  waterPerHour: 500,
  carbsPerHour: 60,
  sodiumPerHour: 600,
  drinkInterval: 15,
  saltInterval: 30,
};

function timeToMinutes(t) {
  const parts = t.split(":");
  if (parts.length === 3) return parseInt(parts[0]) * 60 + parseInt(parts[1]) + parseInt(parts[2]) / 60;
  if (parts.length === 2) return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  return 0;
}

function formatMins(m) {
  const h = Math.floor(m / 60);
  const min = Math.floor(m % 60);
  return `${h}:${String(min).padStart(2, "0")}`;
}

const PHASES = [
  { name: "アプローチ", start: 0, end: 4, color: "#4ade80" },
  { name: "登り前半", start: 4, end: 10, color: "#f97316" },
  { name: "登り後半", start: 10, end: 14, color: "#ef4444" },
  { name: "下り", start: 14, end: 17, color: "#3b82f6" },
  { name: "ロード", start: 17, end: 30, color: "#8b5cf6" },
];

function getPhase(lapIdx) {
  for (const p of PHASES) {
    if (lapIdx >= p.start && lapIdx < p.end) return p;
  }
  return PHASES[PHASES.length - 1];
}

// Icons
const DropIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
  </svg>
);
const BoltIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const SaltIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><circle cx="6" cy="8" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="9" cy="17" r="2"/><circle cx="16" cy="16" r="2"/>
  </svg>
);

const TAB_ITEMS = [
  { id: "overview", label: "概要" },
  { id: "timeline", label: "タイムライン" },
  { id: "analysis", label: "分析" },
  { id: "plan", label: "プランナー" },
];

export default function FuelTracker() {
  const [tab, setTab] = useState("overview");
  const [fuelLog, setFuelLog] = useState(FUEL_LOG_INITIAL);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEntry, setNewEntry] = useState({ time: "", type: "drink", item: "", carbs: 0, water: 0, sodium: 0, note: "" });

  const totalDurationMins = 315; // 5:15
  const totalDist = 29.79;
  const totalAscent = 1577;
  const totalCal = 2304;

  const totals = useMemo(() => {
    return fuelLog.reduce((acc, e) => ({
      carbs: acc.carbs + e.carbs,
      water: acc.water + e.water,
      sodium: acc.sodium + e.sodium,
    }), { carbs: 0, water: 0, sodium: 0 });
  }, [fuelLog]);

  const hourlyRate = useMemo(() => ({
    carbs: Math.round(totals.carbs / (totalDurationMins / 60)),
    water: Math.round(totals.water / (totalDurationMins / 60)),
    sodium: Math.round(totals.sodium / (totalDurationMins / 60)),
  }), [totals]);

  const scores = useMemo(() => {
    const carbScore = Math.min(100, Math.round((hourlyRate.carbs / IDEAL_PLAN.carbsPerHour) * 100));
    const waterScore = Math.min(100, Math.round((hourlyRate.water / IDEAL_PLAN.waterPerHour) * 100));
    const sodiumScore = Math.min(100, Math.round((hourlyRate.sodium / IDEAL_PLAN.sodiumPerHour) * 100));
    return { carbs: carbScore, water: waterScore, sodium: sodiumScore, overall: Math.round((carbScore + waterScore + sodiumScore) / 3) };
  }, [hourlyRate]);

  const addEntry = () => {
    if (!newEntry.time || !newEntry.item) return;
    const updated = [...fuelLog, { ...newEntry }].sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));
    setFuelLog(updated);
    setShowAddModal(false);
    setNewEntry({ time: "", type: "drink", item: "", carbs: 0, water: 0, sodium: 0, note: "" });
  };

  const deleteEntry = (idx) => {
    setFuelLog(fuelLog.filter((_, i) => i !== idx));
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(165deg, #0a0e17 0%, #111827 40%, #1a1a2e 100%)",
      color: "#e2e8f0",
      fontFamily: "'Noto Sans JP', 'SF Pro Display', -apple-system, sans-serif",
      padding: "0",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "fixed", top: "-20%", right: "-10%", width: "50vw", height: "50vw",
        background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }}/>
      <div style={{
        position: "fixed", bottom: "-20%", left: "-10%", width: "40vw", height: "40vw",
        background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }}/>

      {/* Header */}
      <div style={{ padding: "20px 20px 0", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: "linear-gradient(135deg, #22c55e, #059669)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "18px", fontWeight: "700", color: "#fff",
            boxShadow: "0 4px 15px rgba(34,197,94,0.3)",
          }}>⚡</div>
          <div>
            <div style={{ fontSize: "18px", fontWeight: "800", letterSpacing: "-0.5px", color: "#f8fafc" }}>
              FUEL LAB
            </div>
            <div style={{ fontSize: "10px", fontWeight: "500", color: "#64748b", letterSpacing: "2px", textTransform: "uppercase" }}>
              Trail Running Nutrition Tracker
            </div>
          </div>
        </div>

        {/* Activity banner */}
        <div style={{
          marginTop: "16px", padding: "14px 16px", borderRadius: "14px",
          background: "linear-gradient(135deg, rgba(30,41,59,0.8), rgba(30,41,59,0.4))",
          border: "1px solid rgba(148,163,184,0.1)",
          backdropFilter: "blur(20px)",
        }}>
          <div style={{ fontSize: "14px", fontWeight: "700", color: "#f1f5f9", marginBottom: "4px" }}>
            丹沢ロング 🏔️
          </div>
          <div style={{ display: "flex", gap: "16px", fontSize: "11px", color: "#94a3b8" }}>
            <span>{totalDist} km</span>
            <span>↑{totalAscent}m</span>
            <span>5:15:15</span>
            <span>{totalCal} kcal</span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex", gap: "2px", marginTop: "16px", padding: "3px",
          background: "rgba(30,41,59,0.6)", borderRadius: "12px",
          border: "1px solid rgba(148,163,184,0.08)",
        }}>
          {TAB_ITEMS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, padding: "8px 4px", borderRadius: "10px", border: "none",
              fontSize: "12px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s",
              background: tab === t.id ? "rgba(99,102,241,0.2)" : "transparent",
              color: tab === t.id ? "#a5b4fc" : "#64748b",
              boxShadow: tab === t.id ? "0 2px 8px rgba(99,102,241,0.15)" : "none",
            }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "16px 20px 100px", position: "relative", zIndex: 1 }}>
        {tab === "overview" && <OverviewTab scores={scores} hourlyRate={hourlyRate} totals={totals} totalDurationMins={totalDurationMins} />}
        {tab === "timeline" && <TimelineTab fuelLog={fuelLog} onDelete={deleteEntry} onAdd={() => setShowAddModal(true)} />}
        {tab === "analysis" && <AnalysisTab fuelLog={fuelLog} hourlyRate={hourlyRate} scores={scores} />}
        {tab === "plan" && <PlannerTab />}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 100,
          padding: "20px",
        }} onClick={() => setShowAddModal(false)}>
          <div style={{
            width: "100%", maxWidth: "420px", background: "#1e293b", borderRadius: "20px 20px 12px 12px",
            padding: "24px", border: "1px solid rgba(148,163,184,0.15)",
          }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: "16px", fontWeight: "700", marginBottom: "16px", color: "#f1f5f9" }}>
              補給を記録 ＋
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
              <label style={{ fontSize: "11px", color: "#94a3b8", display: "flex", flexDirection: "column", gap: "4px" }}>
                時間
                <input value={newEntry.time} onChange={e => setNewEntry({...newEntry, time: e.target.value})}
                  placeholder="1:30" style={inputStyle} />
              </label>
              <label style={{ fontSize: "11px", color: "#94a3b8", display: "flex", flexDirection: "column", gap: "4px" }}>
                種類
                <select value={newEntry.type} onChange={e => setNewEntry({...newEntry, type: e.target.value})} style={inputStyle}>
                  <option value="drink">💧 飲料</option>
                  <option value="gel">⚡ ジェル</option>
                  <option value="food">🍙 固形物</option>
                  <option value="salt">🧂 塩</option>
                </select>
              </label>
            </div>

            <label style={{ fontSize: "11px", color: "#94a3b8", display: "flex", flexDirection: "column", gap: "4px", marginBottom: "12px" }}>
              アイテム名
              <input value={newEntry.item} onChange={e => setNewEntry({...newEntry, item: e.target.value})}
                placeholder="スポーツドリンク 500ml" style={inputStyle} />
            </label>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "12px" }}>
              <label style={{ fontSize: "11px", color: "#94a3b8", display: "flex", flexDirection: "column", gap: "4px" }}>
                糖質 (g)
                <input type="number" value={newEntry.carbs} onChange={e => setNewEntry({...newEntry, carbs: +e.target.value})} style={inputStyle} />
              </label>
              <label style={{ fontSize: "11px", color: "#94a3b8", display: "flex", flexDirection: "column", gap: "4px" }}>
                水分 (ml)
                <input type="number" value={newEntry.water} onChange={e => setNewEntry({...newEntry, water: +e.target.value})} style={inputStyle} />
              </label>
              <label style={{ fontSize: "11px", color: "#94a3b8", display: "flex", flexDirection: "column", gap: "4px" }}>
                Na (mg)
                <input type="number" value={newEntry.sodium} onChange={e => setNewEntry({...newEntry, sodium: +e.target.value})} style={inputStyle} />
              </label>
            </div>

            <label style={{ fontSize: "11px", color: "#94a3b8", display: "flex", flexDirection: "column", gap: "4px", marginBottom: "16px" }}>
              メモ
              <input value={newEntry.note} onChange={e => setNewEntry({...newEntry, note: e.target.value})}
                placeholder="登りの前に摂取" style={inputStyle} />
            </label>

            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => setShowAddModal(false)} style={{
                flex: 1, padding: "12px", borderRadius: "10px", border: "1px solid rgba(148,163,184,0.2)",
                background: "transparent", color: "#94a3b8", fontSize: "13px", fontWeight: "600", cursor: "pointer",
              }}>キャンセル</button>
              <button onClick={addEntry} style={{
                flex: 1, padding: "12px", borderRadius: "10px", border: "none",
                background: "linear-gradient(135deg, #22c55e, #059669)",
                color: "#fff", fontSize: "13px", fontWeight: "700", cursor: "pointer",
                boxShadow: "0 4px 15px rgba(34,197,94,0.3)",
              }}>記録する</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  padding: "10px 12px", borderRadius: "10px", border: "1px solid rgba(148,163,184,0.15)",
  background: "rgba(15,23,42,0.8)", color: "#e2e8f0", fontSize: "13px",
  outline: "none", fontFamily: "inherit",
};

// ─── OVERVIEW TAB ───
function OverviewTab({ scores, hourlyRate, totals, totalDurationMins }) {
  const hours = (totalDurationMins / 60).toFixed(1);
  return (
    <div>
      {/* Overall Score */}
      <div style={{
        textAlign: "center", padding: "28px 20px", borderRadius: "18px",
        background: "linear-gradient(135deg, rgba(30,41,59,0.7), rgba(15,23,42,0.5))",
        border: "1px solid rgba(148,163,184,0.1)", marginBottom: "16px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "-40px", left: "50%", transform: "translateX(-50%)",
          width: "200px", height: "200px",
          background: `radial-gradient(circle, ${scores.overall >= 80 ? "rgba(34,197,94,0.15)" : scores.overall >= 60 ? "rgba(234,179,8,0.15)" : "rgba(239,68,68,0.15)"} 0%, transparent 70%)`,
        }}/>
        <div style={{ fontSize: "11px", fontWeight: "600", color: "#64748b", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>
          補給スコア
        </div>
        <div style={{
          fontSize: "56px", fontWeight: "900", letterSpacing: "-3px",
          background: scores.overall >= 80
            ? "linear-gradient(135deg, #4ade80, #22c55e)"
            : scores.overall >= 60
            ? "linear-gradient(135deg, #fbbf24, #f59e0b)"
            : "linear-gradient(135deg, #f87171, #ef4444)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          lineHeight: 1,
        }}>
          {scores.overall}
        </div>
        <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>
          {scores.overall >= 80 ? "素晴らしい補給！" : scores.overall >= 60 ? "まずまず。改善ポイントあり" : "要改善"}
        </div>
      </div>

      {/* Three metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "16px" }}>
        <MetricCard icon={<BoltIcon />} label="糖質" value={`${hourlyRate.carbs}g`} sub={`/h (目標 ${IDEAL_PLAN.carbsPerHour}g)`} score={scores.carbs} color="#f59e0b" />
        <MetricCard icon={<DropIcon />} label="水分" value={`${hourlyRate.water}ml`} sub={`/h (目標 ${IDEAL_PLAN.waterPerHour}ml)`} score={scores.water} color="#3b82f6" />
        <MetricCard icon={<SaltIcon />} label="塩分" value={`${hourlyRate.sodium}mg`} sub={`/h (目標 ${IDEAL_PLAN.sodiumPerHour}mg)`} score={scores.sodium} color="#a78bfa" />
      </div>

      {/* Totals */}
      <div style={{
        padding: "16px", borderRadius: "14px",
        background: "rgba(30,41,59,0.5)", border: "1px solid rgba(148,163,184,0.08)",
      }}>
        <div style={{ fontSize: "11px", fontWeight: "600", color: "#64748b", letterSpacing: "1px", marginBottom: "12px" }}>
          トータル摂取量（{hours}時間）
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
          <div>
            <div style={{ fontSize: "20px", fontWeight: "800", color: "#f59e0b" }}>{totals.carbs}g</div>
            <div style={{ fontSize: "10px", color: "#64748b" }}>糖質</div>
          </div>
          <div>
            <div style={{ fontSize: "20px", fontWeight: "800", color: "#3b82f6" }}>{totals.water}ml</div>
            <div style={{ fontSize: "10px", color: "#64748b" }}>水分</div>
          </div>
          <div>
            <div style={{ fontSize: "20px", fontWeight: "800", color: "#a78bfa" }}>{totals.sodium}mg</div>
            <div style={{ fontSize: "10px", color: "#64748b" }}>ナトリウム</div>
          </div>
        </div>
      </div>

      {/* Diagnosis */}
      <div style={{
        marginTop: "16px", padding: "16px", borderRadius: "14px",
        background: "linear-gradient(135deg, rgba(239,68,68,0.08), rgba(234,179,8,0.05))",
        border: "1px solid rgba(239,68,68,0.15)",
      }}>
        <div style={{ fontSize: "13px", fontWeight: "700", color: "#fca5a5", marginBottom: "8px" }}>
          🔍 今回の診断
        </div>
        <div style={{ fontSize: "12px", color: "#cbd5e1", lineHeight: 1.7 }}>
          <p style={{ margin: "0 0 6px" }}>✅ <strong>糖質</strong> → 適切な範囲。ジェル・固形物のバランス良い</p>
          <p style={{ margin: "0 0 6px" }}>⚠️ <strong>水分</strong> → 不足気味。特に登りセクションで間隔が空いた</p>
          <p style={{ margin: "0 0 6px" }}>⚠️ <strong>塩分</strong> → やや不足。後半の頭痛は脱水+Na不足が原因</p>
          <p style={{ margin: 0 }}>📊 <strong>濃度</strong> → ドリンクの糖質濃度がやや高い（目標: 500mlに60-70g）</p>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, sub, score, color }) {
  return (
    <div style={{
      padding: "14px 10px", borderRadius: "14px", textAlign: "center",
      background: "rgba(30,41,59,0.5)", border: "1px solid rgba(148,163,184,0.08)",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: `${score}%`,
        background: `linear-gradient(to top, ${color}10, transparent)`, transition: "height 1s ease",
      }}/>
      <div style={{ color, marginBottom: "4px", display: "flex", justifyContent: "center" }}>{icon}</div>
      <div style={{ fontSize: "10px", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>{label}</div>
      <div style={{ fontSize: "18px", fontWeight: "800", color: "#f1f5f9" }}>{value}</div>
      <div style={{ fontSize: "9px", color: "#475569", marginTop: "2px" }}>{sub}</div>
      <div style={{
        marginTop: "6px", fontSize: "11px", fontWeight: "700",
        color: score >= 80 ? "#4ade80" : score >= 60 ? "#fbbf24" : "#f87171",
      }}>
        {score}%
      </div>
    </div>
  );
}

// ─── TIMELINE TAB ───
function TimelineTab({ fuelLog, onDelete, onAdd }) {
  const maxTime = 315;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div style={{ fontSize: "13px", fontWeight: "700", color: "#94a3b8" }}>補給ログ</div>
        <button onClick={onAdd} style={{
          padding: "6px 14px", borderRadius: "8px", border: "none",
          background: "linear-gradient(135deg, #22c55e, #059669)",
          color: "#fff", fontSize: "11px", fontWeight: "700", cursor: "pointer",
          boxShadow: "0 2px 10px rgba(34,197,94,0.3)",
        }}>＋ 追加</button>
      </div>

      {/* Visual timeline bar */}
      <div style={{
        height: "40px", borderRadius: "10px", background: "rgba(30,41,59,0.6)",
        border: "1px solid rgba(148,163,184,0.08)", marginBottom: "16px",
        position: "relative", overflow: "hidden",
      }}>
        {PHASES.map(p => {
          const lapMins = GARMIN_DATA.slice(p.start, p.end).reduce((s, l) => {
            const parts = l.time.split(":");
            return s + parseInt(parts[0]) + (parseFloat(parts[1] || 0) / 60);
          }, 0);
          const startMin = GARMIN_DATA.slice(0, p.start).reduce((s, l) => {
            const parts = l.time.split(":");
            return s + parseInt(parts[0]) + (parseFloat(parts[1] || 0) / 60);
          }, 0);
          return (
            <div key={p.name} style={{
              position: "absolute", top: 0, bottom: 0,
              left: `${(startMin / maxTime) * 100}%`,
              width: `${(lapMins / maxTime) * 100}%`,
              background: `${p.color}20`, borderRight: `1px solid ${p.color}40`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "9px", color: p.color, fontWeight: "600",
            }}>
              {p.name}
            </div>
          );
        })}
        {fuelLog.map((e, i) => {
          const mins = timeToMinutes(e.time);
          const typeIcon = e.type === "drink" ? "💧" : e.type === "gel" ? "⚡" : e.type === "food" ? "🍙" : "🧂";
          return (
            <div key={i} style={{
              position: "absolute", top: "-2px", left: `${(mins / maxTime) * 100}%`,
              transform: "translateX(-50%)", fontSize: "16px", cursor: "pointer",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
            }} title={`${e.time} - ${e.item}`}>
              {typeIcon}
            </div>
          );
        })}
      </div>

      {/* Log entries */}
      {fuelLog.map((e, i) => {
        const typeConfig = {
          drink: { icon: "💧", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.2)" },
          gel: { icon: "⚡", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)" },
          food: { icon: "🍙", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.2)" },
          salt: { icon: "🧂", bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.2)" },
        }[e.type];
        return (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: "12px",
            padding: "12px 14px", borderRadius: "12px", marginBottom: "6px",
            background: typeConfig.bg, border: `1px solid ${typeConfig.border}`,
            transition: "transform 0.15s", cursor: "default",
          }}>
            <div style={{ fontSize: "20px", flexShrink: 0 }}>{typeConfig.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "12px", fontWeight: "700", color: "#e2e8f0" }}>{e.item}</div>
                <div style={{ fontSize: "10px", color: "#64748b", fontWeight: "600" }}>{e.time}</div>
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "3px", fontSize: "10px", color: "#94a3b8" }}>
                {e.carbs > 0 && <span>糖質 {e.carbs}g</span>}
                {e.water > 0 && <span>水 {e.water}ml</span>}
                {e.sodium > 0 && <span>Na {e.sodium}mg</span>}
              </div>
              {e.note && <div style={{ fontSize: "10px", color: "#64748b", marginTop: "2px", fontStyle: "italic" }}>{e.note}</div>}
            </div>
            <button onClick={() => onDelete(i)} style={{
              width: "24px", height: "24px", borderRadius: "6px", border: "none",
              background: "rgba(239,68,68,0.15)", color: "#f87171", cursor: "pointer",
              fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>✕</button>
          </div>
        );
      })}
    </div>
  );
}

// ─── ANALYSIS TAB ───
function AnalysisTab({ fuelLog, hourlyRate, scores }) {
  // Per-hour breakdown
  const hourBreakdown = [];
  for (let h = 0; h < 6; h++) {
    const startMin = h * 60;
    const endMin = (h + 1) * 60;
    const entries = fuelLog.filter(e => {
      const m = timeToMinutes(e.time);
      return m >= startMin && m < endMin;
    });
    hourBreakdown.push({
      hour: h + 1,
      carbs: entries.reduce((s, e) => s + e.carbs, 0),
      water: entries.reduce((s, e) => s + e.water, 0),
      sodium: entries.reduce((s, e) => s + e.sodium, 0),
      count: entries.length,
    });
  }

  const maxCarbs = Math.max(...hourBreakdown.map(h => h.carbs), 60);
  const maxWater = Math.max(...hourBreakdown.map(h => h.water), 500);

  return (
    <div>
      {/* Hourly bar chart */}
      <div style={{
        padding: "16px", borderRadius: "14px", marginBottom: "16px",
        background: "rgba(30,41,59,0.5)", border: "1px solid rgba(148,163,184,0.08)",
      }}>
        <div style={{ fontSize: "12px", fontWeight: "700", color: "#94a3b8", marginBottom: "12px" }}>
          時間別 摂取量
        </div>
        {hourBreakdown.filter(h => h.hour <= 5).map(h => (
          <div key={h.hour} style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#64748b", marginBottom: "4px" }}>
              <span>{h.hour}時間目</span>
              <span>{h.count}回摂取</span>
            </div>
            <div style={{ display: "flex", gap: "4px", height: "18px" }}>
              <div style={{ position: "relative", flex: 1, borderRadius: "4px", overflow: "hidden", background: "rgba(245,158,11,0.1)" }}>
                <div style={{
                  height: "100%", width: `${(h.carbs / maxCarbs) * 100}%`,
                  background: "linear-gradient(90deg, #f59e0b, #d97706)", borderRadius: "4px",
                  transition: "width 0.5s ease",
                }}/>
                <span style={{ position: "absolute", right: "6px", top: "50%", transform: "translateY(-50%)", fontSize: "9px", fontWeight: "700", color: "#fef3c7" }}>
                  {h.carbs}g
                </span>
              </div>
              <div style={{ position: "relative", flex: 1, borderRadius: "4px", overflow: "hidden", background: "rgba(59,130,246,0.1)" }}>
                <div style={{
                  height: "100%", width: `${(h.water / maxWater) * 100}%`,
                  background: "linear-gradient(90deg, #3b82f6, #2563eb)", borderRadius: "4px",
                  transition: "width 0.5s ease",
                }}/>
                <span style={{ position: "absolute", right: "6px", top: "50%", transform: "translateY(-50%)", fontSize: "9px", fontWeight: "700", color: "#dbeafe" }}>
                  {h.water}ml
                </span>
              </div>
            </div>
          </div>
        ))}
        <div style={{ display: "flex", gap: "16px", marginTop: "8px", fontSize: "10px" }}>
          <span style={{ color: "#f59e0b" }}>■ 糖質 (目標: 60g/h)</span>
          <span style={{ color: "#3b82f6" }}>■ 水分 (目標: 500ml/h)</span>
        </div>
      </div>

      {/* HR vs Fuel timing overlay */}
      <div style={{
        padding: "16px", borderRadius: "14px", marginBottom: "16px",
        background: "rgba(30,41,59,0.5)", border: "1px solid rgba(148,163,184,0.08)",
      }}>
        <div style={{ fontSize: "12px", fontWeight: "700", color: "#94a3b8", marginBottom: "12px" }}>
          心拍数 × 補給タイミング
        </div>
        <div style={{ height: "120px", position: "relative", borderRadius: "8px", overflow: "hidden" }}>
          {/* HR line chart simplified */}
          <svg width="100%" height="100%" viewBox="0 0 400 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="hrGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0"/>
              </linearGradient>
            </defs>
            {/* HR area */}
            <path d={(() => {
              const pts = GARMIN_DATA.map((d, i) => {
                const cumMin = GARMIN_DATA.slice(0, i + 1).reduce((s, l) => {
                  const p = l.time.split(":");
                  return s + parseInt(p[0]) + parseFloat(p[1] || 0) / 60;
                }, 0);
                const x = (cumMin / 315) * 400;
                const y = 120 - ((d.hr - 110) / 90) * 120;
                return `${x},${y}`;
              });
              return `M0,120 L${pts.join(" L")} L400,120 Z`;
            })()} fill="url(#hrGrad)"/>
            <polyline points={(() => {
              return GARMIN_DATA.map((d, i) => {
                const cumMin = GARMIN_DATA.slice(0, i + 1).reduce((s, l) => {
                  const p = l.time.split(":");
                  return s + parseInt(p[0]) + parseFloat(p[1] || 0) / 60;
                }, 0);
                const x = (cumMin / 315) * 400;
                const y = 120 - ((d.hr - 110) / 90) * 120;
                return `${x},${y}`;
              }).join(" ");
            })()} fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.8"/>
            {/* Fuel timing markers */}
            {fuelLog.map((e, i) => {
              const mins = timeToMinutes(e.time);
              const x = (mins / 315) * 400;
              const color = e.type === "drink" ? "#3b82f6" : e.type === "gel" ? "#f59e0b" : e.type === "food" ? "#22c55e" : "#a78bfa";
              return (
                <g key={i}>
                  <line x1={x} y1={0} x2={x} y2={120} stroke={color} strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6"/>
                  <circle cx={x} cy={8} r={4} fill={color} opacity="0.9"/>
                </g>
              );
            })}
          </svg>
          <div style={{ position: "absolute", top: "4px", left: "8px", fontSize: "9px", color: "#f87171", fontWeight: "600" }}>HR</div>
        </div>
        <div style={{ fontSize: "10px", color: "#64748b", marginTop: "8px" }}>
          ⚡ ジェル　💧 ドリンク　🍙 固形物　— 心拍上昇時に補給タイミングが空くと脱水リスクUP
        </div>
      </div>

      {/* Gap analysis */}
      <div style={{
        padding: "16px", borderRadius: "14px",
        background: "rgba(30,41,59,0.5)", border: "1px solid rgba(148,163,184,0.08)",
      }}>
        <div style={{ fontSize: "12px", fontWeight: "700", color: "#94a3b8", marginBottom: "8px" }}>
          補給間隔チェック
        </div>
        {fuelLog.map((e, i) => {
          if (i === 0) return null;
          const gap = timeToMinutes(e.time) - timeToMinutes(fuelLog[i - 1].time);
          const isLong = gap > 35;
          return (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "6px 10px", borderRadius: "8px", marginBottom: "4px",
              background: isLong ? "rgba(239,68,68,0.08)" : "rgba(34,197,94,0.05)",
              border: `1px solid ${isLong ? "rgba(239,68,68,0.15)" : "rgba(34,197,94,0.08)"}`,
            }}>
              <div style={{ fontSize: "10px", color: "#94a3b8" }}>
                {fuelLog[i - 1].time} → {e.time}
              </div>
              <div style={{
                fontSize: "11px", fontWeight: "700",
                color: isLong ? "#f87171" : "#4ade80",
              }}>
                {Math.round(gap)}分 {isLong ? "⚠️" : "✓"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── PLANNER TAB ───
function PlannerTab() {
  const [gpxData, setGpxData] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [title, setTitle] = useState("新しいプラン");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [profile, setProfile] = useState({ height: 170, weight: 65 });
  const [settings, setSettings] = useState({ goalHours: 6, goalMins: 0, temp: 15, raceDate: "" });
  const [weather, setWeather] = useState(null);
  const [isFetchingWeather, setIsFetchingWeather] = useState(false);
  const fileInputRef = useRef(null);
  const titleInputRef = useRef(null);

  // Weather code → display info
  function weatherInfo(code) {
    if (code === 0)  return { icon: "☀️", label: "快晴" };
    if (code <= 1)   return { icon: "🌤️", label: "晴れ" };
    if (code <= 2)   return { icon: "⛅", label: "晴れ時々曇り" };
    if (code <= 3)   return { icon: "☁️", label: "曇り" };
    if (code <= 48)  return { icon: "🌫️", label: "霧" };
    if (code <= 55)  return { icon: "🌦️", label: "小雨" };
    if (code <= 65)  return { icon: "🌧️", label: "雨" };
    if (code <= 77)  return { icon: "❄️", label: "雪" };
    if (code <= 82)  return { icon: "🌧️", label: "にわか雨" };
    return { icon: "⛈️", label: "雷雨" };
  }

  // Fetch weather from Open-Meteo when date or location changes
  useEffect(() => {
    if (!settings.raceDate || !gpxData?.startLat) { setWeather(null); return; }
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const race = new Date(settings.raceDate + "T00:00:00");
    const diffDays = (race - today) / (1000 * 60 * 60 * 24);
    if (diffDays < 0 || diffDays > 7) { setWeather(null); return; }

    setIsFetchingWeather(true);
    setWeather(null);
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${gpxData.startLat.toFixed(4)}&longitude=${gpxData.startLon.toFixed(4)}&daily=temperature_2m_max,temperature_2m_min,weathercode&forecast_days=8&timezone=auto`;
    fetch(url)
      .then(r => r.json())
      .then(data => {
        const idx = data.daily.time.indexOf(settings.raceDate);
        if (idx >= 0) {
          const maxT = Math.round(data.daily.temperature_2m_max[idx]);
          const minT = Math.round(data.daily.temperature_2m_min[idx]);
          const code = data.daily.weathercode[idx];
          const avgT = Math.round((maxT + minT) / 2);
          setWeather({ maxTemp: maxT, minTemp: minT, code, ...weatherInfo(code) });
          setSettings(s => ({ ...s, temp: avgT }));
        }
      })
      .catch(() => {})
      .finally(() => setIsFetchingWeather(false));
  }, [settings.raceDate, gpxData]);

  function haversineM(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const phi1 = lat1 * Math.PI / 180, phi2 = lat2 * Math.PI / 180;
    const dp = (lat2 - lat1) * Math.PI / 180, dl = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dp/2)**2 + Math.cos(phi1)*Math.cos(phi2)*Math.sin(dl/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  }

  function parseGPX(text) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");
    const NS = "http://www.topografix.com/GPX/1/1";
    let pts = [...xml.getElementsByTagNameNS(NS, "trkpt")];
    if (!pts.length) pts = [...xml.getElementsByTagName("trkpt")];
    const startLat = pts[0] ? parseFloat(pts[0].getAttribute("lat")) : null;
    const startLon = pts[0] ? parseFloat(pts[0].getAttribute("lon")) : null;

    let dist = 0, asc = 0, desc = 0;
    const rawProfile = [];
    let prevLat = null, prevLon = null, prevEle = null;

    pts.forEach((pt, i) => {
      const lat = parseFloat(pt.getAttribute("lat"));
      const lon = parseFloat(pt.getAttribute("lon"));
      const eleEl = pt.getElementsByTagNameNS(NS, "ele")[0] || pt.getElementsByTagName("ele")[0];
      const ele = eleEl ? parseFloat(eleEl.textContent) : null;
      if (prevLat !== null) {
        dist += haversineM(prevLat, prevLon, lat, lon);
        if (ele !== null && prevEle !== null) {
          const d = ele - prevEle;
          if (d > 0.3) asc += d;
          else if (d < -0.3) desc += Math.abs(d);
        }
      }
      const step = Math.max(1, Math.floor(pts.length / 100));
      if (i % step === 0 && ele !== null) rawProfile.push({ d: dist / 1000, e: ele });
      prevLat = lat; prevLon = lon; prevEle = ele !== null ? ele : prevEle;
    });

    const eles = rawProfile.map(p => p.e);
    return {
      dist: dist / 1000,
      asc: Math.round(asc), desc: Math.round(desc),
      minEle: Math.round(Math.min(...eles)),
      maxEle: Math.round(Math.max(...eles)),
      profile: rawProfile,
      startLat, startLon,
    };
  }

  function handleFile(file) {
    if (!file?.name?.toLowerCase().endsWith(".gpx")) return;
    setIsParsing(true);
    const fileTitle = file.name.replace(/\.gpx$/i, "").replace(/[_-]/g, " ");
    setTitle(fileTitle);
    const reader = new FileReader();
    reader.onload = e => {
      try { setGpxData(parseGPX(e.target.result)); } catch(err) { console.error(err); }
      setIsParsing(false);
    };
    reader.readAsText(file);
  }

  const estTime = useMemo(() => {
    const total = settings.goalHours * 60 + settings.goalMins;
    return total > 0 ? total : null;
  }, [settings.goalHours, settings.goalMins]);

  const avgPace = useMemo(() => {
    if (!estTime || !gpxData || gpxData.dist === 0) return null;
    const secPerKm = (estTime * 60) / gpxData.dist;
    const mins = Math.floor(secPerKm / 60);
    const secs = Math.round(secPerKm % 60);
    return `${mins}:${String(secs).padStart(2, "0")}`;
  }, [estTime, gpxData]);

  const fuelPlan = useMemo(() => {
    if (!gpxData || !estTime) return [];
    const plan = [];
    const totalH = estTime / 60;
    const eleRange = (gpxData.maxEle - gpxData.minEle) || 1;

    const eleAt = (frac) => {
      const idx = Math.min(Math.floor(frac * (gpxData.profile.length - 1)), gpxData.profile.length - 1);
      return gpxData.profile[idx]?.e ?? gpxData.minEle;
    };
    const climbFeel = (frac) => {
      const e0 = eleAt(Math.max(frac - 0.04, 0));
      const e1 = eleAt(Math.min(frac + 0.04, 1));
      return (e1 - e0) / eleRange;
    };

    plan.push({ min: 0, type: "drink", icon: "💧", item: "スポーツドリンク 500ml", carbs: 35, water: 500, sodium: 200, note: "スタート直前" });

    for (let min = 20; min <= estTime + 15; min += 20) {
      if (min > estTime + 15) break;
      const frac = Math.min(min / estTime, 1);
      const cf = climbFeel(frac);
      const climbing = cf > 0.08;
      const heavyClimb = cf > 0.18;
      const isHourMark = min % 60 < 20 && min >= 60;

      if (isHourMark) {
        plan.push({ min, type: "drink", icon: "💧", item: `ドリンク ${climbing ? 250 : 200}ml`, carbs: 14, water: climbing ? 250 : 200, sodium: 120, note: "" });
        plan.push({ min: min + 2, type: "gel", icon: "⚡", item: "エナジージェル", carbs: 25, water: 50, sodium: 50, note: heavyClimb ? "⚠️ 登り区間 — 先にジェルを" : "" });
      } else {
        const sodiumBoost = heavyClimb ? 200 : climbing ? 100 : 0;
        plan.push({ min, type: "salt", icon: "🧂", item: `水 150ml + 塩タブ${heavyClimb ? " 2粒" : " 1粒"}`, carbs: 0, water: 150, sodium: 300 + sodiumBoost, note: heavyClimb ? "⚠️ 大きな登り — 塩多め" : "" });
      }
      if (totalH > 2.5 && min > 0 && min % 100 === 0) {
        plan.push({ min: min + 5, type: "food", icon: "🍙", item: "おにぎり or エナジーバー", carbs: 40, water: 0, sodium: 350, note: "固形物補給" });
      }
    }
    return plan.filter(p => p.min <= estTime + 10).sort((a, b) => a.min - b.min);
  }, [gpxData, estTime, settings.temp]);

  const fuelTotals = useMemo(() => fuelPlan.reduce((acc, p) => ({
    carbs: acc.carbs + p.carbs, water: acc.water + p.water, sodium: acc.sodium + p.sodium,
  }), { carbs: 0, water: 0, sodium: 0 }), [fuelPlan]);

  const fmt = (m) => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;

  return (
    <div>
      {!gpxData ? (
        <div>
          {/* Upload zone */}
          <div
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={e => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); }}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: `2px dashed ${isDragging ? "#22c55e" : "rgba(148,163,184,0.2)"}`,
              borderRadius: "20px", padding: "52px 24px", textAlign: "center",
              cursor: "pointer",
              background: isDragging ? "rgba(34,197,94,0.06)" : "rgba(30,41,59,0.3)",
              transition: "all 0.2s",
            }}
          >
            <div style={{ fontSize: "52px", marginBottom: "12px" }}>🗺️</div>
            <div style={{ fontSize: "16px", fontWeight: "800", color: "#f1f5f9", marginBottom: "6px" }}>
              GPXファイルをドロップ
            </div>
            <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "8px" }}>またはクリックして選択</div>
            <div style={{ fontSize: "10px", color: "#475569" }}>
              Garmin / TrailNote / Strava から書き出した .gpx に対応
            </div>
            <input ref={fileInputRef} type="file" accept=".gpx" style={{ display: "none" }}
              onChange={e => handleFile(e.target.files[0])} />
          </div>
          {isParsing && (
            <div style={{ textAlign: "center", marginTop: "20px", color: "#22c55e", fontSize: "13px" }}>
              📡 GPXを解析中...
            </div>
          )}
          <div style={{ marginTop: "24px", padding: "16px", borderRadius: "14px", background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)" }}>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", letterSpacing: "1px", marginBottom: "10px", textTransform: "uppercase" }}>使い方</div>
            {[
              { icon: "1️⃣", text: "GPXファイルをアップロード（ドラッグ＆ドロップもOK）" },
              { icon: "2️⃣", text: "プロフィール・目標タイム・大会日を設定" },
              { icon: "3️⃣", text: "標高と天気を考慮した補給プランを自動生成" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "16px" }}>{s.icon}</span>
                <span style={{ fontSize: "12px", color: "#94a3b8" }}>{s.text}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {/* ── Editable plan title ── */}
          <div style={{ marginBottom: "16px" }}>
            {isEditingTitle ? (
              <input
                ref={titleInputRef}
                value={title}
                onChange={e => setTitle(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={e => { if (e.key === "Enter" || e.key === "Escape") setIsEditingTitle(false); }}
                autoFocus
                style={{
                  ...inputStyle,
                  fontSize: "20px", fontWeight: "800", width: "100%",
                  color: "#f1f5f9", letterSpacing: "-0.5px",
                }}
              />
            ) : (
              <div
                onClick={() => { setIsEditingTitle(true); }}
                style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", userSelect: "none" }}
              >
                <div style={{ fontSize: "20px", fontWeight: "800", color: "#f1f5f9", letterSpacing: "-0.5px", flex: 1 }}>
                  {title}
                </div>
                <div style={{
                  fontSize: "10px", color: "#475569", padding: "3px 8px", borderRadius: "6px",
                  background: "rgba(30,41,59,0.6)", border: "1px solid rgba(148,163,184,0.1)",
                }}>✏️ 編集</div>
              </div>
            )}
          </div>

          {/* ── Route stats ── */}
          <div style={{
            padding: "12px 16px", borderRadius: "14px", marginBottom: "14px",
            background: "linear-gradient(135deg, rgba(34,197,94,0.1), rgba(59,130,246,0.05))",
            border: "1px solid rgba(34,197,94,0.18)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div style={{ display: "flex", gap: "14px", fontSize: "11px", color: "#94a3b8", flexWrap: "wrap" }}>
              <span>📍 <strong style={{ color: "#f1f5f9" }}>{gpxData.dist.toFixed(1)}</strong> km</span>
              <span>↑ <strong style={{ color: "#4ade80" }}>{gpxData.asc}</strong>m</span>
              <span>↓ <strong style={{ color: "#60a5fa" }}>{gpxData.desc}</strong>m</span>
              <span>🏔 <strong style={{ color: "#fbbf24" }}>{gpxData.maxEle}</strong>m</span>
            </div>
            <button onClick={() => { setGpxData(null); setWeather(null); }} style={{
              fontSize: "10px", color: "#64748b", background: "rgba(30,41,59,0.6)",
              border: "1px solid rgba(148,163,184,0.15)", borderRadius: "8px",
              cursor: "pointer", padding: "4px 10px", flexShrink: 0,
            }}>変更</button>
          </div>

          {/* ── Elevation profile ── */}
          <div style={{
            padding: "14px 16px", borderRadius: "14px", marginBottom: "14px",
            background: "rgba(30,41,59,0.5)", border: "1px solid rgba(148,163,184,0.08)",
          }}>
            <div style={{ fontSize: "10px", fontWeight: "700", color: "#64748b", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>
              標高プロフィール
            </div>
            <div style={{ height: "80px", position: "relative" }}>
              <svg width="100%" height="100%" viewBox="0 0 400 80" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="eleGradPlan" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0.35"/>
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0.04"/>
                  </linearGradient>
                </defs>
                {gpxData.profile.length > 1 && (() => {
                  const maxD = gpxData.profile[gpxData.profile.length - 1].d || 1;
                  const minE = gpxData.minEle, eRange = (gpxData.maxEle - gpxData.minEle) || 1;
                  const toXY = p => `${(p.d / maxD) * 400},${80 - ((p.e - minE) / eRange) * 68}`;
                  const pts = gpxData.profile.map(toXY);
                  return (
                    <>
                      <path d={`M0,80 L${pts.join(" L")} L400,80 Z`} fill="url(#eleGradPlan)"/>
                      <polyline points={pts.join(" ")} fill="none" stroke="#22c55e" strokeWidth="1.5" opacity="0.85"/>
                    </>
                  );
                })()}
              </svg>
              <div style={{ position: "absolute", bottom: "0", left: "4px", fontSize: "9px", color: "#475569" }}>{gpxData.minEle}m</div>
              <div style={{ position: "absolute", top: "0", right: "4px", fontSize: "9px", color: "#94a3b8" }}>{gpxData.maxEle}m</div>
            </div>
          </div>

          {/* ── Settings card ── */}
          <div style={{
            padding: "14px 16px", borderRadius: "14px", marginBottom: "14px",
            background: "rgba(30,41,59,0.5)", border: "1px solid rgba(148,163,184,0.08)",
          }}>

            {/* 👤 Runner profile */}
            <div style={{ marginBottom: "14px" }}>
              <div style={{ fontSize: "10px", fontWeight: "700", color: "#64748b", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>
                👤 ランナープロフィール
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <label style={{ fontSize: "11px", color: "#64748b", display: "flex", flexDirection: "column", gap: "4px" }}>
                  身長 (cm)
                  <input type="number" value={profile.height}
                    onChange={e => setProfile(p => ({...p, height: +e.target.value}))}
                    style={inputStyle} min={100} max={220} />
                </label>
                <label style={{ fontSize: "11px", color: "#64748b", display: "flex", flexDirection: "column", gap: "4px" }}>
                  体重 (kg)
                  <input type="number" value={profile.weight}
                    onChange={e => setProfile(p => ({...p, weight: +e.target.value}))}
                    style={inputStyle} min={30} max={150} />
                </label>
              </div>
            </div>

            {/* 🗓️ Race date + weather */}
            <div style={{ marginBottom: "14px" }}>
              <div style={{ fontSize: "10px", fontWeight: "700", color: "#64748b", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>
                🗓️ 大会・計画日
              </div>
              <input
                type="date"
                value={settings.raceDate}
                onChange={e => setSettings(s => ({...s, raceDate: e.target.value}))}
                style={{ ...inputStyle, width: "100%", colorScheme: "dark" }}
              />

              {/* Weather result */}
              {isFetchingWeather && (
                <div style={{ marginTop: "8px", fontSize: "12px", color: "#22c55e", textAlign: "center", padding: "8px" }}>
                  🌐 天気情報を取得中...
                </div>
              )}
              {weather && (
                <div style={{
                  marginTop: "10px", padding: "12px 14px", borderRadius: "12px",
                  background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(59,130,246,0.08))",
                  border: "1px solid rgba(99,102,241,0.25)",
                  display: "flex", alignItems: "center", gap: "12px",
                }}>
                  <div style={{ fontSize: "36px", lineHeight: 1 }}>{weather.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: "#e2e8f0" }}>{weather.label}</div>
                    <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>
                      最高 <strong style={{ color: "#fbbf24" }}>{weather.maxTemp}°C</strong>
                      　最低 <strong style={{ color: "#60a5fa" }}>{weather.minTemp}°C</strong>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "9px", color: "#64748b" }}>気温を自動設定</div>
                    <div style={{ fontSize: "18px", fontWeight: "800", color: "#c7d2fe" }}>{settings.temp}°C</div>
                  </div>
                </div>
              )}
              {settings.raceDate && !weather && !isFetchingWeather && (() => {
                const today = new Date(); today.setHours(0,0,0,0);
                const race = new Date(settings.raceDate + "T00:00:00");
                const diffDays = (race - today) / (1000*60*60*24);
                return diffDays >= 0 && diffDays <= 7 ? null : (
                  <div style={{ marginTop: "8px", fontSize: "10px", color: "#475569", textAlign: "center" }}>
                    ※ 天気予報は1週間以内の日程のみ表示されます
                  </div>
                );
              })()}

              {/* Manual temp override if no weather */}
              {!weather && (
                <label style={{ fontSize: "11px", color: "#64748b", display: "flex", flexDirection: "column", gap: "4px", marginTop: "8px" }}>
                  気温 (°C)
                  <input type="number" value={settings.temp}
                    onChange={e => setSettings(s => ({...s, temp: +e.target.value}))}
                    style={inputStyle} min={-10} max={45} />
                </label>
              )}
            </div>

            {/* ⏱️ Goal time */}
            <div>
              <div style={{ fontSize: "10px", fontWeight: "700", color: "#64748b", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>
                ⏱️ 目標タイム
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <input type="number" value={settings.goalHours}
                    onChange={e => setSettings(s => ({...s, goalHours: Math.max(0, +e.target.value)}))}
                    style={{ ...inputStyle, width: "60px", textAlign: "center" }} min={0} max={24} />
                  <span style={{ fontSize: "12px", color: "#64748b" }}>h</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <input type="number" value={settings.goalMins}
                    onChange={e => setSettings(s => ({...s, goalMins: Math.min(59, Math.max(0, +e.target.value))}))}
                    style={{ ...inputStyle, width: "60px", textAlign: "center" }} min={0} max={59} />
                  <span style={{ fontSize: "12px", color: "#64748b" }}>min</span>
                </div>
                {avgPace && (
                  <div style={{
                    flex: 1, padding: "8px 10px", borderRadius: "10px",
                    background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)",
                    textAlign: "center",
                  }}>
                    <div style={{ fontSize: "9px", color: "#64748b" }}>平均ペース</div>
                    <div style={{ fontSize: "16px", fontWeight: "800", color: "#4ade80" }}>
                      {avgPace}<span style={{ fontSize: "9px", fontWeight: "400" }}>/km</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Computed summary */}
              {estTime && gpxData && (
                <div style={{
                  marginTop: "12px", padding: "10px 14px", borderRadius: "10px",
                  background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)",
                  display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "4px", textAlign: "center",
                }}>
                  <div>
                    <div style={{ fontSize: "9px", color: "#64748b" }}>目標タイム</div>
                    <div style={{ fontSize: "14px", fontWeight: "800", color: "#c7d2fe" }}>{settings.goalHours}h{String(settings.goalMins).padStart(2,"0")}m</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "9px", color: "#64748b" }}>平均ペース</div>
                    <div style={{ fontSize: "14px", fontWeight: "800", color: "#4ade80" }}>{avgPace}/km</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "9px", color: "#64748b" }}>推定消費cal</div>
                    <div style={{ fontSize: "14px", fontWeight: "800", color: "#fb923c" }}>{Math.round(profile.weight * gpxData.dist * 1.05)}kcal</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Fuel totals ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "14px" }}>
            {[
              { val: `${fuelTotals.carbs}g`, label: "糖質 合計", color: "#fbbf24", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.15)" },
              { val: `${(fuelTotals.water/1000).toFixed(1)}L`, label: "水分 合計", color: "#60a5fa", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.15)" },
              { val: `${fuelTotals.sodium}mg`, label: "Na 合計", color: "#c4b5fd", bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.15)" },
            ].map((m, i) => (
              <div key={i} style={{ padding: "12px", borderRadius: "12px", textAlign: "center", background: m.bg, border: `1px solid ${m.border}` }}>
                <div style={{ fontSize: "16px", fontWeight: "800", color: m.color }}>{m.val}</div>
                <div style={{ fontSize: "9px", color: "#64748b", marginTop: "2px" }}>{m.label}</div>
              </div>
            ))}
          </div>

          {/* ── Generated plan timeline ── */}
          <div style={{
            padding: "14px 16px", borderRadius: "14px",
            background: "rgba(30,41,59,0.5)", border: "1px solid rgba(148,163,184,0.08)",
          }}>
            <div style={{ fontSize: "10px", fontWeight: "700", color: "#64748b", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "14px" }}>
              📋 自動生成 補給プラン（{fuelPlan.length}回）
            </div>
            <div style={{ position: "relative", paddingLeft: "20px" }}>
              <div style={{
                position: "absolute", left: "7px", top: "8px", bottom: "8px",
                width: "2px", background: "linear-gradient(to bottom, #22c55e, #3b82f6, #a78bfa)",
                borderRadius: "1px",
              }}/>
              {fuelPlan.map((item, i) => {
                const distEst = gpxData ? ((item.min / estTime) * gpxData.dist).toFixed(1) : "–";
                const typeColor = { drink: "#3b82f6", gel: "#f59e0b", salt: "#a78bfa", food: "#22c55e" }[item.type];
                return (
                  <div key={i} style={{
                    display: "flex", gap: "10px", padding: "8px 0",
                    position: "relative", alignItems: "flex-start",
                    borderBottom: i < fuelPlan.length - 1 ? "1px solid rgba(148,163,184,0.05)" : "none",
                  }}>
                    <div style={{
                      position: "absolute", left: "-16px", top: "10px",
                      width: "10px", height: "10px", borderRadius: "50%",
                      background: typeColor, border: "2px solid #0f172a", zIndex: 1,
                    }}/>
                    <div style={{ minWidth: "34px", fontSize: "11px", fontWeight: "700", color: "#64748b", paddingTop: "1px" }}>
                      {fmt(item.min)}
                    </div>
                    <div style={{ fontSize: "16px" }}>{item.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "12px", color: "#e2e8f0", fontWeight: "600" }}>{item.item}</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "3px", fontSize: "10px", color: "#64748b" }}>
                        <span>📍 {distEst}km</span>
                        {item.carbs > 0 && <span>糖 {item.carbs}g</span>}
                        {item.water > 0 && <span>水 {item.water}ml</span>}
                        {item.sodium > 0 && <span>Na {item.sodium}mg</span>}
                      </div>
                      {item.note && (
                        <div style={{ fontSize: "10px", color: "#f87171", marginTop: "3px" }}>{item.note}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
