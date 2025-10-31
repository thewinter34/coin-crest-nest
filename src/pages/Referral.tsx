import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Copy, Check, Gift, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const Referral = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = "STAKE2024XYZ";
  const referralLink = `https://stakevault.com/ref/${referralCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success("Referral link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const referralActivities = [
    { name: "John D.", date: "2 days ago", bonus: "$12.50", status: "Completed" },
    { name: "Sarah M.", date: "5 days ago", bonus: "$8.75", status: "Completed" },
    { name: "Mike R.", date: "1 week ago", bonus: "$15.20", status: "Completed" },
    { name: "Emma W.", date: "2 weeks ago", bonus: "$10.00", status: "Pending" },
  ];

  return (
    <div className="space-y-8 pb-20 md:pb-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Referral Program</h1>
        <p className="text-muted-foreground">Earn 10% of your referrals' staking bonuses</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <Users className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Referrals</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center glow-accent">
              <Gift className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Earned</p>
              <p className="text-2xl font-bold text-success">$246.45</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold">$46.45</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Referral Link */}
      <Card className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
            <Users className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Your Referral Link</h2>
            <p className="text-sm text-muted-foreground">Share this link to earn rewards</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3">
            <Input
              value={referralLink}
              readOnly
              className="flex-1 h-12 font-mono text-sm"
            />
            <Button
              onClick={handleCopy}
              variant={copied ? "success" : "default"}
              size="lg"
              className="min-w-[120px]"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          </div>

          <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
            <h3 className="font-bold mb-2">How it works:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">1.</span>
                Share your unique referral link with friends
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">2.</span>
                They sign up and start staking using your link
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">3.</span>
                You earn 10% of their staking bonuses automatically
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="glass-card p-6">
        <h2 className="text-xl font-bold mb-6">Recent Referrals</h2>
        <div className="space-y-3">
          {referralActivities.map((activity, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-lg hover:bg-secondary/50 transition-all border border-border/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">
                    {activity.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{activity.name}</p>
                  <p className="text-sm text-muted-foreground">{activity.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-success">+{activity.bonus}</p>
                <p className="text-sm text-muted-foreground">{activity.status}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Bonus Tiers */}
      <Card className="glass-card p-6">
        <h2 className="text-xl font-bold mb-6">Bonus Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Bronze</span>
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">Current</span>
            </div>
            <p className="text-2xl font-bold mb-1">10%</p>
            <p className="text-sm text-muted-foreground">0-50 referrals</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/50 border border-border/50 opacity-60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Silver</span>
              <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">Locked</span>
            </div>
            <p className="text-2xl font-bold mb-1">12%</p>
            <p className="text-sm text-muted-foreground">51-100 referrals</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/50 border border-border/50 opacity-60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Gold</span>
              <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">Locked</span>
            </div>
            <p className="text-2xl font-bold mb-1">15%</p>
            <p className="text-sm text-muted-foreground">100+ referrals</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Referral;
