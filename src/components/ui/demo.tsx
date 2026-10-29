import { GlowCard } from "@/components/ui/spotlight-card";
import { Cpu, Terminal, Shield, Sparkles } from 'lucide-react';

export function Default() {
  return (
    <div className="w-full flex flex-wrap items-center justify-center gap-6 p-2">
      {/* Card 1: Systems & Hardware */}
      <GlowCard glowColor="blue" size="md">
        <div className="flex flex-col h-full justify-between z-10">
          <div className="relative h-40 w-full overflow-hidden rounded-xl mb-3">
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80" 
              alt="Hardware Architecture" 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute top-2 right-2 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-blue-300 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
              <Cpu size={12} />
              <span>C# / .NET</span>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-base mb-1 flex items-center gap-2">
              <Terminal size={15} className="text-blue-400" />
              <span>Offline Depot Suite</span>
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              ACID-compliant relational delivery management with zero network downtime dependencies.
            </p>
          </div>
        </div>
      </GlowCard>

      {/* Card 2: Interactive 3D */}
      <GlowCard glowColor="orange" size="md">
        <div className="flex flex-col h-full justify-between z-10">
          <div className="relative h-40 w-full overflow-hidden rounded-xl mb-3">
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80" 
              alt="Interactive 3D Assets" 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute top-2 right-2 bg-orange-500/20 backdrop-blur-md border border-orange-400/30 text-orange-300 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles size={12} />
              <span>Unity 3D</span>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-base mb-1 flex items-center gap-2">
              <Sparkles size={15} className="text-orange-400" />
              <span>Hexatronics 3D</span>
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Real-time PBR material shaders, virtual camera orbits, and CAD component simulations.
            </p>
          </div>
        </div>
      </GlowCard>

      {/* Card 3: Enterprise Security & Linux */}
      <GlowCard glowColor="green" size="md">
        <div className="flex flex-col h-full justify-between z-10">
          <div className="relative h-40 w-full overflow-hidden rounded-xl mb-3">
            <img 
              src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80" 
              alt="Cybersecurity and Systems" 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute top-2 right-2 bg-green-500/20 backdrop-blur-md border border-green-400/30 text-green-300 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
              <Shield size={12} />
              <span>LPI Linux</span>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-base mb-1 flex items-center gap-2">
              <Shield size={15} className="text-green-400" />
              <span>System Hardening</span>
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Strict CSP headers, TLS 1.3 encryption, and resilient workstation administration.
            </p>
          </div>
        </div>
      </GlowCard>
    </div>
  );
}
