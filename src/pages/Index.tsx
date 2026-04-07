import { useState, useEffect } from "react";
import BottomNav, { type TabId } from "@/components/BottomNav";
import SOSButton from "@/components/SOSButton";
import HomeTab from "@/pages/HomeTab";
import MeditateTab from "@/pages/MeditateTab";
import CalmTab from "@/pages/CalmTab";
import JournalTab from "@/pages/JournalTab";
import CounsellingTab from "@/pages/CounsellingTab";
import BreatheScreen from "@/pages/BreatheScreen";
import SOSScreen from "@/pages/SOSScreen";
import GroundingScreen from "@/pages/GroundingScreen";
import ShredderScreen from "@/pages/ShredderScreen";
import SoundsScreen from "@/pages/SoundsScreen";
import TherapistBookingScreen from "@/pages/TherapistBookingScreen";
import JournalNewScreen from "@/pages/JournalNewScreen";
import OnboardingScreen from "@/pages/OnboardingScreen";
import LoginScreen from "@/pages/LoginScreen";
import { supabase } from "@/integrations/supabase/client";

type AppScreen = "onboarding" | "login" | "app";

const Index = () => {
  const [screen, setScreen] = useState<AppScreen>(() => {
    const seen = localStorage.getItem("sera_onboarded");
    if (seen) return "app";
    return "onboarding";
  });
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [overlay, setOverlay] = useState<string | null>(null);

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session) {
          localStorage.setItem("sera_onboarded", "true");
          setScreen("app");
        }
        if (event === "SIGNED_OUT") {
          setScreen("login");
        }
      }
    );

    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        localStorage.setItem("sera_onboarded", "true");
        setScreen("app");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleOnboardingComplete = () => setScreen("login");

  const handleLogin = () => {
    localStorage.setItem("sera_onboarded", "true");
    setScreen("app");
  };

  const handleNavigate = (navScreen: string) => {
    if (["breathe", "grounding", "shredder", "sounds", "sos", "therapists", "journal-new"].includes(navScreen)) {
      setOverlay(navScreen);
    }
  };

  const closeOverlay = () => setOverlay(null);

  if (screen === "onboarding") {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  if (screen === "login") {
    return <LoginScreen onLogin={handleLogin} onBack={() => setScreen("onboarding")} />;
  }

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative overflow-x-hidden">
      <div className="min-h-screen">
        {activeTab === "home" && <HomeTab onNavigate={handleNavigate} />}
        {activeTab === "meditate" && <MeditateTab onNavigate={handleNavigate} />}
        {activeTab === "calm" && <CalmTab onNavigate={handleNavigate} />}
        {activeTab === "journal" && <JournalTab onNavigate={handleNavigate} />}
        {activeTab === "counselling" && <CounsellingTab onNavigate={handleNavigate} />}
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      <SOSButton onClick={() => setOverlay("sos")} />

      {overlay === "breathe" && <BreatheScreen onClose={closeOverlay} />}
      {overlay === "sos" && <SOSScreen onClose={closeOverlay} />}
      {overlay === "grounding" && <GroundingScreen onClose={closeOverlay} />}
      {overlay === "shredder" && <ShredderScreen onClose={closeOverlay} />}
      {overlay === "sounds" && <SoundsScreen onClose={closeOverlay} />}
    </div>
  );
};

export default Index;
