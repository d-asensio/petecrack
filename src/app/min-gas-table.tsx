import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function petecrackFormula ({ depth, sacRate }: { depth: number, sacRate: number }) {
  const P0 = depth/10 + 1
  const P1 = 1
  const Pavg = (P0 + P1)/2

  const tts = Math.ceil(depth/3) + 1

  return Pavg * tts * sacRate * 2
}

interface MinGasTableProps {
  sacRate: number
  cylinders: {
    name: string,
    volume: number
  }[]
}

export function MinGasTable({ cylinders, sacRate }: MinGasTableProps) {
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
                {Math.round(petecrackFormula({depth, sacRate}) / volume)}bar
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}