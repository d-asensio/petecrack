import * as React from "react";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {equivalentNarcoticDepth, maximumOperatingDepth} from "@/lib/dive-formulas";

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