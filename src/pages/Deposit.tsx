import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownCircle, Copy, Check, Bitcoin, Wallet } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface UserWallet {
  crypto_symbol: string;
  wallet_address: string;
}

const Deposit = () => {
  const [amount, setAmount] = useState("");
  const [wallets, setWallets] = useState<UserWallet[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchWallets = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("user_wallets")
        .select("crypto_symbol, wallet_address")
        .eq("user_id", user.id);

      if (error) {
        toast.error("Failed to load wallet addresses");
        console.error(error);
      } else if (data) {
        setWallets(data);
      }
      setLoading(false);
    };

    fetchWallets();
  }, [user]);

  const getCurrentWallet = () => {
    return wallets.find(w => w.crypto_symbol === selectedCrypto);
  };

  const handleCopyAddress = async () => {
    const wallet = getCurrentWallet();
    if (!wallet) return;

    try {
      await navigator.clipboard.writeText(wallet.wallet_address);
      setCopiedAddress(true);
      toast.success("Address copied to clipboard!");
      setTimeout(() => setCopiedAddress(false), 2000);
    } catch (err) {
      toast.error("Failed to copy address");
    }
  };

  const recentDeposits = [
    { crypto: "BTC", amount: "0.15", usd: "$2,000", date: "2 hours ago", status: "Confirmed" },
    { crypto: "ETH", amount: "1.5", usd: "$1,500", date: "1 day ago", status: "Confirmed" },
    { crypto: "USDT", amount: "500", usd: "$500", date: "3 days ago", status: "Pending" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 md:pb-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Deposit Funds</h1>
        <p className="text-muted-foreground">Add cryptocurrency to your staking wallet</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deposit Form */}
        <Card className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <ArrowDownCircle className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Make Deposit</h2>
              <p className="text-sm text-muted-foreground">Choose cryptocurrency</p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">Loading wallet addresses...</div>
          ) : (
            <Tabs defaultValue="BTC" className="space-y-6" onValueChange={setSelectedCrypto}>
              <TabsList className="grid grid-cols-3 w-full">
                {["BTC", "ETH", "USDT"].map((symbol) => (
                  <TabsTrigger key={symbol} value={symbol}>
                    {symbol}
                  </TabsTrigger>
                ))}
              </TabsList>

              {["BTC", "ETH", "USDT"].map((symbol) => {
                const wallet = wallets.find(w => w.crypto_symbol === symbol);
                return (
                  <TabsContent key={symbol} value={symbol} className="space-y-6">
                    {/* Amount Input */}
                    <div className="space-y-2">
                      <Label htmlFor="amount">Deposit Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder={`Enter ${symbol} amount`}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="h-12 text-lg"
                      />
                      <p className="text-sm text-muted-foreground">
                        Minimum: 0.001 {symbol}
                      </p>
                    </div>

                    {/* Deposit Address */}
                    <div className="space-y-2">
                      <Label>Your Personal Deposit Address</Label>
                      <div className="p-4 rounded-lg bg-secondary border border-border">
                        <p className="text-sm font-mono break-all mb-3">
                          {wallet?.wallet_address || "No wallet found"}
                        </p>
                        <Button
                          onClick={handleCopyAddress}
                          variant={copiedAddress ? "success" : "outline"}
                          size="sm"
                          className="w-full"
                          disabled={!wallet}
                        >
                          {copiedAddress ? (
                            <>
                              <Check className="h-4 w-4" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              Copy Address
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* QR Code Placeholder */}
                    <div className="p-6 rounded-lg bg-secondary border border-border flex flex-col items-center justify-center">
                      <div className="w-48 h-48 rounded-lg bg-background/50 flex items-center justify-center mb-3">
                        <Wallet className="h-16 w-16 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground text-center">
                        Scan QR code to deposit {symbol}
                      </p>
                    </div>

                    <Button variant="gradient" size="lg" className="w-full">
                      Confirm Deposit
                    </Button>
                  </TabsContent>
                );
              })}
            </Tabs>
          )}
        </Card>

        {/* Info & History */}
        <div className="space-y-6">
          {/* Important Info */}
          <Card className="glass-card p-6">
            <h3 className="font-bold mb-4">Important Information</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                <p>Send only {selectedCrypto} to this address. Other assets will be lost.</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                <p>Minimum deposit: 0.001 {selectedCrypto}</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                <p>Your deposit will be credited after 3 network confirmations</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                <p>Processing time: 10-30 minutes</p>
              </div>
            </div>
          </Card>

          {/* Network Info */}
          <Card className="glass-card p-6">
            <h3 className="font-bold mb-4">Network Information</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Network</span>
                <span className="font-medium">
                  {selectedCrypto === "BTC" ? "Bitcoin" : "Ethereum (ERC-20)"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Confirmations</span>
                <span className="font-medium">3 blocks</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Deposit Fee</span>
                <span className="font-medium text-success">Free</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Deposits */}
      <Card className="glass-card p-6">
        <h2 className="text-xl font-bold mb-6">Recent Deposits</h2>
        <div className="space-y-3">
          {recentDeposits.map((deposit, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-lg hover:bg-secondary/50 transition-all border border-border/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                  <Bitcoin className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium">
                    {deposit.amount} {deposit.crypto}
                  </p>
                  <p className="text-sm text-muted-foreground">{deposit.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">{deposit.usd}</p>
                <p
                  className={`text-sm ${
                    deposit.status === "Confirmed" ? "text-success" : "text-warning"
                  }`}
                >
                  {deposit.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Deposit;
