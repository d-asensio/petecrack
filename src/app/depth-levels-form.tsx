import {useForm, useWatch} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import * as React from "react";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

const FormSchema = z.object({
  max_depth: z
    .number({
      required_error: "Max depth is required",
    }),
  step_increment: z
    .number({
      required_error: "Step increment is required",
    })
})

export function DepthLevelsForm({onDepthLevelsChange}: { onDepthLevelsChange: (depthLevels: number[]) => void }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      max_depth: 70,
      step_increment: 10
    }
  })

  const maxDepth = useWatch({name: 'max_depth', control: form.control})
  const stepIncrement = useWatch({name: 'step_increment', control: form.control})

  React.useEffect(() => {
    const length = maxDepth / stepIncrement

    if (!length || length === Infinity) return

    onDepthLevelsChange(
      Array
        .from({length})
        .map((_, i) => (i + 1) * stepIncrement)
    )
  }, [maxDepth, onDepthLevelsChange, stepIncrement])

  return (
    <Form {...form}>
      <form className="w-full space-x-4 flex items-center">
        <FormField
          control={form.control}
          name="max_depth"
          render={({field}) => (
            <FormItem>
              <FormLabel>Max depth</FormLabel>
              <FormControl>
                <Input type='number' {...field} />
              </FormControl>
              <FormDescription>
                meters
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="step_increment"
          render={({field}) => (
            <FormItem>
              <FormLabel>Step increment</FormLabel>
              <FormControl>
                <Input type='number' {...field} />
              </FormControl>
              <FormDescription>
                meters
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}