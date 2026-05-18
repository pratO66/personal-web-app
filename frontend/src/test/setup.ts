import '@testing-library/jest-dom'

// ── IntersectionObserver mock ─────────────────────────────────────────────
// jsdom doesn't implement IntersectionObserver. Framer Motion's `whileInView`
// uses it internally. This stub triggers the callback immediately so animated
// components render their final state in tests.
global.IntersectionObserver = class MockIntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly thresholds: ReadonlyArray<number> = []
  constructor(private cb: IntersectionObserverCallback) {}
  observe(target: Element) {
    // Immediately signal as intersecting so whileInView animations fire
    this.cb([{ isIntersecting: true, target } as IntersectionObserverEntry], this)
  }
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] { return [] }
}

// ── ResizeObserver mock ───────────────────────────────────────────────────
// Also missing from jsdom; used by some UI libraries.
global.ResizeObserver = class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
