import Link from "next/link"
import { education } from "@/lib/portfolio-data"

export default function EducationPage() {
  return (
    <main className="case-study">
      <Link className="text-link" href="/#education">← Back to portfolio</Link>
      <p className="eyebrow">Education</p>
      <h1>Education</h1>
      <div className="education-list">
        {education.map(([date, title, institution]) => (
          <article key={title}>
            <time>{date}</time>
            <div>
              <h3>{title}</h3>
              <p>{institution}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
