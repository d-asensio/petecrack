const fromDepthToAmbientPressure =
  (depth: number) =>
    depth / 10 + 1
const fromAmbientPressureToDepth =
  (ambientPressure: number) =>
    (ambientPressure - 1) * 10
const partialPressureAtAmbientPressure =
  (fGas: number, ambientPressure: number) =>
    ambientPressure * fGas
const ambientPressureOfFractionPartialPressure =
  (ppGas: number, fGas: number) =>
    ppGas / fGas
export const equivalentNarcoticDepth = ({fHe, fO2}: { fHe: number, fO2: number }, depth: number) => {
  const fN2 = 1 - fHe - fO2

  const ambientPressure = fromDepthToAmbientPressure(depth)

  const ppAir = partialPressureAtAmbientPressure(fN2 + fO2, ambientPressure)

  const eqAmbientPressure = ambientPressureOfFractionPartialPressure(ppAir, 1)

  return fromAmbientPressureToDepth(eqAmbientPressure)
}
export const maximumOperatingDepth = ({fO2}: { fO2: number }) => {
  const maxAmbientPressure = ambientPressureOfFractionPartialPressure(1.6, fO2)
  return fromAmbientPressureToDepth(maxAmbientPressure)
}