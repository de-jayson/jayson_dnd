import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TerminalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const commands: Record<string, string> = {
  help: `Available commands:
  help     - Show this help message
  about    - About me
  skills   - List my skills
  projects - View my projects
  contact  - Contact information
  socials  - My social links
  clear    - Clear terminal
  exit     - Close terminal`,
  about: `> daniel Developer
  Backend Developer | Python programmer | Problem Solver
  
  Passionate about creating beautiful, functional web experiences.
  2+ years of experience in modern web technologies.`,
  skills: `> Technical Skills:
  Languages:   Python, HTML/CSS, Javascript 
  Frontend:    HTML/CSS
  Backend:     Node.js, Django, PostgreSQL, MongoDB
  Cloud:       AWS, Docker, Jenkins
  AI/ML:       TensorFlow, PyTorch, OpenAI API`,
  projects: `> Featured Projects:
  1. Campus Event Management System - Full-stack solution with React & Node
  2. AI Lane and Curve Detector - Real-time analytics with ML integration
  3. Ride App - Mobile-first ride platform called RydeMe
  4. Church Accounts Management System - Web app for church finances.....Upcoming..
  
  Type 'contact' to get in touch about collaborations.`,
  contact: `> Contact Information:
  Email:    danieldowuona21@gmail.com
  GitHub:   github.com/de-jayson
  LinkedIn: linkedin.com/in/daniel-dowuona-1b659925b
  Twitter:  @_de_jayson`,
  socials: `> Social Links:
  GitHub:   https://github.com/de-jayson
  LinkedIn: https://linkedin.com/in/daniel-dowuona-1b659925b
  Twitter:  https://twitter.com/_de_jayson
  Dev.to:   https://dev.to/de_jayson`,
};

export function TerminalOverlay({ isOpen, onClose }: TerminalOverlayProps) {
  const [history, setHistory] = useState<string[]>([
    "Welcome to Daniel's Terminal Portfolio v1.0.0",
    "Type 'help' for available commands.",
    "",
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory = [...history, `$ ${cmd}`];

    if (trimmedCmd === "clear") {
      setHistory([]);
    } else if (trimmedCmd === "exit") {
      onClose();
    } else if (commands[trimmedCmd]) {
      newHistory.push(commands[trimmedCmd], "");
      setHistory(newHistory);
    } else if (trimmedCmd) {
      newHistory.push(`Command not found: ${trimmedCmd}`, "Type 'help' for available commands.", "");
      setHistory(newHistory);
    }

    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      data-testid="terminal-overlay"
    >
      <div
        className="w-full max-w-3xl h-[500px] terminal-overlay rounded-lg overflow-hidden border border-neon-green/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-2 px-4 py-2 bg-black/50 border-b border-neon-green/20">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="terminal-text text-sm font-mono">daniel@Portfolio:~</span>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            className="text-neon-green/70"
            data-testid="button-close-terminal"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div
          ref={terminalRef}
          className="h-[calc(100%-88px)] overflow-y-auto p-4 font-mono text-sm"
        >
          {history.map((line, i) => (
            <div key={i} className="terminal-text whitespace-pre-wrap">
              {line}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 p-4 border-t border-neon-green/20">
          <span className="terminal-text">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none terminal-text placeholder:text-neon-green/30"
            placeholder="Type a command..."
            autoComplete="off"
            spellCheck={false}
            data-testid="input-terminal-command"
          />
        </div>
      </div>
    </div>
  );
}
