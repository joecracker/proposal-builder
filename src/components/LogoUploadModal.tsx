import React, { useState } from 'react';
import { CompanyConfig } from '../types';
import { Settings, Upload, Image, Check, RefreshCw, Building2 } from 'lucide-react';

interface LogoUploadModalProps {
  companyConfig: CompanyConfig;
  onUpdateCompanyConfig: (config: CompanyConfig) => void;
}

export const LogoUploadModal: React.FC<LogoUploadModalProps> = ({
  companyConfig,
  onUpdateCompanyConfig,
}) => {
  const [config, setConfig] = useState<CompanyConfig>(companyConfig);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setConfig((prev) => ({
        ...prev,
        logoUrl: dataUrl,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCompanyConfig(config);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 p-6 shadow-2xl space-y-6 max-w-2xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
          <Building2 className="w-4 h-4" /> Company Branding & Custom Logo
        </span>
        <h2 className="text-xl font-bold text-white mt-1">
          July's Quality Construction Details & Logo
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Upload the exact company logo image file (PNG, JPG, SVG) to display at the top of all proposals.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        
        {/* Logo Upload Box */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
            <Image className="w-3.5 h-3.5 text-amber-400" />
            Top Proposal Header Logo Image
          </label>

          <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
            {/* Logo Preview Frame */}
            <div className="w-28 h-28 rounded-xl bg-white p-2 border border-slate-700 flex items-center justify-center shrink-0 shadow-md overflow-hidden">
              {config.logoUrl ? (
                <img
                  src={config.logoUrl}
                  alt="Company Logo"
                  className="max-h-full max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="text-xs text-slate-400">No Logo</span>
              )}
            </div>

            <div className="space-y-2 text-center sm:text-left flex-1">
              <label className="cursor-pointer bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-4 py-2 rounded-xl shadow-md inline-flex items-center space-x-2 transition-all">
                <Upload className="w-4 h-4" />
                <span>Upload Logo File (PNG / JPG)</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml,image/webp"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              <p className="text-[11px] text-slate-400">
                Upload your boss's exact high-res logo file here. It will be stored locally and rendered prominently at the top of every proposal sheet.
              </p>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Company Name</label>
            <input
              type="text"
              value={config.companyName}
              onChange={(e) => setConfig({ ...config, companyName: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Tagline</label>
            <input
              type="text"
              value={config.tagline}
              onChange={(e) => setConfig({ ...config, tagline: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">License Number</label>
            <input
              type="text"
              value={config.licenseNumber}
              onChange={(e) => setConfig({ ...config, licenseNumber: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Phone Number</label>
            <input
              type="text"
              value={config.phone}
              onChange={(e) => setConfig({ ...config, phone: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Email Address</label>
            <input
              type="text"
              value={config.email}
              onChange={(e) => setConfig({ ...config, email: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Office / Business Address</label>
            <input
              type="text"
              value={config.address}
              onChange={(e) => setConfig({ ...config, address: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Action button */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          {saveSuccess && (
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <Check className="w-4 h-4" /> Company Info Saved!
            </span>
          )}

          <div className="ml-auto flex items-center space-x-2">
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl shadow-lg text-xs sm:text-sm flex items-center space-x-2 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Save Branding & Logo</span>
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};
