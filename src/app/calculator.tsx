"use client"
import {DiveForm} from "@/app/dive-form";
import {MinGasCard} from "@/app/min-gas-card";
import * as React from "react";
import {SegmentsCard} from "@/app/segments-card";

export function Calculator() {
  const [sacRate, setSacRate] = React.useState(20)

  return (
  <main className="flex flex-col sm:flex-row min-h-screenitems-center justify-center h-screen">
    <div className="flex items-center p-12 w-1/2">
      <DiveForm onSacRateChange={setSacRate}/>
    </div>
    <div className="bg-blue-300 overflow-auto margin-auto py-6 px-10 space-y-4 sm:w-1/2 m:w-1/3">
      <h2 className='text-3xl text-accent font-bold'>Min Gas</h2>
      <SegmentsCard sacRate={sacRate}/>
      <h2 className='text-3xl text-accent font-bold'>Segments</h2>
      <MinGasCard sacRate={sacRate}/>
    </div>
  </main>
  )
}