import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Unlock, TrendingUp, Clock } from "lucide-react";

const stakingPlans = [
  {
    name: "Flexible",
    apy: "2.5%",
    minAmount: "$100",
    maxAmount: "$50,000",
    duration: "Flexible",
    icon: Unlock,
    features: ["Withdraw anytime", "Daily rewards", "No lock period"],
    popular: false,
  },
  {
    name: "30-Day Lock",
    apy: "3.8%",
    minAmount: "$500",
    maxAmount: "$100,000",
    duration: "30 Days",
    icon: Lock,
    features: ["Higher APY", "Daily rewards", "Auto-compound option"],
    popular: false,
  },
  {
    name: "60-Day Lock",
    apy: "4.5%",
    minAmount: "$1,000",
    maxAmount: "$200,000",
    duration: "60 Days",
    icon: Lock,
    features: ["Premium APY", "Daily rewards", "Priority support"],
    popular: true,
  },
  {
    name: "90-Day Lock",
    apy: "5.2%",
    minAmount: "$2,000",
    maxAmount: "$500,000",
    duration: "90 Days",
    icon: Lock,
    features: ["Best APY", "Daily rewards", "VIP benefits"],
    popular: false,
  },
];

const Staking = () => {
  return (
    <div className="space-y-8 pb-20 md:pb-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Staking Plans</h1>
        <p className="text-muted-foreground">Choose the best staking plan for your investment strategy</p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stakingPlans.map((plan) => {
          const Icon = plan.icon;
          return (
            <Card
              key={plan.name}
              className={`glass-card p-6 relative overflow-hidden hover:border-primary/50 transition-all ${
                plan.popular ? "border-primary/30" : ""
              }`}
            >
              {plan.popular && (
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                  Popular
                </Badge>
              )}

              <div className="mb-6">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-primary">{plan.apy}</span>
                  <span className="text-muted-foreground">APY</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.duration}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Min Amount</span>
                  <span className="font-medium">{plan.minAmount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Max Amount</span>
                  <span className="font-medium">{plan.maxAmount}</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </div>
                ))}
              </div>

              <Button variant={plan.popular ? "gradient" : "default"} className="w-full">
                Stake Now
              </Button>
            </Card>
          );
        })}
      </div>

      {/* Active Positions */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Active Positions</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Position 1 */}
          <Card className="glass-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold mb-1">Flexible Staking</h3>
                <p className="text-sm text-muted-foreground">Started 45 days ago</p>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                Active
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Staked Amount</p>
                <p className="text-2xl font-bold">$8,500</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Current APY</p>
                <p className="text-2xl font-bold text-primary">2.5%</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Earned</p>
                <p className="text-lg font-bold text-success">+$26.10</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Daily Earnings</p>
                <p className="text-lg font-bold text-success">+$0.58</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">Add More</Button>
              <Button variant="destructive" className="flex-1">Unstake</Button>
            </div>
          </Card>

          {/* Position 2 */}
          <Card className="glass-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold mb-1">90-Day Fixed</h3>
                <p className="text-sm text-muted-foreground">Started 22 days ago</p>
              </div>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                Locked
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Staked Amount</p>
                <p className="text-2xl font-bold">$3,950</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Fixed APY</p>
                <p className="text-2xl font-bold text-primary">5.2%</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Earned</p>
                <p className="text-lg font-bold text-success">+$12.32</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Daily Earnings</p>
                <p className="text-lg font-bold text-success">+$0.56</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">22 of 90 days</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div className="bg-primary h-full rounded-full transition-all" style={{ width: '24.4%' }} />
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-lg bg-warning/10 text-warning">
              <Clock className="h-4 w-4" />
              <span className="text-sm">68 days until unlock</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Staking;
