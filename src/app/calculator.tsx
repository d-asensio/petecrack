"use client"
import * as React from "react";

import {DiveForm} from "@/app/dive-form";
import {MinGasTable} from "@/app/min-gas-table";
import {SegmentsTable} from "@/app/segments-table";

const cylinders = [
  {
    name: '10',
    volume: 10
  },
  {
    name: '12',
    volume: 12
  },
  {
    name: '15',
    volume: 15
  },
  {
    name: '18',
    volume: 18
  },
  {
    name: '2x10',
    volume: 20
  },
  {
    name: '2x12',
    volume: 24
  },
  {
    name: '2x15',
    volume: 30
  },
  {
    name: '2x18',
    volume: 36
  }
]

export function Calculator() {
  const [sacRate, setSacRate] = React.useState(20)

  return (
  <main className="flex flex-col items-center">
    <div className="border-b w-full">
      <div className="flex items-center p-4">
        <DiveForm onSacRateChange={setSacRate}/>
      </div>
    </div>
    <div className="py-6 px-10 space-y-4 w-full max-w-6xl">
      <h2 className='text-3xl font-bold'>Min Gas</h2>
      <MinGasTable
        cylinders={cylinders}
        sacRate={sacRate}
      />

      <h2 className='text-3xl font-bold'>Segments</h2>
      <SegmentsTable
        cylinders={cylinders}
        sacRate={sacRate}
      />
    </div>
  </main>
  )
}