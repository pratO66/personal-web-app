import HUDChrome from '@/components/layout/HUDChrome'
import type { Experience } from '@/lib/types'

function fmtRange(start: string, end: string | null, current: boolean) {
  const fmt = (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }
  return `${fmt(start)} — ${current || !end ? 'PRESENT' : fmt(end)}`
}

export default function ExperienceTimeline({ items }: { items: Experience[] }) {
  return (
    <div className="relative max-w-4xl mx-auto px-4">
      <div
        aria-hidden
        className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-cp-border"
      />
      <ul className="space-y-12">
        {items.map((e, i) => {
          const right = i % 2 === 1
          return (
            <li key={e.id} className="relative md:grid md:grid-cols-2 md:gap-10">
              <span
                aria-hidden
                className="absolute left-4 md:left-1/2 top-4 -translate-x-1/2 w-3 h-3 rotate-45 bg-cp-teal"
                style={{ boxShadow: '0 0 12px #00D4FF' }}
              />
              <div className={`${right ? 'md:col-start-2' : ''} pl-12 md:pl-0 ${right ? 'md:pl-10' : 'md:pr-10 md:text-right'}`}>
                <HUDChrome accent={e.current ? 'red' : 'teal'} title={fmtRange(e.startDate, e.endDate, e.current)}>
                  <div className={`space-y-3 ${right ? '' : 'md:text-right'}`}>
                    <h3 className="font-[var(--font-display)] text-xl text-cp-yellow">{e.role}</h3>
                    <p className="text-cp-teal text-sm uppercase tracking-widest">
                      @ {e.company} {e.location && <span className="text-cp-muted">· {e.location}</span>}
                    </p>
                    <p className="text-cp-text/80 text-sm">{e.description}</p>
                    {e.highlights?.length > 0 && (
                      <ul className={`text-sm space-y-1 text-cp-text/90 ${right ? 'list-disc pl-5' : 'md:list-none md:pl-0 list-disc pl-5'}`}>
                        {e.highlights.map((h, idx) => (
                          <li key={idx}>{h}</li>
                        ))}
                      </ul>
                    )}
                    {e.technologies?.length > 0 && (
                      <div className={`flex flex-wrap gap-1 pt-1 ${right ? '' : 'md:justify-end'}`}>
                        {e.technologies.map((t) => (
                          <span key={t} className="text-[10px] uppercase px-2 py-0.5 border border-cp-teal/40 text-cp-teal/90">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </HUDChrome>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
