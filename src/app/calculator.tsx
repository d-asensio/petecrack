"use client"

import * as React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

import {DiveForm} from "@/app/dive-form";
import {MinGasTable} from "@/app/min-gas-table";
import {SegmentsTable} from "@/app/segments-table";
import {Input} from "@/components/ui/input";
import {GasCharacteristicsTable} from "@/app/gas-characteristics-table";
import {maximumOperatingDepth} from "@/lib/dive-formulas";

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

function GasConsumptionCalculator() {
  const [sacRate, setSacRate] = React.useState(20)

  return (
    <div className="flex items-stretch">
      <div className="border-r min-w-[250px]">
        <div className="flex items-center p-4">
          <DiveForm onSacRateChange={setSacRate}/>
        </div>
      </div>
      <div className="py-6 px-10 space-y-4 w-full max-w-6xl overflow-scroll">
        <h2 className="text-3xl font-bold">Minimum gas</h2>
        <MinGasTable
          cylinders={cylinders}
          sacRate={sacRate}
        />

        <h2 className="text-3xl font-bold">Segments</h2>
        <SegmentsTable
          cylinders={cylinders}
          sacRate={sacRate}
        />
      </div>
    </div>
  )
}

function GasMixCalculator() {
  const [gasMix, setGasMix] = React.useState([15, 100 - 21])
  const [fHe, fO2i] = gasMix
  const fO2 = 100 - fO2i
  const fN2 = 100 - fO2 - fHe


  const gasFractions = {
    fHe: fHe/100,
    fO2: fO2/100
  }

  return (
    <div className="flex items-stretch">
      <div className="border-r min-w-[250px]">
        <div className="p-4 space-y-6">
          <Slider
            value={gasMix}
            onValueChange={setGasMix}
            max={100}
            step={1}
          />
          <div className="space-y-2">
            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="he">He</Label>
              <Input
                type="text"
                id="he"
                value={`${fHe}%`}
                readOnly
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="N2">N2</Label>
              <Input
                type="text"
                id="n2"
                value={`${fN2}%`}
                readOnly
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="02">02</Label>
              <Input
                type="text"
                id="o2"
                value={`${fO2}%`}
                readOnly
              />
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="mod">Maximum operating depth (MOD)</Label>
            <Input
              type="text"
              id="mod"
              value={`${Math.trunc(maximumOperatingDepth(gasFractions))}m`}
              readOnly
            />
          </div>
        </div>
      </div>
      <div className="py-6 px-10 space-y-4 w-full max-w-6xl overflow-scroll">
        <GasCharacteristicsTable
          gasFractions={gasFractions}
        />
      </div>
    </div>
  )
}

export function Calculator() {
  return (
    <Tabs defaultValue="gas-consumption" className="h-screen">
      <div className="flex justify-center border-b p-4">
        <TabsList>
          <TabsTrigger value="gas-consumption">Gas Consumption</TabsTrigger>
          <TabsTrigger value="gas-mix">Gas Mix</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="gas-consumption">
        <GasConsumptionCalculator />
      </TabsContent>
      <TabsContent value="gas-mix">
        <GasMixCalculator />
      </TabsContent>
    </Tabs>
  )
}