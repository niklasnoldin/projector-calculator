function formatNumber(cm: number): string {
  const formatter = Intl.NumberFormat("en", {
    maximumFractionDigits: 1,
  });
  return formatter.format(cm);
}

function round(input: number, positions: number = 1): number {
  return Math.round(input * 10 ** positions) / 10 ** positions;
}

export {formatNumber, round}