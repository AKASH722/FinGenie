"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { CreditCard, DollarSign, TrendingUp } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import { useTransactionSummary } from '@/hooks/use-transaction'
import { useAuthUser } from '@/hooks/use-user'

export default function Dashboard() {
  const { data: user } = useAuthUser()
  const { data: summary, isLoading, isError } = useTransactionSummary()

  // Sample data for the summary cards
  const totalIncome = summary?.reduce((acc, item) => acc + item.income, 0) || 0
  const totalExpense = summary?.reduce((acc, item) => acc + item.expense, 0) || 0
  const balance = totalIncome - totalExpense

  const chartConfig = {
    income: {
      label: "Income",
      color: "hsl(var(--chart-1))",
    },
    expense: {
      label: "Expense",
      color: "hsl(var(--chart-2))",
    },
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col gap-2">
        {isLoading ? (
          <Skeleton className="h-8 w-64" />
        ) : (
          <h1 className="text-3xl font-bold tracking-tight">Hello, {user?.name || user?.username || "there"}! 👋</h1>
        )}
        <p className="text-muted-foreground">Here&#39;s an overview of your financial activity.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Summary Cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-7 w-24" />
            ) : (
              <div className="text-2xl font-bold text-emerald-600">${totalIncome.toLocaleString()}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-7 w-24" />
            ) : (
              <div className="text-2xl font-bold text-rose-600">${totalExpense.toLocaleString()}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-7 w-24" />
            ) : (
              <div className={`text-2xl font-bold ${balance >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                ${balance.toLocaleString()}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Track Your Finances</CardTitle>
          <CardDescription>A visual comparison of income and expenses over the months.</CardDescription>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-[250px] w-full rounded-lg" />
            </div>
          ) : isError ? (
            <div className="flex h-[250px] w-full items-center justify-center rounded-lg border border-dashed">
              <div className="flex flex-col items-center text-center">
                <p className="text-sm text-muted-foreground">There was an error loading your financial data.</p>
                <p className="text-sm text-muted-foreground">Please try again later.</p>
              </div>
            </div>
          ) : summary?.length > 0 ? (
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <AreaChart
                accessibilityLayer
                data={summary}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                <Area
                  dataKey="expense"
                  type="monotone"
                  fill="var(--color-expense)"
                  fillOpacity={0.4}
                  stroke="var(--color-expense)"
                  stackId="a"
                />
                <Area
                  dataKey="income"
                  type="monotone"
                  fill="var(--color-income)"
                  fillOpacity={0.4}
                  stroke="var(--color-income)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          ) : (
            <div className="flex h-[250px] w-full items-center justify-center rounded-lg border border-dashed">
              <div className="flex flex-col items-center text-center">
                <p className="text-sm text-muted-foreground">No financial data available yet.</p>
                <p className="text-sm text-muted-foreground">Start tracking your income and expenses.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Transactions Section */}
      {/*<Card>*/}
      {/*  <CardHeader>*/}
      {/*    <CardTitle>Recent Transactions</CardTitle>*/}
      {/*    <CardDescription>Your latest financial activities</CardDescription>*/}
      {/*  </CardHeader>*/}
      {/*  <CardContent>*/}
      {/*    {isLoading ? (*/}
      {/*      <div className="space-y-2">*/}
      {/*        {Array.from({ length: 3 }).map((_, i) => (*/}
      {/*          <div key={i} className="flex items-center space-x-4">*/}
      {/*            <Skeleton className="h-12 w-12 rounded-full" />*/}
      {/*            <div className="space-y-2">*/}
      {/*              <Skeleton className="h-4 w-[250px]" />*/}
      {/*              <Skeleton className="h-4 w-[200px]" />*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        ))}*/}
      {/*      </div>*/}
      {/*    ) : (*/}
      {/*      <div className="space-y-4">*/}
      {/*        {summary?.length > 0 ? (*/}
      {/*          <div className="rounded-md border">*/}
      {/*            <div className="p-4">*/}
      {/*              <div className="font-medium">No recent transactions to display</div>*/}
      {/*              <div className="text-sm text-muted-foreground">Your recent transactions will appear here</div>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        ) : (*/}
      {/*          <div className="flex h-[100px] w-full items-center justify-center rounded-lg border border-dashed">*/}
      {/*            <div className="flex flex-col items-center text-center">*/}
      {/*              <p className="text-sm text-muted-foreground">No transaction data available.</p>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        )}*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*  </CardContent>*/}
      {/*</Card>*/}
    </div>
  )
}