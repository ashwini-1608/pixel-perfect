import SparkleIcon from "./SparkleIcon";

interface CloudSceneProps {
  children?: React.ReactNode;
  bgColor?: string;
}

const Cloud = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 80" className={className} fill="white">
    <ellipse cx="60" cy="55" rx="55" ry="25" />
    <ellipse cx="100" cy="40" rx="40" ry="22" />
    <ellipse cx="140" cy="55" rx="50" ry="25" />
    <ellipse cx="90" cy="60" rx="60" ry="20" />
  </svg>
);

const PinkCloud = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 160 60" className={className} fill="#F9D5D3">
    <ellipse cx="50" cy="40" rx="45" ry="20" />
    <ellipse cx="90" cy="30" rx="35" ry="18" />
    <ellipse cx="110" cy="40" rx="40" ry="20" />
  </svg>
);

const CloudScene = ({ children, bgColor = "bg-sera-sky" }: CloudSceneProps) => (
  <div className={`relative w-full overflow-hidden ${bgColor} rounded-b-[2rem]`} style={{ minHeight: "280px" }}>
    <SparkleIcon size={20} color="#F5C518" className="absolute top-8 left-8 z-10" />
    <SparkleIcon size={14} color="#FFFFFF" className="absolute top-16 right-12 z-10" style={{ animationDelay: "0.5s" }} />
    <SparkleIcon size={12} color="#F5C518" className="absolute top-24 left-1/4 z-10" style={{ animationDelay: "1s" }} />

    <Cloud className="absolute -bottom-2 -left-8 w-40 opacity-90 animate-cloud-drift" />
    <Cloud className="absolute -bottom-2 -right-8 w-44 opacity-90 animate-cloud-drift" style={{ animationDelay: "1s" }} />
    <PinkCloud className="absolute bottom-8 left-1/4 w-28 opacity-60 animate-cloud-drift" style={{ animationDelay: "2s" }} />
    <Cloud className="absolute -bottom-4 left-1/3 w-36 opacity-80 animate-cloud-drift" style={{ animationDelay: "0.5s" }} />

    <div className="relative z-20 flex flex-col items-center justify-center py-10">
      {children}
    </div>
  </div>
);

export default CloudScene;
