import * as React from "react";
import { pipe, partial } from "ramda"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function roundToPrecision(precision: number, num: number) {
  const factor = Math.pow(10, precision);
  return Math.round(num * factor) / factor;
}

function roundToHalf(num: number) {
  return Math.ceil(num * 2) / 2;
}

function calculateGasConsumptionSegment ({ depth, sacRate, cylinderVolume }: { depth: number, sacRate: number, cylinderVolume: number }) {
  const segmentMinutes = 5
  const Pamb = depth/10 + 1

  return sacRate / cylinderVolume * Pamb * segmentMinutes
}

const calculateRoundedSegments = pipe(
  calculateGasConsumptionSegment,
  partial(roundToPrecision, [2])
)


const calculateHumanizedRoundedSegments = pipe(
  calculateGasConsumptionSegment,
  roundToHalf
)

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
        {[0, 10, 20, 30, 40, 50, 60, 70].map(depth => (
          <TableRow key={depth}>
            <TableCell>{depth}m</TableCell>
            {cylinders.map(({volume}) => (
              <TableCell key={volume} >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      {calculateHumanizedRoundedSegments({
                        depth: 0,
                        sacRate,
                        cylinderVolume: volume
                      }) * ((depth/10) + 1)}bar
                    </TooltipTrigger>
                    <TooltipContent>
                      Exact value:
                      <span className="font-bold">
                        {calculateRoundedSegments({
                          depth,
                          sacRate,
                          cylinderVolume: volume
                        })}bar
                      </span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}