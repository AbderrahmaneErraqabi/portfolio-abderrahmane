import { projects, technologyColor } from "@/lib/portfolio-data"

export function ProjectCaseStudy({ slug, intro, sections }: { slug: string; intro: string; sections: { title: string; body: string }[] }) {
  const project = projects.find((item) => item.slug === slug)
  if (!project) return null
  return <main className="case-study"><p className="eyebrow">{project.date}</p><h1>{project.title}</h1><p className="case-lede">{intro}</p><div className="tag-row">{project.technologies.map((tag) => <span className={`tech-label tech-${technologyColor(tag)}`} key={tag}>{tag}</span>)}</div><div className="case-sections">{sections.map((section) => <section key={section.title}><p className="eyebrow">{section.title}</p><p>{section.body}</p></section>)}</div></main>
}
