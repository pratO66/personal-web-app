import HUDChrome from '@/components/layout/HUDChrome'
import type { Project } from '@/lib/types'

export default function NeonCard({ project }: { project: Project }) {
  return (
    <div className="relative group">
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-[3px] bg-cp-red z-10"
        style={{ boxShadow: '0 0 10px #FF003C' }}
      />
      <HUDChrome accent="red" title={project.featured ? 'Featured · Project' : 'Project'} className="h-full transition-all group-hover:[box-shadow:0_0_20px_#C5003C66]">
        <div className="space-y-3">
          <h3 className="font-[var(--font-display)] text-lg text-cp-red tracking-wider">
            {project.title}
          </h3>
          <p className="text-sm text-cp-text/80">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="text-[10px] uppercase tracking-widest px-2 py-0.5 border border-cp-teal/40 text-cp-teal/90"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-3 pt-2 text-xs">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-cp-yellow hover:underline"
              >
                ▶ DEMO
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-cp-text hover:text-cp-red"
              >
                ▶ REPO
              </a>
            )}
          </div>
        </div>
      </HUDChrome>
    </div>
  )
}
