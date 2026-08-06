import React from 'react';
import { ViewMode, Proposal } from '../types';
import { triggerSafePrint } from '../printUtils';
import {
  Mic,
  FileText,
  FolderOpen,
  FileUp,
  Settings,
  Printer,
  PlusCircle,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  HelpCircle,
} from 'lucide-react';
import { DEFAULT_COMPANY_CONFIG } from '../data/defaultTemplate';

interface HeaderProps {
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  proposal: Proposal;
  onNewProposal: () => void;
  onSaveProposal: () => void;
  isSaved: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  proposal,
  onNewProposal,
  onSaveProposal,
  isSaved,
}) => {
  const handlePrint = () => {
    triggerSafePrint(proposal);
  };

  return (
    <>
      <header className="bg-stone-950 text-white border-b border-amber-500/40 sticky top-0 z-40 shadow-2xl print:hidden">
      {/* Top Metallic Gold Accent Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 shadow-[0_0_12px_rgba(251,191,36,0.6)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-950">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & JQC Brand Title */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl bg-white border-2 border-amber-500/70 p-1 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.25)] overflow-hidden">
              {(proposal.companyConfig.logoUrl || DEFAULT_COMPANY_CONFIG.logoUrl) ? (
                <img
                  src={proposal.companyConfig.logoUrl || DEFAULT_COMPANY_CONFIG.logoUrl}
                  alt={proposal.companyConfig.companyName}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <span className="font-black text-amber-400 text-xl sm:text-2xl font-mono tracking-tighter drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  JQC
                </span>
              )}
            </div>

            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-black tracking-tight text-amber-400 uppercase drop-shadow">
                {proposal.companyConfig.companyName || "July's Quality Construction & Remodeling L.L.C."}
              </h1>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setCurrentView('wizard')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                currentView === 'wizard'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>Step-by-Step Dictation</span>
            </button>


            <button
              onClick={() => setCurrentView('history')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                currentView === 'history'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <FolderOpen className="w-4 h-4" />
              <span>Saved Proposals</span>
            </button>

            <button
              onClick={() => setCurrentView('import')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                currentView === 'import'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <FileUp className="w-4 h-4" />
              <span>Import Doc/Text</span>
            </button>

            <button
              onClick={() => setCurrentView('settings')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                currentView === 'settings'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Logo & Info</span>
            </button>
            <button
              onClick={() => setCurrentView('howto')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                currentView === 'howto'
                  ? 'bg-blue-500 text-white font-semibold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>How To Use</span>
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={onSaveProposal}
              className={`flex items-center space-x-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                isSaved
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${isSaved ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save Draft'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer"
              title="Print or Export PDF"
            >
              <Printer className="w-4 h-4" />
              <span>Print / PDF</span>
            </button>


            <button
              onClick={onNewProposal}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Start New Proposal"
            >
              <PlusCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile View Navigation bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 space-x-1 border-t border-slate-800 no-scrollbar">
          <button
            onClick={() => setCurrentView('wizard')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              currentView === 'wizard' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 bg-slate-800'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Dictation Wizard</span>
          </button>
          <button
            onClick={() => setCurrentView('history')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              currentView === 'history' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 bg-slate-800'
            }`}
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span>Saved</span>
          </button>
          <button
            onClick={() => setCurrentView('import')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              currentView === 'import' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 bg-slate-800'
            }`}
          >
            <FileUp className="w-3.5 h-3.5" />
            <span>Import Doc</span>
          </button>
          <button
            onClick={() => setCurrentView('settings')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              currentView === 'settings' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 bg-slate-800'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Logo/Settings</span>
          </button>
          <button
            onClick={() => setCurrentView('howto')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              currentView === 'howto' ? 'bg-blue-500 text-white font-bold' : 'text-slate-300 bg-slate-800'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>How To</span>
          </button>
        </div>
      </div>
    </header>
    </>
  );
};
