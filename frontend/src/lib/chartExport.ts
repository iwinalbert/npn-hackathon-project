import type { DemandPoint } from './format'

export function seriesToCSV(points: DemandPoint[]): string {
  const header = 'date,actual,predicted,lower,upper,phase'
  const rows = points.map((p) => [
    p.date,
    p.actual ?? '',
    p.predicted ?? '',
    p.lower ?? '',
    p.upper ?? '',
    p.phase,
  ].join(','))
  return [header, ...rows].join('\n')
}

export function downloadFile(content: BlobPart, mime: string, filename: string): void {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

function svgToImage(svg: SVGSVGElement, width: number, height: number): Promise<HTMLImageElement> {
  const clone = svg.cloneNode(true) as SVGSVGElement
  clone.setAttribute('width', String(width))
  clone.setAttribute('height', String(height))
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  const svgString = new XMLSerializer().serializeToString(clone)
  const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Could not rasterise chart SVG'))
    img.src = url
  })
}

/**
 * The chart component draws its y-axis as a second, narrower SVG pinned over
 * the left edge of the scrollable one (so the axis stays put while the plot
 * scrolls). `root` must wrap both — this composites them back into one image
 * in the same order they're painted on screen.
 */
export async function exportChartPng(
  root: HTMLElement, filename: string, background = '#14120F',
): Promise<void> {
  // The legend draws a few small icon <svg>s of its own ahead of the chart,
  // so the two we want are always the LAST two in document order — the
  // pinned axis strip, then the real (possibly wider-than-viewport) plot —
  // never assume they're the first ones.
  const svgs = Array.from(root.querySelectorAll('svg')) as SVGSVGElement[]
  if (svgs.length === 0) return
  const mainSvg = svgs[svgs.length - 1]
  const axisSvg = svgs.length > 1 ? svgs[svgs.length - 2] : null

  const mainRect = mainSvg.getBoundingClientRect()
  const width = Math.max(1, Math.ceil(mainRect.width))
  const height = Math.max(1, Math.ceil(mainRect.height))
  const axisWidth = 56

  const [mainImg, axisImg] = await Promise.all([
    svgToImage(mainSvg, width, height),
    axisSvg ? svgToImage(axisSvg, 260, height) : Promise.resolve(null),
  ])

  const scale = 2
  const canvas = document.createElement('canvas')
  canvas.width = width * scale
  canvas.height = height * scale
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.scale(scale, scale)
  ctx.fillStyle = background
  ctx.fillRect(0, 0, width, height)
  ctx.drawImage(mainImg, 0, 0, width, height)
  if (axisImg) ctx.drawImage(axisImg, 0, 0, axisWidth, height, 0, 0, axisWidth, height)

  await new Promise<void>((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        a.download = filename
        document.body.appendChild(a)
        a.click()
        a.remove()
      }
      resolve()
    }, 'image/png')
  })
}
