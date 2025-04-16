import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, FileTextIcon, DownloadIcon } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function CashFlow() {
  const [period, setPeriod] = useState("thisMonth");
  
  // Placeholder data for demo purposes
  const cashFlowData = {
    operating: {
      netIncome: 11850,
      addbacks: {
        depreciation: 3000,
        accountsReceivableDecrease: 1150,
        accountsPayableDecrease: -498,
        inventoryIncrease: -2300,
        total: 1352
      },
      netOperating: 13202
    },
    investing: {
      equipmentPurchase: -2500,
      otherInvestments: 0,
      netInvesting: -2500
    },
    financing: {
      loanRepayments: -3000,
      dividendsPaid: 0,
      netFinancing: -3000
    },
    netCashChange: 7702,
    openingBalance: 17728,
    closingBalance: 25430
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Cash Flow Statement</h1>
          <p className="text-neutral-500">Track your company's cash inflows and outflows</p>
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
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="px-6 pt-6 pb-3">
          <CardTitle>Cash Flow Statement</CardTitle>
          <p className="text-sm text-neutral-500 mt-1">1 August 2023 - 31 August 2023</p>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="statement">
            <TabsList className="mb-6">
              <TabsTrigger value="statement">Statement</TabsTrigger>
              <TabsTrigger value="chart">Chart</TabsTrigger>
            </TabsList>
            
            <TabsContent value="statement">
              <div className="space-y-6">
                {/* Opening Balance */}
                <div className="flex justify-between py-2 border-b border-neutral-100">
                  <div className="font-medium">Opening Cash Balance</div>
                  <div className="w-48 text-right font-medium">{formatCurrency(cashFlowData.openingBalance)}</div>
                </div>
                
                {/* Operating Activities */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Cash Flow from Operating Activities</h3>
                  <div className="flex justify-between py-2 border-b border-neutral-100">
                    <div className="font-medium">Net Income</div>
                    <div className="w-48 text-right font-medium">{formatCurrency(cashFlowData.operating.netIncome)}</div>
                  </div>
                  
                  <h4 className="font-medium text-neutral-600 mt-2 mb-2">Adjustments for non-cash items:</h4>
                  <div className="space-y-1 ml-4 mb-3">
                    <div className="flex justify-between py-1">
                      <div>Depreciation & Amortization</div>
                      <div className="w-48 text-right">{formatCurrency(cashFlowData.operating.addbacks.depreciation)}</div>
                    </div>
                    <div className="flex justify-between py-1">
                      <div>Decrease in Accounts Receivable</div>
                      <div className="w-48 text-right">{formatCurrency(cashFlowData.operating.addbacks.accountsReceivableDecrease)}</div>
                    </div>
                    <div className="flex justify-between py-1">
                      <div>Decrease in Accounts Payable</div>
                      <div className="w-48 text-right">{formatCurrency(cashFlowData.operating.addbacks.accountsPayableDecrease)}</div>
                    </div>
                    <div className="flex justify-between py-1">
                      <div>Increase in Inventory</div>
                      <div className="w-48 text-right">{formatCurrency(cashFlowData.operating.addbacks.inventoryIncrease)}</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between py-2 border-t border-neutral-200">
                    <div className="font-medium ml-4">Total Adjustments</div>
                    <div className="w-48 text-right font-medium">{formatCurrency(cashFlowData.operating.addbacks.total)}</div>
                  </div>
                  
                  <div className="flex justify-between py-2 mt-2 border-t border-b border-neutral-200 bg-neutral-50">
                    <div className="font-semibold">Net Cash from Operating Activities</div>
                    <div className="w-48 text-right font-semibold">{formatCurrency(cashFlowData.operating.netOperating)}</div>
                  </div>
                </div>
                
                {/* Investing Activities */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Cash Flow from Investing Activities</h3>
                  <div className="space-y-1 ml-4 mb-3">
                    <div className="flex justify-between py-1">
                      <div>Purchase of Equipment</div>
                      <div className="w-48 text-right">{formatCurrency(cashFlowData.investing.equipmentPurchase)}</div>
                    </div>
                    <div className="flex justify-between py-1">
                      <div>Other Investments</div>
                      <div className="w-48 text-right">{formatCurrency(cashFlowData.investing.otherInvestments)}</div>
                    </div>
                  </div>
                  <div className="flex justify-between py-2 border-t border-b border-neutral-200 bg-neutral-50">
                    <div className="font-semibold">Net Cash from Investing Activities</div>
                    <div className="w-48 text-right font-semibold">{formatCurrency(cashFlowData.investing.netInvesting)}</div>
                  </div>
                </div>
                
                {/* Financing Activities */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Cash Flow from Financing Activities</h3>
                  <div className="space-y-1 ml-4 mb-3">
                    <div className="flex justify-between py-1">
                      <div>Loan Repayments</div>
                      <div className="w-48 text-right">{formatCurrency(cashFlowData.financing.loanRepayments)}</div>
                    </div>
                    <div className="flex justify-between py-1">
                      <div>Dividends Paid</div>
                      <div className="w-48 text-right">{formatCurrency(cashFlowData.financing.dividendsPaid)}</div>
                    </div>
                  </div>
                  <div className="flex justify-between py-2 border-t border-b border-neutral-200 bg-neutral-50">
                    <div className="font-semibold">Net Cash from Financing Activities</div>
                    <div className="w-48 text-right font-semibold">{formatCurrency(cashFlowData.financing.netFinancing)}</div>
                  </div>
                </div>
                
                {/* Net Change in Cash */}
                <div className="flex justify-between py-3 border-t-2 border-b-2 border-neutral-200 bg-neutral-50">
                  <div className="font-semibold">Net Change in Cash</div>
                  <div className="w-48 text-right font-semibold">{formatCurrency(cashFlowData.netCashChange)}</div>
                </div>
                
                {/* Closing Balance */}
                <div className="flex justify-between py-3 border-b-2 border-neutral-200 bg-primary-50">
                  <div className="font-bold">Closing Cash Balance</div>
                  <div className="w-48 text-right font-bold">{formatCurrency(cashFlowData.closingBalance)}</div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="chart">
              <div className="flex items-center justify-center p-12 text-neutral-500">
                Chart view coming soon
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
}
