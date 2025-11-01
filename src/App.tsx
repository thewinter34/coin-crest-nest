import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Staking from "./pages/Staking";
import Calculator from "./pages/Calculator";
import Referral from "./pages/Referral";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Layout>{children}</Layout>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/staking" element={<ProtectedRoute><Staking /></ProtectedRoute>} />
            <Route path="/calculator" element={<ProtectedRoute><Calculator /></ProtectedRoute>} />
            <Route path="/referral" element={<ProtectedRoute><Referral /></ProtectedRoute>} />
            <Route path="/deposit" element={<ProtectedRoute><Deposit /></ProtectedRoute>} />
            <Route path="/withdraw" element={<ProtectedRoute><Withdraw /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
