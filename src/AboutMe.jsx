import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";
import AnimatedBg from "./AnimatedBg";

const SECTIONS = [
  { id: "profile",    role: "BIO",  label: "PROFILE",    color: "#3ce2ff" },
  { id: "experience", role: "EXP",  label: "EXPERIENCE", color: "#ffd900" },
  { id: "skills",     role: "TECH", label: "SKILLS",     color: "#b47dff" },
];

const CHARS = [char1, char2, char3];

const EXPERIENCE_ITEMS = [
  { org: "FRC TEAM 8729",              role: "SOFTWARE LEAD",    period: "May 2025 – Present",     loc: "Kanata, ON",        color: "#ffd900", skills: "Java · Leadership · Robotics" },
  { org: "FRC TEAM 8729",              role: "SOFTWARE MEMBER",  period: "Jun 2023 – May 2025",    loc: "Kanata, ON",        color: "#ffd900", skills: "Java · Teamwork · OOP" },
  { org: "SHAD CANADA",                role: "UWO '25 ALUMNI",   period: "Jun 2025 – Present",     loc: "Western University", color: "#3ce2ff", skills: "Innovation · Leadership" },
  { org: "NEPEAN MINOR HOCKEY ASSOC.", role: "TIMEKEEPER",       period: "Sep 2023 – Present",     loc: "Nepean, ON",        color: "#ff6b6b", skills: "Timekeeping · Management" },
];

const TECH_SKILLS = [
  { name: "JavaScript / HTML / CSS", level: 90 },
  { name: "Python",                  level: 82 },
  { name: "React",                   level: 80 },
  { name: "Node.js",                 level: 75 },
  { name: "Java",                    level: 72 },
  { name: "Git / AWS",               level: 70 },
];

const INTERESTS = [
  { label: "AVIATION & PILOTING",    icon: "✈" },
  { label: "FRC ROBOTICS",           icon: "🤖" },
  { label: "COMPETITIVE PROG.",      icon: "🧠" },
  { label: "AIR TRAFFIC CONTROL",    icon: "🗺" },
  { label: "ICE HOCKEY",             icon: "🏒" },
];

function ProfileDetail() {
  return (
    <div className="about-detail-card">
      <div className="about-detail-header">
        <div className="about-detail-name">SEAN NIE</div>
        <div className="about-detail-pronouns">HE / HIM</div>
      </div>
      <div className="about-detail-school">JOHN MCCRAE SECONDARY — GRADE 11</div>
      <div className="about-detail-location">📍 OTTAWA, ONTARIO, CANADA</div>
      <div className="about-detail-tags">
        <span className="about-tag" style={{ color: "#3ce2ff", borderColor: "rgba(60,226,255,0.4)" }}>ASPIRING PILOT ✈</span>
        <span className="about-tag" style={{ color: "#b47dff", borderColor: "rgba(180,125,255,0.4)" }}>ROBOTICS LEAD 🤖</span>
        <span className="about-tag" style={{ color: "#ffd900", borderColor: "rgba(255,217,0,0.4)" }}>PROGRAMMER 💻</span>
      </div>
      <div className="about-detail-bio">
        <div className="about-bio-line">— High school student from Ottawa, ON</div>
        <div className="about-bio-line">— Working toward becoming a commercial pilot</div>
        <div className="about-bio-line">— FRC Robotics Software Lead for 3+ years</div>
        <div className="about-bio-line">— SHAD Canada UWO Class of '25</div>
        <div className="about-bio-line">— Practicing competitive programming</div>
        <div className="about-bio-line">— 500+ LinkedIn connections</div>
      </div>
      <div className="about-detail-quote">
        "The best part of the journey is who you become along the way."
      </div>
    </div>
  );
}

function ExperienceDetail() {
  return (
    <div className="about-exp-list">
      <div className="about-exp-title">EXPERIENCE</div>
      {EXPERIENCE_ITEMS.map((exp, i) => (
        <div className="about-exp-item" key={i}>
          <div className="about-exp-accent" style={{ background: exp.color }} />
          <div className="about-exp-content">
            <div className="about-exp-org">{exp.org}</div>
            <div className="about-exp-role" style={{ color: exp.color }}>{exp.role}</div>
            <div className="about-exp-meta">{exp.period} · {exp.loc}</div>
            <div className="about-exp-skills">{exp.skills}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SkillsDetail() {
  return (
    <div className="about-skills-card">
      <div className="about-skills-title">TECHNICAL SKILLS</div>
      {TECH_SKILLS.map(({ name, level }) => (
        <div className="about-skill-row" key={name}>
          <div className="about-skill-name">{name}</div>
          <div className="about-skill-bar-bg">
            <div className="about-skill-bar-fill" style={{ width: `${level}%` }} />
          </div>
          <span className="about-skill-pct">{level}</span>
        </div>
      ))}
      <div className="about-skills-title" style={{ marginTop: 18 }}>INTERESTS</div>
      <div className="about-interests-grid">
        {INTERESTS.map(({ label, icon }) => (
          <div className="about-interest-tag" key={label}>
            <span className="about-interest-icon">{icon}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AboutMe() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp")   setActive(i => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive(i => Math.min(SECTIONS.length - 1, i + 1));
      if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div id="menu-screen">
      <AnimatedBg variant="about" />
      <div className="about-entry-mask" aria-hidden="true" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Montserrat:wght@300;400&display=swap');

        .about-entry-mask {
          position: absolute; inset: 0; z-index: 9;
          background: #00b4dc;
          clip-path: circle(0 at 50% 50%);
          animation: about-reveal 0.95s cubic-bezier(0.16,1,0.3,1) forwards;
          pointer-events: none;
        }
        @keyframes about-reveal {
          0%   { clip-path: circle(0 at 50% 50%);       opacity: 1; }
          55%  { clip-path: circle(150vmax at 50% 50%); opacity: 1; }
          100% { clip-path: circle(150vmax at 50% 50%); opacity: 0; }
        }

        .about-overlay {
          position: absolute; inset: 0; z-index: 10;
          display: flex; pointer-events: none;
        }

        /* ── Left panel ── */
        .about-left {
          width: min(44vw, 620px); flex-shrink: 0;
          display: flex; flex-direction: column;
          padding: 8vh 0 8vh 2.5vw; gap: 10px;
          pointer-events: all;
        }

        .about-page-tag {
          font-family: 'Anton', sans-serif; font-size: 88px; line-height: 0.9;
          color: #3ce2ff; letter-spacing: 2px;
          margin: 0 0 6px 12px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.3);
          opacity: 0; transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .about-page-tag.mounted { opacity: 1; transform: translateX(0); }

        /* ── Section bars ── */
        .about-bar-outer {
          position: relative; cursor: pointer;
          opacity: 0; transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .about-bar-outer.mounted { opacity: 1; transform: translateX(0); }

        .about-bar-red {
          position: absolute; top: 0; left: 0;
          width: 100%; height: 80px;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%);
          transform: translateY(-7px);
          opacity: 0; transition: opacity 0.2s ease;
          z-index: 0; pointer-events: none;
        }
        .about-bar-outer.active .about-bar-red { opacity: 1; }

        .about-bar {
          position: relative; height: 80px;
          background: #111;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 6px 24px rgba(0,0,0,0.65);
          transition: height 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s;
        }
        .about-bar-outer.active .about-bar { height: 100px; }

        .about-bar-fill {
          position: absolute; inset: 0; background: #fff;
          clip-path: polygon(100% 0, 100% 0, calc(100% - 32px) 100%, calc(100% - 32px) 100%);
          transition: clip-path 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .about-bar-outer.active .about-bar-fill {
          clip-path: polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 138px) 100%);
        }

        .about-char {
          position: absolute; top: 0; left: 110px;
          height: 100%; width: auto; max-width: 160px;
          object-fit: cover; object-position: top;
          pointer-events: none; z-index: 3;
          clip-path: polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%);
        }

        .about-bar-content {
          position: relative; z-index: 2; height: 100%;
          display: flex; align-items: center; gap: 16px;
          padding: 0 20px;
        }

        .about-role {
          font-family: 'Anton', sans-serif; font-size: 46px;
          letter-spacing: -2px; line-height: 1;
          transform: rotate(-30deg); user-select: none;
          padding: 0 16px 0 8px; flex-shrink: 0;
          transition: color 0.2s;
        }

        .about-label {
          font-family: 'Bebas Neue', sans-serif; font-size: 28px;
          letter-spacing: 4px; line-height: 1;
          padding-left: 78px;
          user-select: none; transition: color 0.2s;
        }

        /* ── Right detail panel ── */
        .about-right {
          flex: 1; display: flex; align-items: center; justify-content: center;
          padding: 8vh 3vw; pointer-events: all;
        }

        @keyframes about-detail-in {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .about-detail-anim {
          animation: about-detail-in 0.3s cubic-bezier(0.22,1,0.36,1) forwards;
          width: min(44vw, 600px);
        }

        /* Profile */
        .about-detail-card {
          background: linear-gradient(180deg, rgba(22,5,50,0.97) 0%, rgba(12,2,28,0.98) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(60,226,255,0.16), 16px 16px 0 rgba(0,0,0,0.55);
          padding: 24px 28px;
        }
        .about-detail-header { display: flex; align-items: baseline; gap: 14px; margin-bottom: 4px; }
        .about-detail-name {
          font-family: 'Anton', sans-serif; font-size: 52px; line-height: 0.9;
          color: #fff; letter-spacing: 2px;
        }
        .about-detail-pronouns {
          font-family: 'Bebas Neue', sans-serif; font-size: 18px;
          letter-spacing: 3px; color: rgba(255,255,255,0.35);
        }
        .about-detail-school {
          font-family: 'Bebas Neue', sans-serif; font-size: 18px;
          letter-spacing: 2px; color: #3ce2ff; margin-bottom: 2px;
        }
        .about-detail-location {
          font-family: 'Bebas Neue', sans-serif; font-size: 15px;
          letter-spacing: 2px; color: rgba(255,255,255,0.4); margin-bottom: 14px;
        }
        .about-detail-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
        .about-tag {
          font-family: 'Bebas Neue', sans-serif; font-size: 14px; letter-spacing: 2px;
          padding: 4px 12px; background: rgba(0,0,0,0.3);
          border-width: 1px; border-style: solid;
          clip-path: polygon(0 0, 100% 0, calc(100% - 5px) 100%, 0 100%);
        }
        .about-detail-bio {
          background: rgba(15,4,38,0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          padding: 14px 18px; margin-bottom: 14px;
          box-shadow: inset 0 0 0 1px rgba(60,226,255,0.1);
        }
        .about-bio-line {
          font-family: 'Anton', sans-serif; font-size: 16px;
          color: #e0d0ff; line-height: 1.45; margin-bottom: 3px;
        }
        .about-detail-quote {
          font-family: 'Montserrat', sans-serif; font-weight: 300; font-style: italic;
          font-size: 13px; color: rgba(255,255,255,0.35); letter-spacing: 0.5px;
          border-left: 2px solid rgba(60,226,255,0.3); padding-left: 12px;
        }

        /* Experience */
        .about-exp-list {}
        .about-exp-title {
          font-family: 'Anton', sans-serif; font-size: 52px; line-height: 0.9;
          color: #ffd900; letter-spacing: 2px; margin-bottom: 14px;
        }
        .about-exp-item {
          display: flex; margin-bottom: 10px;
          background: rgba(15,10,30,0.95);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: 0 4px 0 rgba(0,0,0,0.5);
        }
        .about-exp-accent { width: 6px; flex-shrink: 0; }
        .about-exp-content { padding: 12px 18px; }
        .about-exp-org {
          font-family: 'Bebas Neue', sans-serif; font-size: 22px;
          letter-spacing: 2px; color: rgba(255,255,255,0.85); line-height: 1;
        }
        .about-exp-role {
          font-family: 'Anton', sans-serif; font-size: 18px;
          letter-spacing: 1px; line-height: 1.25;
        }
        .about-exp-meta {
          font-family: 'Bebas Neue', sans-serif; font-size: 14px;
          letter-spacing: 2px; color: rgba(255,255,255,0.35); margin-top: 3px;
        }
        .about-exp-skills {
          font-family: 'Bebas Neue', sans-serif; font-size: 12px;
          letter-spacing: 1px; color: rgba(255,255,255,0.22); margin-top: 2px;
        }

        /* Skills */
        .about-skills-card {}
        .about-skills-title {
          font-family: 'Anton', sans-serif; font-size: 36px; line-height: 0.9;
          color: #b47dff; letter-spacing: 2px; margin-bottom: 12px;
        }
        .about-skill-row {
          display: flex; align-items: center; gap: 10px; margin-bottom: 9px;
        }
        .about-skill-name {
          font-family: 'Bebas Neue', sans-serif; font-size: 16px;
          letter-spacing: 1.5px; color: rgba(255,255,255,0.75);
          width: 210px; flex-shrink: 0;
        }
        .about-skill-bar-bg {
          flex: 1; height: 14px;
          background: rgba(255,255,255,0.08);
          clip-path: polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
          position: relative; overflow: hidden;
        }
        .about-skill-bar-fill {
          position: absolute; top: 0; left: 0; height: 100%;
          background: linear-gradient(90deg, #7b2fff, #b47dff);
          clip-path: polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
        }
        .about-skill-pct {
          font-family: 'Bebas Neue', sans-serif; font-size: 14px;
          letter-spacing: 1px; color: rgba(255,255,255,0.4);
          width: 28px; text-align: right; flex-shrink: 0;
        }
        .about-interests-grid { display: flex; flex-wrap: wrap; gap: 8px; }
        .about-interest-tag {
          font-family: 'Bebas Neue', sans-serif; font-size: 15px;
          letter-spacing: 2px; padding: 6px 14px;
          background: rgba(140,70,255,0.15);
          border: 1px solid rgba(180,125,255,0.3); color: #c899ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
          display: flex; align-items: center; gap: 8px;
        }
        .about-interest-icon { font-size: 16px; }

        /* Footer */
        .about-footer {
          position: fixed; bottom: 20px; right: 28px;
          display: flex; flex-direction: column; align-items: flex-end; gap: 5px;
          font-family: 'Bebas Neue', sans-serif; z-index: 14;
          opacity: 0; transition: opacity 0.4s ease 0.6s;
        }
        .about-footer.mounted { opacity: 1; }
        .about-footer-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; letter-spacing: 2px; color: rgba(255,255,255,0.22);
        }
        .about-footer-key {
          border: 1px solid rgba(255,255,255,0.15); border-radius: 3px;
          padding: 1px 6px; font-size: 11px;
        }
      `}</style>

      <div className="about-overlay">
        <div className="about-left">
          <div className={`about-page-tag${mounted ? " mounted" : ""}`}>ABOUT</div>
          {SECTIONS.map((sec, i) => {
            const isActive = active === i;
            return (
              <div
                key={sec.id}
                className={`about-bar-outer${isActive ? " active" : ""}${mounted ? " mounted" : ""}`}
                style={{
                  transitionDelay: mounted ? "0ms" : `${i * 80}ms`,
                  boxShadow: isActive ? `8px 6px 0 ${sec.color}55` : undefined,
                }}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <div className="about-bar-red" style={{ background: sec.color }} />
                <div className="about-bar">
                  <img className="about-char" src={CHARS[i]} alt="" />
                  <div className="about-bar-fill" />
                  <div className="about-bar-content">
                    <div className="about-role" style={{ color: isActive ? "#000" : sec.color }}>
                      {sec.role}
                    </div>
                    <div className="about-label" style={{ color: isActive ? "#111" : "rgba(255,255,255,0.85)" }}>
                      {sec.label}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="about-right">
          <div key={active} className="about-detail-anim">
            {active === 0 && <ProfileDetail />}
            {active === 1 && <ExperienceDetail />}
            {active === 2 && <SkillsDetail />}
          </div>
        </div>
      </div>

      <div className={`about-footer${mounted ? " mounted" : ""}`}>
        <div className="about-footer-row"><span className="about-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="about-footer-row"><span className="about-footer-key">ESC</span><span>BACK</span></div>
      </div>
    </div>
  );
}
