import React, { useState, useEffect } from 'react';
import { X, FileText, Download, Trash2, Edit3, Plus, Sparkles, Clock, Layout, ExternalLink } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';

export const DashboardModal = ({ 
  isOpen, 
  onClose, 
  user, 
  currentResumeData, 
  currentTemplate,
  onLoadResume, 
  onDownloadResume,
  showToast 
}) => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savingCurrent, setSavingCurrent] = useState(false);

  useEffect(() => {
    if (!isOpen || !user) return;

    let isSubscribed = true;

    const loadData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('resumes')
          .select('*')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false });

        if (error) throw error;
        if (isSubscribed) {
          setResumes(data || []);
        }
      } catch (err) {
        console.error('Error fetching saved resumes:', err);
        if (showToast) showToast('Failed to load saved resumes.');
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isSubscribed = false;
    };
  }, [isOpen, user, showToast]);

  if (!isOpen || !user) return null;

  const fetchResumes = async () => {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setResumes(data || []);
    } catch (err) {
      console.error('Error fetching resumes:', err);
    }
  };

  const handleSaveCurrent = async () => {
    setSavingCurrent(true);
    try {
      const title = currentResumeData.resumeTitle?.trim() || 
        (currentResumeData.personalInfo?.fullName ? `${currentResumeData.personalInfo.fullName.trim()} - Resume` : 'My Resume');

      const { error } = await supabase
        .from('resumes')
        .insert([
          {
            user_id: user.id,
            title,
            template: currentTemplate,
            resume_data: currentResumeData
          }
        ]);

      if (error) throw error;

      if (showToast) showToast('Current resume saved to Dashboard! 💾');
      await fetchResumes();
    } catch (err) {
      console.error('Error saving resume:', err);
      if (showToast) showToast('Failed to save resume. Please try again.');
    } finally {
      setSavingCurrent(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this saved resume?')) return;

    try {
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setResumes(prev => prev.filter(r => r.id !== id));
      if (showToast) showToast('Resume deleted successfully.');
    } catch (err) {
      console.error('Error deleting resume:', err);
      if (showToast) showToast('Failed to delete resume.');
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="auth-modal-overlay">
      <div className="dashboard-modal-card">
        {/* Close button */}
        <button className="auth-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="dashboard-header-row">
          <div>
            <h2 className="dashboard-title">My Saved Resumes</h2>
            <p className="dashboard-subtitle">
              Manage your saved resumes, reload past versions, or download them anytime.
            </p>
          </div>

          <button
            onClick={handleSaveCurrent}
            className="btn btn-primary btn-sm"
            disabled={savingCurrent}
          >
            <Plus size={16} />
            <span>{savingCurrent ? 'Saving...' : 'Save Current Resume'}</span>
          </button>
        </div>

        {/* Saved Resumes Grid */}
        <div className="dashboard-body">
          {loading ? (
            <div className="dashboard-loading">
              <Sparkles size={24} className="spin-icon" />
              <p>Loading your saved resumes...</p>
            </div>
          ) : resumes.length === 0 ? (
            <div className="dashboard-empty-state">
              <FileText size={40} className="empty-icon" />
              <h3>No Saved Resumes Yet</h3>
              <p>Click "Save Current Resume" above to store your created resume in your personal dashboard.</p>
              <button onClick={handleSaveCurrent} className="btn btn-secondary btn-sm" disabled={savingCurrent}>
                <Plus size={15} /> Save Current Resume Now
              </button>
            </div>
          ) : (
            <div className="resumes-grid">
              {resumes.map((item) => (
                <div key={item.id} className="saved-resume-card">
                  <div className="saved-card-header">
                    <div className="saved-title-row">
                      <FileText size={18} className="icon-blue" />
                      <h4 className="saved-resume-name">
                        {item.title || 'Untitled Resume'}
                      </h4>
                    </div>
                    <span className="saved-template-badge">
                      <Layout size={12} />
                      {item.template.toUpperCase()}
                    </span>
                  </div>

                  <div className="saved-card-meta">
                    <Clock size={13} />
                    <span>Saved: {formatDate(item.updated_at || item.created_at)}</span>
                  </div>

                  {item.resume_data?.personalInfo?.jobTitle && (
                    <p className="saved-job-headline">
                      {item.resume_data.personalInfo.jobTitle}
                    </p>
                  )}

                  <div className="saved-card-actions">
                    <button
                      onClick={() => {
                        onLoadResume(item);
                        onClose();
                      }}
                      className="btn btn-secondary btn-xs"
                      title="Load into Editor"
                    >
                      <Edit3 size={13} />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => {
                        onDownloadResume(item);
                      }}
                      className="btn btn-primary btn-xs"
                      title="Download PDF"
                    >
                      <Download size={13} />
                      <span>Download</span>
                    </button>

                    {item.pdf_url && (
                      <a
                        href={item.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline btn-xs"
                        title="View PDF stored in Supabase Storage"
                      >
                        <ExternalLink size={13} />
                        <span>View PDF</span>
                      </a>
                    )}

                    <button
                      onClick={(e) => handleDelete(item.id, e)}
                      className="btn-icon-danger btn-xs"
                      title="Delete resume"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
