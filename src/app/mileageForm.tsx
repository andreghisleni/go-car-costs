'use client';

import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { format } from "date-fns";
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { api } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  kilometers: z.coerce.number().min(0, {
    message: 'Kilometers must be at least 0.',
  }),
  fill_ids: z.array(z.string()),
});

interface IFill {
  id: string;
  totalPrice: number;
  totalLiters: number;
  filledAt: Date;
}

export function MileageForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kilometers: 0,
      fill_ids: [],
    },
  });

  const [fills, setFills] = useState<IFill[]>();

  async function getFill() {
    const response = await api.get("/fills?onlyNotLinkedToMileage=true");
    setFills(response.data);
  }

  useEffect(() => {
    getFill();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await api.post("/mileages", values);

      form.reset();

      await getFill();

      console.log(values);
    } catch (error) {
      console.log(error);
      toast({
        title: "Erro ao cadastrar o abastecimento",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="kilometers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Kilometers</FormLabel>
              <FormControl>
                <Input placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fill_ids"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Fills</FormLabel>
              </div>
              {fills && fills.map((fill) => (
                <FormField
                  key={fill.id}
                  control={form.control}
                  name="fill_ids"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={fill.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(fill.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, fill.id])
                                : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== fill.id
                                  )
                                )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {fill.totalPrice} - {fill.totalLiters} - {format(new Date(fill.filledAt), "dd/MM/yyyy")}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
