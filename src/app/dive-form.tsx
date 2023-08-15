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
  sac_rate: z
    .string({
      required_error: "S.A.C Rate is required",
    })
})

function deserializeFormData(data: z.infer<typeof FormSchema>) {
  return {
    sac_rate: parseFloat(data.sac_rate)
  }
}

export function DiveForm({ onSacRateChange }: {onSacRateChange: (sac_rate: number) => void}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sac_rate: "20"
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const {sac_rate} = deserializeFormData(data)
    onSacRateChange(sac_rate)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[800px] w-full space-y-6">
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
