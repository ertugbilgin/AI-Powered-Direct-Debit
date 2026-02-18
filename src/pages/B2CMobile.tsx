import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, FileText, PieChart, User, Bell, 
  ChevronRight, AlertTriangle, CheckCircle, Lightbulb,
  RefreshCw, Wifi, Home as HomeIcon, Zap, Smartphone,
  TrendingUp, Calendar, ArrowUpRight, Building, Wallet
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface Mandate {
  id: string;
  name: string;
  provider: string;
  amount: number;
  date: string;
  status: 'active' | 'failed' | 'at-risk' | 'expired';
  icon: string;
  category: string;
}

interface AIInsight {
  id: string;
  type: 'warning' | 'success' | 'opportunity' | 'new-feature';
  title: string;
  description: string;
  action: string;
  confidence?: string;
}

export default function B2CMobile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [selectedMandate, setSelectedMandate] = useState<Mandate | null>(null);
  const [showAIInsight, setShowAIInsight] = useState<AIInsight | null>(null);
  const [showRetryDialog, setShowRetryDialog] = useState(false);
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  const [showRentProductDialog, setShowRentProductDialog] = useState(false);

  const mandates: Mandate[] = [
    { id: '1', name: 'Rent Payment', provider: 'Vesteda', amount: 1250, date: '1st', status: 'active', icon: 'home', category: 'Housing' },
    { id: '2', name: 'Vattenfall Energy', provider: 'Vattenfall', amount: 145, date: '15th', status: 'at-risk', icon: 'zap', category: 'Utilities' },
    { id: '3', name: 'Ziggo Internet', provider: 'Ziggo', amount: 65, date: '20th', status: 'failed', icon: 'wifi', category: 'Internet' },
    { id: '4', name: 'Vodafone Mobile', provider: 'Vodafone', amount: 35, date: '20th', status: 'active', icon: 'phone', category: 'Mobile' },
    { id: '5', name: 'Basic-Fit Gym', provider: 'Basic-Fit', amount: 29.99, date: '25th', status: 'active', icon: 'dumbbell', category: 'Fitness' },
  ];

  const aiInsights: AIInsight[] = [
    {
      id: '1',
      type: 'new-feature',
      title: 'New: Rent Collection',
      description: 'We noticed rent is your biggest expense (€1,250/month). Try our new Rent Collection feature - never miss a rent payment again!',
      action: 'Try Rent Collection',
      confidence: 'Save €50/year'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Ziggo Contract Expired',
      description: 'Your 2-year Ziggo contract ended. The new rate (€75) exceeded your set limit (€65), causing the payment to fail.',
      action: 'Renew & Save',
      confidence: 'Save €120/year'
    },
    {
      id: '3',
      type: 'warning',
      title: 'Predicted Insufficient Funds',
      description: 'Your Vattenfall payment (€145) on Aug 15 may fail. Your account balance typically drops below €200 by mid-month.',
      action: 'Reschedule',
      confidence: '78% Risk'
    },
    {
      id: '4',
      type: 'success',
      title: 'Optimal Payment Date',
      description: 'Your rent payment has highest success rate on the 1st. Your salary is deposited on the last working day of each month.',
      action: 'Confirm',
      confidence: '94% Success'
    },
    {
      id: '5',
      type: 'opportunity',
      title: 'Cost Optimization',
      description: 'You\'re paying €29.99/month for Basic-Fit. The annual plan offers 20% discount.',
      action: 'View Offer',
      confidence: 'Save €72/year'
    }
  ];

  const spendingCategories = [
    { name: 'Housing', amount: 1250, percentage: 82, color: 'bg-blue-500' },
    { name: 'Utilities', amount: 145, percentage: 9, color: 'bg-green-500' },
    { name: 'Internet', amount: 75, percentage: 5, color: 'bg-purple-500' },
    { name: 'Mobile', amount: 35, percentage: 2, color: 'bg-yellow-500' },
    { name: 'Fitness', amount: 30, percentage: 2, color: 'bg-pink-500' },
  ];

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'home': return <HomeIcon className="w-5 h-5" />;
      case 'zap': return <Zap className="w-5 h-5" />;
      case 'wifi': return <Wifi className="w-5 h-5" />;
      case 'phone': return <Smartphone className="w-5 h-5" />;
      default: return <div className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      case 'at-risk': return 'bg-yellow-500';
      case 'expired': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  const renderInsightsTab = () => (
    <div className="px-4 pb-24 space-y-6">
      {/* AI Insights */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <span className="text-[#FF6200]">🤖</span> AI Insights
        </h3>
        <div className="space-y-3">
          {aiInsights.map((insight) => (
            <Card 
              key={insight.id}
              className={`cursor-pointer hover:shadow-md transition-shadow border-l-4 ${
                insight.type === 'warning' ? 'border-l-yellow-500' :
                insight.type === 'success' ? 'border-l-green-500' :
                insight.type === 'new-feature' ? 'border-l-[#FF6200]' :
                'border-l-blue-500'
              }`}
              onClick={() => {
                if (insight.type === 'new-feature') {
                  setShowRentProductDialog(true);
                } else {
                  setShowAIInsight(insight);
                }
              }}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {insight.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                      {insight.type === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {insight.type === 'new-feature' && <Building className="w-4 h-4 text-[#FF6200]" />}
                      {insight.type === 'opportunity' && <Lightbulb className="w-4 h-4 text-blue-500" />}
                      <h4 className="font-semibold text-sm">{insight.title}</h4>
                      {insight.type === 'new-feature' && (
                        <span className="bg-[#FF6200] text-white text-xs px-2 py-0.5 rounded-full">NEW</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{insight.description}</p>
                  </div>
                  <div className="text-right">
                    {insight.confidence && (
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        insight.type === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                        insight.type === 'success' ? 'bg-green-100 text-green-700' :
                        insight.type === 'new-feature' ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {insight.confidence}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-gray-400 mt-1 ml-auto" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Spending Analysis */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <PieChart className="w-4 h-4 text-[#FF6200]" /> Spending Analysis
        </h3>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              {spendingCategories.map((cat) => (
                <div key={cat.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{cat.name}</span>
                    <span className="font-medium">€{cat.amount} ({cat.percentage}%)</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full ${cat.color}`} style={{ width: `${cat.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Total Monthly</span>
                <span className="text-xl font-bold text-[#000066]">€1,535</span>
              </div>
              <p className="text-xs text-[#FF6200] mt-2">
                💡 Rent is 82% of your spending. Try Rent Collection!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cash Flow Prediction */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#FF6200]" /> Cash Flow Prediction
        </h3>
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 mb-1">Projected Balance (Aug 31)</p>
            <p className="text-3xl font-bold text-green-600">€2,847</p>
            <p className="text-xs text-green-700 mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +12.3% from this month
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Incoming</span>
                <span className="font-medium text-green-600">+€4,200</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Outgoing (DD)</span>
                <span className="font-medium text-red-600">-€1,525</span>
              </div>
            </div>
            <div className="mt-4 bg-yellow-50 rounded-lg p-3 border border-yellow-200">
              <p className="text-xs text-yellow-800">
                <span className="font-semibold">⚠️ AI Alert:</span> Your Vattenfall payment on Aug 15 may fail due to low balance.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Payments */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#FF6200]" /> Upcoming Payments
        </h3>
        <div className="space-y-2">
          {mandates.slice(0, 3).map((m) => (
            <Card key={m.id} className="cursor-pointer" onClick={() => setSelectedMandate(m)}>
              <CardContent className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    m.status === 'failed' ? 'bg-red-100 text-red-600' :
                    m.status === 'at-risk' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {getIcon(m.icon)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{m.name}</p>
                    <p className="text-xs text-gray-500">{m.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">€{m.amount}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    m.status === 'active' ? 'bg-green-100 text-green-700' :
                    m.status === 'at-risk' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {m.status}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHomeTab = () => (
    <>
      {/* Balance Card */}
      <div className="p-4">
        <Card className="bg-gradient-to-r from-[#FF6200] to-[#FF8533] text-white border-0">
          <CardContent className="p-5">
            <p className="text-sm opacity-90">Total Managed This Month</p>
            <h2 className="text-3xl font-bold mt-1">€1,524.99</h2>
            <div className="flex justify-between mt-4 pt-4 border-t border-white/20">
              <div>
                <p className="text-xs opacity-80">Active Mandates</p>
                <p className="text-lg font-semibold">5</p>
              </div>
              <div>
                <p className="text-xs opacity-80">Success Rate</p>
                <p className="text-lg font-semibold">80%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Smart Retry Banner */}
      <div className="px-4 mb-4">
        <Card className="bg-[#000066] text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#FF6200] rounded-full flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Smart Retry Available</h3>
                <p className="text-sm opacity-90 mt-1">
                  1 payment failed. AI recommends retrying tomorrow at 9 AM. 
                  <span className="text-[#FF6200] font-semibold"> Expected success: 87%</span>
                </p>
                <Button 
                  onClick={() => setShowRetryDialog(true)}
                  className="mt-3 bg-[#FF6200] hover:bg-[#E55800] text-white text-sm"
                  size="sm"
                >
                  Apply Smart Retry
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Product Banner - Rent Collection */}
      <div className="px-4 mb-4">
        <Card 
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setShowRentProductDialog(true)}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Building className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="bg-white text-purple-600 text-xs px-2 py-0.5 rounded-full font-bold">NEW</span>
                  <h3 className="font-semibold">Rent Collection</h3>
                </div>
                <p className="text-sm opacity-90 mt-1">
                  We noticed rent is your biggest expense. Never miss a payment with our new feature!
                </p>
                <p className="text-xs text-yellow-300 mt-2">
                  💡 Save €50/year on late fees
                </p>
              </div>
              <ChevronRight className="w-5 h-5 opacity-70" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Preview */}
      <div className="px-4 mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <span className="text-[#FF6200]">🤖</span> AI Insights
          </h3>
          <button 
            onClick={() => setActiveTab('insights')}
            className="text-[#FF6200] text-sm font-medium"
          >
            View All
          </button>
        </div>
        
        <div className="space-y-3">
          {aiInsights.slice(0, 2).map((insight) => (
            <Card 
              key={insight.id}
              className={`cursor-pointer hover:shadow-md transition-shadow border-l-4 ${
                insight.type === 'warning' ? 'border-l-yellow-500' :
                insight.type === 'success' ? 'border-l-green-500' :
                insight.type === 'new-feature' ? 'border-l-[#FF6200]' :
                'border-l-blue-500'
              }`}
              onClick={() => {
                if (insight.type === 'new-feature') {
                  setShowRentProductDialog(true);
                } else {
                  setShowAIInsight(insight);
                }
              }}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {insight.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                      {insight.type === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {insight.type === 'new-feature' && <Building className="w-4 h-4 text-[#FF6200]" />}
                      {insight.type === 'opportunity' && <Lightbulb className="w-4 h-4 text-blue-500" />}
                      <h4 className="font-semibold text-sm">{insight.title}</h4>
                      {insight.type === 'new-feature' && (
                        <span className="bg-[#FF6200] text-white text-xs px-2 py-0.5 rounded-full">NEW</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{insight.description}</p>
                  </div>
                  <div className="text-right">
                    {insight.confidence && (
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        insight.type === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                        insight.type === 'success' ? 'bg-green-100 text-green-700' :
                        insight.type === 'new-feature' ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {insight.confidence}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-gray-400 mt-1 ml-auto" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Mandates List */}
      <div className="px-4 flex-1">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800">Your Mandates</h3>
          <button className="text-[#FF6200] text-sm font-medium">+ Add New</button>
        </div>

        <div className="space-y-3 pb-24">
          {mandates.map((mandate) => (
            <Card 
              key={mandate.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedMandate(mandate)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    mandate.status === 'failed' ? 'bg-red-100 text-red-600' :
                    mandate.status === 'at-risk' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {getIcon(mandate.icon)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{mandate.name}</h4>
                    <p className="text-xs text-gray-500">{mandate.provider} • {mandate.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">€{mandate.amount}</p>
                    <div className="flex items-center gap-1 justify-end">
                      <span className={`w-2 h-2 rounded-full ${getStatusColor(mandate.status)}`}></span>
                      <span className="text-xs text-gray-500">{mandate.date}</span>
                    </div>
                  </div>
                </div>
                {mandate.status === 'failed' && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-red-600 mb-2">⚠️ Failed: Contract expired, new rate exceeds limit</p>
                    <Button 
                      onClick={(e) => { e.stopPropagation(); setShowRescheduleDialog(true); }}
                      className="w-full bg-[#FF6200] hover:bg-[#E55800] text-white text-xs"
                      size="sm"
                    >
                      Renew Contract & Save
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-md bg-gray-50 min-h-screen flex flex-col relative">
        {/* Header */}
        <header className="bg-[#000066] text-white p-4 sticky top-0 z-50">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Good morning,</p>
              <h1 className="text-xl font-semibold">Ertug Bilgin</h1>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowAIInsight(aiInsights[0])}
                className="relative p-2 bg-white/10 rounded-full"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF6200] rounded-full text-xs flex items-center justify-center">5</span>
              </button>
              <button onClick={() => navigate('/')} className="p-2 bg-white/10 rounded-full text-sm">
                Exit
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        {activeTab === 'home' && renderHomeTab()}
        {activeTab === 'insights' && renderInsightsTab()}
        {activeTab === 'mandates' && renderHomeTab()}
        {activeTab === 'profile' && (
          <div className="flex-1 flex items-center justify-center p-4">
            <Card className="w-full">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-[#000066] rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-1">Hr E Bilgin</h3>
                <p className="text-gray-500 text-sm mb-4">hr.bilgin@email.com</p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">Edit Profile</Button>
                  <Button variant="outline" className="w-full">Settings</Button>
                  <Button variant="outline" className="w-full text-red-600" onClick={() => navigate('/')}>Logout</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Bottom Navigation */}
        <nav className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 max-w-md mx-auto">
          <div className="flex justify-around py-2">
            <button 
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center p-2 ${activeTab === 'home' ? 'text-[#FF6200]' : 'text-gray-400'}`}
            >
              <Home className="w-5 h-5" />
              <span className="text-xs mt-1">Home</span>
            </button>
            <button 
              onClick={() => setActiveTab('mandates')}
              className={`flex flex-col items-center p-2 ${activeTab === 'mandates' ? 'text-[#FF6200]' : 'text-gray-400'}`}
            >
              <FileText className="w-5 h-5" />
              <span className="text-xs mt-1">Mandates</span>
            </button>
            <button 
              onClick={() => setActiveTab('insights')}
              className={`flex flex-col items-center p-2 ${activeTab === 'insights' ? 'text-[#FF6200]' : 'text-gray-400'}`}
            >
              <PieChart className="w-5 h-5" />
              <span className="text-xs mt-1">Insights</span>
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center p-2 ${activeTab === 'profile' ? 'text-[#FF6200]' : 'text-gray-400'}`}
            >
              <User className="w-5 h-5" />
              <span className="text-xs mt-1">Profile</span>
            </button>
          </div>
        </nav>

        {/* Dialogs */}
        <Sheet open={!!selectedMandate} onOpenChange={() => setSelectedMandate(null)}>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>{selectedMandate?.name}</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              {selectedMandate && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                      selectedMandate.status === 'failed' ? 'bg-red-100 text-red-600' :
                      selectedMandate.status === 'at-risk' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {getIcon(selectedMandate.icon)}
                    </div>
                    <div>
                      <p className="text-2xl font-bold">€{selectedMandate.amount}</p>
                      <p className="text-gray-500">{selectedMandate.provider}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Day</span>
                      <span className="font-medium">{selectedMandate.date} of each month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category</span>
                      <span className="font-medium">{selectedMandate.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status</span>
                      <span className={`font-medium capitalize ${
                        selectedMandate.status === 'failed' ? 'text-red-600' :
                        selectedMandate.status === 'at-risk' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>{selectedMandate.status}</span>
                    </div>
                  </div>

                  {selectedMandate.status === 'failed' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-700 mb-2">⚠️ Payment Failed</h4>
                      <p className="text-sm text-red-600 mb-3">
                        Your 2-year contract expired. New rate (€75) exceeds your limit (€65).
                      </p>
                      <Button className="w-full bg-[#FF6200] hover:bg-[#E55800]">
                        Renew with ING Partnership Discount
                      </Button>
                      <p className="text-xs text-center text-gray-500 mt-2">
                        Save €120/year with ING-Ziggo partnership
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">Pause</Button>
                    <Button variant="outline" className="flex-1 text-red-600">Cancel</Button>
                  </div>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>

        <Dialog open={!!showAIInsight} onOpenChange={() => setShowAIInsight(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {showAIInsight?.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                {showAIInsight?.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
                {showAIInsight?.type === 'opportunity' && <Lightbulb className="w-5 h-5 text-blue-500" />}
                {showAIInsight?.title}
              </DialogTitle>
              <DialogDescription className="pt-4">
                {showAIInsight?.description}
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-3">
              <Button 
                className="flex-1 bg-[#FF6200] hover:bg-[#E55800]"
                onClick={() => setShowAIInsight(null)}
              >
                {showAIInsight?.action}
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setShowAIInsight(null)}>
                Dismiss
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showRetryDialog} onOpenChange={setShowRetryDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-[#FF6200]" />
                Smart Retry Scheduled
              </DialogTitle>
              <DialogDescription className="pt-4">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-2">📊 AI Analysis</p>
                  <ul className="text-sm space-y-1">
                    <li>• Your salary is deposited on the 1st</li>
                    <li>• Account balance typically peaks at 9 AM</li>
                    <li>• Similar retries at this time have 87% success</li>
                  </ul>
                </div>
                <p className="font-semibold text-center">
                  Retry scheduled for: <span className="text-[#FF6200]">Tomorrow, 9:00 AM</span>
                </p>
                <p className="text-center text-gray-500 text-sm mt-1">
                  Expected success rate: <span className="text-green-600 font-semibold">87%</span>
                </p>
              </DialogDescription>
            </DialogHeader>
            <Button 
              className="w-full bg-[#FF6200] hover:bg-[#E55800] mt-4"
              onClick={() => setShowRetryDialog(false)}
            >
              Confirm Smart Retry
            </Button>
          </DialogContent>
        </Dialog>

        <Dialog open={showRescheduleDialog} onOpenChange={setShowRescheduleDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Wifi className="w-5 h-5 text-[#FF6200]" />
                ING-Ziggo Partnership Offer
              </DialogTitle>
              <DialogDescription className="pt-4">
                <div className="bg-gradient-to-r from-[#FF6200]/10 to-[#FF8533]/10 rounded-lg p-4 mb-4">
                  <p className="font-semibold text-[#000066] mb-2">🎉 Exclusive ING Customer Offer</p>
                  <p className="text-sm text-gray-600">
                    Renew your Ziggo contract through ING and get special rates!
                  </p>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Current Rate</span>
                    <span className="font-semibold text-red-600">€75/mo</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-2 border-green-200">
                    <span className="text-green-700 font-medium">Partnership Rate</span>
                    <span className="font-bold text-green-700">€55/mo</span>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-[#FF6200]">Save €240/year</span>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <Button 
                className="w-full bg-[#FF6200] hover:bg-[#E55800]"
                onClick={() => setShowRescheduleDialog(false)}
              >
                Renew with Partnership Discount
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setShowRescheduleDialog(false)}>
                Just Update Payment Method
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Rent Collection Product Dialog */}
        <Dialog open={showRentProductDialog} onOpenChange={setShowRentProductDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Building className="w-6 h-6 text-purple-600" />
                Introducing: Rent Collection
              </DialogTitle>
              <DialogDescription className="pt-4">
                <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-purple-800 mb-2">
                    <span className="font-semibold">🎯 We noticed something:</span>
                  </p>
                  <p className="text-sm text-purple-700">
                    Your rent payment (€1,250) is 82% of your monthly spending - your biggest expense!
                  </p>
                </div>

                <div className="space-y-4 mb-4">
                  <h4 className="font-semibold text-gray-800">How Rent Collection Helps:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Never miss a rent payment deadline</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Automatic payment on salary day (optimal timing)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Get alerts before insufficient funds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Avoid late fees (save €50/year)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <p className="text-sm text-green-800">
                    <span className="font-semibold">💡 AI Prediction:</span> With Rent Collection, your success rate would be <span className="font-bold">98%</span> instead of current 94%
                  </p>
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() => setShowRentProductDialog(false)}
              >
                <Wallet className="w-4 h-4 mr-2" />
                Try Rent Collection Free
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setShowRentProductDialog(false)}>
                Maybe Later
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
