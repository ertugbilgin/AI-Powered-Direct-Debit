import { useNavigate } from 'react-router-dom';
import { Smartphone, Monitor, Building2, ArrowRight, Bot, Presentation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000066] via-[#000066] to-[#FF6200]">
      {/* Header */}
      <header className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FF6200] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">ING</span>
          </div>
          <span className="text-white text-xl font-semibold">Direct Debit AI</span>
        </div>
        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
          <Bot className="w-5 h-5 text-[#FF6200]" />
          <span className="text-white text-sm">AI-Powered</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-6">
            ING Direct Debit
            <span className="block text-[#FF6200]">AI Prototype</span>
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto mb-8">
            Experience the future of Direct Debit with AI-powered insights, 
            smart retry, and predictive analytics.
          </p>
          
          {/* Presentation Button */}
          <Button 
            onClick={() => window.open('./presentation.html', '_blank')}
            className="bg-white text-[#000066] hover:bg-gray-100 text-lg px-8 py-6 mb-8"
          >
            <Presentation className="w-5 h-5 mr-2" />
            View Interview Presentation
          </Button>
        </div>

        {/* Prototype Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* B2C Mobile */}
          <Card className="bg-white/95 backdrop-blur hover:shadow-2xl transition-all cursor-pointer group"
                onClick={() => navigate('/b2c-mobile')}>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF6200] to-[#FF8533] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-[#000066]">B2C Mobile App</CardTitle>
              <CardDescription className="text-gray-600">
                Consumer mobile experience with AI insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-[#FF6200]">✓</span> Smart retry notifications
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FF6200]">✓</span> AI payment predictions
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FF6200]">✓</span> One-tap reschedule
                </li>
              </ul>
              <Button className="w-full bg-[#FF6200] hover:bg-[#E55800] group-hover:shadow-lg">
                View Mobile App <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* B2C Web */}
          <Card className="bg-white/95 backdrop-blur hover:shadow-2xl transition-all cursor-pointer group"
                onClick={() => navigate('/b2c-web')}>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#000066] to-[#1a1a7a] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Monitor className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-[#000066]">B2C Web Dashboard</CardTitle>
              <CardDescription className="text-gray-600">
                Full web experience with advanced analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-[#FF6200]">✓</span> R-message AI analysis
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FF6200]">✓</span> Cash flow forecasting
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FF6200]">✓</span> Mandate management
                </li>
              </ul>
              <Button className="w-full bg-[#000066] hover:bg-[#1a1a7a] group-hover:shadow-lg">
                View Web Dashboard <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* B2B Hub */}
          <Card className="bg-white/95 backdrop-blur hover:shadow-2xl transition-all cursor-pointer group"
                onClick={() => navigate('/b2b-hub')}>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-[#000066]">B2B Merchant Hub</CardTitle>
              <CardDescription className="text-gray-600">
                Business tools with smart recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-[#FF6200]">✓</span> Smart business insights
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FF6200]">✓</span> Revenue forecasting
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FF6200]">✓</span> Churn prediction
                </li>
              </ul>
              <Button className="w-full bg-green-600 hover:bg-green-700 group-hover:shadow-lg">
                View B2B Hub <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">AI-Powered Features</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Smart Retry', 'R-Message Analysis', 'Cash Flow Prediction', 'Churn Prevention', 'Cost Optimization'].map((feature) => (
              <span key={feature} className="bg-white/10 text-white px-6 py-3 rounded-full text-sm font-medium">
                🤖 {feature}
              </span>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-white/60 text-sm">
        <p>ING Direct Debit AI Prototype</p>
        <p className="mt-2">Prepared by Ertug Bilgin | Senior PM Interview 2026</p>
      </footer>
    </div>
  );
}
