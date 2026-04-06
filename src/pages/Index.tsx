import { useState } from "react";
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

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [overlay, setOverlay] = useState<string | null>(null);

  const handleNavigate = (screen: string) => {
    if (["breathe", "grounding", "shredder", "sounds", "sos"].includes(screen)) {
      setOverlay(screen);
    } else if (screen === "journal-new") {
      setActiveTab("journal");
    } else if (screen === "therapists") {
      setActiveTab("counselling");
    }
  };

  const closeOverlay = () => setOverlay(null);

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative overflow-x-hidden">
      {/* Tab content */}
      <div className="min-h-screen">
        {activeTab === "home" && <HomeTab onNavigate={handleNavigate} />}
        {activeTab === "meditate" && <MeditateTab onNavigate={handleNavigate} />}
        {activeTab === "calm" && <CalmTab onNavigate={handleNavigate} />}
        {activeTab === "journal" && <JournalTab onNavigate={handleNavigate} />}
        {activeTab === "counselling" && <CounsellingTab onNavigate={handleNavigate} />}
      </div>

      {/* Bottom nav */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* SOS floating button */}
      <SOSButton onClick={() => setOverlay("sos")} />

      {/* Full-screen overlays */}
      {overlay === "breathe" && <BreatheScreen onClose={closeOverlay} />}
      {overlay === "sos" && <SOSScreen onClose={closeOverlay} />}
      {overlay === "grounding" && <GroundingScreen onClose={closeOverlay} />}
      {overlay === "shredder" && <ShredderScreen onClose={closeOverlay} />}
      {overlay === "sounds" && <SoundsScreen onClose={closeOverlay} />}
    </div>
  );
};

export default Index;
