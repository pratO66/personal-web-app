function SkeletonCard() {
  return (
    <div className="hud-clip bg-cp-panel border border-cp-border p-5 space-y-3 animate-pulse">
      <div className="h-4 w-1/2 bg-cp-border rounded" />
      <div className="h-3 w-full bg-cp-border rounded" />
      <div className="h-3 w-3/4 bg-cp-border rounded" />
      <div className="flex gap-2 pt-2">
        <div className="h-5 w-16 bg-cp-border rounded" />
        <div className="h-5 w-12 bg-cp-border rounded" />
      </div>
    </div>
  )
}

export default function ProjectsLoading() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="h-8 w-48 bg-cp-border rounded animate-pulse mb-8" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    </section>
  )
}
