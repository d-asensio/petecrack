"use client"
import {DiveForm} from "@/app/dive-form";
import {MinGasCard} from "@/app/min-gas-card";
import * as React from "react";
import {SegmentsCard} from "@/app/segments-card";

const singleCylinders = [
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
  }
]

const doubleCylinders = [
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
  }
]

export function Calculator() {
  const [sacRate, setSacRate] = React.useState(20)

  return (
  <main className="flex flex-col sm:flex-row min-h-screenitems-center justify-center h-screen">
    <div className="flex items-center p-12 sm:w-1/2 m:w-2/3">
      <DiveForm onSacRateChange={setSacRate}/>
    </div>
    <div className="bg-blue-300 overflow-auto margin-auto py-6 px-10 space-y-4 sm:w-1/2 m:w-1/3">
      <h2 className='text-3xl text-accent font-bold'>Min Gas (single tank)</h2>
      <MinGasCard cylinders={singleCylinders} sacRate={sacRate}/>
      <h2 className='text-3xl text-accent font-bold'>Min Gas (doubles)</h2>
      <MinGasCard cylinders={doubleCylinders} sacRate={sacRate}/>
      <h2 className='text-3xl text-accent font-bold'>Segments (single tank)</h2>
      <SegmentsCard cylinders={singleCylinders} sacRate={sacRate}/>
      <h2 className='text-3xl text-accent font-bold'>Segments (doubles)</h2>
      <SegmentsCard cylinders={doubleCylinders} sacRate={sacRate}/>
    </div>
  </main>
  )
}