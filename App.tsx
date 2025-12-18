
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Loader2
} from 'lucide-react';
import { generateWallpaper } from './geminiService.js';
import { Wallpaper, AspectRatio } from './types.js';

// Components
import Sidebar from './components/Sidebar.js';
import ExploreView from './components/ExploreView.js';
import CreateView from './components/CreateView.js';
import LibraryView from './components/LibraryView.js';
import PreviewModal from './components/PreviewModal.js';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'explore' | 'create' | 'library'>('explore');
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [previewWallpaper, setPreviewWallpaper] = useState<Wallpaper | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('lumina_wallpapers');
    if (saved) {
      try {
        setWallpapers(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved wallpapers");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lumina_wallpapers', JSON.stringify(wallpapers));
  }, [wallpapers]);

  const handleGenerate = async (prompt: string, aspectRatio: AspectRatio, style: string) => {
    setIsGenerating(true);
    try {
      const url = await generateWallpaper({ prompt, aspectRatio, style });
      const newWallpaper: Wallpaper = {
        id: Math.random().toString(36).substr(2, 9),
        url,
        prompt,
        aspectRatio,
        createdAt: Date.now(),
        tags: [style, prompt.split(' ')[0]].filter(Boolean),
      };
      setWallpapers(prev => [newWallpaper, ...prev]);
      setActiveTab('library');
    } catch (err) {
      alert("Failed to generate wallpaper. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const deleteWallpaper = (id: string) => {
    setWallpapers(prev => prev.filter(w => w.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-neutral-950 text-neutral-100 selection:bg-indigo-500 selection:text-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 ml-20 md:ml-64 p-4 md:p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 sticky top-0 bg-neutral-950/80 backdrop-blur-md py-4 z-10 border-b border-neutral-900/50">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="bg-gradient-to-br from-indigo-500 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm">L</span>
              Lumina Studio
            </h1>
            <p className="text-neutral-500 text-sm hidden md:block">AI-powered visual inspiration</p>
          </div>
          <div className="flex items-center gap-4">
             {isGenerating && (
                <div className="flex items-center gap-2 text-indigo-400 font-medium text-sm animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating Masterpiece...
                </div>
             )}
             <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input 
                  type="text" 
                  placeholder="Search collections..." 
                  className="bg-neutral-900 border border-neutral-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all w-32 md:w-64"
                />
             </div>
          </div>
        </header>

        {activeTab === 'explore' && <ExploreView onPreview={setPreviewWallpaper} />}
        {activeTab === 'create' && <CreateView onGenerate={handleGenerate} isGenerating={isGenerating} />}
        {activeTab === 'library' && (
          <LibraryView 
            wallpapers={wallpapers} 
            onPreview={setPreviewWallpaper} 
            onDelete={deleteWallpaper}
          />
        )}
      </main>

      {previewWallpaper && (
        <PreviewModal 
          wallpaper={previewWallpaper} 
          onClose={() => setPreviewWallpaper(null)} 
        />
      )}
    </div>
  );
};

export default App;
