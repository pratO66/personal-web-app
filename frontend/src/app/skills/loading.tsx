function SkeletonBar() {
  return (
    <div className="space-y-1 animate-pulse">
      <div className="flex justify-between">
        <div className="h-3 w-24 bg-cp-border rounded" />
        <div className="h-3 w-10 bg-cp-border rounded" />
      </div>
      <div className="h-2 w-full bg-cp-border rounded" />
    </div>
  )
}

export default function SkillsLoading() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="h-8 w-36 bg-cp-border rounded animate-pulse mb-8" />
      <div className="grid md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="hud-clip bg-cp-panel border border-cp-border p-5 space-y-4">
            {Array.from({ length: 3 }).map((_, j) => <SkeletonBar key={j} />)}
          </div>
        ))}
      </div>
    </section>
  )
}
