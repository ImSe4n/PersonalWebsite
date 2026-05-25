export default function AnimatedBg({ variant = "home" }) {
  return <div className={`animated-bg animated-bg--${variant}`} aria-hidden="true" />;
}
