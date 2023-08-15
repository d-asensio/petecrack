import * as React from "react";

function petecrackFormula ({ depth, sacRate }: { depth: number, sacRate: number }) {
  const P0 = depth/10 + 1
  const P1 = 1
  const Pavg = (P0 + P1)/2

  const tts = Math.ceil(depth/3) + 1

  return Pavg * tts * sacRate * 2
}

export function MinGasCard({sacRate}: { sacRate: number }) {
  return (
    <div className='grid grid-cols-4 rounded-2xl bg-black gap-0.5 overflow-hidden shadow'
         style={{width: 400, height: Math.round(400 * 1.618)}}>

      <div className='bg-background'/>
      {['2x10', '2x12', '2x15'].map(cylinder_volume => (
        <div key={cylinder_volume} className='bg-background flex items-center justify-center'>
              <span className='text-3xl'>
                {cylinder_volume}l
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
          {[20, 24, 30].map(cylinder_volume => (
            <div key={cylinder_volume} className='bg-background flex items-center justify-center'>
                <span className='text-3xl'>
                  {Math.round(petecrackFormula({depth, sacRate}) / cylinder_volume)}bar
                </span>
            </div>
          ))}
        </>
      ))}
    </div>)
}