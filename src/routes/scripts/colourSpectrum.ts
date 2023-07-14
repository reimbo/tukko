export default function getTrafficColor(trafficPercentage: number): string {
  const min = 0;
  const max = 100;

  // Clamp traffic percentage between 0 and 100
  const clampedPercentage = Math.min(Math.max(trafficPercentage, min), max);

  let color: string;

  if (clampedPercentage >= 90) {
    color = 'green';
  } else if (clampedPercentage >= 80) {
    color = '#32CD32';
  } else if (clampedPercentage >= 70) {
    color = 'yellow';
  } else if (clampedPercentage >= 60) {
    color = 'orange';
  } else if (clampedPercentage >= 50) {
    color = '#ff3700';
  }else {
    color = '#c50000';
  }

  return color;
}