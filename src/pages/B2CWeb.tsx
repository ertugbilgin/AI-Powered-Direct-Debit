import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, FileText, PieChart, User, Bell,
  ChevronRight, AlertTriangle, CheckCircle, Lightbulb, TrendingUp,
  ArrowUpRight, Calendar, DollarSign, ArrowDownRight,
  Wifi, Zap, Home as HomeIcon, Smartphone, Dumbbell,
  TrendingDown, Wallet
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface RMessage {
  code: string;
  description: string;
  transaction: string;
  amount: number;
  aiSuggestion: string;
  successProbability: number;
  action: string;
}

export default function B2CWeb() {
  const navigate = useNavigate();
  const [selectedRMessage, setSelectedRMessage] = useState<RMessage | null>(null);
  const [showCashFlow, setShowCashFlow] = useState(false);
  const [showRentProduct, setShowRentProduct] = useState(false);

  const rMessages: RMessage[] = [
    {
      code: 'AM04',
      description: 'Insufficient Funds',
      transaction: 'Netflix Subscription',
      amount: 15.99,
      aiSuggestion: 'Retry on Aug 1 (salary day) when account balance is typically highest',
      successProbability: 94,
      action: 'Schedule Smart Retry'
    },
    {
      code: 'MD01',
      description: 'No Valid Mandate',
      transaction: 'Gym Membership',
      amount: 29.99,
      aiSuggestion: 'Mandate expired after 36 months. Request new digital mandate.',
      successProbability: 98,
      action: 'Request Mandate'
    },
    {
      code: 'AC04',
      description: 'Account Closed',
      transaction: 'Old Insurance',
      amount: 45.00,
      aiSuggestion: 'Customer changed banks. Contact for new IBAN or cancel service.',
      successProbability: 0,
      action: 'Contact Customer'
    },
    {
      code: 'SL01',
      description: 'Maximum Amount Exceeded',
      transaction: 'Ziggo Internet',
      amount: 75.00,
      aiSuggestion: 'Contract renewed at higher rate. ING-Ziggo partnership offers €55/mo.',
      successProbability: 95,
      action: 'Apply Partnership Rate'
    }
  ];

  const upcomingPayments = [
    { name: 'Rent - Vesteda', amount: 1250, date: 'Aug 1', status: 'confirmed', icon: HomeIcon },
    { name: 'Vattenfall Energy', amount: 145, date: 'Aug 15', status: 'at-risk', icon: Zap },
    { name: 'Ziggo Internet', amount: 75, date: 'Aug 20', status: 'failed', icon: Wifi },
    { name: 'Vodafone Mobile', amount: 35, date: 'Aug 20', status: 'confirmed', icon: Smartphone },
  ];

  const spendingByCategory = [
    { category: 'Housing', amount: 1250, percentage: 82, color: 'bg-blue-500' },
    { category: 'Utilities', amount: 145, percentage: 9, color: 'bg-green-500' },
    { category: 'Internet', amount: 75, percentage: 5, color: 'bg-purple-500' },
    { category: 'Mobile', amount: 35, percentage: 2, color: 'bg-yellow-500' },
    { category: 'Fitness', amount: 30, percentage: 2, color: 'bg-pink-500' },
  ];

  // Cash flow data for chart
  const cashFlowData = [
    { date: 'Aug 1', income: 4200, expense: 1250, balance: 2950 },
    { date: 'Aug 5', income: 0, expense: 0, balance: 2950 },
    { date: 'Aug 10', income: 0, expense: 0, balance: 2800 },
    { date: 'Aug 15', income: 0, expense: 145, balance: 2655 },
    { date: 'Aug 20', income: 0, expense: 110, balance: 2545 },
    { date: 'Aug 25', income: 0, expense: 30, balance: 2515 },
    { date: 'Aug 30', income: 0, expense: 0, balance: 2847 },
  ];

  const maxBalance = Math.max(...cashFlowData.map(d => d.balance));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FF6200] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">ING</span>
                </div>
                <span className="text-xl font-semibold text-[#000066]">Direct Debit AI</span>
              </div>
              <nav className="hidden md:flex gap-6">
                <a href="#" className="text-[#FF6200] font-medium flex items-center gap-2">
                  <Home className="w-4 h-4" /> Overview
                </a>
                <a href="#" className="text-gray-600 hover:text-[#000066] flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Mandates
                </a>
                <a href="#" className="text-gray-600 hover:text-[#000066] flex items-center gap-2">
                  <PieChart className="w-4 h-4" /> Insights
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-[#000066] text-sm"
              >
                Back to Prototypes
              </button>
              <div className="flex items-center gap-3">
                <button className="relative p-2 hover:bg-gray-100 rounded-full">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF6200] rounded-full text-xs text-white flex items-center justify-center">3</span>
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#000066] rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Ertug Bilgin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* AI Banner */}
        <div className="bg-gradient-to-r from-[#000066] to-[#1a1a7a] rounded-xl p-6 mb-8 text-white">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#FF6200] text-white text-xs px-3 py-1 rounded-full">🤖 AI-Powered</span>
              </div>
              <h1 className="text-2xl font-bold mb-2">Smart Direct Debit Assistant</h1>
              <p className="text-white/80 max-w-xl">
                Our AI has analyzed your account and found 4 opportunities to optimize your Direct Debits. 
                Potential savings: <span className="text-[#FF6200] font-bold">€127 this month</span>.
              </p>
            </div>
            <Button 
              onClick={() => setShowCashFlow(true)}
              className="bg-[#FF6200] hover:bg-[#E55800]"
            >
              View AI Insights <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* New Product Banner - Rent Collection */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 mb-8 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <HomeIcon className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-white text-purple-600 text-xs px-2 py-0.5 rounded-full font-bold">NEW PRODUCT</span>
                </div>
                <h2 className="text-xl font-bold mb-1">Rent Collection by ING</h2>
                <p className="text-white/80 text-sm max-w-lg">
                  We noticed rent is your biggest expense (€1,250/month - 82% of spending). 
                  Never miss a payment with AI-optimized timing.
                </p>
              </div>
            </div>
            <Button 
              onClick={() => setShowRentProduct(true)}
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              Learn More <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500 mb-1">Total Monthly</p>
              <p className="text-2xl font-bold text-[#000066]">€1,524.99</p>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3 h-3" /> +2.3% vs last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500 mb-1">Active Mandates</p>
              <p className="text-2xl font-bold text-[#000066]">5</p>
              <p className="text-xs text-gray-500 mt-1">2 need attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500 mb-1">Success Rate</p>
              <p className="text-2xl font-bold text-green-600">80%</p>
              <p className="text-xs text-gray-500 mt-1">Target: 95%</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500 mb-1">AI Predictions</p>
              <p className="text-2xl font-bold text-[#FF6200]">4</p>
              <p className="text-xs text-gray-500 mt-1">2 warnings, 2 opportunities</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI R-Message Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#000066]">
                  <span className="text-2xl">🧠</span> AI-Powered R-Message Analysis
                </CardTitle>
                <CardDescription>
                  Smart interpretation of failed payments with actionable suggestions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rMessages.map((msg, idx) => (
                    <div 
                      key={idx}
                      className="border border-gray-200 rounded-lg p-4 hover:border-[#FF6200] hover:shadow-md transition-all cursor-pointer"
                      onClick={() => setSelectedRMessage(msg)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded text-[#FF6200] font-bold">
                              {msg.code}
                            </span>
                            <span className="text-sm font-medium text-gray-700">{msg.description}</span>
                            <Badge variant={msg.successProbability > 90 ? 'default' : 'destructive'}>
                              {msg.successProbability > 0 ? `${msg.successProbability}% success` : 'Action needed'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {msg.transaction} • €{msg.amount}
                          </p>
                          <div className="bg-blue-50 rounded-lg p-3 flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-blue-700">
                              <span className="font-semibold">AI Suggestion:</span> {msg.aiSuggestion}
                            </p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-[#FF6200] hover:bg-[#E55800] ml-4"
                          onClick={(e) => { e.stopPropagation(); setSelectedRMessage(msg); }}
                        >
                          {msg.action}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Payments */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-[#000066]">📅 Upcoming Payments</CardTitle>
                  <CardDescription>Next 30 days</CardDescription>
                </div>
                <Button variant="outline" size="sm">View Calendar</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingPayments.map((payment, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          payment.status === 'failed' ? 'bg-red-100 text-red-600' :
                          payment.status === 'at-risk' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          <payment.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{payment.name}</p>
                          <p className="text-xs text-gray-500">{payment.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">€{payment.amount}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          payment.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                          payment.status === 'at-risk' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#000066] flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-[#FF6200]" /> AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm text-yellow-800">Ziggo Contract Alert</p>
                      <p className="text-xs text-yellow-700 mt-1">
                        Your 2-year contract ended. New rate exceeds your limit.
                      </p>
                      <p className="text-xs text-[#FF6200] font-semibold mt-2">
                        💡 ING Partnership saves €240/year
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm text-green-800">Optimal Payment Date</p>
                      <p className="text-xs text-green-700 mt-1">
                        Rent payment on 1st has 94% success rate.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                  <div className="flex items-start gap-2">
                    <HomeIcon className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm text-purple-800">New: Rent Collection</p>
                      <p className="text-xs text-purple-700 mt-1">
                        Your rent is 82% of spending. Try our new feature!
                      </p>
                      <Button 
                        size="sm" 
                        className="mt-2 bg-purple-600 hover:bg-purple-700"
                        onClick={() => setShowRentProduct(true)}
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Spending by Category */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#000066]">📊 Spending by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {spendingByCategory.map((cat, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{cat.category}</span>
                        <span className="font-medium">€{cat.amount} ({cat.percentage}%)</span>
                      </div>
                      <Progress value={cat.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Monthly</span>
                    <span className="text-xl font-bold text-[#000066]">€1,535</span>
                  </div>
                  <p className="text-xs text-[#FF6200] mt-2">
                    💡 Rent is 82% of your spending. Try Rent Collection!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Cash Flow Prediction */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#000066] flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" /> Cash Flow Prediction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1">Projected balance (Aug 31)</p>
                  <p className="text-3xl font-bold text-green-600">€2,847</p>
                  <p className="text-xs text-green-700 mt-1 flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" /> +12.3% from this month
                  </p>
                </div>
                
                {/* Cash Flow Chart */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Balance Forecast</p>
                  <div className="h-32 flex items-end justify-between gap-2">
                    {cashFlowData.map((data, i) => (
                      <div key={i} className="flex flex-col items-center flex-1">
                        <div className="relative w-full">
                          {/* Income bar (green) */}
                          {data.income > 0 && (
                            <div 
                              className="absolute bottom-0 w-full bg-green-400 rounded-t"
                              style={{ height: `${(data.income / maxBalance) * 60}px` }}
                            />
                          )}
                          {/* Expense bar (red) */}
                          {data.expense > 0 && (
                            <div 
                              className="absolute bottom-0 w-full bg-red-400 rounded-t opacity-70"
                              style={{ 
                                height: `${(data.expense / maxBalance) * 60}px`,
                                bottom: data.income > 0 ? `${(data.income / maxBalance) * 60}px` : 0
                              }}
                            />
                          )}
                          {/* Balance indicator */}
                          <div 
                            className="absolute w-full flex justify-center"
                            style={{ bottom: `${(data.balance / maxBalance) * 60}px` }}
                          >
                            <div className="w-2 h-2 bg-[#000066] rounded-full" />
                          </div>
                        </div>
                        <span className="text-xs text-gray-500 mt-1">{data.date.split(' ')[1]}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center gap-4 mt-2 text-xs">
                    <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-400 rounded" /> Income</span>
                    <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-400 rounded" /> Expense</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 bg-[#000066] rounded-full" /> Balance</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Incoming</span>
                    <span className="font-medium text-green-600">+€4,200</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Outgoing (DD)</span>
                    <span className="font-medium text-red-600">-€1,525</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Dialogs */}
      <Dialog open={!!selectedRMessage} onOpenChange={() => setSelectedRMessage(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <span className="font-mono text-lg bg-gray-100 px-3 py-1 rounded text-[#FF6200]">
                {selectedRMessage?.code}
              </span>
              <span>{selectedRMessage?.description}</span>
            </DialogTitle>
            <DialogDescription className="pt-4">
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600">Transaction</p>
                <p className="font-semibold">{selectedRMessage?.transaction}</p>
                <p className="text-2xl font-bold text-[#000066] mt-1">
                  €{selectedRMessage?.amount}
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-blue-800 mb-2">🧠 AI Analysis</p>
                <p className="text-sm text-blue-700">{selectedRMessage?.aiSuggestion}</p>
                {selectedRMessage && selectedRMessage.successProbability > 0 && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm text-gray-600">Expected success:</span>
                    <span className="font-bold text-green-600">{selectedRMessage.successProbability}%</span>
                  </div>
                )}
              </div>

              {selectedRMessage?.code === 'SL01' && (
                <div className="bg-gradient-to-r from-[#FF6200]/10 to-[#FF8533]/10 rounded-lg p-4 mb-4">
                  <p className="font-semibold text-[#000066] mb-2">🎉 ING-Ziggo Partnership</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Current rate</span>
                    <span className="font-semibold text-red-600">€75/mo</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Partnership rate</span>
                    <span className="font-bold text-green-600">€55/mo</span>
                  </div>
                  <p className="text-center text-xl font-bold text-[#FF6200] mt-3">
                    Save €240/year!
                  </p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3">
            <Button className="flex-1 bg-[#FF6200] hover:bg-[#E55800]">
              {selectedRMessage?.action}
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => setSelectedRMessage(null)}>
              Dismiss
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Rent Collection Product Dialog */}
      <Dialog open={showRentProduct} onOpenChange={setShowRentProduct}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <HomeIcon className="w-6 h-6 text-purple-600" />
              Rent Collection by ING
            </DialogTitle>
            <DialogDescription className="pt-4">
              <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg p-4 mb-4">
                <p className="text-sm text-purple-800 mb-2">
                  <span className="font-semibold">🎯 We noticed something about your spending:</span>
                </p>
                <p className="text-sm text-purple-700">
                  Your rent payment (€1,250) is <span className="font-bold">82% of your monthly spending</span> - your biggest expense!
                </p>
              </div>

              <div className="space-y-4 mb-4">
                <h4 className="font-semibold text-gray-800">How Rent Collection Helps:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span><strong>Never miss a deadline</strong> - Automatic payment on optimal date</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span><strong>AI-optimized timing</strong> - Pays on salary day for 98% success</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span><strong>Proactive alerts</strong> - Warns before insufficient funds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span><strong>Save on late fees</strong> - Average €50/year savings</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                <p className="text-sm text-green-800">
                  <span className="font-semibold">💡 AI Prediction:</span> With Rent Collection, your payment success rate would be <span className="font-bold">98%</span> (vs current 94%)
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={() => setShowRentProduct(false)}
            >
              <Wallet className="w-4 h-4 mr-2" />
              Try Rent Collection Free
            </Button>
            <Button variant="outline" className="w-full" onClick={() => setShowRentProduct(false)}>
              Maybe Later
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
