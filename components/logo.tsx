import Link from "next/link"

export function Logo() {
  return (
    <Link className="wordmark" href="/#hero" aria-label="Abderrahmane Er-Raqabi home">
      <span className="wordmark-bracket">&lt;</span>
      <span>abderrahmane</span>
      <span className="wordmark-close">/&gt;</span>
    </Link>
  )
}
