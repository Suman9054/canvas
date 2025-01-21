
import { Palette, Wand2, Download, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';


const onclick = () => {
   window.location.href = "/v1/auth/login";
}


const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-900/95 shadow-lg' : 'bg-transparent'
      }`}>
        <div onClick={onclick} className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">Vector<span className="text-emerald-400">Pro</span></div>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-full 
            transform hover:scale-105 transition-all duration-300">
            Try Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-slate-900 to-cyan-900 animate-gradient" />
        
        {/* Floating shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-64 h-64 bg-emerald-500/10 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 2}s`,
                filter: 'blur(40px)'
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Design Without
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
              {" "}Limits
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 animate-fade-in-delay">
            Unleash your creativity with our powerful vector graphics editor.
            Professional tools meet intuitive design.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Palette, title: "Smart Tools", desc: "AI-powered design assistance" },
              { icon: Wand2, title: "Effects Library", desc: "1000+ premium effects" },
              { icon: Download, title: "Quick Export", desc: "Multiple format support" }
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-white/5 backdrop-blur-lg 
                  hover:bg-white/10 transition-all duration-500 animate-fade-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex flex-col items-center">
                  <feature.icon className="w-12 h-12 text-emerald-400 mb-4 
                    group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button onClick={onclick} className="group bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-lg 
            font-semibold py-4 px-8 rounded-full hover:shadow-lg hover:shadow-emerald-500/25 
            transform hover:translate-y-[-2px] transition-all duration-300 animate-bounce-subtle">
            Get Started Free
            <ChevronRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Add required styles to make animations work
const style = document.createElement('style');
style.textContent = `
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes float {
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
    100% { transform: translateY(0px) rotate(360deg); }
  }
  
  .animate-gradient {
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
  }
  
  .animate-float {
    animation: float 20s ease infinite;
  }
  
  .animate-fade-in {
    opacity: 0;
    animation: fadeIn 1s forwards;
  }
  
  .animate-fade-in-delay {
    opacity: 0;
    animation: fadeIn 1s 0.3s forwards;
  }
  
  .animate-fade-up {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeUp 0.8s forwards;
  }
  
  .animate-bounce-subtle {
    animation: bounceSoft 2s infinite;
  }
  
  @keyframes fadeIn {
    to { opacity: 1; }
  }
  
  @keyframes fadeUp {
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes bounceSoft {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
`;
document.head.appendChild(style);

export default LandingPage;