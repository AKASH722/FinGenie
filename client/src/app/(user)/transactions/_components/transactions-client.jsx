'use client'
import { useState } from 'react'
import { useTransactions, useTransactionSummary } from '@/hooks/use-transaction'
import TransactionList from './transaction-list'
import TransactionForm from './transaction-form'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'

export default function TransactionsClient() {
  const [isCreating, setIsCreating] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)
  const { data: transactions, isLoading, error } = useTransactions()

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction)
    setIsCreating(true)
  }

  const handleCloseForm = () => {
    setIsCreating(false)
    setEditingTransaction(null)
  }

  if (isLoading) return <div>Loading transactions...</div>
  if (error) return <div>Error loading transactions: {error.message}</div>

  return (
    (<div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Your Transactions</h2>
        <Button onClick={() => setIsCreating(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Transaction
        </Button>
      </div>
      {isCreating && (
        <Card className="p-6">
          <TransactionForm onClose={handleCloseForm} editTransaction={editingTransaction} />
        </Card>
      )}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expense">Expenses</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <TransactionList transactions={transactions} onEdit={handleEdit} />
        </TabsContent>
        <TabsContent value="income">
          <TransactionList
            transactions={transactions?.filter((t) => t.type === 'INCOME')}
            onEdit={handleEdit} />
        </TabsContent>
        <TabsContent value="expense">
          <TransactionList
            transactions={transactions?.filter((t) => t.type === 'EXPENSE')}
            onEdit={handleEdit} />
        </TabsContent>
      </Tabs>
    </div>)
  )
}

