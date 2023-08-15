"use client"
import {DiveForm} from "@/app/dive-form";
import {MinGasCard} from "@/app/min-gas-card";
import * as React from "react";

export function Calculator() {
  const [sacRate, setSacRate] = React.useState(20)

  return <>
    <div className="flex items-center p-12 w-1/2">
      <DiveForm onSacRateChange={setSacRate}/>
    </div>
    <div className="w-1/2 bg-blue-300 flex items-center justify-center">
      <MinGasCard sacRate={sacRate}/>
    </div>
  </>;
}