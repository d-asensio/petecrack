import * as React from "react";
import {AspectRatio} from "@/components/ui/aspect-ratio";

function petecrackFormula ({ depth, sacRate }: { depth: number, sacRate: number }) {
  const P0 = depth/10 + 1
  const P1 = 1
  const Pavg = (P0 + P1)/2

  const tts = Math.ceil(depth/3) + 1

  return Pavg * tts * sacRate * 2
}

export function MinGasCard({sacRate}: { sacRate: number }) {
  return (
    <AspectRatio ratio={1 / 1.6} className='grid grid-cols-4 rounded-2xl bg-black gap-0.5 overflow-hidden shadow'>
      <div className='bg-background'/>
      {['2x10', '2x12', '2x15'].map(cylinderVolume => (
        <div key={cylinderVolume} className='bg-background flex items-center justify-center'>
              <span className='text-3xl'>
                {cylinderVolume}l
              </span>
        </div>
      ))}
      {[10, 20, 30, 40].map(depth => (
        <>
          <div className='bg-background flex items-center justify-center'>
                <span className='text-3xl'>
                  {depth}m
                </span>
          </div>
          {[20, 24, 30].map(cylinderVolume => (
            <div key={cylinderVolume} className='bg-background flex items-center justify-center'>
                <span className='text-3xl'>
                  {Math.round(petecrackFormula({depth, sacRate}) / cylinderVolume)}bar
                </span>
            </div>
          ))}
        </>
      ))}
    </AspectRatio>)
}