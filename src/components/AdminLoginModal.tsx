import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, X, KeyRound, AlertCircle, Sparkles } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<'email' | 'pass' | null>(null);

  if (!isOpen) return null;

  const validEmail = 'byoyakozebonette@protonmail.com';
  const validPassword = 'samu1102005@B';

  const handleFillCredentials = () => {
    setEmail(validEmail);
    setPassword(validPassword);
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      if (email.trim().toLowerCase() === validEmail.toLowerCase() && password === validPassword) {
        localStorage.setItem('bonette_admin_session', JSON.stringify({
          email: validEmail,
          role: 'ADMIN',
          loginTime: new Date().toISOString(),
          name: 'IBYOYAKOZE Bonette'
        }));
        setIsLoading(false);
        onLoginSuccess();
        onClose();
      } else {
        setIsLoading(false);
        setErrorMsg('Invalid email or password. Please verify the credentials provided.');
      }
    }, 400);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Admin Authentication
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                IBYOYAKOZE Bonette Personal Management Suite
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmed Admin Credentials Card */}
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-900 dark:text-emerald-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold flex items-center gap-1.5 text-emerald-900 dark:text-emerald-300">
              <KeyRound className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Your Confirmed Admin Credentials:
            </span>
            <button
              type="button"
              onClick={handleFillCredentials}
              className="px-2.5 py-1 text-xs font-semibold rounded bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer flex items-center gap-1 transition-colors shadow-xs"
            >
              <Sparkles className="w-3 h-3" /> Auto-fill Both
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2 pt-1 font-mono text-[11px]">
            <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-2 rounded-lg border border-emerald-200/60 dark:border-emerald-900/60">
              <div className="truncate mr-2">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[10px]">Username / Email:</span>
                <span className="font-bold text-slate-800 dark:text-emerald-300 select-all">byoyakozebonette@protonmail.com</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(validEmail);
                  setCopiedField('email');
                  setTimeout(() => setCopiedField(null), 2000);
                }}
                className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-100 hover:text-emerald-800 dark:hover:bg-slate-700 cursor-pointer shrink-0 font-sans font-medium"
              >
                {copiedField === 'email' ? 'Copied ✓' : 'Copy'}
              </button>
            </div>

            <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-2 rounded-lg border border-emerald-200/60 dark:border-emerald-900/60">
              <div className="truncate mr-2">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[10px]">Password:</span>
                <span className="font-bold text-slate-800 dark:text-emerald-300 select-all">samu1102005@B</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(validPassword);
                  setCopiedField('pass');
                  setTimeout(() => setCopiedField(null), 2000);
                }}
                className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-100 hover:text-emerald-800 dark:hover:bg-slate-700 cursor-pointer shrink-0 font-sans font-medium"
              >
                {copiedField === 'pass' ? 'Copied ✓' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-xs font-medium text-rose-700 dark:text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="byoyakozebonette@protonmail.com"
                className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-emerald-600 font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-10 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-emerald-600 font-mono text-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 absolute right-2.5 top-2.5 cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-lg transition-colors shadow-sm cursor-pointer disabled:opacity-50"
          >
            {isLoading ? 'Verifying Credentials...' : 'Sign In as Admin Bonette'}
          </button>
        </form>

        <p className="text-center text-[11px] text-slate-400 dark:text-slate-500">
          Enables full management of family members, chat invitations, daily event logs, and publishing stories.
        </p>
      </div>
    </div>
  );
};
