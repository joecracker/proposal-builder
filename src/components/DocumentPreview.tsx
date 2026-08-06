import React from 'react';
import { Proposal } from '../types';
import { Printer, Download, Edit3, Sparkles } from 'lucide-react';
import { DEFAULT_COMPANY_CONFIG } from '../data/defaultTemplate';
import { triggerSafePrint } from '../printUtils';

interface DocumentPreviewProps {
  proposal: Proposal;
  onEditSection: (sectionIndex: number) => void;
  onOpenCategoryModal?: (category: any) => void;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  proposal,
  onEditSection,
  onOpenCategoryModal,
}) => {
  const { companyConfig, clientInfo, categories, legalTerms, totalEstimate, notes } = proposal;
  const logoToDisplay = companyConfig.logoUrl || DEFAULT_COMPANY_CONFIG.logoUrl;

  const handlePrint = () => {
    triggerSafePrint(proposal);
  };

  return (
    <div className="space-y-6">
            {/* Top Edit Controls (Hidden during Print) */}
      <div className="print:hidden flex justify-end mb-4">
        <button
          onClick={() => onEditSection(0)}
          className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-amber-500/30 shadow-lg px-4 py-2.5 rounded-xl text-sm font-bold flex items-center space-x-2 transition-all cursor-pointer"
        >
          <Edit3 className="w-4 h-4 text-amber-400" />
          <span>Edit Sections</span>
        </button>
      </div>

      {/* Printable Sheet Card */}
      <div className="printable-sheet bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-12 md:p-16 max-w-4xl mx-auto font-sans relative overflow-hidden print:overflow-visible print:border-none print:shadow-none print:p-0 print:m-0">
        
        {/* Top Decorative Gold Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 print:hidden"></div>

        {/* 1. Logo & Company Header */}
        <div className="text-center border-b-2 border-slate-900 pb-6 print:pb-2 print:-mt-6 space-y-3">
          {/* Top Logo */}
          <div className="flex flex-col items-center justify-center space-y-2 ">
            {logoToDisplay ? (
              <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-56 md:h-56 rounded-xl p-1 bg-white flex items-center justify-center overflow-hidden">
                <img
                  src={logoToDisplay}
                  alt={companyConfig.companyName}
                  className="max-w-full max-h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-900 print:bg-transparent border-2 border-amber-500 print:border-slate-900 p-2 flex flex-col items-center justify-center shadow-md print:shadow-none">
                <span className="text-3xl font-black text-amber-400 print:text-slate-900 font-mono tracking-tighter">JQC</span>
                <span className="text-[9px] font-extrabold text-slate-300 uppercase tracking-widest mt-0.5">July's Quality</span>
              </div>
            )}
          </div>

          <div className="print:-mt-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase">
              {companyConfig.companyName}
            </h1>
            <p className="text-xs sm:text-sm font-bold text-amber-900 uppercase tracking-wider mt-1 print:mt-8">
              {companyConfig.tagline} &bull; {companyConfig.licenseNumber}
            </p>
            <p className="text-xs text-slate-700 mt-1 font-medium ">
              {companyConfig.address}
            </p>
            <p className="text-xs text-slate-700 font-medium mt-0.5 ">
              Phone: <span className="font-bold text-slate-900">{companyConfig.phone}</span> &bull; Email: <span className="text-slate-900 font-bold">{companyConfig.email}</span> &bull; {companyConfig.website}
            </p>
          </div>
        </div>

        {/* 2. Job Information */}
        <div className="my-6 space-y-4">
          <div className="bg-slate-50 border border-slate-300 rounded-xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2">
              JOB INFORMATION
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <p>
                  <strong className="text-slate-700">Project / Scope:</strong>{' '}
                  <span className="font-semibold text-slate-900">{proposal.title || clientInfo.projectSite || 'N/A'}</span>
                </p>
                <p>
                  <strong className="text-slate-700">Client / Owner:</strong>{' '}
                  <span className="font-semibold text-slate-900">{clientInfo.clientName || 'N/A'}</span>
                </p>
                <p>
                  <strong className="text-slate-700">Job Site Address:</strong>{' '}
                  <span className="text-slate-800">{clientInfo.address || 'N/A'}</span>
                </p>
              </div>

              <div className="space-y-1.5 md:border-l md:border-slate-200 md:pl-6">
                <p>
                  <strong className="text-slate-700">Phone:</strong>{' '}
                  <span className="text-slate-800">{clientInfo.phone || 'N/A'}</span>
                </p>
                <p>
                  <strong className="text-slate-700">Proposal Date:</strong>{' '}
                  <span className="text-slate-800 font-mono">{clientInfo.proposalDate || new Date().toLocaleDateString()}</span>
                </p>
                <p>
                  <strong className="text-slate-700">Proposal #:</strong>{' '}
                  <span className="text-slate-800 font-mono">{clientInfo.proposalNumber || 'JQC-2026'}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Notes / Special Context if present */}
        {notes && (
          <div className="mb-8 bg-amber-500/5 print:bg-transparent border-l-4 border-amber-500 print:border-none p-4 print:p-0 rounded-r-xl">
            <h4 className="text-xs font-bold text-amber-800 print:text-slate-900 uppercase tracking-wider mb-1">
              Estimator Notes & Special Instructions:
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed whitespace-pre-line">
              {notes}
            </p>
          </div>
        )}

        {/* 3. Scope Categories - Direct Description of Work Sections */}
        <div className="space-y-6 my-8">
          {categories.map((cat, catIdx) => (
            <div key={cat.id} className="space-y-2.5 page-break-inside-avoid">
              
              {/* Section Header */}
              <div 
                onClick={() => onOpenCategoryModal ? onOpenCategoryModal(cat) : onEditSection(catIdx + 1)}
                className="flex items-center justify-between bg-slate-100 print:bg-transparent print:border-none print:px-0 hover:bg-slate-200/80 border-l-4 border-amber-500 px-4 py-2.5 rounded-r-lg transition-colors cursor-pointer group"
              >
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="print:hidden bg-slate-900 text-amber-400 font-mono text-[11px] font-bold px-2 py-0.5 rounded shadow-sm shrink-0">
                    Step {catIdx + 1}
                  </span>
                  <span className="print:text-sm font-bold text-slate-900">{cat.name}</span>
                  <span className="print:hidden opacity-0 group-hover:opacity-100 text-[10px] bg-amber-500 text-stone-950 px-2 py-0.5 rounded font-mono font-bold transition-opacity">
                    Pop-Up Edit
                  </span>
                </h4>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenCategoryModal) onOpenCategoryModal(cat);
                    else onEditSection(catIdx + 1);
                  }}
                  className="print:hidden text-xs text-amber-900 hover:text-slate-950 font-bold hover:underline bg-amber-500/20 hover:bg-amber-500/30 px-2.5 py-1 rounded-md border border-amber-500/40 transition-colors"
                >
                  Quick Pop-Up Edit
                </button>
              </div>

              {/* Items List */}
              {cat.items.length > 0 ? (
                <ul className="pl-4 sm:pl-6 space-y-2 list-none">
                  {cat.items.map((item) => (
                    <li key={item.id} className="text-xs sm:text-sm text-slate-800 flex items-start space-x-3 leading-relaxed">
                      <span className="inline-block w-2 h-2 rounded-full bg-amber-500 print:bg-slate-700 mt-2 shrink-0 print:border print:border-slate-900"></span>
                      <span className="flex-1">{item.text}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-400 italic pl-6">&bull; Standard contract terms apply</p>
              )}
            </div>
          ))}
        </div>

        {/* 4. PAYMENT SCHEDULE STACKED IN DOWNWARD ORDER */}
        <div className="my-8 bg-slate-50 border-2 border-slate-300 rounded-xl p-5 space-y-4 page-break-inside-avoid">
          <div className="flex items-center justify-between border-b border-slate-300 pb-2.5">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              PAYMENT SCHEDULE
            </h3>
            <span className="text-xs text-slate-500 font-medium">July's Quality Construction</span>
          </div>

          <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-4 space-y-3">
            {/* 1. Due at signing */}
            <div className="flex items-center justify-between py-2 border-b border-slate-200 text-xs sm:text-sm">
              <span className="text-slate-700 font-bold">Due at signing of contract:</span>
              <span className="font-bold text-slate-900 text-sm sm:text-base">{legalTerms.dueAtSigning || '$ ____________'}</span>
            </div>

            {/* 2. Due at start of job */}
            <div className="flex items-center justify-between py-2 border-b border-slate-200 text-xs sm:text-sm">
              <span className="text-slate-700 font-bold">Due at start of job:</span>
              <span className="font-bold text-slate-900 text-sm sm:text-base">{legalTerms.dueAtStart || '$ ____________'}</span>
            </div>

            {/* 3. Due upon completion of job */}
            <div className="flex items-center justify-between py-2 border-b border-slate-200 text-xs sm:text-sm">
              <span className="text-slate-700 font-bold">Due upon completion of job:</span>
              <span className="font-bold text-slate-900 text-sm sm:text-base">{legalTerms.dueUponCompletion || '$ ____________'}</span>
            </div>

            {/* 4. Total for all work described above (At bottom of stack) */}
            <div className="flex items-center justify-between pt-3 text-slate-900 font-black text-xs sm:text-sm">
              <span className="uppercase tracking-wider font-black text-slate-900">Total for all work described above:</span>
              <span className="text-lg sm:text-xl font-black text-slate-950 font-mono bg-amber-500/10 print:bg-transparent px-3 py-1 print:p-0 rounded border border-amber-500/30 print:border-none">
                {totalEstimate || '$ ____________'}
              </span>
            </div>
          </div>
        </div>

        {/* 5. Payment Note & Contract Clauses */}
        <div className="my-6 pt-2 border-t border-slate-200 space-y-2.5 page-break-inside-avoid">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              PAYMENT NOTE & CHANGE ORDER POLICY
            </h4>
            <button
              onClick={() => onEditSection(categories.length + 1)}
              className="print:hidden text-xs text-amber-800 hover:text-amber-950 font-semibold hover:underline"
            >
              Edit Terms
            </button>
          </div>

          <div className="text-xs text-slate-800 leading-relaxed font-sans bg-slate-50 p-4 rounded-lg border border-slate-300">
            <strong>Payment note:</strong> {legalTerms.agreementText}
          </div>
        </div>

        {/* 6. Signature Acceptance Block */}
        <div className="mt-12 pt-8 border-t-2 border-slate-900 space-y-8 page-break-inside-avoid">
          <p className="text-xs font-semibold text-slate-800">
            By signing below, Contractor and Homeowner agree to all work terms, specifications, and payment schedule set forth in this Construction Contract.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 pt-6">
            
            {/* Contractor Signature Line */}
            <div className="space-y-3">
              <div className="border-b-2 border-slate-900 min-h-[45px] flex items-end pb-1">
                <span className="text-xs text-slate-400 italic font-mono">__________________________________________</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                <span>Contractor signature</span>
                <span>Date: ____________</span>
              </div>
            </div>

            {/* Customer Signature Line */}
            <div className="space-y-3">
              <div className="border-b-2 border-slate-900 min-h-[45px] flex items-end pb-1">
                <span className="text-xs text-slate-400 italic font-mono">__________________________________________</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                <span>Customer signature</span>
                <span>Date: ____________</span>
              </div>
            </div>

          </div>
        </div>

        {/* Document Footer */}
        <div className="mt-12 pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400 uppercase tracking-widest font-mono">
          July's Quality Construction &bull; Quality Craftsmen Building With Integrity &bull; Page 1 of 1
        </div>

      </div>
    </div>
  );
};
