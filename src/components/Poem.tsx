import { useState } from "react"
import { cn } from "@/lib/utils"
import { AuroraBackground, AuroraColors, defaultColors } from "./ui/aurora-background"

// Color schemes for each line of the poem
const colorSchemes: Record<string, AuroraColors> = {
  // "Love followed us" - passionate reds and roses
  love: {
    color1: "#e11d48",
    color2: "#fb7185",
    color3: "#f43f5e",
    color4: "#fda4af",
    color5: "#be123c",
  },
  // "through changing skies" - sky purples and blues
  skies: {
    color1: "#7c3aed",
    color2: "#a78bfa",
    color3: "#8b5cf6",
    color4: "#c4b5fd",
    color5: "#6d28d9",
  },
  // "from Iceland's cold breath" - icy cyans and whites
  iceland: {
    color1: "#06b6d4",
    color2: "#67e8f9",
    color3: "#22d3ee",
    color4: "#a5f3fc",
    color5: "#0891b2",
  },
  // "to Ecuador's warmth" - warm oranges and yellows
  ecuador: {
    color1: "#f97316",
    color2: "#fdba74",
    color3: "#fb923c",
    color4: "#fde047",
    color5: "#ea580c",
  },
  // "to Poland's quiet streets" - golden ambers
  poland: {
    color1: "#d97706",
    color2: "#fbbf24",
    color3: "#f59e0b",
    color4: "#fcd34d",
    color5: "#b45309",
  },
  // "and somehow" - soft transitional purple
  somehow: {
    color1: "#a855f7",
    color2: "#d8b4fe",
    color3: "#c084fc",
    color4: "#e9d5ff",
    color5: "#9333ea",
  },
  // "everywhere felt like home" - warm coral/pink comfort
  home: {
    color1: "#ec4899",
    color2: "#f9a8d4",
    color3: "#f472b6",
    color4: "#fbcfe8",
    color5: "#db2777",
  },
  // "because you were there" - romantic rose gold
  you: {
    color1: "#f43f5e",
    color2: "#fda4af",
    color3: "#fb7185",
    color4: "#fecdd3",
    color5: "#e11d48",
  },
}

// Inline image component that fits within the text line
const InlineImage = ({ 
  src, 
  alt,
  className 
}: { 
  src: string
  alt: string
  className?: string 
}) => (
  <img
    src={src}
    alt={alt}
    className={cn("inline-image", className)}
  />
)

// Each line of the poem with staggered animation and hover detection
const PoemLine = ({ 
  children, 
  delay = 0,
  className,
  onHover,
  onLeave,
}: { 
  children: React.ReactNode
  delay?: number
  className?: string
  onHover?: () => void
  onLeave?: () => void
}) => (
  <div 
    className={cn(
      "opacity-0 animate-fade-in-up cursor-default transition-all duration-300",
      "hover:scale-[1.02] hover:translate-x-2",
      className
    )}
    style={{ animationDelay: `${delay}s` }}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
  >
    {children}
  </div>
)

export function Poem() {
  const [activeColors, setActiveColors] = useState<AuroraColors>(defaultColors)
  
  // Custom images from public folder (using base URL for GitHub Pages)
  const base = import.meta.env.BASE_URL
  const images = {
    love: `${base}1.png`,
    skies: `${base}2.png`,
    iceland: `${base}3.png`,
    ecuador: `${base}4.png`,
    poland: `${base}5.png`,
    you: `${base}6.png`,
  }

  const handleHover = (scheme: keyof typeof colorSchemes) => {
    setActiveColors(colorSchemes[scheme])
  }

  const handleLeave = () => {
    setActiveColors(defaultColors)
  }

  return (
    <AuroraBackground className="dark bg-[#0a0a0f]" colors={activeColors}>
      {/* Main content */}
      <div className="relative z-10 min-h-screen w-full flex items-center justify-center p-8 md:p-12 lg:p-16">
        <div className="max-w-5xl w-full poem-scroll overflow-y-auto max-h-[90vh]">
          <div 
            className="font-display font-bold text-[clamp(1.8rem,5vw,4.5rem)] leading-[1.4] tracking-tight text-[#e8e4df]"
            style={{
              textShadow: '0 2px 40px rgba(0,0,0,0.5)'
            }}
          >
            <PoemLine 
              delay={0.1}
              onHover={() => handleHover('love')}
              onLeave={handleLeave}
            >
              Love{" "}
              <InlineImage src={images.love} alt="love" />
              {" "}followed us
            </PoemLine>
            
            <PoemLine 
              delay={0.3}
              onHover={() => handleHover('skies')}
              onLeave={handleLeave}
            >
              through changing skies{" "}
              <InlineImage src={images.skies} alt="changing skies" />
              ,
            </PoemLine>
            
            <PoemLine 
              delay={0.5}
              onHover={() => handleHover('iceland')}
              onLeave={handleLeave}
            >
              from Iceland's{" "}
              <InlineImage src={images.iceland} alt="Iceland" />
              {" "}cold breath
            </PoemLine>
            
            <PoemLine 
              delay={0.7}
              onHover={() => handleHover('ecuador')}
              onLeave={handleLeave}
            >
              to Ecuador's warmth{" "}
              <InlineImage src={images.ecuador} alt="Ecuador" />
              ,
            </PoemLine>
            
            <PoemLine 
              delay={0.9}
              onHover={() => handleHover('poland')}
              onLeave={handleLeave}
            >
              to Poland's quiet streets{" "}
              <InlineImage src={images.poland} alt="Poland" />
              ,
            </PoemLine>
            
            <PoemLine 
              delay={1.1} 
              className="mt-6"
              onHover={() => handleHover('somehow')}
              onLeave={handleLeave}
            >
              and somehow,
            </PoemLine>
            
            <PoemLine 
              delay={1.3}
              onHover={() => handleHover('home')}
              onLeave={handleLeave}
            >
              everywhere felt like home
            </PoemLine>
            
            <PoemLine 
              delay={1.5}
              onHover={() => handleHover('you')}
              onLeave={handleLeave}
            >
              because you{" "}
              <InlineImage src={images.you} alt="you" />
              {" "}were there.
            </PoemLine>
          </div>
        </div>
      </div>

      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
        }}
      />
    </AuroraBackground>
  )
}
