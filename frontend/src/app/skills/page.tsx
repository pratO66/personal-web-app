import SkillsChart from '@/components/sections/SkillsChart'
import GlitchText from '@/components/ui/GlitchText'
import { api } from '@/lib/api'

export const metadata = { title: 'Skills // Loadout' }

export default async function SkillsPage() {
  const profile = await api.getProfile().catch(() => null)
  const skills = profile?.skills ?? []

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="font-[var(--font-display)] text-3xl mb-8 tracking-wider">
        <GlitchText text="// LOADOUT" />
      </h1>
      {skills.length === 0 ? (
        <p className="text-cp-red font-[var(--font-mono)]">{'// Loadout empty //'}</p>
      ) : (
        <SkillsChart skills={skills} />
      )}
    </section>
  )
}
