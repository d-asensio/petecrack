import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const fromDepthToAmbientPressure =
  (depth: number) =>
    depth/10 + 1

const fromAmbientPressureToDepth =
  (ambientPressure: number) =>
    (ambientPressure - 1)*10

const partialPressureAtAmbientPressure =
  (fGas: number, ambientPressure: number) =>
    ambientPressure * fGas

const ambientPressureOfFractionPartialPressure =
  (ppGas: number, fGas: number) =>
    ppGas/fGas

const equivalentNarcoticDepth = ({fHe, fO2}: {fHe: number, fO2: number}, depth: number) => {
  const fN2 = 1 - fHe - fO2

  const ambientPressure = fromDepthToAmbientPressure(depth)

  const ppAir = partialPressureAtAmbientPressure(fN2 + fO2, ambientPressure)

  const eqAmbientPressure=  ambientPressureOfFractionPartialPressure(ppAir, 1)

  return fromAmbientPressureToDepth(eqAmbientPressure)
}

interface GasCharacteristicsTable {
  gasFractions: {
    fHe: number,
    fO2: number
  }
}

export function GasCharacteristicsTable({ gasFractions }: GasCharacteristicsTable) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead />
          <TableHead>
            Equivalent narcotic depth (END)
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[10, 20, 30, 40, 50, 60, 70].map(depth => (
          <TableRow key={depth}>
            <TableCell>{depth}m</TableCell>
            <TableCell >
              {Math.trunc(equivalentNarcoticDepth(gasFractions, depth))}m
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}