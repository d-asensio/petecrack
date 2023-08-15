import * as React from "react";

function segmentFormula ({ depth, sacRate, cylinderVolume }: { depth: number, sacRate: number, cylinderVolume: number }) {
  const Pamb = depth/10 + 1
  const CatDepth = sacRate/cylinderVolume*Pamb

  return Math.round((CatDepth + Number.EPSILON) * 10) / 10
}

export function SegmentsCard({sacRate}: { sacRate: number }) {
  return (
    <div className='grid grid-cols-4 rounded-2xl bg-black gap-0.5 overflow-hidden shadow'
         style={{width: 400, height: Math.round(400 * 1.618)}}>

      <div className='bg-background'/>
      {['2x10', '2x12', '2x15'].map(cylinder_volume => (
        <div className='bg-background flex items-center justify-center'>
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
          {[20, 24, 30].map(cylinderVolume => (
            <div className='bg-background flex items-center justify-center'>
                <span className='text-3xl'>
                  {segmentFormula({depth, sacRate, cylinderVolume})}bar
                </span>
            </div>
          ))}
        </>
      ))}
    </div>)
}