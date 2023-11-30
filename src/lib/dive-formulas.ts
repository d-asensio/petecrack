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

const gasFractionOfGasPartialPressureArAmbientPressure =
  (ambientPressure: number, ppGas: number) =>
    ppGas / ambientPressure

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

// https://www.tdisdi.com/tdi-diver-news/calculating-gas-mixes/
export const idealGasMixForDepth = (depth: number) => {
  const acceptableN2pp = partialPressureAtAmbientPressure(
    0.79,
    fromDepthToAmbientPressure(30)
  )
  const acceptableO2pp = 1.4
  const acceptableNarcoticGaspp = acceptableN2pp + acceptableO2pp

  const ambientPressure = fromDepthToAmbientPressure(depth)

  const vacantHepp = ambientPressure - acceptableNarcoticGaspp

  if (vacantHepp <= 0) return "-"

  const fracHe = gasFractionOfGasPartialPressureArAmbientPressure(ambientPressure, vacantHepp)
  const fracN2 = gasFractionOfGasPartialPressureArAmbientPressure(ambientPressure, acceptableN2pp)
  const fracO2 = gasFractionOfGasPartialPressureArAmbientPressure(ambientPressure, acceptableO2pp)

  return `${Math.round(fracHe * 100)}% He - ${Math.round(fracN2 * 100)}% N2 - ${Math.round(fracO2 * 100)}% O2 (${fracO2 >= .18 ? 'normoxic' : 'hipoxic'})`
}

interface GasMix {
  percent: number
  fraction: {
    He: number
    N2: number
    O2: number
  }
}

export const calculateMix = (gasA: GasMix, gasB: GasMix): GasMix => ({
  percent: gasA.percent + gasB.percent,
  fraction: {
    He: Math.round((gasA.fraction.He*gasA.percent + gasB.fraction.He*gasB.percent) / (gasA.percent + gasB.percent) * 100),
    N2: Math.round((gasA.fraction.N2*gasA.percent + gasB.fraction.N2*gasB.percent) / (gasA.percent + gasB.percent) * 100),
    O2: Math.round((gasA.fraction.O2*gasA.percent + gasB.fraction.O2*gasB.percent) / (gasA.percent + gasB.percent) * 100)
  }
})

const mixes: GasMix[] = [.35, .45, .55, .65].map(percent =>
  calculateMix(
    {
      percent,
      fraction: {He: 1, O2: 0, N2: 0}
    },
    {
      percent: 1 - percent,
      fraction: {He: 0, O2: 0.32, N2: 1 - 0.32}
    }
  )
)

mixes.forEach(mix => {
  console.table(mix.fraction)
  console.log('MOD:', maximumOperatingDepth({ fO2: mix.fraction.O2/100 }))
})