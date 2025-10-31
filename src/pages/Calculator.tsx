import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator as CalcIcon, TrendingUp } from "lucide-react";

const Calculator = () => {
  const [amount, setAmount] = useState("10000");
  const [duration, setDuration] = useState("90");
  const [apy, setApy] = useState(5.2);

  const calculateEarnings = () => {
    const principal = parseFloat(amount) || 0;
    const days = parseInt(duration) || 0;
    const dailyRate = apy / 100 / 365;
    const dailyEarnings = principal * dailyRate;
    const totalEarnings = dailyEarnings * days;

    return {
      daily: dailyEarnings.toFixed(2),
      total: totalEarnings.toFixed(2),
      final: (principal + totalEarnings).toFixed(2),
    };
  };

  const earnings = calculateEarnings();

  const handleDurationChange = (value: string) => {
    setDuration(value);
    // Update APY based on duration
    switch (value) {
      case "0":
        setApy(2.5);
        break;
      case "30":
        setApy(3.8);
        break;
      case "60":
        setApy(4.5);
        break;
      case "90":
        setApy(5.2);
        break;
      default:
        setApy(2.5);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 md:pb-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Earnings Calculator</h1>
        <p className="text-muted-foreground">Calculate your potential staking rewards</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calculator Form */}
        <Card className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <CalcIcon className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Calculate Rewards</h2>
              <p className="text-sm text-muted-foreground">Enter your staking details</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="amount">Staking Amount (USD)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-12 text-lg"
              />
            </div>

            {/* Duration Select */}
            <div className="space-y-2">
              <Label htmlFor="duration">Staking Duration</Label>
              <Select value={duration} onValueChange={handleDurationChange}>
                <SelectTrigger id="duration" className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Flexible (2.5% APY)</SelectItem>
                  <SelectItem value="30">30 Days (3.8% APY)</SelectItem>
                  <SelectItem value="60">60 Days (4.5% APY)</SelectItem>
                  <SelectItem value="90">90 Days (5.2% APY)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* APY Display */}
            <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current APY</span>
                <span className="text-2xl font-bold text-primary">{apy}%</span>
              </div>
            </div>

            <Button variant="gradient" size="lg" className="w-full">
              <TrendingUp className="h-5 w-5" />
              Calculate Earnings
            </Button>
          </div>
        </Card>

        {/* Results */}
        <Card className="glass-card p-6">
          <h2 className="text-xl font-bold mb-6">Projected Earnings</h2>

          <div className="space-y-6">
            {/* Daily Earnings */}
            <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
              <p className="text-sm text-muted-foreground mb-1">Daily Earnings</p>
              <p className="text-3xl font-bold text-success">+${earnings.daily}</p>
              <p className="text-sm text-muted-foreground mt-1">Per day</p>
            </div>

            {/* Total Earnings */}
            <div className="p-4 rounded-lg gradient-accent glow-accent">
              <p className="text-sm text-accent-foreground mb-1 opacity-80">Total Earnings</p>
              <p className="text-3xl font-bold text-accent-foreground">+${earnings.total}</p>
              <p className="text-sm text-accent-foreground mt-1 opacity-80">
                After {duration === "0" ? "flexible" : `${duration} days`}
              </p>
            </div>

            {/* Final Balance */}
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
              <p className="text-sm text-muted-foreground mb-1">Final Balance</p>
              <p className="text-3xl font-bold">${earnings.final}</p>
              <p className="text-sm text-muted-foreground mt-1">Principal + Earnings</p>
            </div>

            {/* Breakdown */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Initial Investment</span>
                <span className="font-medium">${parseFloat(amount || "0").toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">APY Rate</span>
                <span className="font-medium text-primary">{apy}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium">{duration === "0" ? "Flexible" : `${duration} days`}</span>
              </div>
              <div className="flex items-center justify-between text-sm pt-3 border-t border-border">
                <span className="text-muted-foreground">Total Return</span>
                <span className="font-bold text-success">+${earnings.total}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card p-6">
          <h3 className="font-bold mb-2">Daily Compounding</h3>
          <p className="text-sm text-muted-foreground">
            Rewards are calculated and distributed daily to maximize your earnings potential.
          </p>
        </Card>
        <Card className="glass-card p-6">
          <h3 className="font-bold mb-2">Flexible Terms</h3>
          <p className="text-sm text-muted-foreground">
            Choose from flexible or fixed-term staking plans that match your investment strategy.
          </p>
        </Card>
        <Card className="glass-card p-6">
          <h3 className="font-bold mb-2">Secure Platform</h3>
          <p className="text-sm text-muted-foreground">
            Your assets are protected with industry-leading security measures and protocols.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Calculator;
