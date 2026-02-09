import { Heart, Github, Linkedin, Twitter, Mail } from "lucide-react";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/de-jayson", username: "Daniel Nortei Dowuona" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/daniel-dowuona-1b659925b", username: "Daniel Dowuona" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/_de_jayson", username: "@de_jayson" },
  { icon: Mail, label: "Email", href: "mailto:danieldowuona21@gmail.com", username: "Daniel Nortei Dowuona" },
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-border bg-card/50" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
              className="text-2xl font-bold gradient-text inline-block mb-4"
              data-testid="link-footer-logo"
            >
              {">>> Daniel"}
            </a>
            <p className="text-muted-foreground text-sm max-w-xs">
              Backend Developer crafting digital experiences with passion and precision.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <nav className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm text-muted-foreground text-left transition-colors"
                  data-testid={`link-footer-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-secondary/50 text-muted-foreground transition-colors"
                  data-testid={`link-footer-${link.label.toLowerCase()}`}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Daniel Developer. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500" /> and lots of coffee
          </p>
        </div>
      </div>
    </footer>
  );
}
