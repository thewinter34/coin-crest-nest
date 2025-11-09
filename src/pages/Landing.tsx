import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, TrendingUp, Zap, Lock, Users, Coins } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
        <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            <h1 className="text-lg md:text-2xl font-bold">StakeVault</h1>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Link to="/auth" className="hidden sm:inline">
              <Button variant="ghost" className="text-sm md:text-base">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button variant="gradient" size="sm" className="md:text-base">
                <span className="hidden sm:inline">Get Started</span>
                <span className="sm:hidden">Start</span>
                <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-block mb-4 md:mb-6 px-3 md:px-4 py-1.5 md:py-2 rounded-full glass-card">
            <p className="text-xs md:text-sm text-accent font-medium">🚀 Secure Crypto Staking Platform</p>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
            Earn Passive Income
            <br />
            <span className="gradient-primary bg-clip-text text-transparent">
              With Crypto Staking
            </span>
          </h2>
          <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Stake your crypto assets and earn competitive daily rewards. Flexible and fixed-term plans with APY rates up to 15%.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <Link to="/auth" className="w-full sm:w-auto">
              <Button variant="gradient" size="lg" className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-5 md:py-6">
                Start Staking Now <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </Link>
            <Link to="/auth" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-5 md:py-6">
                View Calculator
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 md:py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            <Card className="glass-card p-5 md:p-8 text-center hover:glow-primary transition-all duration-300">
              <div className="text-2xl md:text-4xl font-bold text-primary mb-1 md:mb-2">$2.5M+</div>
              <p className="text-sm md:text-base text-muted-foreground">Total Value Locked</p>
            </Card>
            <Card className="glass-card p-5 md:p-8 text-center hover:glow-primary transition-all duration-300">
              <div className="text-2xl md:text-4xl font-bold text-accent mb-1 md:mb-2">15%</div>
              <p className="text-sm md:text-base text-muted-foreground">Maximum APY</p>
            </Card>
            <Card className="glass-card p-5 md:p-8 text-center hover:glow-primary transition-all duration-300">
              <div className="text-2xl md:text-4xl font-bold text-primary mb-1 md:mb-2">10,000+</div>
              <p className="text-sm md:text-base text-muted-foreground">Active Users</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-16">
            <h3 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">Why Choose StakeVault?</h3>
            <p className="text-base md:text-xl text-muted-foreground">Security, flexibility, and competitive returns</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <Card className="glass-card p-5 md:p-8 hover:glow-accent transition-all duration-300">
              <Shield className="h-10 w-10 md:h-12 md:w-12 text-primary mb-3 md:mb-4" />
              <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Bank-Level Security</h4>
              <p className="text-sm md:text-base text-muted-foreground">
                Your assets are protected with enterprise-grade encryption and multi-signature wallets.
              </p>
            </Card>
            <Card className="glass-card p-5 md:p-8 hover:glow-accent transition-all duration-300">
              <TrendingUp className="h-10 w-10 md:h-12 md:w-12 text-accent mb-3 md:mb-4" />
              <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Competitive APY</h4>
              <p className="text-sm md:text-base text-muted-foreground">
                Earn up to 15% annual returns with our flexible and fixed staking plans.
              </p>
            </Card>
            <Card className="glass-card p-5 md:p-8 hover:glow-accent transition-all duration-300">
              <Zap className="h-10 w-10 md:h-12 md:w-12 text-primary mb-3 md:mb-4" />
              <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Instant Rewards</h4>
              <p className="text-sm md:text-base text-muted-foreground">
                Daily reward distribution directly to your account. No waiting periods.
              </p>
            </Card>
            <Card className="glass-card p-5 md:p-8 hover:glow-accent transition-all duration-300">
              <Lock className="h-10 w-10 md:h-12 md:w-12 text-accent mb-3 md:mb-4" />
              <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Flexible Terms</h4>
              <p className="text-sm md:text-base text-muted-foreground">
                Choose between flexible staking with instant withdrawals or fixed terms for higher returns.
              </p>
            </Card>
            <Card className="glass-card p-5 md:p-8 hover:glow-accent transition-all duration-300">
              <Users className="h-10 w-10 md:h-12 md:w-12 text-primary mb-3 md:mb-4" />
              <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Referral Program</h4>
              <p className="text-sm md:text-base text-muted-foreground">
                Earn 5% commission on your referrals' staking rewards. Grow together.
              </p>
            </Card>
            <Card className="glass-card p-5 md:p-8 hover:glow-accent transition-all duration-300">
              <Coins className="h-10 w-10 md:h-12 md:w-12 text-accent mb-3 md:mb-4" />
              <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Multi-Currency</h4>
              <p className="text-sm md:text-base text-muted-foreground">
                Stake BTC, ETH, USDT, and more. Diversify your staking portfolio easily.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="glass-card p-6 md:p-12 text-center gradient-card glow-primary">
            <h3 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Ready to Start Earning?</h3>
            <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8">
              Join thousands of users already earning passive income with StakeVault
            </p>
            <Link to="/auth" className="inline-block w-full sm:w-auto">
              <Button variant="gradient" size="lg" className="w-full sm:w-auto text-base md:text-lg px-8 md:px-12 py-5 md:py-6">
                Create Free Account <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 md:py-8 px-4 border-t border-border/50">
        <div className="container mx-auto text-center text-muted-foreground">
          <p className="text-xs md:text-base">&copy; 2025 StakeVault. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
