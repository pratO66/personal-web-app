export default function ContactLoading() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-16 space-y-6 animate-pulse">
      <div className="h-8 w-56 bg-cp-border rounded" />
      <div className="h-3 w-80 bg-cp-border rounded" />
      <div className="hud-clip bg-cp-panel border border-cp-border p-5 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="h-16 bg-cp-border rounded" />
          <div className="h-16 bg-cp-border rounded" />
        </div>
        <div className="h-16 bg-cp-border rounded" />
        <div className="h-36 bg-cp-border rounded" />
        <div className="h-9 w-32 bg-cp-border rounded" />
      </div>
    </section>
  )
}
