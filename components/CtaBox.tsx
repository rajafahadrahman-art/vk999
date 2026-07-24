import Link from "next/link";
import type { ReactNode } from "react";

type Action = {
  label: string;
  href: string;
  external?: boolean;
  primary?: boolean;
};

type Props = {
  heading: string;
  children: ReactNode;
  actions: Action[];
  note?: string;
};

export default function CtaBox({ heading, children, actions, note }: Props) {
  return (
    <aside className="cta-box" aria-label={heading}>
      <h2 className="cta-box-heading">{heading}</h2>
      <div className="cta-box-body">{children}</div>
      <div className="cta-row">
        {actions.map((action) =>
          action.external ? (
            <a
              key={action.href + action.label}
              href={action.href}
              className={action.primary === false ? "btn btn-secondary" : "btn btn-primary"}
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
            >
              {action.label}
            </a>
          ) : (
            <Link
              key={action.href + action.label}
              href={action.href}
              className={action.primary === false ? "btn btn-secondary" : "btn btn-primary"}
            >
              {action.label}
            </Link>
          ),
        )}
      </div>
      {note ? <p className="age-note">{note}</p> : null}
    </aside>
  );
}
