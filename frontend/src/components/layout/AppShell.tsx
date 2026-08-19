import { type ReactNode, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

import { useModelCard, useReadiness } from '../../api/hooks'
import { Badge } from '../ui'

function IconOverview() {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2.25" y="2.25" width="6" height="6" rx="1" />
      <rect x="9.75" y="2.25" width="6" height="6" rx="1" />
      <rect x="2.25" y="9.75" width="6" height="6" rx="1" />
      <rect x="9.75" y="9.75" width="6" height="6" rx="1" />
    </svg>
  )
}

function IconForecast() {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.25 13.5l3.5-5 3 3 5.25-6.75" />
      <circle cx="14" cy="4.75" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconHierarchy() {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinejoin="round" strokeLinecap="round">
      <path d="M9 2.25L2.75 6 9 9.75 15.25 6 9 2.25z" />
      <path d="M2.75 10.5L9 14.25l6.25-3.75" />
    </svg>
  )
}

function IconInsights() {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="9" cy="9" r="6.25" />
      <circle cx="9" cy="9" r="2.75" />
      <circle cx="9" cy="9" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconAssistant() {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 2.5l1.15 3.35L13.5 7l-3.35 1.15L9 11.5l-1.15-3.35L4.5 7l3.35-1.15L9 2.5z" />
    </svg>
  )
}

const NAV = [
  { to: '/', label: 'Overview', end: true, icon: IconOverview },
  { to: '/forecast', label: 'Forecast', icon: IconForecast },
  { to: '/hierarchy', label: 'Hierarchy', icon: IconHierarchy },
  { to: '/insights', label: 'Insights', icon: IconInsights },
  { to: '/assistant', label: 'AI Assistant', icon: IconAssistant },
]

function StatusPill() {
  const { data, isLoading, isError } = useReadiness()
  if (isLoading) return <Badge>checking…</Badge>
  if (isError || !data?.ready) return <Badge variant="bad">API offline</Badge>
  if (data.degraded) return <Badge variant="warn">degraded</Badge>
  return <Badge variant="good">API ready</Badge>
}

function NavIcon({ Icon }: { Icon: () => ReactNode }) {
  return <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center"><Icon /></span>
}

export function AppShell() {
  const [open, setOpen] = useState(false)
  const { data: model } = useModelCard()

  return (
    <div className="flex min-h-full flex-col">
      {/* ---------------------------------------------------------------- */}
      <header className="sticky top-0 z-30 border-b border-line bg-base">
        <div className="flex items-center gap-4 px-4 py-3.5 lg:px-6">
          <button
            type="button"
            className="rounded border border-line px-2 py-1 text-xs text-ink-muted lg:hidden"
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>

          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full
                               bg-forecast opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-forecast" />
            </span>
            <h1 className="truncate font-mono text-sm font-semibold uppercase tracking-wide text-ink">
              Retail Demand // Forecasting
            </h1>
          </div>

          <div className="hidden items-center gap-4 sm:flex">
            {model && (
              <span className="tnum font-mono text-xs text-ink-muted">
                RMSE <span className="font-semibold text-ink">{model.validation_rmse.toFixed(4)}</span>
                <span className="mx-1.5 text-ink-dim">·</span>
                MAE <span className="font-semibold text-ink">{model.validation_mae.toFixed(4)}</span>
              </span>
            )}
            <StatusPill />
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* -------------------------------------------------------------- */}
        <nav
          id="main-nav"
          aria-label="Main"
          className={`${open ? 'block' : 'hidden'} w-full shrink-0 border-b border-line
                      bg-base lg:block lg:w-52 lg:border-b-0 lg:border-r`}
        >
          <div className="flex h-full flex-col justify-between px-3 py-4 lg:sticky lg:top-[53px]
                          lg:h-[calc(100vh-53px)]">
            <ul className="space-y-0.5">
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 border-l-2 px-2.5 py-2 font-mono text-[13px]
                       uppercase tracking-wide transition-colors ${
                        isActive
                          ? 'border-forecast font-medium text-ink'
                          : 'border-transparent text-ink-muted hover:border-line-strong hover:text-ink'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className={isActive ? 'text-forecast' : 'text-ink-dim'}>
                          <NavIcon Icon={item.icon} />
                        </span>
                        {item.label}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            <p className="hidden px-2.5 text-[11px] leading-relaxed text-ink-dim lg:block">
              Model is <span className="text-ink-muted">frozen</span>. Figures come from
              held-out validation, never the delivered forecast window.
            </p>
          </div>
        </nav>

        {/* -------------------------------------------------------------- */}
        <main className="min-w-0 flex-1 px-4 py-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
