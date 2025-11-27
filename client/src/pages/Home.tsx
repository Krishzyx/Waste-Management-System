import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Recycle, Leaf, Globe, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

// Import the generated hero image
import heroImage from "@assets/generated_images/eco-friendly_waste_management_hero_background.png";
import textureImage from "@assets/generated_images/recycling_symbol_abstract_texture.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden font-sans">
      
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-6 max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-primary/20">
            E
          </div>
          <span className="text-2xl font-heading font-bold text-foreground tracking-tight">
            EcoTrack
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button className="rounded-full px-6 font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
              Enter Platform <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold mb-6 border border-secondary-foreground/10">
              <Leaf className="w-4 h-4" /> Sustainable Future
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold leading-[1.1] text-foreground mb-6">
              Waste Management <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-lime-500">
                Reimagined.
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Connect local Drumyards with certified NGOs to streamline waste recycling. 
              Track metrics, ensure compliance, and build a cleaner world together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
               <Link href="/admin">
                <Button size="lg" className="h-14 px-8 rounded-2xl text-lg shadow-xl shadow-primary/25 hover:translate-y-[-2px] transition-all">
                  Get Started
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl text-lg bg-white/50 border-primary/20 hover:bg-white">
                Learn More
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/10 border-8 border-white/50 backdrop-blur-sm">
              <img 
                src={heroImage} 
                alt="Future Eco City" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating Stat Cards */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-border flex items-center gap-4 max-w-xs"
            >
              <div className="w-12 h-12 rounded-full bg-lime-100 flex items-center justify-center text-lime-700">
                <Recycle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Waste Recycled</p>
                <p className="text-2xl font-bold text-foreground">1,240 Tons</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-secondary/30 to-transparent -z-10 rounded-bl-[100px]" />
        <img src={textureImage} className="absolute bottom-0 left-0 w-1/3 opacity-10 -z-10 mix-blend-multiply" alt="Texture" />
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Why EcoTrack?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">We provide the digital infrastructure to make waste management transparent, efficient, and impactful.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Recycle,
                title: "Smart Drumyards",
                desc: "Owners can easily log waste types, quantities, and recycling potential in real-time."
              },
              {
                icon: Globe,
                title: "NGO Connection",
                desc: "Seamlessly link waste producers with certified NGOs (Private & Gov) for proper disposal."
              },
              {
                icon: CheckCircle2,
                title: "Verified Impact",
                desc: "Track the journey of waste from collection to processing with verified data points."
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl bg-muted/30 border border-border hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-border flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white font-bold text-lg">
              E
            </div>
            <span className="text-xl font-heading font-bold">EcoTrack</span>
          </div>
          <p className="text-white/50 text-sm">© 2024 EcoTrack Systems. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
