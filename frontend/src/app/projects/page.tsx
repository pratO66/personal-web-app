import ProjectsGrid from '@/components/sections/ProjectsGrid'
import GlitchText from '@/components/ui/GlitchText'
import { api } from '@/lib/api'

export const metadata = { title: 'Projects // Night City Ops' }

export default async function ProjectsPage() {
  const projects = await api.getProjects().catch(() => [])
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="font-[var(--font-display)] text-3xl mb-8 tracking-wider">
        <GlitchText text="// PROJECTS" />
      </h1>
      {projects.length === 0 ? (
        <p className="text-cp-red font-[var(--font-mono)]">// No projects loaded //</p>
      ) : (
        <ProjectsGrid projects={projects} />
      )}
    </section>
  )
}
