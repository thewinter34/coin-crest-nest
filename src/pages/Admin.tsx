import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Shield, 
  Activity, 
  TrendingUp,
  Mail,
  Wallet
} from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { useToast } from "@/hooks/use-toast";

interface UserWithRole {
  id: string;
  email: string;
  created_at: string;
  roles: string[];
}

const Admin = () => {
  const navigate = useNavigate();
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalWallets: 0,
    activeUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      navigate("/dashboard");
    }
  }, [isAdmin, adminLoading, navigate, toast]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    try {
      // Fetch users with their roles
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("id, email, created_at");

      if (profilesError) throw profilesError;

      const { data: rolesData, error: rolesError } = await supabase
        .from("user_roles")
        .select("user_id, role");

      if (rolesError) throw rolesError;

      // Combine users with their roles
      const usersWithRoles = profilesData?.map(profile => ({
        ...profile,
        roles: rolesData?.filter(r => r.user_id === profile.id).map(r => r.role) || []
      })) || [];

      setUsers(usersWithRoles);

      // Fetch stats
      const { count: walletsCount } = await supabase
        .from("user_wallets")
        .select("*", { count: "exact", head: true });

      setStats({
        totalUsers: profilesData?.length || 0,
        totalWallets: walletsCount || 0,
        activeUsers: profilesData?.length || 0
      });
    } catch (error) {
      console.error("Error fetching admin data:", error);
      toast({
        title: "Error",
        description: "Failed to load admin data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleAdminRole = async (userId: string, currentRoles: string[]) => {
    const isCurrentlyAdmin = currentRoles.includes("admin");
    
    try {
      if (isCurrentlyAdmin) {
        await supabase
          .from("user_roles")
          .delete()
          .eq("user_id", userId)
          .eq("role", "admin");
      } else {
        await supabase
          .from("user_roles")
          .insert({ user_id: userId, role: "admin" });
      }

      toast({
        title: "Success",
        description: `Admin role ${isCurrentlyAdmin ? "removed" : "granted"} successfully.`,
      });

      fetchData();
    } catch (error) {
      console.error("Error updating role:", error);
      toast({
        title: "Error",
        description: "Failed to update user role.",
        variant: "destructive",
      });
    }
  };

  if (adminLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="space-y-6 md:space-y-8 pb-20 md:pb-8 px-4 md:px-0">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Manage users and monitor system activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers.toString()}
          subtitle="Registered accounts"
          icon={Users}
        />
        <StatsCard
          title="Total Wallets"
          value={stats.totalWallets.toString()}
          subtitle="Active wallets"
          icon={Wallet}
        />
        <StatsCard
          title="Active Users"
          value={stats.activeUsers.toString()}
          subtitle="Last 30 days"
          icon={Activity}
        />
      </div>

      {/* User Management */}
      <Card className="glass-card p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold mb-1">User Management</h3>
            <p className="text-sm text-muted-foreground">Manage user roles and permissions</p>
          </div>
          <Shield className="h-6 w-6 text-primary" />
        </div>

        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border/50 gap-3"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm md:text-base truncate">{user.email}</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {user.roles.map((role) => (
                      <span
                        key={role}
                        className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <Button
                variant={user.roles.includes("admin") ? "destructive" : "outline"}
                size="sm"
                onClick={() => toggleAdminRole(user.id, user.roles)}
                className="w-full sm:w-auto"
              >
                {user.roles.includes("admin") ? "Remove Admin" : "Make Admin"}
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Admin;
