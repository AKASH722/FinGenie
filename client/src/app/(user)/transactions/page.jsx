import { Suspense } from 'react'
import { TransactionsSkeleton } from './_components/transactions-skeleton'
import TransactionsClient from './_components/transactions-client'

export default function TransactionsPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Transactions</h1>
      <Suspense fallback={<TransactionsSkeleton />}>
        <TransactionsClient />
      </Suspense>
    </div>
  )
}
