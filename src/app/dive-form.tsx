"use client"

import * as React from "react";
import * as z from "zod"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm, useWatch} from "react-hook-form"

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

const FormSchema = z.object({
  sac_rate: z
    .number({
      required_error: "S.A.C Rate is required",
    })
})

export function DiveForm({ onSacRateChange }: {onSacRateChange: (sac_rate: number) => void}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sac_rate: 20
    }
  })

  const sacRate = useWatch({ name: 'sac_rate', control: form.control })

  React.useEffect(() => {
    onSacRateChange(sacRate)
  }, [onSacRateChange, sacRate])

  return (
    <Form {...form}>
      <form
        className="w-full space-y-4"
      >
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
      </form>
    </Form>
  )
}
