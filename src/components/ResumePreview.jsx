import React, { useState } from 'react';
import { PlainTemplate } from '../templates/PlainTemplate';
import { ModernTemplate } from '../templates/ModernTemplate';
import { SidebarTemplate } from '../templates/SidebarTemplate';
import { CompactTemplate } from '../templates/CompactTemplate';
import { Eye, Printer, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

export const ResumePreview = ({ selectedTemplate, resumeData }) => {
  const [zoomScale, setZoomScale] = useState(0.85); // Default fit scale 85%

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'plain':
        return <PlainTemplate data={resumeData} />;
      case 'sidebar':
        return <SidebarTemplate data={resumeData} />;
      case 'compact':
        return <CompactTemplate data={resumeData} />;
      case 'modern':
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  const templateNames = {
    modern: '1. Modern Blue Accent',
    sidebar: '2. Modern Blue Sidebar',
    compact: '3. Corporate Blue Grid',
    plain: '4. Plain Minimalist (B&W)'
  };

  return (
    <div className="preview-container">
      <div className="preview-top-bar">
        <div className="preview-status">
          <Eye size={16} className="text-blue" />
          <span>Live Preview</span>
          <span className="template-pill">
            {templateNames[selectedTemplate] || selectedTemplate}
          </span>
        </div>

        <div className="preview-controls">
          {/* Zoom Level Controls */}
          <div className="zoom-controls">
            <button 
              onClick={() => setZoomScale(prev => Math.max(0.5, prev - 0.1))} 
              className="zoom-btn"
              title="Zoom out"
            >
              <ZoomOut size={14} />
            </button>
            <span className="zoom-value">{Math.round(zoomScale * 100)}%</span>
            <button 
              onClick={() => setZoomScale(prev => Math.min(1.2, prev + 0.1))} 
              className="zoom-btn"
              title="Zoom in"
            >
              <ZoomIn size={14} />
            </button>
            <button 
              onClick={() => setZoomScale(0.85)} 
              className="zoom-btn fit-btn"
              title="Reset to Fit Screen (85%)"
            >
              <Maximize2 size={13} />
              <span>Fit</span>
            </button>
          </div>

          <button 
            onClick={() => window.print()} 
            className="btn btn-xs btn-ghost"
            title="Print via Browser"
          >
            <Printer size={14} />
            <span>Print</span>
          </button>
        </div>
      </div>

      <div className="preview-paper-wrapper">
        <div 
          className="resume-paper-scale-outer"
          style={{ height: `${1123 * zoomScale + 40}px` }}
        >
          <div 
            id="resume-document-export" 
            className="resume-paper-scale-container"
            style={{ 
              transform: `scale(${zoomScale})`, 
              transformOrigin: 'top center' 
            }}
          >
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};
