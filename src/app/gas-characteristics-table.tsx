import * as React from "react";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {equivalentNarcoticDepth, idealGasMixForDepth} from "@/lib/dive-formulas";
import {Input} from "@/components/ui/input";
import {useForm, useWatch} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";

interface GasCharacteristicsTable {
  gasFractions: {
    fHe: number,
    fO2: number
  }
}

// Array.from({ length: })

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

export function DepthLevelsForm ({ onDepthLevelsChange }: {onDepthLevelsChange: (depthLevels: number[]) => void}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      max_depth: 70,
      step_increment: 5
    }
  })

  const maxDepth = useWatch({ name: 'max_depth', control: form.control })
  const stepIncrement = useWatch({ name: 'step_increment', control: form.control })

  React.useEffect(() => {
    const length = maxDepth / stepIncrement

    if (!length || length === Infinity) return

    onDepthLevelsChange(
      Array
        .from({ length })
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
              <FormLabel>Max Depth</FormLabel>
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
              <FormLabel>Step Increment</FormLabel>
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

export function GasCharacteristicsTable({ gasFractions }: GasCharacteristicsTable) {
  const [depthLevels, setDepthLevels] = React.useState([10])

  return (
    <div className='space-y-6'>
      <DepthLevelsForm onDepthLevelsChange={setDepthLevels}/>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead />
            <TableHead>
              Equivalent narcotic depth (END)
            </TableHead>
            <TableHead>
              Ideal gas
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {depthLevels.map(depth => (
            <TableRow key={depth}>
              <TableCell>{depth}m</TableCell>
              <TableCell >
                {Math.trunc(equivalentNarcoticDepth(gasFractions, depth))}m
              </TableCell>
              <TableCell >
                {idealGasMixForDepth(depth)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}