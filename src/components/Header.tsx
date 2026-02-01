import mascot from "@/assets/mascot.png";
import SocialShare from "@/components/SocialShare";

const Header = () => {
  return (
    <header className="w-full py-6 px-4 md:px-8">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={mascot} 
            alt="MiniBot mascot" 
            className="w-10 h-10 md:w-12 md:h-12 object-contain"
          />
          <span className="text-lg md:text-xl font-bold tracking-tight text-foreground">
            MINIBOT.PC
          </span>
        </div>
        <SocialShare />
      </div>
    </header>
  );
};

export default Header;
