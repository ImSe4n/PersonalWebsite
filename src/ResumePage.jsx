import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedBg from "./AnimatedBg";

const ITEMS = [
  { id: "i",   badge: "I",   title: "EDUCATION",  subtitle: "School / Coursework",  rank: 3 },
  { id: "ii",  badge: "II",  title: "SKILLS",     subtitle: "Tech Stack / Tools",   rank: 4 },
  { id: "iii", badge: "III", title: "PROJECTS",   subtitle: "Featured Work",        rank: 5 },
  { id: "iv",  badge: "IV",  title: "EXPERIENCE", subtitle: "Activities / Roles",   rank: 2 },
];

const EDUCATION_ROWS = [
  { index: "01", title: "John McCrae Secondary School",  status: "Current" },
  { index: "02", title: "Merivale High School",          status: "2023–25" },
  { index: "03", title: "Ottawa, ON",                    status: "Canada" },
  { index: "04", title: "Sep 2025 – Jun 2027",           status: "Expected" },
];

const SKILLS = [
  { name: "JavaScript / HTML / CSS", level: 90, color: "#f7df1e" },
  { name: "Python",                  level: 82, color: "#3776ab" },
  { name: "React",                   level: 80, color: "#61dafb" },
  { name: "Java",                    level: 72, color: "#ed8b00" },
  { name: "Node.js",                 level: 75, color: "#68a063" },
  { name: "Git / AWS",               level: 70, color: "#f05032" },
];

const PROJECTS_ROWS = [
  { index: "01", title: "FlightScope",  status: "Jun 2025" },
  { index: "02", title: "Talent Forge", status: "Jan 2025" },
  { index: "03", title: "Imroid",       status: "2022–24" },
  { index: "04", title: "This Site",    status: "2025" },
];

const EXPERIENCE_ROWS = [
  { index: "01", title: "Software Lead — Spark Robotics",        status: "Jun 2023–" },
  { index: "02", title: "Hackathon Organizer — Scrapyard / HappyHacks", status: "2024–25" },
  { index: "03", title: "Camp Volunteer — Carleton University",  status: "Jul 2024" },
];

export default function ResumePage() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp")   setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div id="menu-screen">
      <AnimatedBg variant="resume" />
      <div className="resume-entry-mask" aria-hidden="true" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .resume-entry-mask {
          position: absolute; inset: 0; z-index: 9; overflow: hidden;
          background: #0047FF;
          clip-path: circle(0 at 50% 50%);
          animation: resume-entry-reveal 0.95s cubic-bezier(0.16,1,0.3,1) forwards;
          pointer-events: none;
        }
        @keyframes resume-entry-reveal {
          0%   { clip-path: circle(0 at 50% 50%);       opacity: 1; }
          55%  { clip-path: circle(150vmax at 50% 50%); opacity: 1; }
          100% { clip-path: circle(150vmax at 50% 50%); opacity: 0; }
        }

        .resume-overlay { position: absolute; inset: 0; z-index: 10; pointer-events: none; }

        .resume-stack {
          position: absolute; top: 9vh; left: 2.8vw;
          width: min(47vw, 720px);
          display: flex; flex-direction: column; gap: 10px;
          pointer-events: none; transform: scale(0.9); transform-origin: top left;
        }
        .resume-list-tag {
          font-family: 'Anton', sans-serif; font-size: 92px; line-height: 0.9;
          color: #f6fbff; letter-spacing: 2px; margin: 0 0 6px 12px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.18);
          opacity: 0; transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .resume-list-tag.mounted { opacity: 1; transform: translateX(0); }

        .resume-card-wrap {
          position: relative; opacity: 0; transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1);
          pointer-events: all; cursor: pointer;
        }
        .resume-card-wrap.mounted { opacity: 1; transform: translateX(0); }
        .resume-card {
          position: relative; height: 112px; background: #10185f;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 8px 0 rgba(5,13,59,0.85);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
        }
        .resume-card-wrap.active .resume-card { background: #fff; box-shadow: 10px 8px 0 #d63232; transform: translateX(6px); }
        .resume-card-inner { position: absolute; inset: 0; padding: 14px 22px 14px 62px; display: flex; align-items: flex-start; justify-content: space-between; }
        .resume-badge {
          position: absolute; top: 10px; left: -10px; width: 56px; height: 70px;
          background: #0b113d; border: 3px solid #9cf7ff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex; align-items: center; justify-content: center;
          transform: rotate(-8deg); box-shadow: 0 4px 0 rgba(0,0,0,0.28);
          transition: background 0.22s, border-color 0.22s;
        }
        .resume-badge-text { font-family: 'Bebas Neue', sans-serif; font-size: 36px; color: #d2fdff; letter-spacing: 1px; transform: rotate(8deg); }
        .resume-card-wrap.active .resume-badge { background: #000; border-color: #000; }
        .resume-card-wrap.active .resume-badge-text { color: #fff; }
        .resume-title { font-family: 'Anton', sans-serif; font-size: 56px; line-height: 0.9; letter-spacing: 1px; color: #a5f6ff; transition: color 0.22s; }
        .resume-card-wrap.active .resume-title { color: #000; }
        .resume-rank { display: flex; align-items: center; gap: 10px; margin-top: 2px; flex-shrink: 0; }
        .resume-rank-label { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 2px; color: #9ffbff; transition: color 0.22s; }
        .resume-rank-number { font-family: 'Anton', sans-serif; font-size: 70px; line-height: 0.82; color: #9ffbff; transition: color 0.22s; }
        .resume-card-wrap.active .resume-rank-label, .resume-card-wrap.active .resume-rank-number { color: #000; }
        .resume-subtitle-bar {
          position: absolute; left: 64px; right: 14px; bottom: 12px; height: 34px;
          background: #85f4ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex; align-items: center; padding: 0 18px; transition: background 0.22s;
        }
        .resume-card-wrap.active .resume-subtitle-bar { background: #000; }
        .resume-subtitle { font-family: 'Bebas Neue', sans-serif; font-size: 28px; line-height: 1; letter-spacing: 1px; color: #041238; transition: color 0.22s; }
        .resume-card-wrap.active .resume-subtitle { color: #fff; }

        .resume-detail-panel {
          position: absolute; top: 9.5vh; right: 4.5vw;
          width: min(39vw, 620px); min-height: 74vh;
          z-index: 12; padding: 22px 24px 24px;
          background: linear-gradient(180deg, rgba(15,28,105,0.96) 0%, rgba(8,16,68,0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(133,244,255,0.16), 16px 16px 0 rgba(0,6,30,0.55);
          overflow: hidden;
        }
        .resume-detail-panel::before {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(135deg, rgba(133,244,255,0.08) 0 15%, transparent 15%), linear-gradient(180deg, rgba(255,255,255,0.05), transparent 24%);
        }
        .resume-detail-top {
          position: relative; display: grid; grid-template-columns: 70px 1fr auto;
          align-items: center; gap: 14px; min-height: 92px; padding: 0 18px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #08153f; box-shadow: 10px 0 0 rgba(255,94,136,0.88);
        }
        .resume-detail-top-index { font-family: 'Anton', sans-serif; font-size: 46px; line-height: 1; }
        .resume-detail-top-title { font-family: 'Anton', sans-serif; font-size: 38px; line-height: 0.92; letter-spacing: 1px; }
        .resume-detail-top-right { font-family: 'Bebas Neue', sans-serif; font-size: 30px; letter-spacing: 2px; line-height: 1; text-align: right; }

        .resume-detail-list { position: relative; display: flex; flex-direction: column; gap: 8px; margin-top: 16px; }
        .resume-detail-row {
          display: grid; grid-template-columns: 44px 1fr auto;
          align-items: center; gap: 12px; min-height: 52px; padding: 0 12px;
          background: rgba(8,18,72,0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140,239,255,0.12);
          transition: transform 0.16s ease, background 0.16s ease;
        }
        .resume-detail-row:hover { transform: translateX(4px); background: rgba(12,26,94,1); }
        .resume-detail-row-index { font-family: 'Bebas Neue', sans-serif; font-size: 24px; letter-spacing: 1px; color: #94f4ff; }
        .resume-detail-row-title { font-family: 'Anton', sans-serif; font-size: 22px; line-height: 1.1; color: #f2fcff; }
        .resume-detail-status {
          font-family: 'Bebas Neue', sans-serif; font-size: 17px; line-height: 1;
          letter-spacing: 1px; color: #06133b; background: #8df6ff;
          padding: 6px 10px; clip-path: polygon(0 0, 100% 0, calc(100% - 7px) 100%, 0 100%);
          white-space: nowrap;
        }

        .resume-detail-bottom {
          position: relative; margin-top: 16px; padding: 16px;
          background: rgba(5,13,57,0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145,239,255,0.12);
        }
        .resume-detail-bottom-title { font-family: 'Bebas Neue', sans-serif; font-size: 26px; letter-spacing: 2px; color: #91f5ff; margin-bottom: 10px; }
        .resume-detail-bullet { font-family: 'Anton', sans-serif; font-size: 18px; line-height: 1.25; color: #edfaff; margin-bottom: 6px; }

        .resume-skill-list { display: flex; flex-direction: column; gap: 11px; margin-top: 16px; }
        .resume-skill-row { display: flex; flex-direction: column; gap: 4px; }
        .resume-skill-label { display: flex; justify-content: space-between; align-items: baseline; }
        .resume-skill-name { font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 2px; color: #8ef5ff; }
        .resume-skill-pct { font-family: 'Anton', sans-serif; font-size: 18px; color: #6bdfff; }
        .resume-skill-track { width: 100%; height: 9px; background: rgba(10,20,80,0.9); clip-path: polygon(0 0, 100% 0, calc(100% - 4px) 100%, 0 100%); }
        .resume-skill-fill { height: 100%; clip-path: polygon(0 0, 100% 0, calc(100% - 4px) 100%, 0 100%); transition: width 1s cubic-bezier(0.22,1,0.36,1); }

        .resume-footer { position: fixed; bottom: 20px; right: 28px; display: flex; flex-direction: column; align-items: flex-end; gap: 5px; font-family: 'Bebas Neue', sans-serif; z-index: 14; opacity: 0; transition: opacity 0.4s ease 0.6s; }
        .resume-footer.mounted { opacity: 1; }
        .resume-footer-row { display: flex; align-items: center; gap: 8px; font-size: 13px; letter-spacing: 2px; color: rgba(255,255,255,0.22); }
        .resume-footer-key { border: 1px solid rgba(255,255,255,0.15); border-radius: 3px; padding: 1px 6px; font-size: 11px; }
      `}</style>

      <div className="resume-overlay">
        <div className="resume-stack">
          <div className={`resume-list-tag${mounted ? " mounted" : ""}`}>LIST</div>
          {ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`resume-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 55}ms` }}
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <div className="resume-card">
                <div className="resume-badge"><div className="resume-badge-text">{item.badge}</div></div>
                <div className="resume-card-inner">
                  <div className="resume-title">{item.title}</div>
                  <div className="resume-rank">
                    <div className="resume-rank-label">RANK</div>
                    <div className="resume-rank-number">{item.rank}</div>
                  </div>
                </div>
                <div className="resume-subtitle-bar"><div className="resume-subtitle">{item.subtitle}</div></div>
              </div>
            </div>
          ))}
        </div>

        {active === 0 && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">01</div>
              <div className="resume-detail-top-title">EDUCATION</div>
              <div className="resume-detail-top-right">Ottawa, ON</div>
            </div>
            <div className="resume-detail-list">
              {EDUCATION_ROWS.map((row) => (
                <div className="resume-detail-row" key={row.index}>
                  <div className="resume-detail-row-index">{row.index}</div>
                  <div className="resume-detail-row-title">{row.title}</div>
                  <div className="resume-detail-status">{row.status}</div>
                </div>
              ))}
            </div>
            <div className="resume-detail-bottom">
              <div className="resume-detail-bottom-title">NOTES</div>
              <div className="resume-detail-bullet">— Currently at John McCrae Secondary (2025–2027).</div>
              <div className="resume-detail-bullet">— Previously Merivale High School (2023–2025).</div>
              <div className="resume-detail-bullet">— Targeting CS programs for university.</div>
            </div>
          </div>
        )}

        {active === 1 && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">02</div>
              <div className="resume-detail-top-title">SKILLS</div>
              <div className="resume-detail-top-right">{SKILLS.length} LISTED</div>
            </div>
            <div className="resume-skill-list">
              {SKILLS.map((skill) => (
                <div className="resume-skill-row" key={skill.name}>
                  <div className="resume-skill-label">
                    <span className="resume-skill-name">{skill.name}</span>
                    <span className="resume-skill-pct">{skill.level}%</span>
                  </div>
                  <div className="resume-skill-track">
                    <div className="resume-skill-fill" style={{ width: `${skill.level}%`, background: skill.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="resume-detail-bottom">
              <div className="resume-detail-bottom-title">TOOLS</div>
              <div className="resume-detail-bullet">— Git, VS Code, Visual Studio, BlueJ</div>
              <div className="resume-detail-bullet">— Amazon Web Services, Auth0</div>
            </div>
          </div>
        )}

        {active === 2 && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">03</div>
              <div className="resume-detail-top-title">PROJECTS</div>
              <div className="resume-detail-top-right">{PROJECTS_ROWS.length} BUILT</div>
            </div>
            <div className="resume-detail-list">
              {PROJECTS_ROWS.map((row) => (
                <div className="resume-detail-row" key={row.index}>
                  <div className="resume-detail-row-index">{row.index}</div>
                  <div className="resume-detail-row-title">{row.title}</div>
                  <div className="resume-detail-status">{row.status}</div>
                </div>
              ))}
            </div>
            <div className="resume-detail-bottom">
              <div className="resume-detail-bottom-title">HIGHLIGHTS</div>
              <div className="resume-detail-bullet">— FlightScope: live aircraft tracker, React + FastAPI.</div>
              <div className="resume-detail-bullet">— Talent Forge: full-stack skill-trading app (36hr hackathon).</div>
              <div className="resume-detail-bullet">— Imroid: Discord bot with 400+ commands, 100+ users.</div>
            </div>
          </div>
        )}

        {active === 3 && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">04</div>
              <div className="resume-detail-top-title">EXPERIENCE</div>
              <div className="resume-detail-top-right">{EXPERIENCE_ROWS.length} ROLES</div>
            </div>
            <div className="resume-detail-list">
              {EXPERIENCE_ROWS.map((row) => (
                <div className="resume-detail-row" key={row.index}>
                  <div className="resume-detail-row-index">{row.index}</div>
                  <div className="resume-detail-row-title">{row.title}</div>
                  <div className="resume-detail-status">{row.status}</div>
                </div>
              ))}
            </div>
            <div className="resume-detail-bottom">
              <div className="resume-detail-bottom-title">HIGHLIGHTS</div>
              <div className="resume-detail-bullet">— Software Lead: WPILib robot, Limelight vision pipelines.</div>
              <div className="resume-detail-bullet">— Co-organized hackathon with 80+ HS students.</div>
              <div className="resume-detail-bullet">— STEM camp volunteer at Carleton University.</div>
            </div>
          </div>
        )}
      </div>

      <div className={`resume-footer${mounted ? " mounted" : ""}`}>
        <div className="resume-footer-row"><span className="resume-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="resume-footer-row"><span className="resume-footer-key">ESC</span><span>BACK</span></div>
      </div>
    </div>
  );
}
