/**
 * Resolve a CSS custom property (e.g. `--schemes-primary`) to {r,g,b} in 0-1 range.
 *
 * The browser computes oklch() / var() / etc. into an `rgb(...)` or `rgba(...)`
 * string when read via getComputedStyle on a real element's `color` property,
 * which is what we exploit here. Returns null if the value can't be parsed
 * (server-side render, missing var, exotic color space).
 */
export function readCssColor(varName) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return null;

  const probe = document.createElement('span');
  probe.style.color = `var(${varName})`;
  probe.style.display = 'none';
  document.body.appendChild(probe);
  const computed = getComputedStyle(probe).color;
  probe.remove();

  // Match rgb(255 0 0), rgb(255, 0, 0), or rgba(...) — modern browsers normalize
  // oklch() to one of these formats when read off `color`.
  const match = computed.match(/rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/);
  if (!match) return null;

  return {
    r: Number(match[1]) / 255,
    g: Number(match[2]) / 255,
    b: Number(match[3]) / 255,
  };
}

/** Same as readCssColor but returns 0-255 integer triplet. */
export function readCssColor255(varName) {
  const c = readCssColor(varName);
  if (!c) return null;
  return {
    r: Math.round(c.r * 255),
    g: Math.round(c.g * 255),
    b: Math.round(c.b * 255),
  };
}
