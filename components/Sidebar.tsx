
import React from 'react';
import { Home, PlusSquare, Image as ImageIcon, Sparkles } from 'lucide-react';

interface SidebarProps {
  activeTab: 'explore' | 'create' | 'library';
  setActiveTab: (tab: 'explore' | 'create' | 'library') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'explore', label: 'Explore', icon: Home },
    { id: 'create', label: 'Create', icon: Sparkles },
    { id: 'library', label: 'My Library', icon: ImageIcon },
  ] as const;

  return (
    <aside className="fixed left-0 top-0 h-full w-20 md:w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col z-20 transition-all duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-900/20">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <span className="font-bold text-xl tracking-tight hidden md:block">Lumina</span>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                  : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : 'group-hover:scale-110 transition-transform'}`} />
              <span className="font-medium hidden md:block">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-neutral-800">
        <div className="bg-neutral-800 rounded-2xl p-4 hidden md:block">
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">Pro Plan</p>
          <p className="text-sm text-neutral-400 mb-3">Unlimited AI generations & 4K exports.</p>
          <button className="w-full bg-white text-black text-xs font-bold py-2 rounded-lg hover:bg-neutral-200 transition-colors">
            Upgrade Now
          </button>
        </div>
        <div className="flex items-center gap-3 mt-4 md:px-2">
           <img 
            src="https://picsum.photos/seed/user/40/40" 
            alt="User" 
            className="w-8 h-8 rounded-full border border-neutral-700"
           />
           <div className="hidden md:block">
              <p className="text-sm font-medium">Alex Rivera</p>
              <p className="text-xs text-neutral-500">Free Tier</p>
           </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
