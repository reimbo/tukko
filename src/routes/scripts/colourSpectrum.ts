export default function getTrafficColor(trafficPercentage: number): string {
  const min = 0;
  const max = 100;

  // Clamp traffic percentage between 0 and 100
  const clampedPercentage = Math.min(Math.max(trafficPercentage, min), max);

  // Calculate hue value based on the clamped percentage
  const hue = (clampedPercentage / max) * 120; // Range: 0-120

  // Convert hue value to HSL color format
  const hslColor = `hsl(${hue}, 100%, 40%)`;

  return hslColor;
}
