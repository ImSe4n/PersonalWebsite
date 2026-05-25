import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedBg from "./AnimatedBg";

const PROJECTS = [
  {
    id: "flightscope",
    badge: "01",
    title: "FLIGHTSCOPE",
    subtitle: "React / FastAPI / Python / Leaflet",
    tags: ["React", "Python", "FastAPI", "Three.js", "Leaflet"],
    status: "LIVE",
    year: "2025",
    description: [
      "Real-time aircraft tracker showing thousands of live flights on an interactive world map.",
      "Aircraft coloured by altitude, rotate to heading, with dead-reckoned movement every 500ms.",
      "Emergency squawk codes, 3D globe view (Three.js), live weather radar, ATC/FIR boundaries.",
      "Full flight detail panel: altitude, speed, route, ETA, aircraft photo, METAR, progress bar.",
    ],
    link: "https://github.com/ImSe4n",
  },
  {
    id: "talentforge",
    badge: "02",
    title: "TALENT FORGE",
    subtitle: "React / Node.js / MongoDB / Express",
    tags: ["React", "Node.js", "MongoDB", "Auth0", "Express"],
    status: "COMPLETE",
    year: "2025",
    description: [
      "Full-stack skill-trading web app built in 36 hours at a hackathon.",
      "Express REST API backend with React frontend; Auth0 for authentication.",
      "Built with a team of four — pitched to judges from Groq and MLH.",
    ],
    link: "https://github.com/ImSe4n",
  },
  {
    id: "imroid",
    badge: "03",
    title: "IMROID",
    subtitle: "Node.js / Discord.js / SQLite",
    tags: ["Node.js", "Discord.js", "SQLite"],
    status: "COMPLETE",
    year: "2022–24",
    description: [
      "Multipurpose Discord bot with 400+ commands serving 100+ users.",
      "Features: music playback, moderation tools, user-friendly utilities.",
      "Maintained actively for over two years with continuous feature additions.",
    ],
    link: "https://github.com/ImSe4n",
  },
  {
    id: "site",
    badge: "04",
    title: "THIS WEBSITE",
    subtitle: "React / Vite / Framer Motion",
    tags: ["React", "CSS", "Framer Motion", "Vite"],
    status: "LIVE",
    year: "2025",
    description: [
      "A Persona 3-inspired personal portfolio with JRPG game UI aesthetics.",
      "Animated page transitions, custom cursor, keyboard navigation, scanlines overlay.",
      "Fully responsive with per-page animated gradient backgrounds.",
    ],
    link: "https://github.com/ImSe4n/PersonalWebsite",
  },
];

const STATUS_COLORS = {
  "LIVE":        "#00ff88",
  "COMPLETE":    "#3ce2ff",
  "IN PROGRESS": "#ffd900",
  "QUEUED":      "#888",
};

export default function ProjectsPage() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp")   setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(PROJECTS.length - 1, i + 1));
      if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") navigate(-1);
      if (e.key === "Enter") {
        const p = PROJECTS[active];
        if (p.link) window.open(p.link, "_blank");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, active]);

  const project = PROJECTS[active];

  return (
    <div id="menu-screen">
      <AnimatedBg variant="projects" />
      <div className="proj-entry-mask" aria-hidden="true" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .proj-entry-mask {
          position: absolute; inset: 0; z-index: 9;
          background: #6b28c4;
          clip-path: circle(0 at 50% 50%);
          animation: proj-entry-reveal 0.95s cubic-bezier(0.16,1,0.3,1) forwards;
          pointer-events: none;
        }
        @keyframes proj-entry-reveal {
          0%   { clip-path: circle(0 at 50% 50%);       opacity: 1; }
          55%  { clip-path: circle(150vmax at 50% 50%); opacity: 1; }
          100% { clip-path: circle(150vmax at 50% 50%); opacity: 0; }
        }

        .proj-overlay { position: absolute; inset: 0; z-index: 10; pointer-events: none; }

        .proj-stack {
          position: absolute; top: 8vh; left: 2.8vw;
          width: min(44vw, 680px);
          display: flex; flex-direction: column; gap: 10px;
          pointer-events: none; transform: scale(0.92); transform-origin: top left;
        }
        .proj-list-tag {
          font-family: 'Anton', sans-serif; font-size: 88px; line-height: 0.9;
          color: #b47dff; letter-spacing: 2px; margin: 0 0 6px 12px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.2);
          opacity: 0; transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .proj-list-tag.mounted { opacity: 1; transform: translateX(0); }

        .proj-card-wrap {
          position: relative; opacity: 0; transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1);
          pointer-events: all; cursor: pointer;
        }
        .proj-card-wrap.mounted { opacity: 1; transform: translateX(0); }
        .proj-card {
          position: relative; height: 104px; background: #1e0b3a;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 8px 0 rgba(10,0,30,0.85);
          transition: transform 0.22s, background 0.22s, box-shadow 0.22s;
        }
        .proj-card-wrap.active .proj-card { background: #fff; box-shadow: 10px 8px 0 #9d3ff5; transform: translateX(6px); }
        .proj-card-inner { position: absolute; inset: 0; padding: 14px 22px 14px 68px; display: flex; align-items: flex-start; justify-content: space-between; }
        .proj-badge {
          position: absolute; top: 10px; left: -10px; width: 56px; height: 68px;
          background: #0e0025; border: 3px solid #b47dff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex; align-items: center; justify-content: center;
          transform: rotate(-8deg); box-shadow: 0 4px 0 rgba(0,0,0,0.28);
          transition: background 0.22s, border-color 0.22s;
        }
        .proj-badge-text { font-family: 'Bebas Neue', sans-serif; font-size: 30px; color: #d9b8ff; letter-spacing: 1px; transform: rotate(8deg); }
        .proj-card-wrap.active .proj-badge { background: #000; border-color: #000; }
        .proj-card-wrap.active .proj-badge-text { color: #fff; }
        .proj-title { font-family: 'Anton', sans-serif; font-size: 44px; line-height: 0.9; letter-spacing: 1px; color: #c899ff; transition: color 0.22s; }
        .proj-card-wrap.active .proj-title { color: #000; }
        .proj-year { font-family: 'Bebas Neue', sans-serif; font-size: 32px; letter-spacing: 2px; color: #a57dff; transition: color 0.22s; flex-shrink: 0; margin-top: 4px; }
        .proj-card-wrap.active .proj-year { color: #000; }
        .proj-subtitle-bar {
          position: absolute; left: 62px; right: 14px; bottom: 10px; height: 32px;
          background: #6b28c4;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex; align-items: center; padding: 0 18px; transition: background 0.22s;
        }
        .proj-card-wrap.active .proj-subtitle-bar { background: #000; }
        .proj-subtitle { font-family: 'Bebas Neue', sans-serif; font-size: 22px; line-height: 1; letter-spacing: 1px; color: #e8d4ff; transition: color 0.22s; }
        .proj-card-wrap.active .proj-subtitle { color: #fff; }

        .proj-detail-panel {
          position: absolute; top: 8vh; right: 3vw;
          width: min(43vw, 650px); min-height: 74vh;
          z-index: 12; padding: 22px 24px 24px;
          background: linear-gradient(180deg, rgba(22,5,50,0.97) 0%, rgba(12,2,28,0.98) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(180,125,255,0.16), 16px 16px 0 rgba(0,0,10,0.55);
          overflow: hidden;
        }
        .proj-detail-panel::before {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(135deg, rgba(180,125,255,0.07) 0 15%, transparent 15%), linear-gradient(180deg, rgba(255,255,255,0.04), transparent 24%);
        }
        .proj-detail-top {
          position: relative; display: grid; grid-template-columns: 56px 1fr auto;
          align-items: center; gap: 12px; min-height: 82px; padding: 0 16px;
          background: linear-gradient(90deg, #8b45ff 0%, #c28aff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #fff; box-shadow: 10px 0 0 rgba(220,50,180,0.5);
        }
        .proj-detail-top-index { font-family: 'Anton', sans-serif; font-size: 42px; line-height: 1; }
        .proj-detail-top-title { font-family: 'Anton', sans-serif; font-size: 30px; line-height: 0.92; letter-spacing: 1px; }
        .proj-detail-status {
          font-family: 'Bebas Neue', sans-serif; font-size: 16px; letter-spacing: 2px;
          padding: 5px 11px; clip-path: polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
          color: #000; flex-shrink: 0; white-space: nowrap;
        }
        .proj-tags { display: flex; gap: 7px; flex-wrap: wrap; margin-top: 13px; padding: 0 2px; }
        .proj-tag {
          font-family: 'Bebas Neue', sans-serif; font-size: 14px; letter-spacing: 2px; padding: 3px 10px;
          background: rgba(140,70,255,0.18); border: 1px solid rgba(180,125,255,0.35); color: #c899ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 5px) 100%, 0 100%);
        }
        .proj-detail-desc {
          position: relative; margin-top: 16px; padding: 16px;
          background: rgba(15,4,38,0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(180,125,255,0.12);
        }
        .proj-detail-desc-title { font-family: 'Bebas Neue', sans-serif; font-size: 24px; letter-spacing: 2px; color: #b47dff; margin-bottom: 10px; }
        .proj-detail-bullet { font-family: 'Anton', sans-serif; font-size: 17px; line-height: 1.3; color: #e0d0ff; margin-bottom: 7px; }
        .proj-detail-link { margin-top: 14px; padding: 0 2px; }
        .proj-open-btn {
          font-family: 'Bebas Neue', sans-serif; font-size: 19px; letter-spacing: 3px;
          color: #000; background: #b47dff; border: none; padding: 9px 24px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 9px) 100%, 0 100%);
          cursor: pointer; pointer-events: all; transition: background 0.2s, transform 0.15s;
        }
        .proj-open-btn:hover { background: #cc99ff; transform: translateX(4px); }

        .proj-footer { position: fixed; bottom: 20px; right: 28px; display: flex; flex-direction: column; align-items: flex-end; gap: 5px; font-family: 'Bebas Neue', sans-serif; z-index: 14; opacity: 0; transition: opacity 0.4s ease 0.6s; }
        .proj-footer.mounted { opacity: 1; }
        .proj-footer-row { display: flex; align-items: center; gap: 8px; font-size: 13px; letter-spacing: 2px; color: rgba(255,255,255,0.22); }
        .proj-footer-key { border: 1px solid rgba(255,255,255,0.15); border-radius: 3px; padding: 1px 6px; font-size: 11px; }
      `}</style>

      <div className="proj-overlay">
        <div className="proj-stack">
          <div className={`proj-list-tag${mounted ? " mounted" : ""}`}>PROJECTS</div>
          {PROJECTS.map((proj, i) => (
            <div
              key={proj.id}
              className={`proj-card-wrap${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${i * 55}ms` }}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              <div className="proj-card">
                <div className="proj-badge"><div className="proj-badge-text">{proj.badge}</div></div>
                <div className="proj-card-inner">
                  <div className="proj-title">{proj.title}</div>
                  <div className="proj-year">{proj.year}</div>
                </div>
                <div className="proj-subtitle-bar"><div className="proj-subtitle">{proj.subtitle}</div></div>
              </div>
            </div>
          ))}
        </div>

        <div className="proj-detail-panel">
          <div className="proj-detail-top">
            <div className="proj-detail-top-index">{project.badge}</div>
            <div className="proj-detail-top-title">{project.title}</div>
            <div className="proj-detail-status" style={{ background: STATUS_COLORS[project.status] ?? "#888" }}>
              {project.status}
            </div>
          </div>
          <div className="proj-tags">
            {project.tags.map((tag) => <span className="proj-tag" key={tag}>{tag}</span>)}
          </div>
          <div className="proj-detail-desc">
            <div className="proj-detail-desc-title">OVERVIEW</div>
            {project.description.map((line, i) => (
              <div className="proj-detail-bullet" key={i}>— {line}</div>
            ))}
          </div>
          {project.link && (
            <div className="proj-detail-link">
              <button className="proj-open-btn" onClick={() => window.open(project.link, "_blank")}>
                VIEW ON GITHUB ►
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={`proj-footer${mounted ? " mounted" : ""}`}>
        <div className="proj-footer-row"><span className="proj-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="proj-footer-row"><span className="proj-footer-key">↵</span><span>GITHUB</span></div>
        <div className="proj-footer-row"><span className="proj-footer-key">ESC</span><span>BACK</span></div>
      </div>
    </div>
  );
}
