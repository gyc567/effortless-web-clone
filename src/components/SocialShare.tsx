import { Share2, Twitter, Facebook, Linkedin, Mail, Link2 } from "lucide-react";
import { useState } from "react";

const SocialShare = () => {
  const [showMenu, setShowMenu] = useState(false);
  const pageUrl = "https://openclaw-allinone-minipc.vercel.app/";
  const pageTitle = "MiniBot PC - Your Private AI Assistant in a Box ($199)";
  const pageDescription = "A mini PC with OpenClaw pre-installed. Run AI locally, keep your data private.";

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(pageTitle)}&url=${encodeURIComponent(pageUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(pageTitle)}&body=${encodeURIComponent(pageDescription + "\n\n" + pageUrl)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      alert("Link copied to clipboard!");
    } catch {
      prompt("Copy this link:", pageUrl);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
      >
        <Share2 className="w-4 h-4" />
        <span className="text-sm font-medium">Share</span>
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-background rounded-lg shadow-lg border border-border z-50 py-2 animate-fade-in">
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-accent transition-colors"
              onClick={() => setShowMenu(false)}
            >
              <Twitter className="w-4 h-4 text-[#1DA1F2]" />
              <span>Twitter / X</span>
            </a>
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-accent transition-colors"
              onClick={() => setShowMenu(false)}
            >
              <Facebook className="w-4 h-4 text-[#4267B2]" />
              <span>Facebook</span>
            </a>
            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-accent transition-colors"
              onClick={() => setShowMenu(false)}
            >
              <Linkedin className="w-4 h-4 text-[#0A66C2]" />
              <span>LinkedIn</span>
            </a>
            <a
              href={shareLinks.email}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-accent transition-colors"
              onClick={() => setShowMenu(false)}
            >
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>Email</span>
            </a>
            <hr className="my-2 border-border" />
            <button
              onClick={() => {
                copyToClipboard();
                setShowMenu(false);
              }}
              className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-accent transition-colors w-full text-left"
            >
              <Link2 className="w-4 h-4 text-muted-foreground" />
              <span>Copy Link</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SocialShare;
