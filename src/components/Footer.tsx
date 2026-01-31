const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full px-4 md:px-8 py-6 border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          © {currentYear} MiniBot PC. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
