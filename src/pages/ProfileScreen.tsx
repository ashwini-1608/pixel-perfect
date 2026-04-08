import { useState, useEffect } from "react";
import { ArrowLeft, LogOut, User, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProfileScreenProps {
  onClose: () => void;
}

const ProfileScreen = ({ onClose }: ProfileScreenProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setEmail(user.email ?? "");
        setName(user.user_metadata?.name ?? "");
      }
    });
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({ title: "Error signing out", description: error.message });
      setLoggingOut(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      <div className="max-w-md mx-auto">
        <div
          className="px-5 pt-8 pb-6 rounded-b-[2rem]"
          style={{ background: "linear-gradient(180deg, #4C1D95 0%, #3B0764 100%)" }}
        >
          <button onClick={onClose} className="mb-4">
            <ArrowLeft size={22} className="text-card-foreground/70" />
          </button>
          <h1 className="text-2xl font-heading font-bold text-card-foreground">Profile</h1>
          <p className="text-card-foreground/70 text-sm mt-1 font-body">Your account</p>
        </div>

        <div className="px-5 mt-6 space-y-4">
          {/* Avatar / initials */}
          <div className="flex justify-center mb-2">
            <div className="w-20 h-20 rounded-full bg-card flex items-center justify-center">
              <span className="text-3xl font-heading font-bold text-card-foreground">
                {name ? name.charAt(0).toUpperCase() : <User size={32} />}
              </span>
            </div>
          </div>

          {/* Info cards */}
          <div className="bg-card rounded-2xl p-4 flex items-center gap-3">
            <User size={18} className="text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground font-body">Name</p>
              <p className="text-sm text-card-foreground font-body truncate">{name || "—"}</p>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-4 flex items-center gap-3">
            <Mail size={18} className="text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground font-body">Email</p>
              <p className="text-sm text-card-foreground font-body truncate">{email || "—"}</p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full mt-8 py-3.5 rounded-2xl bg-destructive/15 text-destructive font-body font-medium text-sm flex items-center justify-center gap-2 hover:bg-destructive/25 transition-colors disabled:opacity-50"
          >
            <LogOut size={18} />
            {loggingOut ? "Signing out…" : "Sign Out"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
