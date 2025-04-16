import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, FileTextIcon, DownloadIcon } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function BalanceSheet() {
  const [asOfDate, setAsOfDate] = useState("current");
  const [compareWith, setCompareWith] = useState("none");

  // Placeholder data for demo purposes
  const currentData = {
    assets: {
      current: {
        cash: 25430,
        accountsReceivable: 12430,
        inventory: 18750,
        otherCurrentAssets: 3200,
        totalCurrent: 59810
      },
      nonCurrent: {
        property: 85000,
        equipment: 32500,
        intangible: 15000,
        accumulatedDepreciation: -28000,
        totalNonCurrent: 104500
      },
      totalAssets: 164310
    },
    liabilities: {
      current: {
        accountsPayable: 8752,
        shortTermLoans: 5000,
        otherCurrentLiabilities: 4200,
        totalCurrent: 17952
      },
      nonCurrent: {
        longTermLoans: 45000,
        otherNonCurrentLiabilities: 2000,
        totalNonCurrent: 47000
      },
      totalLiabilities: 64952
    },
    equity: {
      capital: 50000,
      retainedEarnings: 37508,
      currentProfitLoss: 11850,
      totalEquity: 99358
    }
  };

  const previousData = {
    assets: {
      current: {
        cash: 22350,
        accountsReceivable: 13580,
        inventory: 16450,
        otherCurrentAssets: 2900,
        totalCurrent: 55280
      },
      nonCurrent: {
        property: 85000,
        equipment: 30000,
        intangible: 15000,
        accumulatedDepreciation: -25000,
        totalNonCurrent: 105000
      },
      totalAssets: 160280
    },
    liabilities: {
      current: {
        accountsPayable: 9250,
        shortTermLoans: 6500,
        otherCurrentLiabilities: 3850,
        totalCurrent: 19600
      },
      nonCurrent: {
        longTermLoans: 48000,
        otherNonCurrentLiabilities: 2150,
        totalNonCurrent: 50150
      },
      totalLiabilities: 69750
    },
    equity: {
      capital: 50000,
      retainedEarnings: 33700,
      currentProfitLoss: 6830,
      totalEquity: 90530
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Balance Sheet</h1>
          <p className="text-neutral-500">View your company's financial position</p>
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
                <Select value={asOfDate} onValueChange={setAsOfDate}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="As of date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Current (Aug 31, 2023)</SelectItem>
                    <SelectItem value="previousMonth">Previous Month (Jul 31, 2023)</SelectItem>
                    <SelectItem value="previousQuarter">Previous Quarter (Jun 30, 2023)</SelectItem>
                    <SelectItem value="previousYear">Previous Year (Dec 31, 2022)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-neutral-400" />
                <Select value={compareWith} onValueChange={setCompareWith}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Compare with" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No comparison</SelectItem>
                    <SelectItem value="previousPeriod">Previous month</SelectItem>
                    <SelectItem value="previousYear">Previous year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="px-6 pt-6 pb-3">
          <CardTitle>Balance Sheet</CardTitle>
          <p className="text-sm text-neutral-500 mt-1">As of 31 August 2023</p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-8">
            {/* Assets Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Assets</h3>
              
              <h4 className="font-medium text-neutral-600 mb-2">Current Assets</h4>
              <div className="space-y-1 ml-4 mb-3">
                <div className="flex justify-between py-1">
                  <div>Cash & Cash Equivalents</div>
                  <div className="flex gap-8">
                    {compareWith !== "none" && (
                      <div className="w-32 text-right text-neutral-500">{formatCurrency(previousData.assets.current.cash)}</div>
                    )}
                    <div className="w-32 text-right">{formatCurrency(currentData.assets.current.cash)}</div>
                  </div>
                </div>
                <div className="flex justify-between py-1">
                  <div>Accounts Receivable</div>
                  <div className="flex gap-8">
                    {compareWith !== "none" && (
                      <div className="w-32 text-right text-neutral-500">{formatCurrency(previousData.assets.current.accountsReceivable)}</div>
                    )}
                    <div className="w-32 text-right">{formatCurrency(currentData.assets.current.accountsReceivable)}</div>
                  </div>
                </div>
                <div className="flex justify-between py-1">
                  <div>Inventory</div>
                  <div className="flex gap-8">
                    {compareWith !== "none" && (
                      <div className="w-32 text-right text-neutral-500">{formatCurrency(previousData.assets.current.inventory)}</div>
                    )}
                    <div className="w-32 text-right">{formatCurrency(currentData.assets.current.inventory)}</div>
                  </div>
                </div>
                <div className="flex justify-between py-1">
                  <div>Other Current Assets</div>
                  <div className="flex gap-8">
                    {compareWith !== "none" && (
                      <div className="w-32 text-right text-neutral-500">{formatCurrency(previousData.assets.current.otherCurrentAssets)}</div>
                    )}
                    <div className="w-32 text-right">{formatCurrency(currentData.assets.current.otherCurrentAssets)}</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between py-2 border-t border-b border-neutral-200">
                <div className="font-medium">Total Current Assets</div>
                <div className="flex gap-8">
                  {compareWith !== "none" && (
                    <div className="w-32 text-right text-neutral-500 font-medium">{formatCurrency(previousData.assets.current.totalCurrent)}</div>
                  )}
                  <div className="w-32 text-right font-medium">{formatCurrency(currentData.assets.current.totalCurrent)}</div>
                </div>
              </div>
              
              <h4 className="font-medium text-neutral-600 mb-2 mt-5">Non-Current Assets</h4>
              <div className="space-y-1 ml-4 mb-3">
                <div className="flex justify-between py-1">
                  <div>Property</div>
                  <div className="flex gap-8">
                    {compareWith !== "none" && (
                      <div className="w-32 text-right text-neutral-500">{formatCurrency(previousData.assets.nonCurrent.property)}</div>
                    )}
                    <div className="w-32 text-right">{formatCurrency(currentData.assets.nonCurrent.property)}</div>
                  </div>
                </div>
                <div className="flex justify-between py-1">
                  <div>Equipment</div>
                  <div className="flex gap-8">
                    {compareWith !== "none" && (
                      <div className="w-32 text-right text-neutral-500">{formatCurrency(previousData.assets.nonCurrent.equipment)}</div>
                    )}
                    <div className="w-32 text-right">{formatCurrency(currentData.assets.nonCurrent.equipment)}</div>
                  </div>
                </div>
                <div className="flex justify-between py-1">
                  <div>Intangible Assets</div>
                  <div className="flex gap-8">
                    {compareWith !== "none" && (
                      <div className="w-32 text-right text-neutral-500">{formatCurrency(previousData.assets.nonCurrent.intangible)}</div>
                    )}
                    <div className="w-32 text-right">{formatCurrency(currentData.assets.nonCurrent.intangible)}</div>
                  </div>
                </div>
                <div className="flex justify-between py-1">
                  <div>Accumulated Depreciation</div>
                  <div className="flex gap-8">
                    {compareWith !== "none" && (
                      <div className="w-32 text-right text-neutral-500">{formatCurrency(previousData.assets.nonCurrent.accumulatedDepreciation)}</div>
                    )}
                    <div className="w-32 text-right">{formatCurrency(currentData.assets.nonCurrent.accumulatedDepreciation)}</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between py-2 border-t border-b border-neutral-200">
                <div className="font-medium">Total Non-Current Assets</div>
                <div className="flex gap-8">
                  {compareWith !== "none" && (
                    <div className="w-32 text-right text-neutral-500 font-medium">{formatCurrency(previousData.assets.nonCurrent.totalNonCurrent)}</div>
                  )}
                  <div className="w-32 text-right font-medium">{formatCurrency(currentData.assets.nonCurrent.totalNonCurrent)}</div>
                </div>
              </div>
              
              <div className="flex justify-between py-3 mt-3 border-t-2 border-b-2 border-neutral-200 bg-neutral-50">
                <div className="font-semibold">TOTAL ASSETS</div>
                <div className="flex gap-8">
                  {compareWith !== "none" && (
                    <div className="w-32 text-right text-neutral-500 font-semibold">{formatCurrency(previousData.assets.totalAssets)}</div>
                  )}
                  <div className="w-32 text-right font-semibold">{formatCurrency(currentData.assets.totalAssets)}</div>
                </div>
              </div>
            </div>
            
            {/* Liabilities Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Liabilities</h3>
              
              <h4 className="font-medium text-neutral-600 mb-2">Current Liabilities</h4>
              <div className="space-y-1 ml-4 mb-3">
                <div className="flex justify-between py-1">
                  <div>Accounts Payable</div>
                  <div className="flex gap-8">
                    {compareWith !== "none" && (
                      <div className="w-32 text-right text-neutral-500">{formatCurrency(previousData.liabilities.current.accountsPayable)}</div>
                    )}
                    <div className="w-32 text-right">{formatCurrency(currentData.liabilities.current.accountsPayable)}</div>
                  </div>
                </div>
                <div className="flex justify-between py-1">
                  <div>Short-term Loans</div>
                  <div className="flex gap-8">
                    {compareWith !== "none" && (
                      <div className="w-32 text-right text-neutral-500">{formatCurrency(previousData.liabilities.current.shortTermLoans)}</div>
                    )}
                    <div className="w-32 text-right">{formatCurrency(currentData.liabilities.current.shortTermLoans)}</div>
                  </div>
                </div>
                <div className="flex justify-between py-1">
                  <div>Other Current Liabilities</div>
                  <div className="flex gap-8">
                    {compareWith !== "none" && (
                      <div className="w-32 text-right text-neutral-500">{formatCurrency(previousData.liabilities.current.otherCurrentLiabilities)}</div>
                    )}
                    <div className="w-32 text-right">{formatCurrency(currentData.liabilities.current.otherCurrentLiabilities)}</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between py-2 border-t border-b border-neutral-200">
                <div className="font-medium">Total Current Liabilities</div>
                <div className="flex gap-8">
                  {compareWith !== "none" && (
                    <div className="w-32 text-right text-neutral-500 font-medium">{formatCurrency(previousData.liabilities.current.totalCurrent)}</div>
                  )}
                  <div className="w-32 text-right font-medium">{formatCurrency(currentData.liabilities.current.totalCurrent)}</div>
                </div>
              </div>
              
              <h4 className="font-medium text-neutral-600 mb-2 mt-5">Non-Current Liabilities</h4>
              <div className="space-y-1 ml-4 mb-3">
                <div className="flex justify-between py-1">
                  <div>Long-term Loans</div>
                  <div className="flex gap-8">
                    {compareWith !== "none" && (
                      <div className="w-32 text-right text-neutral-500">{formatCurrency(previousData.liabilities.nonCurrent.longTermLoans)}</div>
                    )}
                    <div className="w-32 text-right">{formatCurrency(currentData.liabilities.nonCurrent.longTermLoans)}</div>
                  </div>
                </div>
                <div className="flex justify-between py-1">
                  <div>Other Non-Current Liabilities</div>
                  <div className="flex gap-8">
                    {compareWith !== "none" && (
                      <div className="w-32 text-right text-neutral-500">{formatCurrency(previousData.liabilities.nonCurrent.otherNonCurrentLiabilities)}</div>
                    )}
                    <div className="w-32 text-right">{formatCurrency(currentData.liabilities.nonCurrent.otherNonCurrentLiabilities)}</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between py-2 border-t border-b border-neutral-200">
                <div className="font-medium">Total Non-Current Liabilities</div>
                <div className="flex gap-8">
                  {compareWith !== "none" && (
                    <div className="w-32 text-right text-neutral-500 font-medium">{formatCurrency(previousData.liabilities.nonCurrent.totalNonCurrent)}</div>
                  )}
                  <div className="w-32 text-right font-medium">{formatCurrency(currentData.liabilities.nonCurrent.totalNonCurrent)}</div>
                </div>
              </div>
              
              <div className="flex justify-between py-3 mt-3 border-t-2 border-b-2 border-neutral-200 bg-neutral-50">
                <div className="font-semibold">TOTAL LIABILITIES</div>
                <div className="flex gap-8">
                  {compareWith !== "none" && (
                    <div className="w-32 text-right text-neutral-500 font-semibold">{formatCurrency(previousData.liabilities.totalLiabilities)}</div>
                  )}
                  <div className="w-32 text-right font-semibold">{formatCurrency(currentData.liabilities.totalLiabilities)}</div>
                </div>
              </div>
            </div>
            
            {/* Equity Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Equity</h3>
              
              <div className="space-y-1 ml-4 mb-3">
                <div className="flex justify-between py-1">
                  <div>Capital</div>
                  <div className="flex gap-8">
                    {compareWith !== "none" && (
                      <div className="w-32 text-right text-neutral-500">{formatCurrency(previousData.equity.capital)}</div>
                    )}
                    <div className="w-32 text-right">{formatCurrency(currentData.equity.capital)}</div>
                  </div>
                </div>
                <div className="flex justify-between py-1">
                  <div>Retained Earnings</div>
                  <div className="flex gap-8">
                    {compareWith !== "none" && (
                      <div className="w-32 text-right text-neutral-500">{formatCurrency(previousData.equity.retainedEarnings)}</div>
                    )}
                    <div className="w-32 text-right">{formatCurrency(currentData.equity.retainedEarnings)}</div>
                  </div>
                </div>
                <div className="flex justify-between py-1">
                  <div>Current Year Profit/Loss</div>
                  <div className="flex gap-8">
                    {compareWith !== "none" && (
                      <div className="w-32 text-right text-neutral-500">{formatCurrency(previousData.equity.currentProfitLoss)}</div>
                    )}
                    <div className="w-32 text-right">{formatCurrency(currentData.equity.currentProfitLoss)}</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between py-3 border-t-2 border-b-2 border-neutral-200 bg-neutral-50">
                <div className="font-semibold">TOTAL EQUITY</div>
                <div className="flex gap-8">
                  {compareWith !== "none" && (
                    <div className="w-32 text-right text-neutral-500 font-semibold">{formatCurrency(previousData.equity.totalEquity)}</div>
                  )}
                  <div className="w-32 text-right font-semibold">{formatCurrency(currentData.equity.totalEquity)}</div>
                </div>
              </div>
            </div>
            
            {/* Total Liabilities + Equity */}
            <div className="flex justify-between py-3 border-t-2 border-b-2 border-neutral-200 bg-primary-50">
              <div className="font-bold">TOTAL LIABILITIES & EQUITY</div>
              <div className="flex gap-8">
                {compareWith !== "none" && (
                  <div className="w-32 text-right text-neutral-500 font-bold">
                    {formatCurrency(previousData.liabilities.totalLiabilities + previousData.equity.totalEquity)}
                  </div>
                )}
                <div className="w-32 text-right font-bold">
                  {formatCurrency(currentData.liabilities.totalLiabilities + currentData.equity.totalEquity)}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
