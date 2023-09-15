import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function segmentFormula ({ depth, sacRate, cylinderVolume }: { depth: number, sacRate: number, cylinderVolume: number }) {
  const Pamb = depth/10 + 1
  const CatDepth = sacRate/cylinderVolume*Pamb*5

  return Math.round((CatDepth + Number.EPSILON) * 10) / 10
}

interface SegmentsTable {
  sacRate: number
  cylinders: {
    name: string,
    volume: number
  }[]
}

export function SegmentsTable({ cylinders, sacRate }: SegmentsTable) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead />
          {cylinders.map(({name}) => (
            <TableHead key={name}>{name}l</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {[10, 20, 30, 40, 50, 60, 70].map(depth => (
          <TableRow key={depth}>
            <TableCell>{depth}m</TableCell>
            {cylinders.map(({volume}) => (
              <TableCell key={volume} >
                {segmentFormula({depth, sacRate, cylinderVolume: volume})}bar
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}