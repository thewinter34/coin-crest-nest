import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpCircle, AlertCircle, Bitcoin } from "lucide-react";
import { toast } from "sonner";

const cryptos = [
  { symbol: "BTC", name: "Bitcoin", available: "0.85", fee: "0.0005", feePercent: "0.5%" },
  { symbol: "ETH", name: "Ethereum", available: "12.5", fee: "0.005", feePercent: "0.5%" },
  { symbol: "USDT", name: "Tether", available: "8500", fee: "1", feePercent: "0.5%" },
];

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState(cryptos[0]);

  const calculateNetAmount = () => {
    const withdrawAmount = parseFloat(amount) || 0;
    const feeAmount = parseFloat(selectedCrypto.fee) || 0;
    return (withdrawAmount - feeAmount).toFixed(8);
  };

  const handleWithdraw = () => {
    if (!amount || !address) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Withdrawal request submitted successfully!");
  };

  const recentWithdrawals = [
    { crypto: "BTC", amount: "0.05", usd: "$750", date: "1 day ago", status: "Completed" },
    { crypto: "ETH", amount: "0.5", usd: "$500", date: "3 days ago", status: "Completed" },
    { crypto: "USDT", amount: "250", usd: "$250", date: "5 days ago", status: "Processing" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 pb-20 md:pb-8 px-4 md:px-0">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Withdraw Funds</h1>
        <p className="text-sm md:text-base text-muted-foreground">Transfer your cryptocurrency to an external wallet</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Withdraw Form */}
        <Card className="glass-card p-4 md:p-6">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
              <ArrowUpCircle className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg md:text-xl font-bold">Request Withdrawal</h2>
              <p className="text-xs md:text-sm text-muted-foreground">Choose cryptocurrency</p>
            </div>
          </div>

          <Tabs defaultValue="BTC" className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full">
              {cryptos.map((crypto) => (
                <TabsTrigger
                  key={crypto.symbol}
                  value={crypto.symbol}
                  onClick={() => setSelectedCrypto(crypto)}
                >
                  {crypto.symbol}
                </TabsTrigger>
              ))}
            </TabsList>

            {cryptos.map((crypto) => (
              <TabsContent key={crypto.symbol} value={crypto.symbol} className="space-y-6">
                {/* Available Balance */}
                <div className="p-3 md:p-4 rounded-lg bg-secondary border border-border">
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">Available Balance</p>
                  <p className="text-xl md:text-2xl font-bold">
                    {crypto.available} {crypto.symbol}
                  </p>
                </div>

                {/* Withdrawal Address */}
                <div className="space-y-2">
                  <Label htmlFor="address">Withdrawal Address</Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder={`Enter ${crypto.symbol} address`}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="h-12 font-mono text-sm"
                  />
                </div>

                {/* Amount Input */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="amount">Withdrawal Amount</Label>
                    <button
                      onClick={() => setAmount(crypto.available)}
                      className="text-sm text-primary hover:underline"
                    >
                      Max
                    </button>
                  </div>
                  <Input
                    id="amount"
                    type="number"
                    placeholder={`Enter ${crypto.symbol} amount`}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="h-12 text-lg"
                  />
                  <p className="text-sm text-muted-foreground">
                    Minimum: 0.001 {crypto.symbol}
                  </p>
                </div>

                {/* Fee Breakdown */}
                <div className="space-y-2 md:space-y-3 p-3 md:p-4 rounded-lg bg-secondary border border-border">
                  <div className="flex items-center justify-between text-xs md:text-sm">
                    <span className="text-muted-foreground">Withdrawal Amount</span>
                    <span className="font-medium">{amount || "0"} {crypto.symbol}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Network Fee ({crypto.feePercent})</span>
                    <span className="font-medium text-warning">-{crypto.fee} {crypto.symbol}</span>
                  </div>
                  <div className="pt-2 md:pt-3 border-t border-border flex items-center justify-between">
                    <span className="font-medium text-sm md:text-base">You'll Receive</span>
                    <span className="text-lg md:text-xl font-bold text-success">
                      {calculateNetAmount()} {crypto.symbol}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleWithdraw}
                  variant="gradient"
                  size="lg"
                  className="w-full"
                >
                  Confirm Withdrawal
                </Button>
              </TabsContent>
            ))}
          </Tabs>
        </Card>

        {/* Info & Limits */}
        <div className="space-y-4 md:space-y-6">
          {/* Important Info */}
          <Card className="glass-card p-4 md:p-6">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <AlertCircle className="h-4 w-4 md:h-5 md:w-5 text-warning" />
              <h3 className="font-bold text-sm md:text-base">Important Information</h3>
            </div>
            <div className="space-y-2 md:space-y-3 text-xs md:text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1 md:mt-1.5 flex-shrink-0" />
                <p>Double-check the withdrawal address. Transactions cannot be reversed.</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                <p>Minimum withdrawal: 0.001 {selectedCrypto.symbol}</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                <p>Processing time: 10-30 minutes</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                <p>Network fee: {selectedCrypto.feePercent} of withdrawal amount</p>
              </div>
            </div>
          </Card>

          {/* Withdrawal Limits */}
          <Card className="glass-card p-4 md:p-6">
            <h3 className="font-bold text-sm md:text-base mb-3 md:mb-4">Withdrawal Limits</h3>
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center justify-between text-xs md:text-sm">
                <span className="text-muted-foreground">Daily Limit</span>
                <span className="font-medium">10 {selectedCrypto.symbol}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Used Today</span>
                <span className="font-medium">0 {selectedCrypto.symbol}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Remaining</span>
                <span className="font-medium text-success">10 {selectedCrypto.symbol}</span>
              </div>
            </div>
            <div className="w-full bg-secondary rounded-full h-2 overflow-hidden mt-4">
              <div className="bg-success h-full rounded-full transition-all" style={{ width: '0%' }} />
            </div>
          </Card>

          {/* Network Info */}
          <Card className="glass-card p-4 md:p-6">
            <h3 className="font-bold text-sm md:text-base mb-3 md:mb-4">Network Information</h3>
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center justify-between text-xs md:text-sm">
                <span className="text-muted-foreground">Network</span>
                <span className="font-medium">
                  {selectedCrypto.symbol === "BTC" ? "Bitcoin" : "Ethereum (ERC-20)"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Confirmations</span>
                <span className="font-medium">3 blocks</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Fee</span>
                <span className="font-medium">{selectedCrypto.feePercent}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Withdrawals */}
      <Card className="glass-card p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Recent Withdrawals</h2>
        <div className="space-y-3">
          {recentWithdrawals.map((withdrawal, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 md:p-4 rounded-lg hover:bg-secondary/50 transition-all border border-border/50"
            >
              <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                  <Bitcoin className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm md:text-base">
                    {withdrawal.amount} {withdrawal.crypto}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">{withdrawal.date}</p>
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-2">
                <p className="font-bold text-sm md:text-base">{withdrawal.usd}</p>
                <p
                  className={`text-xs md:text-sm ${
                    withdrawal.status === "Completed" ? "text-success" : "text-warning"
                  }`}
                >
                  {withdrawal.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Withdraw;
