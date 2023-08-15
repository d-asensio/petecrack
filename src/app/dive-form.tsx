"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"

import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {toast} from "@/components/ui/use-toast"

const FormSchema = z.object({
  depth: z
    .string({
      required_error: "Depth is required"
    }),
  sac_rate: z
    .string({
      required_error: "S.A.C Rate is required",
    })
})

function deserializeFormData(data: z.infer<typeof FormSchema>) {
  return {
    depth: parseFloat(data.depth),
    sac_rate: parseFloat(data.sac_rate)
  }
}

export function DiveForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      depth: "30",
      sac_rate: "20"
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const {depth, sac_rate} = deserializeFormData(data)

    // P = pressure (avg) = (P0 + P1)/2
    // t = time to surface (depth / 3m/min) + 2min troubleshooting
    // C = consumption (20l/min)

    const P0 = depth/10 + 1
    const P1 = 1
    const Pavg = (P0 + P1)/2

    const tts = depth/3 + 2

    const minGas = Pavg * tts * sac_rate * 2

    toast({
      title: "You submitted the following values:",
      description: (
        <ul className="mt-2 w-full rounded-md bg-slate-950 p-4 text-blue-200 space-y-2">
          <li>
            Depth: <strong>{depth} m</strong>:
          </li>
          <li>
            S.A.C. Rate: <strong>{sac_rate} liters/min</strong>:
          </li>
          <h4 className='text-xl'>Pressure:</h4>
          <li>
            P0: <strong>{P0} bar</strong>:
          </li>
          <li>
            P1: <strong>{P1} bar (sea surface)</strong>:
          </li>
          <li>
            P avg.: <strong>{Pavg} bar</strong>:
          </li>

          <h4 className='text-xl'>Time:</h4>
          <li>
            TTS (time to surface): <strong>{tts} minutes</strong>:
          </li>

          <h4 className='text-xl'>Gas:</h4>
          <li>
            Min Gas: <strong>{minGas} liters</strong>:
          </li>
        </ul>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[800px] w-full space-y-6">
        <FormField
          control={form.control}
          name="depth"
          render={({field}) => (
            <FormItem>
              <FormLabel>Depth</FormLabel>
              <FormControl>
                <Input type='number' {...field} />
              </FormControl>
              <FormDescription>
                meters sub water (msw)
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sac_rate"
          render={({field}) => (
            <FormItem>
              <FormLabel>S.A.C. Rate</FormLabel>
              <FormControl>
                <Input type='number' {...field} />
              </FormControl>
              <FormDescription>
                liters/minute
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button type="submit">Calculate</Button>
      </form>
    </Form>
  )
}
