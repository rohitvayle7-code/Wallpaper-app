
import React, { useState } from 'react';
import { X, Download, Monitor, Smartphone, Layout, Copy, Check } from 'lucide-react';
import { Wallpaper } from '../types.ts';

interface PreviewModalProps {
  wallpaper: Wallpaper;
  onClose: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ wallpaper, onClose }) => {
  const [viewMode, setViewMode] = useState<'fit' | 'mobile' | 'desktop'>('fit');
  const [copied, setCopied] = useState(false);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(wallpaper.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = wallpaper.url;
    link.download = `lumina-${wallpaper.id}.png`;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 overflow-hidden bg-black/95 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-indigo-600/10 blur-[150px] -z-10 rounded-full" />

      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-all z-20"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="flex flex-col md:flex-row w-full h-full gap-8">
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <div className="flex items-center gap-2 mb-6 bg-neutral-900/50 p-1.5 rounded-full border border-neutral-800 self-center">
            <button 
              onClick={() => setViewMode('fit')}
              className={`p-2 rounded-full flex items-center gap-2 text-xs font-medium transition-all ${viewMode === 'fit' ? 'bg-indigo-600 text-white shadow-lg' : 'text-neutral-400 hover:text-white'}`}
            >
              <Layout className="w-4 h-4" /> Fit Screen
            </button>
            <button 
              onClick={() => setViewMode('desktop')}
              className={`p-2 rounded-full flex items-center gap-2 text-xs font-medium transition-all ${viewMode === 'desktop' ? 'bg-indigo-600 text-white shadow-lg' : 'text-neutral-400 hover:text-white'}`}
            >
              <Monitor className="w-4 h-4" /> Desktop
            </button>
            <button 
              onClick={() => setViewMode('mobile')}
              className={`p-2 rounded-full flex items-center gap-2 text-xs font-medium transition-all ${viewMode === 'mobile' ? 'bg-indigo-600 text-white shadow-lg' : 'text-neutral-400 hover:text-white'}`}
            >
              <Smartphone className="w-4 h-4" /> Phone
            </button>
          </div>

          <div className={`relative transition-all duration-500 ease-out ${
            viewMode === 'mobile' ? 'w-[280px] h-[580px] border-[8px] border-neutral-800 rounded-[3rem] shadow-2xl overflow-hidden' : 
            viewMode === 'desktop' ? 'w-[80%] aspect-video border-[10px] border-neutral-800 rounded-xl shadow-2xl overflow-hidden' :
            'max-h-[70vh] w-auto'
          }`}>
            <img 
              src={wallpaper.url} 
              alt="Preview" 
              className={`w-full h-full ${viewMode === 'fit' ? 'object-contain rounded-2xl' : 'object-cover'}`}
            />
            {viewMode === 'mobile' && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-5 bg-neutral-800 rounded-full" />
            )}
          </div>
        </div>

        <div className="w-full md:w-80 flex flex-col justify-center animate-in slide-in-from-right-8 duration-500">
           <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-6">
              <div>
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">Aesthetic Composition</h3>
                <p className="text-neutral-300 text-sm leading-relaxed italic border-l-2 border-indigo-500 pl-4">
                  "{wallpaper.prompt}"
                </p>
                <button 
                  onClick={handleCopyPrompt}
                  className="flex items-center gap-2 mt-4 text-[10px] text-neutral-500 hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied to clipboard' : 'Copy original prompt'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-800">
                <div className="bg-neutral-800/50 p-3 rounded-xl">
                  <p className="text-[10px] text-neutral-500 uppercase font-bold">Format</p>
                  <p className="text-sm font-semibold">PNG Image</p>
                </div>
                <div className="bg-neutral-800/50 p-3 rounded-xl">
                  <p className="text-[10px] text-neutral-500 uppercase font-bold">Aspect</p>
                  <p className="text-sm font-semibold">{wallpaper.aspectRatio}</p>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                 <button 
                  onClick={handleDownload}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20"
                 >
                   <Download className="w-5 h-5" />
                   Download 4K
                 </button>
                 <button className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-4 rounded-2xl transition-all border border-neutral-700">
                   Set as Desktop
                 </button>
              </div>

              <div className="flex gap-2 pt-2">
                 {wallpaper.tags.map(tag => (
                    <span key={tag} className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-1 rounded-md">
                      #{tag}
                    </span>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
