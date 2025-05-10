
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Timer,
  BrainCog,
  Scale,
  Wallet,
  BookOpen,
  FileText,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 scroll-smooth">
      <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-2">
            <Image src="/logo/logo.png" alt="DeEvra Logo" width={278} height={113} />
          </div>
          <nav className="hidden md:flex items-center w-full">
            <div className="flex items-center space-x-8 text-sm font-medium">
              <a href="#about" className="hover:text-blue-600 transition duration-300">About</a>
              <a href="#features" className="hover:text-blue-600 transition duration-300">Features</a>
              <a href="#blockchain" className="hover:text-blue-600 transition duration-300">Blockchain</a>
              <a href="#business" className="hover:text-blue-600 transition duration-300">Business Model</a>
            </div>
            <div className="flex items-center space-x-4 ml-auto">
              <a href="/login" className="hover:text-blue-600 transition duration-300 text-sm font-medium">Log In</a>
              <Button asChild className="transition duration-300">
                <a href="/register">Register</a>
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-6 pt-40 pb-32 space-y-12 lg:space-y-0">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-2xl space-y-8 text-center lg:text-left"
        >
          <h1 className="text-5xl md:text-6xl font-semibold leading-tight text-gray-900">
            Secure Payments for Freelancers & Clients
          </h1>
          <p className="text-gray-700 text-lg md:text-xl">
            DeEvra uses smart contracts and AI to make freelance deals safe, transparent, and automated.
          </p>
          <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white transition">
              <a href="/register">Get Started</a>
            </Button>
            <Button variant="outline" size="lg" className="hover:scale-105 transition">
              <a href="#about">Learn More</a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.15 }}
          className="w-full lg:w-1/2 flex flex-col space-y-6 border-l-2 border-gray-200 pl-8"
        >
          {[
            { icon: ShieldCheck, title: "Blockchain Escrow", desc: "Secure smart contract escrow to hold funds safely." },
            { icon: Timer, title: "Milestone Tracking", desc: "Track progress and release payments per milestone." },
            { icon: BrainCog, title: "AI Verification", desc: "AI-powered verification for completed work." },
            { icon: Scale, title: "Dispute Resolution", desc: "AI + Judge system for fair dispute outcomes." },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp}>
              <HeroFeature icon={<item.icon className="w-7 h-7 text-black" />} title={item.title} description={item.desc} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* About Section */}
      <SectionWrapper id="about" title="Who is DeEvra?">
        <p className="text-gray-700 text-lg max-w-3xl mx-auto">
          DeEvra is the future of freelance collaboration. We combine smart contracts, AI verification, and blockchain escrow to eliminate scams, delays, and disputes.
        </p>
      </SectionWrapper>

      <div className="w-20 h-1 bg-gray-300 mx-auto my-12 rounded-full" />

      <SectionWrapper>
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900">How DeEvra Works</h2>
        <div className="flex flex-col md:flex-row md:space-x-10 space-y-10 md:space-y-0 justify-center items-center">
          <StepItem number="1" title="Client Posts Project" description="Client creates a project, sets expectations, and deposits funds into a smart contract." />
          <StepItem number="2" title="Freelancer Delivers Work" description="Freelancer submits deliverables while AI verifies the quality." />
          <StepItem number="3" title="Funds Released" description="Once approved by both parties or the judge system, funds are released." />
        </div>
      </SectionWrapper>

      <SectionWrapper id="features" title="Key Features">
        <div className="grid gap-8 md:grid-cols-3">
          <FeatureCard icon={<ShieldCheck className="w-8 h-8 text-black mx-auto" />} title="Secure Escrow" description="Smart contracts hold funds securely until work is verified." />
          <FeatureCard icon={<BrainCog className="w-8 h-8 text-black mx-auto" />} title="AI Verification" description="AI checks project completion before funds release." />
          <FeatureCard icon={<Scale className="w-8 h-8 text-black mx-auto" />} title="Dispute Resolution" description="AI & human judges for fair outcomes." />
        </div>
      </SectionWrapper>

      <SectionWrapper id="blockchain" title="Our Blockchain Choice">
        <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-10">
          Polygon for scalability and low fees. Ethereum and Solana for future flexibility.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          <FeatureCard icon={<Image src="/crypto/polygon.png" alt="Polygon" width={40} height={40} className="mx-auto" />} title="Polygon" description="Low fees, fast, EVM-compatible." />
          <FeatureCard icon={<Image src="/crypto/ethereum.png" alt="Ethereum" width={40} height={40} className="mx-auto" />} title="Ethereum" description="High security, trusted." />
          <FeatureCard icon={<Image src="/crypto/solana.png" alt="Solana" width={40} height={40} className="mx-auto" />} title="Solana" description="High speed, low cost." />
        </div>
      </SectionWrapper>

      <SectionWrapper id="business" title="Business Model">
        <div className="flex flex-col md:flex-row justify-center md:space-x-10 space-y-10 md:space-y-0">
          <BusinessModelItem icon={<BookOpen className="w-10 h-10 text-black mx-auto" />} title="Transaction Fees" description="Low 1–5% fee, lower than competitors." />
          <BusinessModelItem icon={<FileText className="w-10 h-10 text-black mx-auto" />} title="SaaS Licensing" description="Enterprise licensing for freelance platforms." />
          <BusinessModelItem icon={<Wallet className="w-10 h-10 text-black mx-auto" />} title="API Access" description="API for third-party integrations." />
        </div>
      </SectionWrapper>

      <SectionWrapper id="cta" title="Build Trust. Get Paid. Work Freely.">
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Join DeEvra today and experience secure freelance payments.
        </p>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white mt-6 transition">
          <a href="/register">Get Started Now</a>
        </Button>
      </SectionWrapper>

      <footer className="bg-white py-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} DeEvra. All rights reserved.
      </footer>
    </main>
  );
}


function HeroFeature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start space-x-4 hover:scale-[1.02] transition">
      <div>{icon}</div>
      <div>
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}

function StepItem({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={fadeUp}
      className="flex flex-col items-center text-center space-y-4 max-w-xs"
    >
      <div className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full text-lg font-bold">
        {number}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={fadeUp}
      className="bg-white shadow-lg rounded-xl p-6 text-center space-y-4 border border-gray-200 hover:shadow-xl transition"
    >
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

function BusinessModelItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={fadeUp}
      className="space-y-4 text-center"
    >
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

function SectionWrapper({
  id,
  title,
  children,
}: {
  id?: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-24 px-6 bg-gray-50">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="container mx-auto text-center space-y-10"
      >
        {title && <h2 className="text-4xl md:text-5xl font-semibold text-gray-900">{title}</h2>}
        {children}
      </motion.div>
    </section>
  );
}
