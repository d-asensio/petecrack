import * as React from "react";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {cn} from "@/lib/utils";

function petecrackFormula ({ depth, sacRate }: { depth: number, sacRate: number }) {
  const P0 = depth/10 + 1
  const P1 = 1
  const Pavg = (P0 + P1)/2

  const tts = Math.ceil(depth/3) + 1

  return Pavg * tts * sacRate * 2
}

export function MinGasCard({cylinders, sacRate}: { sacRate: number, cylinders: { name: string, volume: number }[]}) {
  return (
    <AspectRatio
      ratio={1 / 1.6}
      className={cn(
        'grid rounded-2xl bg-black gap-0.5 overflow-hidden shadow',
        cylinders.length === 3 && 'grid-cols-4',
        cylinders.length === 4 && 'grid-cols-5'
      )}
    >
      <div className='bg-background'/>
      {cylinders.map(({name}) => (
        <div key={name} className='bg-background flex items-center justify-center'>
              <span className='text-3xl'>
                {name}l
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
          {cylinders.map(({volume}) => (
            <div key={volume} className='bg-background flex items-center justify-center'>
                <span className='text-2xl'>
                  {Math.round(petecrackFormula({depth, sacRate}) / volume)}bar
                </span>
            </div>
          ))}
        </>
      ))}
    </AspectRatio>)
}