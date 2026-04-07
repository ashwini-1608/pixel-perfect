import { useState } from "react";
import MascotSera from "@/components/MascotSera";
import CloudScene from "@/components/CloudScene";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SparkleIcon from "@/components/SparkleIcon";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface LoginScreenProps {
  onLogin: () => void;
  onBack: () => void;
}

const LoginScreen = ({ onLogin, onBack }: LoginScreenProps) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setLoading(true);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: name || "Friend" },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast({
          title: "Account created!",
          description: "Check your email to verify, or continue exploring.",
        });
        onLogin();
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onLogin();
      }
    } catch (err: any) {
      toast({
        title: mode === "login" ? "Login failed" : "Sign up failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto flex flex-col">
      <CloudScene bgColor="bg-gradient-to-b from-sera-orange/80 to-sera-orange/40">
        <MascotSera size="lg" mood="happy" className="mt-2" />
        <p className="text-white font-heading font-bold text-lg mt-2">
          {mode === "login" ? "Welcome back!" : "Nice to meet you!"}
        </p>
      </CloudScene>

      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col px-8 py-6 gap-4 animate-fade-in-up"
      >
        {mode === "signup" && (
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Your name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What should Sera call you?"
              className="h-12 rounded-xl bg-card border-border text-foreground placeholder:text-muted-foreground"
              autoFocus
            />
          </div>
        )}

        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="h-12 rounded-xl bg-card border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="h-12 rounded-xl bg-card border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-full bg-sera-orange hover:bg-sera-orange/90 text-white font-heading font-bold text-base mt-2"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : mode === "login" ? (
            "Log In"
          ) : (
            "Create Account"
          )}
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-sm text-sera-sky hover:underline"
          >
            {mode === "login"
              ? "Don't have an account? Sign up"
              : "Already have an account? Log in"}
          </button>
        </div>

        <button
          type="button"
          onClick={onLogin}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors mt-2"
        >
          Continue as guest
        </button>

        <div className="flex items-center justify-center gap-2 mt-auto pt-4">
          <SparkleIcon size={10} color="#F5C518" />
          <span className="text-xs text-muted-foreground">Your data stays private</span>
          <SparkleIcon size={10} color="#F5C518" style={{ animationDelay: "0.5s" }} />
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
