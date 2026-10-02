type LogoProps = {
  className?: string;
  title?: string;
};

/** Two chicks at the table. The mark. */
export function Mark({ className = "h-8 w-12", title }: LogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <circle cx="15" cy="8.5" r="4.4" fill="currentColor" />
      <circle cx="33" cy="8.5" r="4.4" fill="currentColor" />
      <rect x="13.1" y="13.2" width="3.8" height="9.4" rx="1.8" fill="currentColor" />
      <rect x="31.1" y="13.2" width="3.8" height="9.4" rx="1.8" fill="currentColor" />
      <rect x="5" y="23.6" width="38" height="3.6" rx="1.8" fill="var(--sea)" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-bold tracking-[-0.05em] ${className}`}>
      unfussy<span className="text-sea">.ai</span>
    </span>
  );
}

export function Lockup({
  className = "",
  markClassName = "h-7 w-[2.625rem]",
  wordClassName = "text-[1.22rem]",
  href = "/",
}: {
  className?: string;
  markClassName?: string;
  wordClassName?: string;
  href?: string;
}) {
  return (
    <a href={href} className={`logo-lockup ${className}`}>
      <Mark className={markClassName} />
      <Wordmark className={wordClassName} />
    </a>
  );
}
