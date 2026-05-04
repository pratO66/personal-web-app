function SkeletonEntry() {
  return (
    <div className="hud-clip bg-cp-panel border border-cp-border p-5 space-y-3 animate-pulse">
      <div className="h-5 w-40 bg-cp-border rounded" />
      <div className="h-3 w-28 bg-cp-border rounded" />
      <div className="h-3 w-full bg-cp-border rounded" />
      <div className="h-3 w-5/6 bg-cp-border rounded" />
    </div>
  )
}

export default function ExperienceLoading() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 space-y-12">
      <div className="h-8 w-48 bg-cp-border rounded animate-pulse mx-auto mb-12" />
      {Array.from({ length: 3 }).map((_, i) => <SkeletonEntry key={i} />)}
    </section>
  )
}
