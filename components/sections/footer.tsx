"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Facebook, Instagram, Linkedin, Send, Twitter, Phone, Mail } from "lucide-react"

export function Footer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('form-name', 'newsletter');
      formData.append('email', email);

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });
      setEmail('');
      alert('Thank you for subscribing to our newsletter!');
    } catch (error) {
      alert('Sorry, there was an error subscribing to the newsletter. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative border-t bg-black text-white transition-colors duration-300 overflow-hidden">
      {/* Background Logo */}
      <div className="absolute -top-1/4 -right-1/4 opacity-[0.05] pointer-events-none">
        <img 
          src="https://bfwzpu8tdp.ufs.sh/f/OG8qQan1SdOPb7mMbkfSikGlrxucTB4snZpdagz83tVJbAI0"
          alt="Sonham Logo Background"
          className="w-[800px] brightness-0 invert"
        />
      </div>
      
      <div className="container relative mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo */}
          <div className="col-span-full mb-4">
            <img 
              src="https://bfwzpu8tdp.ufs.sh/f/OG8qQan1SdOPb7mMbkfSikGlrxucTB4snZpdagz83tVJbAI0"
              alt="Sonham Logo" 
              className="w-16 brightness-0 invert"
            />
          </div>
          
          <div className="lg:col-span-2 lg:pr-8">
            <h2 className="mb-3 text-2xl font-bold tracking-tight">Stay Connected</h2>
            <p className="mb-4 text-sm text-white/70">
              Join our newsletter for the latest updates and exclusive offers.
            </p>
            <form 
              name="newsletter"
              method="POST"
              data-netlify="true"
              className="relative"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="newsletter" />
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="pr-12 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold">Menu</h3>
            <nav className="space-y-2 text-sm">
              <a href="#about" className="block transition-colors hover:text-white/80">
                About
              </a>
              <a href="#services" className="block transition-colors hover:text-white/80">
                What we offer
              </a>
              <a href="#gallery" className="block transition-colors hover:text-white/80">
                Gallery
              </a>
            </nav>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4" />
                <a href="tel:03308084344" className="text-sm hover:text-white/80">0330 808 4344</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@sonhamgroup.com" className="text-sm hover:text-white/80">info@sonhamgroup.com</a>
              </div>
            </div>
          </div>
          <div className="relative">
            <h3 className="mb-3 text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full h-8 w-8 border-white/20 bg-white/10 hover:bg-white/20">
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full h-8 w-8 border-white/20 bg-white/10 hover:bg-white/20">
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full h-8 w-8 border-white/20 bg-white/10 hover:bg-white/20">
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full h-8 w-8 border-white/20 bg-white/10 hover:bg-white/20">
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect with us on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center md:flex-row">
          <p className="text-sm text-white/70">
            © 2025 Sonham Group. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="#" className="transition-colors hover:text-white/80">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-white/80">
              Terms of Service
            </a>
            <a href="#" className="transition-colors hover:text-white/80">
              Cookie Settings
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
