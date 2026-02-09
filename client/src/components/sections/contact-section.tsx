import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mail, Github, Linkedin, Twitter, Send, MapPin, Phone, Loader2 } from "lucide-react";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/de-jayson", username: "Daniel Nortei Dowuona" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/daniel-dowuona-1b659925b", username: "Daniel Dowuona" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/_de_jayson", username: "@de_jayson" },
  { icon: Mail, label: "Email", href: "mailto:danieldowuona21@gmail.com", username: "Daniel Nortei Dowuona" },
];

const contactInfo = [
  { icon: Mail, label: "Email", value: "danieldowuona21@gmail.com" },
  { icon: Phone, label: "Phone", value: "+233 59 367 2368" },
  { icon: MapPin, label: "Location", value: "Accra, GHANA" },
];

export function ContactSection() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    mutation.mutate(data);
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32"
      data-testid="section-contact"
    >
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider mb-4 block">
            // Get In Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's create something amazing together
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <Card className="glass">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                
                <div className="space-y-4 mb-8">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-6">
                  <h4 className="text-sm font-medium mb-4">Find me on</h4>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-3 rounded-lg bg-secondary/50 transition-all duration-300"
                        data-testid={`link-social-${link.label.toLowerCase()}`}
                      >
                        <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold mb-2">Available for hire</p>
                    <p className="text-muted-foreground">Open to new opportunities</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-6">Send me a message</h3>
              
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                    <Send className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Message Sent!</h4>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. I'll respond as soon as possible.
                  </p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              className="bg-secondary/50"
                              data-testid="input-contact-name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              className="bg-secondary/50"
                              data-testid="input-contact-email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell me about your project..."
                              className="min-h-[150px] bg-secondary/50 resize-none"
                              data-testid="input-contact-message"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full gap-2 neon-glow"
                      disabled={mutation.isPending}
                      data-testid="button-send-message"
                    >
                      {mutation.isPending ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
