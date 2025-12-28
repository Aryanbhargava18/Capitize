"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard, Menu } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "./ui/drawer";
import { CurrencySelector } from "./currency-selector";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-xl z-50 border-b border-gray-200/50 shadow-sm">
      <nav className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0">
          <Image
            src={"/logo.png"}
            alt="Capitize Logo"
            width={200}
            height={60}
            className="h-10 md:h-12 w-auto object-contain"
            priority
          /> 
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <SignedOut>
            <a 
              href="#features" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Testimonials
            </a>
          </SignedOut>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <SignedIn>
            <CurrencySelector />
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="gap-2 border-gray-300 hover:bg-gray-100">
                <LayoutDashboard size={18} />
                Dashboard
              </Button>
            </Link>
            <Link href="/transaction/create">
              <Button size="sm" className="gap-2 bg-black hover:bg-gray-800 text-white">
                <PenBox size={18} />
                Add Transaction
              </Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline" size="sm">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9",
                },
              }}
            />
          </SignedIn>
          <Drawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Menu</DrawerTitle>
              </DrawerHeader>
              <div className="px-4 pb-4 space-y-4">
                <SignedIn>
                  <div className="mb-4">
                    <CurrencySelector />
                  </div>
                  <DrawerClose asChild>
                    <Link href="/dashboard" className="block">
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <LayoutDashboard size={18} />
                        Dashboard
                      </Button>
                    </Link>
                  </DrawerClose>
                  <DrawerClose asChild>
                    <Link href="/transaction/create" className="block">
                      <Button className="w-full justify-start gap-2 bg-black hover:bg-gray-800 text-white">
                        <PenBox size={18} />
                        Add Transaction
                      </Button>
                    </Link>
                  </DrawerClose>
                </SignedIn>
                <SignedOut>
                  <div className="space-y-2">
                    <DrawerClose asChild>
                      <a href="#features" className="block py-2 text-gray-600 hover:text-blue-600">
                        Features
                      </a>
                    </DrawerClose>
                    <DrawerClose asChild>
                      <a href="#testimonials" className="block py-2 text-gray-600 hover:text-blue-600">
                        Testimonials
                      </a>
                    </DrawerClose>
                    <DrawerClose asChild>
                      <SignInButton forceRedirectUrl="/dashboard">
                        <Button variant="outline" className="w-full">Login</Button>
                      </SignInButton>
                    </DrawerClose>
                  </div>
                </SignedOut>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
    </header>
  );
};

export default Header;
