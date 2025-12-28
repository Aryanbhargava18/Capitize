import React from "react";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/hero";
import {
  BarChart3,
  Receipt,
  PieChart,
  CreditCard,
  Globe,
  Zap,
  Shield,
  Sparkles,
  TrendingUp,
  ArrowRight,
  Check,
  Star,
} from "lucide-react";

const LandingPage = () => {
  const features = [
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Advanced Analytics",
      description:
        "Get detailed insights into your spending patterns with AI-powered analytics and predictive modeling.",
      gradient: "from-white to-black",
    },
    {
      icon: <Receipt className="h-8 w-8 text-gray-900" />,
      title: "Smart Receipt Scanner",
      description:
        "Extract data automatically from receipts using advanced AI technology. Just snap and go.",
      gradient: "from-white to-black",
    },
    {
      icon: <PieChart className="h-8 w-8 text-gray-900" />,
      title: "Intelligent Budgeting",
      description:
        "Create and manage budgets with AI recommendations that adapt to your spending habits.",
      gradient: "from-white to-black",
    },
    {
      icon: <CreditCard className="h-8 w-8 text-gray-900" />,
      title: "Multi-Account Support",
      description:
        "Manage multiple accounts, credit cards, and investments all in one unified dashboard.",
      gradient: "from-white to-black",
    },
    {
      icon: <Globe className="h-8 w-8 text-gray-900" />,
      title: "Multi-Currency",
      description:
        "Support for multiple currencies with real-time conversion rates and international transactions.",
      gradient: "from-white to-black",
    },
    {
      icon: <Zap className="h-8 w-8 text-gray-900" />,
      title: "Automated Insights",
      description:
        "Get automated financial insights, alerts, and recommendations powered by machine learning.",
      gradient: "from-white to-black",
    },
  ];

  const steps = [
    {
      number: "01",
      icon: <CreditCard className="h-6 w-6 text-gray-900" />,
      title: "Connect Your Accounts",
      description:
        "Get started in minutes with our simple and secure sign-up process",
    },
    {
      number: "02",
      icon: <BarChart3 className="h-6 w-6 text-gray-900" />,
      title: "AI Analyzes Everything",
      description:
        "Automatically categorize and track your transactions in real-time.",
    },
    {
      number: "03",
      icon: <Sparkles className="h-6 w-6 text-gray-900" />,
      title: "Get Smart Insights",
      description:
        "Receive AI-powered insights and recommendations to optimize your finances",
    },
  ];

  const testimonials = [
    {
      name: "Sanath Waraikar",
      role: "Small Business Owner",
      image: "/Sanath.jpeg",
      quote:
        "Capitize has transformed how I manage my business finances. The AI insights have helped me identify cost-saving opportunities I never knew existed.",
      rating: 5,
    },
    {
      name: "Harshit Kudhial",
      role: "Freelancer",
      image: "/Harshit.jpeg",
      quote:
        "The receipt scanning feature saves me hours each month. Now I can focus on my work instead of manual data entry and expense tracking.",
      rating: 5,
    },
    {
      name: "Prajjwal Tripathi",
      role: "Freelancer",
      image: "/Prajjwal.jpeg",
      quote:
        "I recommend Capitize to all my clients. The multi-currency support and detailed analytics make it perfect for international clients.",
      rating: 5,
    },
  ];

  const benefits = [
    "Real-time transaction tracking",
    "AI-powered expense categorization",
    "Automated budget recommendations",
    "Smart savings goals",
    "Multi-currency support",
    "Bank-level security",
    "Receipt scanning with AI",
    "Customizable reports",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-white to-violet-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-900 text-sm font-medium mb-4 border border-gray-300">
              <Sparkles className="w-4 h-4" />
              Powerful Features
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Everything You Need to
              <span className="block text-gray-900 mt-2">Master Your Finances</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive financial management tools powered by cutting-edge AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-violet-200 overflow-hidden"
              >
                <CardContent className="p-8 space-y-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-900 text-sm font-medium mb-4 border border-gray-300">
              <Zap className="w-4 h-4" />
              Simple Process
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Get Started in
              <span className="block text-gray-900 mt-2">3 Simple Steps</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start managing your finances smarter in minutes, not hours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-violet-200 to-purple-200 -z-10"></div>
                )}
                <div className="text-center space-y-6">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-purple-400 rounded-full blur-xl opacity-30"></div>
                    <div className="relative w-20 h-20 rounded-full bg-black flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {step.number}
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 border border-gray-300 flex items-center justify-center mx-auto">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-900 text-sm font-medium mb-4 border border-gray-300">
                <Shield className="w-4 h-4" />
                Why Choose Capitize
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Built for
                <span className="block text-gray-900 mt-2">Modern Finance</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Experience the future of financial management with AI-powered insights, 
                automated tracking, and intelligent recommendations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gray-300 rounded-3xl blur-2xl opacity-10"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-200">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-100 rounded-xl border border-gray-200">
                    <div>
                      <div className="text-sm text-gray-600">Total Balance</div>
                      <div className="text-3xl font-bold text-gray-900">₹2,45,800</div>
                    </div>
                    <TrendingUp className="w-12 h-12 text-gray-900" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">Income</div>
                      <div className="text-xl font-bold text-green-600">+₹52,000</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">Expenses</div>
                      <div className="text-xl font-bold text-red-600">-₹24,500</div>
                    </div>
                  </div>
                  <div className="h-48 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
                    <BarChart3 className="w-16 h-16 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-900 text-sm font-medium mb-4 border border-gray-300">
              <Star className="w-4 h-4" />
              What Our Users Say
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Loved by
              <span className="block text-gray-900 mt-2">Our Users</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what our users have to say about their experience with Capitize
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 border-2 hover:border-gray-400"
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed italic">
  {'“'}
  {testimonial.quote}
  {'”'}
</p>

                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full border-2 border-gray-300"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Ready to Transform
            <span className="block mt-2">Your Finances?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Start managing your finances smarter with Capitize. 
            Get started today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Start Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            {/* <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold"
            >
              Learn More
            </Button> */}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
