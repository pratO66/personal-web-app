import ContactForm from '@/components/sections/ContactForm'
import GlitchText from '@/components/ui/GlitchText'

export const metadata = { title: 'Contact // Open Channel' }

export default function ContactPage() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-16 space-y-6">
      <h1 className="font-[var(--font-display)] text-3xl tracking-wider">
        <GlitchText text="// OPEN CHANNEL" />
      </h1>
      <p className="text-cp-text/80 font-[var(--font-mono)] text-sm">
        Transmissions encrypted. Replies routed via secure netrunner relay.
      </p>
      <ContactForm />
    </section>
  )
}
