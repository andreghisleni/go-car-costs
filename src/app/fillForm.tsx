'use client';

import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { api } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PaymentMethod {
  id: string;

  name: string;

  createdAt: string;
  updatedAt: string;
}

const formSchema = z.object({
  totalPrice: z.coerce.number().min(0, {
    message: 'Total price must be at least 0.',
  }),
  totalLiters: z.coerce.number().min(0, {
    message: 'Total liters must be at least 0.',
  }),
  filledAt: z.date().min(new Date(2021, 0, 1), {
    message: 'Filled at must be at least 2021-01-01.',
  }),

  paymentMethod: z.string(),
});

export function FillForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      totalPrice: 0,
      totalLiters: 0,
      filledAt: new Date(),
    },
  });

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  async function getPaymentMethods() {
    const response = await api.get('/payments/methods');
    setPaymentMethods(response.data);
  }

  useEffect(() => {
    getPaymentMethods();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await api.post('/fills', {
        totalPrice: values.totalPrice,
        totalLiters: values.totalLiters,
        filledAt: values.filledAt.toString(),
        paymentMethod: values.paymentMethod,
      });

      form.reset();
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
      toast({
        title: 'Erro ao cadastrar o abastecimento',
        variant: 'destructive',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="totalPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Price</FormLabel>
              <FormControl>
                <Input placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="totalLiters"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Liters</FormLabel>
              <FormControl>
                <Input placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="filledAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of fill</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={date =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a payment method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {paymentMethods.map(paymentMethod => (
                    <SelectItem value={paymentMethod.id}>
                      {paymentMethod.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
