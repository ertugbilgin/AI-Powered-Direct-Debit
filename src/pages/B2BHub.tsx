import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, TrendingUp, Bell,
  ChevronRight, AlertTriangle, CheckCircle, Lightbulb, ArrowUpRight,
  ArrowDownRight, UserMinus, Calendar, Download,
  BarChart3, Target, Zap, RefreshCw, Filter,
  TrendingDown, Home, Wallet, Clock, ShieldAlert
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Customer {
  id: string;
  name: string;
  email: string;
  monthlyAmount: number;
  successRate: number;
  lastPayment: string;
  status: 'active' | 'at-risk' | 'churned' | 'failed';
  riskScore: number;
  aiInsight: string;
  churnReasons?: string[];
}

interface SmartRecommendation {
  id: string;
  type: 'revenue' | 'retention' | 'efficiency';
  title: string;
  description: string;
  impact: string;
  action: string;
}

export default function B2BHub() {
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedRecommendation, setSelectedRecommendation] = useState<SmartRecommendation | null>(null);
  const [timeRange, setTimeRange] = useState('30d');
  const [showChurnAnalysis, setShowChurnAnalysis] = useState(false);

  const customers: Customer[] = [
    {
      id: '1',
      name: 'TechCorp BV',
      email: 'billing@techcorp.nl',
      monthlyAmount: 1250,
      successRate: 98,
      lastPayment: '2025-07-28',
      status: 'active',
      riskScore: 5,
      aiInsight: 'Payment pattern stable. Recommend upsell to annual plan.',
      churnReasons: []
    },
    {
      id: '2',
      name: 'GreenEnergy Solutions',
      email: 'finance@greenenergy.nl',
      monthlyAmount: 890,
      successRate: 85,
      lastPayment: '2025-07-15',
      status: 'at-risk',
      riskScore: 65,
      aiInsight: '3 failed payments in 6 months. Offer payment date flexibility.',
      churnReasons: ['Repeated AM04 (Insufficient Funds)', 'Payment date misalignment with cash flow']
    },
    {
      id: '3',
      name: 'MediaLabs Amsterdam',
      email: 'payments@medialabs.nl',
      monthlyAmount: 450,
      successRate: 45,
      lastPayment: '2025-06-20',
      status: 'failed',
      riskScore: 88,
      aiInsight: 'AM04 recurring. Suggest salary-day alignment or weekly splits.',
      churnReasons: ['Salary day misalignment', 'Seasonal cash flow issues', 'No payment flexibility offered']
    },
    {
      id: '4',
      name: 'DutchFoods Trading',
      email: 'admin@dutchfoods.nl',
      monthlyAmount: 2340,
      successRate: 92,
      lastPayment: '2025-07-25',
      status: 'active',
      riskScore: 15,
      aiInsight: 'Strong payment history. Eligible for credit limit increase.',
      churnReasons: []
    },
    {
      id: '5',
      name: 'Nordic Shipping AS',
      email: 'accounting@nordic.nl',
      monthlyAmount: 3600,
      successRate: 78,
      lastPayment: '2025-07-10',
      status: 'at-risk',
      riskScore: 72,
      aiInsight: 'High-value customer with declining success rate. Priority outreach.',
      churnReasons: ['Recent company restructuring', 'New finance team unfamiliar with DD', 'Multiple MD01 errors']
    }
  ];

  const smartRecommendations: SmartRecommendation[] = [
    {
      id: '1',
      type: 'retention',
      title: 'Churn Risk Alert: 3 Customers',
      description: 'AI detected 3 customers with >70% churn probability. Immediate action recommended.',
      impact: 'Save €8,400 MRR',
      action: 'View At-Risk Customers'
    },
    {
      id: '2',
      type: 'revenue',
      title: 'Payment Date Optimization',
      description: '23 customers would have higher success rates if payments moved to salary day.',
      impact: '+€12,500 monthly',
      action: 'Apply Optimization'
    },
    {
      id: '3',
      type: 'efficiency',
      title: 'Smart Retry Configuration',
      description: 'Enable AI-powered retry timing for failed payments. Expected +35% recovery.',
      impact: 'Recover €4,200/mo',
      action: 'Configure'
    },
    {
      id: '4',
      type: 'revenue',
      title: 'Annual Plan Upsell Opportunity',
      description: '47 customers with stable 12+ month history. Offer 15% annual discount.',
      impact: '+€28,000 upfront',
      action: 'Launch Campaign'
    }
  ];

  const rMessageStats = [
    { code: 'AM04', description: 'Insufficient Funds', count: 45, percentage: 42, trend: 'down' },
    { code: 'MD01', description: 'No Valid Mandate', count: 23, percentage: 21, trend: 'stable' },
    { code: 'AC04', description: 'Account Closed', count: 18, percentage: 17, trend: 'up' },
    { code: 'SL01', description: 'Amount Exceeded', count: 12, percentage: 11, trend: 'stable' },
    { code: 'MS02', description: 'Refusal', count: 10, percentage: 9, trend: 'down' },
  ];

  // Churn analysis data
  const churnReasons = [
    { reason: 'Payment Date Misalignment', count: 28, percentage: 35, solution: 'Offer salary-day alignment' },
    { reason: 'Insufficient Funds (AM04)', count: 22, percentage: 28, solution: 'Smart retry + payment splitting' },
    { reason: 'Mandate Expired (MD01)', count: 15, percentage: 19, solution: 'Proactive mandate renewal' },
    { reason: 'Account Closed (AC04)', count: 8, percentage: 10, solution: 'Early churn detection' },
    { reason: 'Amount Disputes', count: 6, percentage: 8, solution: 'Clear communication + alerts' },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'at-risk': return 'bg-yellow-100 text-yellow-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'churned': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100';
    }
  };

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-600';
    if (score < 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">ING</span>
                </div>
                <div>
                  <span className="text-xl font-semibold text-[#000066]">Business</span>
                  <span className="text-xl font-semibold text-green-600 ml-1">Direct Debit AI</span>
                </div>
              </div>
              <nav className="hidden md:flex gap-6">
                <a href="#" className="text-green-600 font-medium flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </a>
                <a href="#" className="text-gray-600 hover:text-[#000066] flex items-center gap-2">
                  <Users className="w-4 h-4" /> Customers
                </a>
                <a href="#" className="text-gray-600 hover:text-[#000066] flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" /> Analytics
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
              <button className="relative p-2 hover:bg-gray-100 rounded-full">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF6200] rounded-full text-xs text-white flex items-center justify-center">5</span>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">EB</span>
                </div>
                <span className="text-sm font-medium hidden md:block">Ertug Bilgin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome & AI Banner */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl p-6 mb-8 text-white">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">🤖 AI Business Assistant</span>
              </div>
              <h1 className="text-2xl font-bold mb-2">Good morning, Ertug!</h1>
              <p className="text-white/90 max-w-xl">
                Your AI assistant has analyzed your customer base and found 
                <span className="font-bold text-yellow-300"> 4 opportunities</span> to increase revenue and reduce churn.
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/80">AI Confidence</p>
              <p className="text-3xl font-bold">94%</p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500 mb-1">Monthly Revenue</p>
              <p className="text-2xl font-bold text-[#000066]">€42,850</p>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3 h-3" /> +8.5% vs last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500 mb-1">Success Rate</p>
              <p className="text-2xl font-bold text-green-600">87.3%</p>
              <p className="text-xs text-gray-500 mt-1">Target: 95%</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500 mb-1">Active Customers</p>
              <p className="text-2xl font-bold text-[#000066]">1,247</p>
              <p className="text-xs text-yellow-600 flex items-center gap-1 mt-1">
                <AlertTriangle className="w-3 h-3" /> 23 at-risk
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500 mb-1">Failed This Month</p>
              <p className="text-2xl font-bold text-red-600">€4,230</p>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <RefreshCw className="w-3 h-3" /> AI can recover 65%
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Smart Recommendations */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-[#000066]">
                    <Lightbulb className="w-5 h-5 text-[#FF6200]" /> 
                    🤖 Smart Recommendations
                  </CardTitle>
                  <CardDescription>AI-powered insights to grow your business</CardDescription>
                </div>
                <Badge className="bg-[#FF6200]">4 New</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                {smartRecommendations.map((rec) => (
                  <div 
                    key={rec.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-green-500 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => {
                      if (rec.title.includes('Churn')) {
                        setShowChurnAnalysis(true);
                      } else {
                        setSelectedRecommendation(rec);
                      }
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={rec.type === 'revenue' ? 'default' : rec.type === 'retention' ? 'destructive' : 'secondary'}>
                            {rec.type === 'revenue' && '💰 Revenue'}
                            {rec.type === 'retention' && '🛡️ Retention'}
                            {rec.type === 'efficiency' && '⚡ Efficiency'}
                          </Badge>
                          <span className="font-semibold text-[#000066]">{rec.title}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-semibold text-green-600">
                            Impact: {rec.impact}
                          </span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          if (rec.title.includes('Churn')) {
                            setShowChurnAnalysis(true);
                          } else {
                            setSelectedRecommendation(rec);
                          }
                        }}
                      >
                        {rec.action}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Customer List with AI Insights */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-[#000066]">👥 Customers with AI Insights</CardTitle>
                  <CardDescription>Smart risk analysis and recommendations</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="90d">Last 90 days</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {customers.map((customer) => (
                    <div 
                      key={customer.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                          customer.status === 'active' ? 'bg-green-500' :
                          customer.status === 'at-risk' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}>
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{customer.name}</p>
                          <p className="text-xs text-gray-500">{customer.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(customer.status)}`}>
                              {customer.status}
                            </span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">{customer.successRate}% success</span>
                          </div>
                          {customer.churnReasons && customer.churnReasons.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {customer.churnReasons.map((reason, i) => (
                                <span key={i} className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                                  {reason}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">€{customer.monthlyAmount.toLocaleString()}/mo</p>
                        <div className="flex items-center gap-2 justify-end mt-1">
                          <span className="text-xs text-gray-500">Risk:</span>
                          <span className={`text-xs font-semibold ${getRiskColor(customer.riskScore)}`}>
                            {customer.riskScore}%
                          </span>
                        </div>
                        <p className="text-xs text-[#FF6200] mt-1 truncate max-w-[200px]">
                          💡 {customer.aiInsight}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* R-Message Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#000066] flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" /> R-Message Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rMessageStats.map((stat) => (
                    <div key={stat.code}>
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-[#FF6200]">{stat.code}</span>
                          <span className="text-xs text-gray-500">{stat.description}</span>
                        </div>
                        <span className="text-sm font-semibold">{stat.count}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={stat.percentage} className="h-2 flex-1" />
                        <span className="text-xs text-gray-500 w-10">{stat.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      <span className="font-semibold">🧠 AI Insight:</span> 42% of failures are AM04 (Insufficient Funds). 
                      Smart retry on salary day could recover 60% of these.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Forecast */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#000066] flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" /> AI Revenue Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1">Projected (Next 30 Days)</p>
                  <p className="text-3xl font-bold text-green-600">€45,230</p>
                  <p className="text-xs text-green-700 mt-1 flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" /> +5.6% with AI optimizations
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Expected Success Rate</span>
                    <span className="font-medium text-green-600">92.4%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">At-Risk Revenue</span>
                    <span className="font-medium text-yellow-600">€8,400</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">AI Recovery Potential</span>
                    <span className="font-medium text-green-600">€5,460</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Churn Prevention */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-[#000066] flex items-center gap-2">
                  <UserMinus className="w-5 h-5" /> Churn Prevention
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowChurnAnalysis(true)}
                >
                  Analyze
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-red-600">23</p>
                    <p className="text-xs text-gray-500">At-Risk</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-yellow-600">12</p>
                    <p className="text-xs text-gray-500">High Risk</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">1,212</p>
                    <p className="text-xs text-gray-500">Healthy</p>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-yellow-800">
                    <span className="font-semibold">⚠️ Priority Alert:</span> Nordic Shipping AS 
                    (€3,600/mo) has 72% churn risk. Last successful payment: 18 days ago.
                  </p>
                  <Button size="sm" className="mt-2 bg-yellow-600 hover:bg-yellow-700">
                    Take Action
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#000066]">⚡ Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" /> Export Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" /> Schedule Review
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Zap className="w-4 h-4 mr-2" /> Enable Smart Retry
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Customer Detail Dialog */}
      <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                selectedCustomer?.status === 'active' ? 'bg-green-500' :
                selectedCustomer?.status === 'at-risk' ? 'bg-yellow-500' :
                'bg-red-500'
              }`}>
                {selectedCustomer?.name.charAt(0)}
              </div>
              <div>
                <p>{selectedCustomer?.name}</p>
                <p className="text-sm text-gray-500 font-normal">{selectedCustomer?.email}</p>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Monthly Value</p>
                <p className="text-2xl font-bold text-[#000066]">€{selectedCustomer?.monthlyAmount}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Success Rate</p>
                <p className={`text-2xl font-bold ${
                  (selectedCustomer?.successRate || 0) > 90 ? 'text-green-600' :
                  (selectedCustomer?.successRate || 0) > 70 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>{selectedCustomer?.successRate}%</p>
              </div>
            </div>

            {selectedCustomer?.churnReasons && selectedCustomer.churnReasons.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-red-800 mb-2">⚠️ Churn Risk Factors</p>
                <ul className="space-y-1">
                  {selectedCustomer.churnReasons.map((reason, i) => (
                    <li key={i} className="text-sm text-red-700 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> {reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm font-semibold text-blue-800 mb-2">🧠 AI Insight</p>
              <p className="text-sm text-blue-700">{selectedCustomer?.aiInsight}</p>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                Contact Customer
              </Button>
              <Button variant="outline" className="flex-1">
                View History
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Churn Analysis Dialog */}
      <Dialog open={showChurnAnalysis} onOpenChange={setShowChurnAnalysis}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserMinus className="w-6 h-6 text-red-600" />
              AI Churn Analysis
            </DialogTitle>
            <DialogDescription>
              Understanding why customers churn and how to prevent it
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Churn Overview */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-red-600">23</p>
                <p className="text-sm text-gray-600">At-Risk Customers</p>
                <p className="text-xs text-red-500">€8,400 MRR</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-yellow-600">12</p>
                <p className="text-sm text-gray-600">High Risk</p>
                <p className="text-xs text-yellow-600">Immediate action</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-green-600">€5,460</p>
                <p className="text-sm text-gray-600">Recoverable</p>
                <p className="text-xs text-green-600">With AI intervention</p>
              </div>
            </div>

            {/* Churn Reasons */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[#FF6200]" /> Top Churn Reasons
              </h4>
              <div className="space-y-3">
                {churnReasons.map((item, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-sm">{item.reason}</p>
                        <p className="text-xs text-gray-500">{item.count} customers affected</p>
                      </div>
                      <span className="text-sm font-bold text-[#FF6200]">{item.percentage}%</span>
                    </div>
                    <Progress value={item.percentage} className="h-2 mb-2" />
                    <div className="bg-green-50 rounded-lg p-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-700">
                        <span className="font-semibold">AI Solution:</span> {item.solution}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Prevention Strategies */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" /> AI Prevention Strategies
              </h4>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5" />
                  <span><strong>Proactive Alerts:</strong> Notify customers 3 days before predicted failure</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5" />
                  <span><strong>Smart Rescheduling:</strong> Auto-adjust to salary day for 40% of customers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5" />
                  <span><strong>Payment Splitting:</strong> Offer weekly payments for cash-flow sensitive customers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5" />
                  <span><strong>Mandate Renewal:</strong> Auto-request new mandate 30 days before expiry</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                <Zap className="w-4 h-4 mr-2" />
                Apply All AI Fixes
              </Button>
              <Button variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Recommendation Dialog */}
      <Dialog open={!!selectedRecommendation} onOpenChange={() => setSelectedRecommendation(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-[#FF6200]" />
              {selectedRecommendation?.title}
            </DialogTitle>
            <DialogDescription className="pt-4">
              <p className="text-gray-700 mb-4">{selectedRecommendation?.description}</p>
              
              <div className="bg-green-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600">Expected Impact</p>
                <p className="text-2xl font-bold text-green-600">{selectedRecommendation?.impact}</p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3">
            <Button className="flex-1 bg-green-600 hover:bg-green-700">
              {selectedRecommendation?.action}
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => setSelectedRecommendation(null)}>
              Dismiss
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
