import * as React from "react";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {equivalentNarcoticDepth, idealGasMixForDepth} from "@/lib/dive-formulas";
import {DepthLevelsForm} from "@/app/depth-levels-form";

interface GasCharacteristicsTable {
  gasFractions: {
    fHe: number,
    fO2: number
  }
}

export function GasCharacteristicsTable({ gasFractions }: GasCharacteristicsTable) {
  const [depthLevels, setDepthLevels] = React.useState([10, 20, 30, 40, 50, 60, 70])

  return (
    <div className='space-y-6'>
      <DepthLevelsForm onDepthLevelsChange={setDepthLevels}/>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead />
            <TableHead>
              Equivalent narcotic depth (END)
            </TableHead>
            <TableHead>
              Ideal gas
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {depthLevels.map(depth => (
            <TableRow key={depth}>
              <TableCell>{depth}m</TableCell>
              <TableCell >
                {Math.trunc(equivalentNarcoticDepth(gasFractions, depth))}m
              </TableCell>
              <TableCell >
                {idealGasMixForDepth(depth)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}