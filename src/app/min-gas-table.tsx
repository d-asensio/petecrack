import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {DepthLevelsForm} from "@/app/depth-levels-form";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";


function petecrackFormula ({ depth0, depth1 = 0, sacRate }: { depth0: number, depth1?: number, sacRate: number }) {
  if(depth0 < depth1) return 0

  const P0 = depth0/10 + 1
  const P1 = depth1/10 + 1
  const alphaDepth = depth0 - depth1

  const Pavg = (P0 + P1)/2

  const tts = Math.ceil(alphaDepth/3) + 1

  return Pavg * tts * sacRate * 2
}

function roundToNearestFive(n: number) {
  return Math.round(n / 5) * 5;
}

function minGas({ depth0, depth1 = 0, sacRate, volume }: { depth0: number, depth1?: number, sacRate: number, volume: number }) {
  const liters = petecrackFormula({
    depth0,
    depth1,
    sacRate
  })

  return roundToNearestFive(liters / volume)
}

interface MinGasTableProps {
  sacRate: number
  cylinders: {
    name: string,
    volume: number
  }[]
}

export function MinGasTable({ cylinders, sacRate }: MinGasTableProps) {
  const [depthLevels, setDepthLevels] = React.useState([10, 20, 30, 40, 50, 60, 70])
  const [nextGasSourceDepth, setNextGasSourceDepth] = React.useState(0)

  const handleNextGasSourceDepthChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = parseInt(e.target.value, 10)
    setNextGasSourceDepth(newValue)
  }

  return (
    <div className='space-y-6'>
      <DepthLevelsForm
        onDepthLevelsChange={setDepthLevels}
      />
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label>Next gas source depth</Label>
        <Input type='number' min={0} value={nextGasSourceDepth} onChange={handleNextGasSourceDepthChange}/>
        <p className="text-[0.8rem] text-muted-foreground">
          meters
        </p>
      </div>
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
          {depthLevels.map(depth => (
            <TableRow key={depth}>
              <TableCell>{depth}m</TableCell>
              {cylinders.map(({volume}) => (
                <TableCell key={volume} >
                  {minGas({
                    depth0: depth,
                    depth1: nextGasSourceDepth,
                    sacRate,
                    volume
                  })}bar
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}