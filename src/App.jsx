import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FormEditor } from './components/FormEditor';
import { ResumePreview } from './components/ResumePreview';
import { AuthModal } from './components/AuthModal';
import { DashboardModal } from './components/DashboardModal';
import { initialResumeData, emptyResumeData } from './utils/defaultData';
import { exportToPDF, generatePDFBlob } from './utils/pdfExporter';
import { supabase } from './utils/supabaseClient';

export function App() {
  const [resumeData, setResumeData] = useState(emptyResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState('modern'); // 'modern', 'sidebar', 'compact', 'plain'
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Auth & Dashboard State
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [pendingDownload, setPendingDownload] = useState(false);

  useEffect(() => {
    // Check initial auth session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const uploadPDFToSupabase = async (userObj, fileName, pdfBlob) => {
    if (!userObj || !pdfBlob) return null;
    try {
      const filePath = `${userObj.id}/${Date.now()}_${fileName}`;
      const { error } = await supabase.storage
        .from('resumes_pdf')
        .upload(filePath, pdfBlob, {
          contentType: 'application/pdf',
          upsert: true
        });

      if (error) {
        console.error('Supabase storage upload error:', error);
        return null;
      }

      const { data: publicUrlData } = supabase.storage
        .from('resumes_pdf')
        .getPublicUrl(filePath);

      return publicUrlData?.publicUrl || null;
    } catch (err) {
      console.error('Upload exception:', err);
      return null;
    }
  };

  const autoSaveToDatabase = async (userObj = user, pdfUrl = null) => {
    if (!userObj) return;
    try {
      const title = resumeData.resumeTitle?.trim() || 
        (resumeData.personalInfo.fullName ? `${resumeData.personalInfo.fullName.trim()} - Resume` : 'My Resume');

      await supabase
        .from('resumes')
        .insert([
          {
            user_id: userObj.id,
            title,
            template: selectedTemplate,
            resume_data: resumeData,
            pdf_url: pdfUrl
          }
        ]);
    } catch (err) {
      console.error('Auto-save error:', err);
    }
  };

  const executePDFDownload = async (userObj = user) => {
    setIsGenerating(true);
    showToast("Generating PDF document & uploading to Supabase...");

    const docSlug = (resumeData.resumeTitle || resumeData.personalInfo.fullName || 'resume')
      .trim().toLowerCase().replace(/[^a-z0-9]+/g, '_');
    const fileName = `${docSlug}_${selectedTemplate}.pdf`;

    setTimeout(async () => {
      const result = await exportToPDF('resume-document-export', fileName);
      setIsGenerating(false);

      if (result && result.success) {
        let pdfUrl = null;
        if (userObj && result.blob) {
          pdfUrl = await uploadPDFToSupabase(userObj, fileName, result.blob);
        }
        await autoSaveToDatabase(userObj, pdfUrl);
        showToast("Resume downloaded & PDF saved to Supabase! 🎉");
      }
    }, 200);
  };

  const handleDownloadPDFClick = () => {
    if (user) {
      // User is authenticated, download directly
      executePDFDownload(user);
    } else {
      // User is NOT authenticated, trigger Auth Modal
      setPendingDownload(true);
      setAuthMode('signin');
      setIsAuthModalOpen(true);
      showToast("Please Sign In or Sign Up to download your resume.");
    }
  };

  const handleAuthSuccess = (authenticatedUser) => {
    setUser(authenticatedUser);
    setIsAuthModalOpen(false);
    showToast(`Signed in as ${authenticatedUser.email}`);

    if (pendingDownload) {
      setPendingDownload(false);
      executePDFDownload(authenticatedUser);
    }
  };

  const handleSaveCurrentResume = async () => {
    if (!user) {
      handleOpenAuth('signin');
      return;
    }
    showToast("Generating PDF & saving to Supabase Storage...");
    try {
      const pdfBlob = await generatePDFBlob('resume-document-export');
      const docSlug = (resumeData.resumeTitle || resumeData.personalInfo.fullName || 'resume')
        .trim().toLowerCase().replace(/[^a-z0-9]+/g, '_');
      const fileName = `${docSlug}_${selectedTemplate}.pdf`;
      let pdfUrl = null;
      if (pdfBlob) {
        pdfUrl = await uploadPDFToSupabase(user, fileName, pdfBlob);
      }
      await autoSaveToDatabase(user, pdfUrl);
      showToast("Resume & PDF saved to Supabase Storage! 💾");
    } catch (err) {
      console.error('Save error:', err);
      await autoSaveToDatabase(user);
      showToast("Resume saved to Dashboard! 💾");
    }
  };

  const handleLoadSavedResume = (savedResume) => {
    if (savedResume.resume_data) {
      setResumeData(savedResume.resume_data);
    }
    if (savedResume.template) {
      setSelectedTemplate(savedResume.template);
    }
    showToast(`Loaded resume: ${savedResume.title}`);
  };

  const handleDownloadSavedResume = async (savedResume) => {
    handleLoadSavedResume(savedResume);
    setTimeout(() => {
      executePDFDownload();
    }, 250);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsDashboardOpen(false);
    showToast("Signed out successfully.");
  };

  const handleOpenAuth = (mode = 'signin') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLoadSample = () => {
    setResumeData(initialResumeData);
    showToast("Sample data loaded successfully!");
  };

  return (
    <div className="app-main-layout">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Navigation */}
      <Header 
        user={user}
        userName={resumeData.personalInfo.fullName}
        onOpenAuth={handleOpenAuth}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onSaveCurrentResume={handleSaveCurrentResume}
        onSignOut={handleSignOut}
        onDownloadPDF={handleDownloadPDFClick}
        onLoadSample={handleLoadSample}
        isGenerating={isGenerating}
      />

      {/* Main Workspace Grid */}
      <main className="app-workspace">
        {/* Left Workspace: Form & Controls */}
        <div className="workspace-left">
          <FormEditor 
            resumeData={resumeData}
            setResumeData={setResumeData}
            selectedTemplate={selectedTemplate}
            onChangeTemplate={setSelectedTemplate}
            onSaveCurrentResume={handleSaveCurrentResume}
          />
        </div>

        {/* Right Workspace: Live Document Preview */}
        <div className="workspace-right">
          <ResumePreview 
            selectedTemplate={selectedTemplate}
            resumeData={resumeData}
          />
        </div>
      </main>

      {/* Auth Modal Popup */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authMode}
        onClose={() => {
          setIsAuthModalOpen(false);
          setPendingDownload(false);
        }}
        onSuccess={handleAuthSuccess}
      />

      {/* Dashboard Modal Popup */}
      <DashboardModal
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        user={user}
        currentResumeData={resumeData}
        currentTemplate={selectedTemplate}
        onLoadResume={handleLoadSavedResume}
        onDownloadResume={handleDownloadSavedResume}
        showToast={showToast}
      />

      {/* Footer */}
      <footer className="app-footer">
        <p>ResumeCraft © {new Date().getFullYear()} — Professional Resume Builder</p>
      </footer>
    </div>
  );
}

export default App;
