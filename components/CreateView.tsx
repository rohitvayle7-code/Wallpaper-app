
import React, { useState } from 'react';
import { AspectRatio } from '../types.ts';
import { Sparkles, Monitor, Smartphone, Layout, Palette, Image as ImageIcon } from 'lucide-react';

interface CreateViewProps {
  onGenerate: (prompt: string, aspectRatio: AspectRatio, style: string) => void;
  isGenerating: boolean;
}

const STYLES = [
  { id: 'cinematic', name: 'Cinematic', icon: '🎬' },
  { id: 'minimalist', name: 'Minimal', icon: '⚪' },
  { id: 'cyberpunk', name: 'Cyberpunk', icon: '🌆' },
  { id: 'anime', name: 'Anime', icon: '🌸' },
  { id: 'watercolor', name: 'Watercolor', icon: '🎨' },
  { id: 'surreal', name: 'Surreal', icon: '🌀' },
];

const CreateView: React.FC<CreateViewProps> = ({ onGenerate, isGenerating }) => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [style, setStyle] = useState('cinematic');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt, aspectRatio, style);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 animate-in zoom-in-95 duration-300">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Imagine Your Perfect Space
        </h2>
        <p className="text-neutral-400">Describe the atmosphere you want to create. Gemini will do the rest.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A serene mountain lake at golden hour, minimalist style, sharp 8k detail..."
            className="w-full h-40 bg-neutral-900 border-2 border-neutral-800 rounded-3xl p-6 text-lg focus:outline-none focus:border-indigo-500/50 transition-all resize-none placeholder:text-neutral-700"
            disabled={isGenerating}
          />
          <div className="absolute right-6 bottom-6 text-neutral-600 text-xs flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            AI Powered
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-neutral-300">
              <Palette className="w-4 h-4" /> Visual Style
            </label>
            <div className="grid grid-cols-3 gap-2">
              {STYLES.map((s) => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setStyle(s.id)}
                  className={`flex flex-col items-center justify-center py-4 rounded-xl border transition-all ${
                    style === s.id 
                      ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400' 
                      : 'bg-neutral-900 border-neutral-800 text-neutral-500 hover:border-neutral-700'
                  }`}
                >
                  <span className="text-xl mb-1">{s.icon}</span>
                  <span className="text-xs font-medium">{s.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-neutral-300">
              <Layout className="w-4 h-4" /> Aspect Ratio
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: '16:9', icon: Monitor, label: 'Desktop' },
                { id: '9:16', icon: Smartphone, label: 'Mobile' },
                { id: '1:1', icon: ImageIcon, label: 'Square' },
              ].map((ratio) => (
                <button
                  type="button"
                  key={ratio.id}
                  onClick={() => setAspectRatio(ratio.id as AspectRatio)}
                  className={`flex flex-col items-center justify-center py-4 rounded-xl border transition-all ${
                    aspectRatio === ratio.id 
                      ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400' 
                      : 'bg-neutral-900 border-neutral-800 text-neutral-500 hover:border-neutral-700'
                  }`}
                >
                  <ratio.icon className="w-5 h-5 mb-1" />
                  <span className="text-xs font-medium">{ratio.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isGenerating || !prompt.trim()}
          className={`w-full py-5 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 transition-all ${
            isGenerating || !prompt.trim()
              ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-indigo-600/20'
          }`}
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Manifesting Visuals...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Wallpaper
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateView;
