import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedBg from "./AnimatedBg";

const CONTACT_ITEMS = [
  {
    id: "email",
    label: "EMAIL",
    value: "snie7638@gmail.com",
    href: "mailto:snie7638@gmail.com",
    color: "#ff6b6b",
    desc: "Send me a message",
  },
  {
    id: "github",
    label: "GITHUB",
    value: "github.com/ImSe4n",
    href: "https://github.com/ImSe4n",
    color: "#e2e2e2",
    desc: "Check out my code",
  },
  {
    id: "linkedin",
    label: "LINKEDIN",
    value: "linkedin.com/in/sean-nie",
    href: "https://www.linkedin.com/in/sean-nie-620872314/",
    color: "#0a8fd8",
    desc: "Connect professionally",
  },
  {
    id: "phone",
    label: "PHONE",
    value: "613-823-7121",
    href: "tel:6138237121",
    color: "#00ff88",
    desc: "Call or text me",
  },
];

export default function ContactPage() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp")   setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(CONTACT_ITEMS.length - 1, i + 1));
      if (e.key === "Enter" || e.key === "ArrowRight") {
        const item = CONTACT_ITEMS[active];
        if (item.href !== "#") window.open(item.href, "_blank");
      }
      if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, active]);

  return (
    <div id="menu-screen">
      <AnimatedBg variant="contact" />
      <div className="contact-entry-mask" aria-hidden="true" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .contact-entry-mask {
          position: absolute; inset: 0; z-index: 9;
          background: #c4001a;
          clip-path: circle(0 at 50% 50%);
          animation: contact-reveal 0.9s cubic-bezier(0.16,1,0.3,1) forwards;
          pointer-events: none;
        }
        @keyframes contact-reveal {
          0%   { clip-path: circle(0 at 50% 50%);       opacity: 1; }
          55%  { clip-path: circle(150vmax at 50% 50%); opacity: 1; }
          100% { clip-path: circle(150vmax at 50% 50%); opacity: 0; }
        }

        .contact-overlay {
          position: absolute; inset: 0; z-index: 10; pointer-events: none;
          display: flex; align-items: center; justify-content: center;
        }

        .contact-panel {
          display: flex; gap: 0; align-items: stretch;
          width: min(90vw, 1000px);
        }

        /* ── Left: list ── */
        .contact-list {
          display: flex; flex-direction: column; gap: 8px;
          pointer-events: all; flex: 1;
        }

        .contact-list-tag {
          font-family: 'Anton', sans-serif; font-size: 76px; line-height: 0.88;
          color: #fff; letter-spacing: 2px;
          margin-bottom: 8px; padding-left: 4px;
          opacity: 0; transform: translateX(-20px);
          transition: opacity 0.35s, transform 0.35s;
        }
        .contact-list-tag.mounted { opacity: 1; transform: translateX(0); }

        .contact-item {
          position: relative; height: 72px;
          background: rgba(10,10,20,0.9);
          clip-path: polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%);
          box-shadow: 0 6px 0 rgba(0,0,0,0.7);
          cursor: pointer;
          opacity: 0; transform: translateX(-40px);
          transition:
            opacity 0.4s ease,
            transform 0.4s cubic-bezier(0.22,1,0.36,1),
            height 0.25s cubic-bezier(0.22,1,0.36,1),
            background 0.2s;
        }
        .contact-item.mounted { opacity: 1; transform: translateX(0); }
        .contact-item.active  {
          height: 90px;
          background: #fff;
          box-shadow: 8px 6px 0 #c4001a;
          transform: translateX(6px);
        }

        .contact-item-fill {
          position: absolute; inset: 0;
          background: #fff;
          clip-path: polygon(72% 0, 100% 0, calc(100% - 12px) 100%, calc(72% + 120px) 100%);
          opacity: 0; transition: opacity 0.2s;
        }
        .contact-item.active .contact-item-fill { opacity: 0; }

        .contact-item-inner {
          position: relative; z-index: 2; height: 100%;
          display: flex; align-items: center; padding: 0 22px 0 18px; gap: 16px;
        }

        .contact-color-bar {
          width: 5px; height: 60%; border-radius: 2px; flex-shrink: 0;
          transition: height 0.2s;
        }
        .contact-item.active .contact-color-bar { height: 75%; }

        .contact-label {
          font-family: 'Bebas Neue', sans-serif; font-size: 30px;
          letter-spacing: 3px; color: rgba(255,255,255,0.85);
          transition: color 0.2s; flex-shrink: 0; min-width: 110px;
        }
        .contact-item.active .contact-label { color: #111; }

        .contact-value {
          font-family: 'Anton', sans-serif; font-size: 22px;
          color: rgba(255,255,255,0.5); transition: color 0.2s;
          letter-spacing: 0.5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .contact-item.active .contact-value { color: #333; }

        .contact-arrow {
          margin-left: auto; flex-shrink: 0;
          font-family: 'Bebas Neue', sans-serif; font-size: 22px;
          color: #c4001a; opacity: 0; transition: opacity 0.2s;
        }
        .contact-item.active .contact-arrow { opacity: 1; }

        /* ── Right: detail card ── */
        .contact-detail {
          width: min(34vw, 360px);
          flex-shrink: 0;
          margin-left: 24px;
          pointer-events: all;
          opacity: 0; transform: translateX(30px);
          transition: opacity 0.35s ease 0.1s, transform 0.35s cubic-bezier(0.22,1,0.36,1) 0.1s;
        }
        .contact-detail.mounted { opacity: 1; transform: translateX(0); }

        .contact-detail-card {
          background: rgba(8,8,18,0.95);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08), 14px 14px 0 rgba(0,0,0,0.5);
          padding: 28px 28px 28px 24px;
          min-height: 260px;
          display: flex; flex-direction: column; gap: 16px;
        }

        .contact-detail-top {
          display: flex; align-items: center; gap: 12px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .contact-detail-dot {
          width: 14px; height: 14px; border-radius: 0;
          transform: rotate(45deg); flex-shrink: 0;
        }
        .contact-detail-name {
          font-family: 'Anton', sans-serif; font-size: 38px; line-height: 0.9;
          color: #fff; letter-spacing: 1px;
        }

        .contact-detail-desc {
          font-family: 'Bebas Neue', sans-serif; font-size: 20px;
          letter-spacing: 2px; color: rgba(255,255,255,0.4);
        }

        .contact-detail-value {
          font-family: 'Anton', sans-serif; font-size: 19px;
          color: rgba(255,255,255,0.7); line-height: 1.3;
          word-break: break-all;
        }

        .contact-open-btn {
          margin-top: auto;
          font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 3px;
          color: #000; border: none; padding: 10px 22px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 9px) 100%, 0 100%);
          cursor: pointer; pointer-events: all;
          transition: transform 0.15s, filter 0.15s;
          align-self: flex-start;
        }
        .contact-open-btn:hover { transform: translateX(4px); filter: brightness(1.15); }

        /* footer */
        .contact-footer {
          position: fixed; bottom: 20px; right: 28px;
          display: flex; flex-direction: column; align-items: flex-end; gap: 5px;
          font-family: 'Bebas Neue', sans-serif; z-index: 14;
          opacity: 0; transition: opacity 0.4s ease 0.6s;
        }
        .contact-footer.mounted { opacity: 1; }
        .contact-footer-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; letter-spacing: 2px; color: rgba(255,255,255,0.22);
        }
        .contact-footer-key {
          border: 1px solid rgba(255,255,255,0.15); border-radius: 3px;
          padding: 1px 6px; font-size: 11px;
        }
      `}</style>

      <div className="contact-overlay">
        <div className="contact-panel">
          <div className="contact-list">
            <div className={`contact-list-tag${mounted ? " mounted" : ""}`}>
              CONTACT
            </div>
            {CONTACT_ITEMS.map((item, i) => (
              <div
                key={item.id}
                className={`contact-item${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
                style={{ transitionDelay: `${i * 60}ms` }}
                onMouseEnter={() => setActive(i)}
                onClick={() => {
                  if (active === i && item.href !== "#") window.open(item.href, "_blank");
                  else setActive(i);
                }}
              >
                <div className="contact-item-fill" />
                <div className="contact-item-inner">
                  <div className="contact-color-bar" style={{ background: item.color }} />
                  <div className="contact-label">{item.label}</div>
                  <div className="contact-value">{item.value}</div>
                  <div className="contact-arrow">►</div>
                </div>
              </div>
            ))}
          </div>

          <div className={`contact-detail${mounted ? " mounted" : ""}`}>
            <div className="contact-detail-card">
              <div className="contact-detail-top">
                <div className="contact-detail-dot" style={{ background: CONTACT_ITEMS[active].color }} />
                <div className="contact-detail-name">{CONTACT_ITEMS[active].label}</div>
              </div>
              <div className="contact-detail-desc">{CONTACT_ITEMS[active].desc}</div>
              <div className="contact-detail-value">{CONTACT_ITEMS[active].value}</div>
              {CONTACT_ITEMS[active].href !== "#" && (
                <button
                  className="contact-open-btn"
                  style={{ background: CONTACT_ITEMS[active].color }}
                  onClick={() => window.open(CONTACT_ITEMS[active].href, "_blank")}
                >
                  OPEN ►
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`contact-footer${mounted ? " mounted" : ""}`}>
        <div className="contact-footer-row"><span className="contact-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="contact-footer-row"><span className="contact-footer-key">↵</span><span>OPEN</span></div>
        <div className="contact-footer-row"><span className="contact-footer-key">ESC</span><span>BACK</span></div>
      </div>
    </div>
  );
}
