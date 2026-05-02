import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'

type Accent = 'cyan' | 'yellow' | 'magenta'
const colors: Record<Accent, string> = {
  cyan: '#00D4FF',
  yellow: '#FCE300',
  magenta: '#FF003C',
}

interface Common {
  accent?: Accent
  children: ReactNode
}

type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type AsLink = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
type Props = AsButton | AsLink

export default function NeonButton({ accent = 'cyan', children, ...rest }: Props) {
  const color = colors[accent]
  const className = `hud-clip inline-flex items-center gap-2 px-5 py-2 text-xs uppercase tracking-[0.25em] font-[var(--font-mono)] transition-all border bg-transparent hover:bg-[color:var(--bg)] cursor-pointer`
  const style = {
    color,
    borderColor: color,
    ['--bg' as string]: `${color}22`,
    boxShadow: `0 0 12px ${color}44`,
  } as React.CSSProperties

  if ('href' in rest && rest.href) {
    return (
      <a className={className} style={style} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        ▶ {children}
      </a>
    )
  }
  return (
    <button className={className} style={style} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      ▶ {children}
    </button>
  )
}
