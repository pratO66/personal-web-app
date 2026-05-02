import NeonCard from '@/components/ui/NeonCard'
import type { Project } from '@/lib/types'

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((p) => (
        <NeonCard key={p.id} project={p} />
      ))}
    </div>
  )
}
