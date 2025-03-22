'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useCreateTransaction, useUpdateTransaction } from '@/hooks/use-transaction'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { CalendarIcon, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const formSchema = z.object({
  type: z.enum(['INCOME', 'EXPENSE']),
  amount: z.coerce.number().positive({ message: 'Amount must be positive' }),
  description: z.string().optional(),
  date: z.date(),
  category: z.string().min(1, { message: 'Category is required' }),
})

const categories = {
  INCOME: ['Salary', 'Freelance', 'Investments', 'Gifts', 'Other Income'],
  EXPENSE: [
    'Food',
    'Housing',
    'Transportation',
    'Entertainment',
    'Healthcare',
    'Education',
    'Shopping',
    'Utilities',
    'Travel',
    'Other Expense',
  ],
}

export default function TransactionForm({
                                          onClose,
                                          editTransaction,
                                        }) {
  const createTransaction = useCreateTransaction()
  const updateTransaction = useUpdateTransaction()
  const [transactionType, setTransactionType] = useState(editTransaction?.type || 'EXPENSE')

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: editTransaction
      ? {
        type: editTransaction.type,
        amount: Number(editTransaction.amount),
        description: editTransaction.description || '',
        date: new Date(editTransaction.date),
        category: editTransaction.category,
      }
      : {
        type: 'EXPENSE',
        amount: 0,
        description: '',
        date: new Date(),
        category: '',
      },
  })

  const onSubmit = async (data) => {
    try {
      if (editTransaction) {
        await updateTransaction.mutateAsync({
          id: editTransaction.id,
          transactionData: data,
        })
      } else {
        await createTransaction.mutateAsync(data)
      }
      onClose()
    } catch (error) {
      console.error('Error saving transaction:', error)
    }
  }

  return (
    (<div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">{editTransaction ? 'Edit Transaction' : 'Add New Transaction'}</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Type</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                      setTransactionType(value)
                      // Reset category when type changes
                      form.setValue('category', '')
                    }}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="INCOME">Income</SelectItem>
                      <SelectItem value="EXPENSE">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories[transactionType].map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex space-y-2 flex-col">
                  <FormLabel className="py-1">Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}>
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )} />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter transaction details..."
                    className="resize-none"
                    {...field} />
                </FormControl>
                <FormDescription>Optional: Add notes about this transaction</FormDescription>
                <FormMessage />
              </FormItem>
            )} />

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createTransaction.isPending || updateTransaction.isPending}>
              {createTransaction.isPending || updateTransaction.isPending
                ? 'Saving...'
                : editTransaction
                  ? 'Update Transaction'
                  : 'Add Transaction'}
            </Button>
          </div>
        </form>
      </Form>
    </div>)
  )
}

