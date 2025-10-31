import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, TrendingUp, DollarSign, ArrowDownCircle, ArrowUpCircle, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="space-y-8 pb-20 md:pb-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your staking overview.</p>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Link to="/deposit" className="flex-1">
          <Button variant="gradient" size="lg" className="w-full">
            <ArrowDownCircle className="h-5 w-5" />
            Deposit
          </Button>
        </Link>
        <Link to="/withdraw" className="flex-1">
          <Button variant="outline" size="lg" className="w-full">
            <ArrowUpCircle className="h-5 w-5" />
            Withdraw
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Staked Balance"
          value="$12,450.00"
          subtitle="≈ 0.85 BTC"
          icon={Wallet}
        />
        <StatsCard
          title="Daily Earnings"
          value="$24.90"
          subtitle="2% APY"
          icon={TrendingUp}
          trend={{ value: "5.2%", positive: true }}
        />
        <StatsCard
          title="Total Earnings"
          value="$1,847.30"
          subtitle="Lifetime"
          icon={DollarSign}
          trend={{ value: "12.4%", positive: true }}
        />
      </div>

      {/* Active Staking Status */}
      <Card className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold mb-1">Staking Status</h3>
            <p className="text-sm text-muted-foreground">Your active staking positions</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success">
            <Activity className="h-4 w-4" />
            <span className="text-sm font-medium">Active</span>
          </div>
        </div>

        <div className="space-y-4">
          {/* Staking Position 1 */}
          <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-semibold">Flexible Staking</h4>
                <p className="text-sm text-muted-foreground">No lock period</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">$8,500.00</p>
                <p className="text-sm text-primary">2.5% APY</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Daily Earnings</span>
              <span className="text-success font-medium">+$0.58</span>
            </div>
          </div>

          {/* Staking Position 2 */}
          <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-semibold">90-Day Fixed</h4>
                <p className="text-sm text-muted-foreground">68 days remaining</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">$3,950.00</p>
                <p className="text-sm text-primary">5.2% APY</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Daily Earnings</span>
              <span className="text-success font-medium">+$0.56</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
              <div className="bg-primary h-full rounded-full transition-all" style={{ width: '24.4%' }} />
            </div>
          </div>
        </div>

        <Link to="/staking" className="block mt-6">
          <Button variant="outline" className="w-full">
            View All Positions
          </Button>
        </Link>
      </Card>

      {/* Recent Activity */}
      <Card className="glass-card p-6">
        <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { type: "Stake", amount: "+$2,000", time: "2 hours ago", status: "success" },
            { type: "Reward", amount: "+$24.90", time: "1 day ago", status: "success" },
            { type: "Withdraw", amount: "-$500", time: "3 days ago", status: "pending" },
          ].map((activity, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-all">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-success' : 'bg-warning'}`} />
                <div>
                  <p className="font-medium">{activity.type}</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </div>
              <p className={`font-bold ${activity.amount.startsWith('+') ? 'text-success' : 'text-foreground'}`}>
                {activity.amount}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
