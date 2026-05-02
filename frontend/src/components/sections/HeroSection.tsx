import HUDChrome from '@/components/layout/HUDChrome'
import GlitchText from '@/components/ui/GlitchText'
import NeonButton from '@/components/ui/NeonButton'
import type { Profile } from '@/lib/types'

export default function HeroSection({ profile }: { profile: Profile | null }) {
  if (!profile) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center">
        <p className="text-cp-magenta">// PROFILE NOT FOUND //</p>
      </section>
    )
  }
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <p className="text-cp-cyan text-xs uppercase tracking-[0.4em] terminal-cursor">
          init: night_city.exe
        </p>
        <h1 className="font-[var(--font-display)] text-5xl md:text-7xl tracking-tight text-cp-text">
          <GlitchText text={profile.name} />
        </h1>
        <p className="font-[var(--font-mono)] text-cp-yellow text-lg">
          // {profile.tagline}
        </p>
        <p className="max-w-xl text-cp-text/80 leading-relaxed">{profile.bio}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <NeonButton href="/projects" accent="cyan">View Projects</NeonButton>
          <NeonButton href={profile.cvUrl || '/cv.pdf'} accent="yellow">Download CV</NeonButton>
          <NeonButton href="/contact" accent="magenta">Contact</NeonButton>
        </div>
      </div>
      <HUDChrome accent="yellow" title="System Profile">
        <dl className="space-y-3 text-sm font-[var(--font-mono)]">
          <div>
            <dt className="text-cp-cyan text-xs uppercase tracking-widest">Location</dt>
            <dd className="text-cp-text">{profile.location || '—'}</dd>
          </div>
          <div>
            <dt className="text-cp-cyan text-xs uppercase tracking-widest">Comm</dt>
            <dd className="text-cp-text break-all">{profile.email}</dd>
          </div>
          <div>
            <dt className="text-cp-cyan text-xs uppercase tracking-widest">Stack</dt>
            <dd className="flex flex-wrap gap-1 pt-1">
              {profile.techStack.map((t) => (
                <span key={t} className="px-2 py-0.5 text-[10px] uppercase border border-cp-cyan/40 text-cp-cyan/90">
                  {t}
                </span>
              ))}
            </dd>
          </div>
          {Object.keys(profile.socials).length > 0 && (
            <div>
              <dt className="text-cp-cyan text-xs uppercase tracking-widest">Net</dt>
              <dd className="flex flex-col gap-1 pt-1">
                {Object.entries(profile.socials).map(([k, v]) => (
                  <a key={k} href={v} target="_blank" rel="noreferrer" className="text-cp-yellow hover:underline">
                    ▶ {k}
                  </a>
                ))}
              </dd>
            </div>
          )}
        </dl>
      </HUDChrome>
    </section>
  )
}
