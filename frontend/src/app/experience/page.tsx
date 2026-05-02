import ExperienceTimeline from '@/components/sections/ExperienceTimeline'
import GlitchText from '@/components/ui/GlitchText'
import { api } from '@/lib/api'

export const metadata = { title: 'Experience // Night City Dev' }

export default async function ExperiencePage() {
  const items = await api.getExperience().catch(() => [])
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="font-[var(--font-display)] text-3xl mb-12 tracking-wider text-center">
        <GlitchText text="// CAREER LOG" />
      </h1>
      {items.length === 0 ? (
        <p className="text-cp-magenta text-center font-[var(--font-mono)]">// No log entries //</p>
      ) : (
        <ExperienceTimeline items={items} />
      )}
    </section>
  )
}
