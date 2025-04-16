import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, FileTextIcon, DownloadIcon } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function TaxReports() {
  const [period, setPeriod] = useState("thisYear");
  const [reportType, setReportType] = useState("vat");

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Tax Reports</h1>
          <p className="text-neutral-500">Generate and review your tax obligations</p>
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
            
            <div className="flex flex-wrap gap-4">
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
                <FileTextIcon className="h-4 w-4 text-neutral-400" />
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vat">VAT/Sales Tax</SelectItem>
                    <SelectItem value="income">Income Tax</SelectItem>
                    <SelectItem value="payroll">Payroll Tax</SelectItem>
                    <SelectItem value="withholding">Withholding Tax</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="px-6 pt-6 pb-3">
          <CardTitle>VAT/Sales Tax Report</CardTitle>
          <p className="text-sm text-neutral-500 mt-1">January 1, 2023 - December 31, 2023</p>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="summary">
            <TabsList className="mb-6">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="detailed">Detailed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary">
              <div className="space-y-6">
                {/* VAT Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-neutral-500 text-sm mb-1">VAT Collected</h3>
                      <p className="text-2xl font-semibold">{formatCurrency(7845.00)}</p>
                      <div className="mt-2 text-xs text-neutral-400">From sales to customers</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-neutral-500 text-sm mb-1">VAT Paid</h3>
                      <p className="text-2xl font-semibold">{formatCurrency(2387.00)}</p>
                      <div className="mt-2 text-xs text-neutral-400">On purchases from vendors</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-primary-50">
                    <CardContent className="p-6">
                      <h3 className="text-neutral-500 text-sm mb-1">VAT Payable</h3>
                      <p className="text-2xl font-semibold">{formatCurrency(5458.00)}</p>
                      <div className="mt-2 text-xs text-neutral-400">Amount due to tax authority</div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* VAT by Period */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">VAT by Period</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-neutral-500 text-sm border-b border-neutral-200">
                          <th className="pb-3 font-medium">Period</th>
                          <th className="pb-3 font-medium text-right">VAT Collected</th>
                          <th className="pb-3 font-medium text-right">VAT Paid</th>
                          <th className="pb-3 font-medium text-right">VAT Payable</th>
                          <th className="pb-3 font-medium text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200">
                        <tr className="text-sm">
                          <td className="py-4">Q1 2023 (Jan-Mar)</td>
                          <td className="py-4 text-right">{formatCurrency(1845.00)}</td>
                          <td className="py-4 text-right">{formatCurrency(587.00)}</td>
                          <td className="py-4 text-right font-medium">{formatCurrency(1258.00)}</td>
                          <td className="py-4 text-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-50 text-secondary-700">
                              Paid
                            </span>
                          </td>
                        </tr>
                        <tr className="text-sm">
                          <td className="py-4">Q2 2023 (Apr-Jun)</td>
                          <td className="py-4 text-right">{formatCurrency(2350.00)}</td>
                          <td className="py-4 text-right">{formatCurrency(650.00)}</td>
                          <td className="py-4 text-right font-medium">{formatCurrency(1700.00)}</td>
                          <td className="py-4 text-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-50 text-secondary-700">
                              Paid
                            </span>
                          </td>
                        </tr>
                        <tr className="text-sm">
                          <td className="py-4">Q3 2023 (Jul-Sep)</td>
                          <td className="py-4 text-right">{formatCurrency(3650.00)}</td>
                          <td className="py-4 text-right">{formatCurrency(1150.00)}</td>
                          <td className="py-4 text-right font-medium">{formatCurrency(2500.00)}</td>
                          <td className="py-4 text-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700">
                              Pending
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
