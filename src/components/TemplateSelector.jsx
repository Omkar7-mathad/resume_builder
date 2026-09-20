import React from 'react';
import { Layout, Sparkles, FileText, ChevronDown, Award, Columns } from 'lucide-react';

export const TemplateSelector = ({ selectedTemplate, onChangeTemplate }) => {
  const templates = [
    {
      id: 'modern',
      name: 'Modern Blue Accent',
      badge: 'Executive Banner',
      icon: Sparkles,
      iconBg: 'modern-bg',
      tag: 'Popular',
      desc: 'Vibrant blue header banner, contact icon badges, skill pills, and timeline layout.'
    },
    {
      id: 'sidebar',
      name: 'Modern Blue Sidebar',
      badge: 'Two-Column',
      icon: Columns,
      iconBg: 'sidebar-bg',
      tag: 'New',
      desc: 'Distinctive left blue sidebar for personal info & skills with clean main content area.'
    },
    {
      id: 'compact',
      name: 'Corporate Blue Grid',
      badge: 'Compact & Grid',
      icon: Award,
      iconBg: 'compact-bg',
      tag: 'Sleek',
      desc: 'Top blue accent strip, high-density 2-column split, ideal for experienced candidates.'
    },
    {
      id: 'plain',
      name: 'Plain Minimalist',
      badge: 'Classic B&W',
      icon: FileText,
      iconBg: 'plain-bg',
      tag: 'ATS Friendly',
      desc: '100% black & white classic serif layout. Simple, elegant, and standard corporate.'
    }
  ];

  const activeTpl = templates.find(t => t.id === selectedTemplate) || templates[0];
  const IconComponent = activeTpl.icon;

  return (
    <div className="template-selector-card">
      <div className="template-selector-top">
        <label htmlFor="template-dropdown-select" className="template-selector-label">
          <Layout size={18} className="icon-blue" />
          <span>Active Template Style</span>
        </label>
        
        {/* Dropdown Menu */}
        <div className="dropdown-wrapper">
          <select
            id="template-dropdown-select"
            value={selectedTemplate}
            onChange={(e) => onChangeTemplate(e.target.value)}
            className="template-dropdown-select"
          >
            {templates.map((tpl) => (
              <option key={tpl.id} value={tpl.id}>
                {tpl.name} ({tpl.badge})
              </option>
            ))}
          </select>
          <ChevronDown size={18} className="dropdown-arrow-icon" />
        </div>
      </div>

      {/* Selected Template Info Badge */}
      <div className="selected-template-preview-bar">
        <div className="template-dropdown-info">
          <div className={`mini-preview-icon ${activeTpl.iconBg}`}>
            <IconComponent size={18} className="text-white" />
          </div>
          <div>
            <div className="info-title-row">
              <strong>{activeTpl.name}</strong>
              <span className="popular-tag">{activeTpl.tag}</span>
            </div>
            <p className="info-desc">{activeTpl.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
