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

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {depth * 2}
          </code>
          <code className="text-white">
            {sac_rate}
          </code>
        </pre>
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
