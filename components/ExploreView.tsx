
import React from 'react';
import { Wallpaper } from '../types.ts';
import { Maximize2, Heart } from 'lucide-react';

interface ExploreViewProps {
  onPreview: (w: Wallpaper) => void;
}

const FEATURED_COLLECTIONS = [
  "Nebula & Galaxies",
  "Minimalist Architecture",
  "Cyberpunk Streets",
  "Macro Nature",
  "Abstract Flow"
];

const MOCK_WALLPAPERS: Wallpaper[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `mock-${i}`,
  url: `https://picsum.photos/seed/wall-${i}/1200/${i % 2 === 0 ? 800 : 1600}`,
  prompt: "A beautiful curated scene",
  aspectRatio: i % 2 === 0 ? "16:9" : "9:16",
  createdAt: Date.now(),
  tags: ["Featured", "Art"],
}));

const ExploreView: React.FC<ExploreViewProps> = ({ onPreview }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="relative h-64 md:h-80 rounded-3xl overflow-hidden group">
        <img 
          src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&q=80&w=1200" 
          alt="Featured" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
          <span className="bg-indigo-500 text-white text-[10px] font-bold px-2 py-1 rounded-full w-fit mb-2">COLLECTION OF THE WEEK</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-2">Into the Void</h2>
          <p className="text-neutral-300 max-w-lg text-sm md:text-base">Explore deep-space nebulas and the silent beauty of the cosmos generated with advanced diffusion models.</p>
        </div>
      </section>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {FEATURED_COLLECTIONS.map((tag) => (
          <button 
            key={tag} 
            className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full text-sm font-medium hover:bg-neutral-800 hover:border-neutral-700 transition-all whitespace-nowrap"
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {MOCK_WALLPAPERS.map((wp) => (
          <div 
            key={wp.id} 
            className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[3/4] bg-neutral-900"
            onClick={() => onPreview(wp)}
          >
            <img 
              src={wp.url} 
              alt={wp.prompt} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
              <div className="flex justify-end">
                <button className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors">
                  <Heart className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium bg-black/60 px-2 py-1 rounded text-white backdrop-blur-sm">
                  {wp.aspectRatio}
                </span>
                <Maximize2 className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreView;
