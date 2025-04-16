import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChartIcon, CalendarIcon, FileTextIcon, DownloadIcon } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function ProfitLoss() {
  const [period, setPeriod] = useState("thisMonth");
  const [compareWith, setCompareWith] = useState("none");

  // Placeholder data for demo purposes
  const currentPeriodData = {
    revenue: 78450,
    costOfSales: 42350,
    grossProfit: 36100,
    expenses: 23870,
    operatingProfit: 12230,
    otherIncome: 870,
    otherExpenses: 1250,
    netProfit: 11850,
  };

  const previousPeriodData = {
    revenue: 69780,
    costOfSales: 38450,
    grossProfit: 31330,
    expenses: 22050,
    operatingProfit: 9280,
    otherIncome: 650,
    otherExpenses: 1100,
    netProfit: 8830,
  };

  const calculateChange = (current, previous) => {
    if (previous === 0) return 100;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Profit & Loss Statement</h1>
          <p className="text-neutral-500">View your company's financial performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileTextIcon className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="px-6 pt-6 pb-3">
          <div className="flex flex-wrap gap-4 justify-between">
            <CardTitle>Report Settings</CardTitle>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-neutral-400" />
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thisMonth">This Month</SelectItem>
                    <SelectItem value="lastMonth">Last Month</SelectItem>
                    <SelectItem value="thisQuarter">This Quarter</SelectItem>
                    <SelectItem value="lastQuarter">Last Quarter</SelectItem>
                    <SelectItem value="thisYear">This Year</SelectItem>
                    <SelectItem value="lastYear">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <LineChartIcon className="h-4 w-4 text-neutral-400" />
                <Select value={compareWith} onValueChange={setCompareWith}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Compare with" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No comparison</SelectItem>
                    <SelectItem value="previousPeriod">Previous period</SelectItem>
                    <SelectItem value="samePeriodLastYear">Same period last year</SelectItem>
                    <SelectItem value="budget">Budget</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="px-6 pt-6 pb-3">
          <CardTitle>Profit & Loss Statement</CardTitle>
          <p className="text-sm text-neutral-500 mt-1">1 August 2023 - 31 August 2023</p>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="summary">
            <TabsList className="mb-6">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="detailed">Detailed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary">
              <div className="space-y-6">
                {/* Revenue Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Revenue</h3>
                  <div className="flex justify-between py-2 border-b border-neutral-100">
                    <div className="font-medium">Total Revenue</div>
                    <div className="flex gap-8">
                      {compareWith !== "none" && (
                        <div className="w-32 text-right text-neutral-500">{formatCurrency(previousPeriodData.revenue)}</div>
                      )}
                      <div className="w-32 text-right font-semibold">{formatCurrency(currentPeriodData.revenue)}</div>
                      {compareWith !== "none" && (
                        <div className={`w-24 text-right ${calculateChange(currentPeriodData.revenue, previousPeriodData.revenue) > 0 ? 'text-secondary-600' : 'text-danger-600'}`}>
                          {calculateChange(currentPeriodData.revenue, previousPeriodData.revenue)}%
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between py-2 border-b border-neutral-100">
                    <div className="font-medium">Cost of Sales</div>
                    <div className="flex gap-8">
                      {compareWith !== "none" && (
                        <div className="w-32 text-right text-neutral-500">{formatCurrency(previousPeriodData.costOfSales)}</div>
                      )}
                      <div className="w-32 text-right font-semibold">{formatCurrency(currentPeriodData.costOfSales)}</div>
                      {compareWith !== "none" && (
                        <div className={`w-24 text-right ${calculateChange(currentPeriodData.costOfSales, previousPeriodData.costOfSales) < 0 ? 'text-secondary-600' : 'text-danger-600'}`}>
                          {calculateChange(currentPeriodData.costOfSales, previousPeriodData.costOfSales)}%
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between py-2 border-b border-neutral-100 bg-neutral-50">
                    <div className="font-semibold">Gross Profit</div>
                    <div className="flex gap-8">
                      {compareWith !== "none" && (
                        <div className="w-32 text-right text-neutral-500">{formatCurrency(previousPeriodData.grossProfit)}</div>
                      )}
                      <div className="w-32 text-right font-semibold">{formatCurrency(currentPeriodData.grossProfit)}</div>
                      {compareWith !== "none" && (
                        <div className={`w-24 text-right ${calculateChange(currentPeriodData.grossProfit, previousPeriodData.grossProfit) > 0 ? 'text-secondary-600' : 'text-danger-600'}`}>
                          {calculateChange(currentPeriodData.grossProfit, previousPeriodData.grossProfit)}%
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Expenses Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Expenses</h3>
                  <div className="flex justify-between py-2 border-b border-neutral-100">
                    <div className="font-medium">Operating Expenses</div>
                    <div className="flex gap-8">
                      {compareWith !== "none" && (
                        <div className="w-32 text-right text-neutral-500">{formatCurrency(previousPeriodData.expenses)}</div>
                      )}
                      <div className="w-32 text-right font-semibold">{formatCurrency(currentPeriodData.expenses)}</div>
                      {compareWith !== "none" && (
                        <div className={`w-24 text-right ${calculateChange(currentPeriodData.expenses, previousPeriodData.expenses) < 0 ? 'text-secondary-600' : 'text-danger-600'}`}>
                          {calculateChange(currentPeriodData.expenses, previousPeriodData.expenses)}%
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between py-2 border-b border-neutral-100 bg-neutral-50">
                    <div className="font-semibold">Operating Profit</div>
                    <div className="flex gap-8">
                      {compareWith !== "none" && (
                        <div className="w-32 text-right text-neutral-500">{formatCurrency(previousPeriodData.operatingProfit)}</div>
                      )}
                      <div className="w-32 text-right font-semibold">{formatCurrency(currentPeriodData.operatingProfit)}</div>
                      {compareWith !== "none" && (
                        <div className={`w-24 text-right ${calculateChange(currentPeriodData.operatingProfit, previousPeriodData.operatingProfit) > 0 ? 'text-secondary-600' : 'text-danger-600'}`}>
                          {calculateChange(currentPeriodData.operatingProfit, previousPeriodData.operatingProfit)}%
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Other Income/Expenses */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Other</h3>
                  <div className="flex justify-between py-2 border-b border-neutral-100">
                    <div className="font-medium">Other Income</div>
                    <div className="flex gap-8">
                      {compareWith !== "none" && (
                        <div className="w-32 text-right text-neutral-500">{formatCurrency(previousPeriodData.otherIncome)}</div>
                      )}
                      <div className="w-32 text-right font-semibold">{formatCurrency(currentPeriodData.otherIncome)}</div>
                      {compareWith !== "none" && (
                        <div className={`w-24 text-right ${calculateChange(currentPeriodData.otherIncome, previousPeriodData.otherIncome) > 0 ? 'text-secondary-600' : 'text-danger-600'}`}>
                          {calculateChange(currentPeriodData.otherIncome, previousPeriodData.otherIncome)}%
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between py-2 border-b border-neutral-100">
                    <div className="font-medium">Other Expenses</div>
                    <div className="flex gap-8">
                      {compareWith !== "none" && (
                        <div className="w-32 text-right text-neutral-500">{formatCurrency(previousPeriodData.otherExpenses)}</div>
                      )}
                      <div className="w-32 text-right font-semibold">{formatCurrency(currentPeriodData.otherExpenses)}</div>
                      {compareWith !== "none" && (
                        <div className={`w-24 text-right ${calculateChange(currentPeriodData.otherExpenses, previousPeriodData.otherExpenses) < 0 ? 'text-secondary-600' : 'text-danger-600'}`}>
                          {calculateChange(currentPeriodData.otherExpenses, previousPeriodData.otherExpenses)}%
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Net Profit */}
                <div className="flex justify-between py-3 border-t-2 border-b-2 border-neutral-200 bg-neutral-50 mt-6">
                  <div className="text-lg font-bold">Net Profit</div>
                  <div className="flex gap-8">
                    {compareWith !== "none" && (
                      <div className="w-32 text-right text-neutral-500">{formatCurrency(previousPeriodData.netProfit)}</div>
                    )}
                    <div className="w-32 text-right text-lg font-bold">{formatCurrency(currentPeriodData.netProfit)}</div>
                    {compareWith !== "none" && (
                      <div className={`w-24 text-right font-bold ${calculateChange(currentPeriodData.netProfit, previousPeriodData.netProfit) > 0 ? 'text-secondary-600' : 'text-danger-600'}`}>
                        {calculateChange(currentPeriodData.netProfit, previousPeriodData.netProfit)}%
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="detailed">
              <div className="flex items-center justify-center p-12 text-neutral-500">
                Detailed view coming soon
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
}
