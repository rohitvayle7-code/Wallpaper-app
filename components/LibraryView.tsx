
import React from 'react';
import { Wallpaper } from '../types.ts';
import { Trash2, Download, Maximize2 } from 'lucide-react';

interface LibraryViewProps {
  wallpapers: Wallpaper[];
  onPreview: (w: Wallpaper) => void;
  onDelete: (id: string) => void;
}

const LibraryView: React.FC<LibraryViewProps> = ({ wallpapers, onPreview, onDelete }) => {
  if (wallpapers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="bg-neutral-900 p-8 rounded-full mb-6">
          <Trash2 className="w-12 h-12 text-neutral-700" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Your library is empty</h3>
        <p className="text-neutral-500 max-w-sm">Start generating unique wallpapers to see them appear here in your personal collection.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Personal Gallery</h2>
        <span className="text-sm text-neutral-500">{wallpapers.length} generations</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wallpapers.map((wp) => (
          <div key={wp.id} className="group relative bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 transition-all hover:border-neutral-600">
            <div className={`relative overflow-hidden ${wp.aspectRatio === '9:16' ? 'aspect-[9/16]' : 'aspect-video'}`}>
              <img 
                src={wp.url} 
                alt={wp.prompt} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button 
                  onClick={() => onPreview(wp)}
                  className="p-3 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors shadow-xl"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const link = document.createElement('a');
                    link.href = wp.url;
                    link.download = `lumina-wallpaper-${wp.id}.png`;
                    link.click();
                  }}
                  className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition-colors shadow-xl"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-4 flex items-center justify-between">
              <div className="truncate pr-4">
                <p className="text-sm font-medium truncate text-neutral-300">{wp.prompt}</p>
                <p className="text-[10px] text-neutral-500 mt-1">
                  {new Date(wp.createdAt).toLocaleDateString()} • {wp.aspectRatio}
                </p>
              </div>
              <button 
                onClick={() => onDelete(wp.id)}
                className="p-2 text-neutral-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                title="Delete from library"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryView;
