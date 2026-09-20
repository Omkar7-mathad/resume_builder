import React from 'react';
import { Download, Sparkles, FileCheck, LogIn, LogOut, UserCheck, LayoutDashboard, BookmarkPlus } from 'lucide-react';

export const Header = ({ 
  user,
  userName,
  onOpenAuth,
  onOpenDashboard,
  onSaveCurrentResume,
  onSignOut,
  onDownloadPDF, 
  onLoadSample, 
  isGenerating 
}) => {
  return (
    <header className="app-header">
      <div className="app-header-container">
        {/* Brand Logo */}
        <div className="app-logo-area">
          <div className="logo-icon-wrapper">
            <FileCheck className="logo-icon" size={26} />
          </div>
          <div>
            <h1 className="app-title">ResumeCraft</h1>
            <p className="app-subtitle">Modern Resume Builder</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="app-header-actions">
          <button 
            onClick={onLoadSample} 
            className="btn btn-secondary"
            title="Pre-fill with sample professional data"
          >
            <Sparkles size={16} />
            <span>Load Sample</span>
          </button>

          {/* User Auth Status & Dashboard Buttons */}
          {user ? (
            <div className="header-user-badge">
              <button 
                onClick={onOpenDashboard}
                className="btn btn-secondary"
                title="View saved resumes dashboard"
              >
                <LayoutDashboard size={15} />
                <span>My Resumes</span>
              </button>

              <button 
                onClick={onSaveCurrentResume}
                className="btn btn-outline"
                title="Save current resume state to database"
              >
                <BookmarkPlus size={15} />
                <span>Save</span>
              </button>

              <div className="user-info-pill" title={user.email}>
                <UserCheck size={14} className="icon-green" />
                <span className="user-email-text">
                  {user.user_metadata?.full_name || user.user_metadata?.name || userName || user.email?.split('@')[0]}
                </span>
              </div>

              <button 
                onClick={onSignOut}
                className="btn btn-ghost btn-sm"
                title="Sign out of account"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth('signin')}
              className="btn btn-outline"
              title="Sign in or Sign up"
            >
              <LogIn size={15} />
              <span>Sign In</span>
            </button>
          )}

          <button 
            onClick={onDownloadPDF} 
            className="btn btn-primary btn-lg"
            disabled={isGenerating}
          >
            <Download size={18} />
            <span>{isGenerating ? "Generating..." : "Download PDF"}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
