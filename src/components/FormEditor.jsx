import React, { useState } from 'react';
import { User, Briefcase, GraduationCap, Code2, FolderKanban, Award, Plus, Trash2, ChevronUp, Layout, ChevronDown, Sparkles, Columns, FileText, BookmarkPlus } from 'lucide-react';

export const FormEditor = ({ resumeData, setResumeData, selectedTemplate, onChangeTemplate, onSaveCurrentResume }) => {
  const [activeNav, setActiveNav] = useState('personal');

  // Personal Info update handler
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value
      }
    }));
  };

  // Generic dynamic array helpers
  const handleArrayItemChange = (category, id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [category]: prev[category].map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const addArrayItem = (category, defaultObject) => {
    const newItem = {
      id: `${category}-${Date.now()}`,
      ...defaultObject
    };
    setResumeData(prev => ({
      ...prev,
      [category]: [...prev[category], newItem]
    }));
  };

  const removeArrayItem = (category, id) => {
    setResumeData(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== id)
    }));
  };

  // Skills handlers
  const handleSkillsChange = (type, rawString) => {
    const skillsList = rawString.split(',').map(s => s.trim()).filter(Boolean);
    setResumeData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [type]: skillsList
      }
    }));
  };

  const scrollToSection = (id) => {
    setActiveNav(id);
    const element = document.getElementById(`sec-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const sections = [
    { id: 'title', label: 'Resume Title', icon: FileText },
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'certifications', label: 'Certifications', icon: Award }
  ];

  const templateOptions = [
    { id: 'modern', name: 'Modern Blue Accent', icon: Sparkles },
    { id: 'sidebar', name: 'Sidebar Two-Column', icon: Columns },
    { id: 'compact', name: 'Corporate Grid', icon: Layout },
    { id: 'plain', name: 'Plain ATS Friendly', icon: FileText }
  ];

  return (
    <div className="form-editor-card">
      {/* Quick Jump Navigation Pill Bar */}
      <div className="form-nav-bar">
        <span className="nav-bar-label">Jump to:</span>
        <div className="nav-pills-scroll">
          {sections.map(sec => {
            const Icon = sec.icon;
            return (
              <button
                key={sec.id}
                className={`form-nav-pill ${activeNav === sec.id ? 'active' : ''}`}
                onClick={() => scrollToSection(sec.id)}
              >
                <Icon size={14} />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Continuous Form Body */}
      <div className="form-body-scrollable">

        {/* Section 0: Resume Title */}
        <section id="sec-title" className="form-section-block resume-title-block">
          <div className="section-title-bar">
            <div className="section-title-group">
              <div className="section-icon-badge title-icon-badge">
                <FileText size={18} />
              </div>
              <div>
                <h3 className="section-form-title">Resume Title</h3>
                <p className="section-subtitle-hint">Set a title for this resume to save & identify it in your dashboard</p>
              </div>
            </div>
          </div>

          <div className="form-group full-width">
            <input
              type="text"
              className="resume-title-input"
              placeholder="e.g. Senior Software Engineer Resume 2026"
              value={resumeData.resumeTitle || ''}
              onChange={(e) => setResumeData(prev => ({ ...prev, resumeTitle: e.target.value }))}
            />
          </div>
        </section>

        {/* Template Selection Box (Placed above Personal Details) */}
        <section className="template-select-section">
          <div className="section-title-bar">
            <div className="section-title-group">
              <div className="section-icon-badge accent-badge">
                <Layout size={18} />
              </div>
              <h3 className="section-form-title">Choose Template Style</h3>
            </div>
          </div>

          <div className="template-select-card">
            <div className="template-dropdown-wrapper">
              <select
                id="template-main-select"
                value={selectedTemplate}
                onChange={(e) => onChangeTemplate(e.target.value)}
                className="template-select-dropdown"
              >
                <option value="modern">✨ 1. Modern Blue Accent (Executive Banner)</option>
                <option value="sidebar">📊 2. Modern Blue Sidebar (Two-Column Layout)</option>
                <option value="compact">🎯 3. Corporate Blue Grid (Compact)</option>
                <option value="plain">📄 4. Plain Minimalist (Classic B&W / ATS Friendly)</option>
              </select>
              <ChevronDown size={18} className="template-dropdown-arrow" />
            </div>

            {/* Quick Template Choice Pills */}
            <div className="template-pills-row">
              {templateOptions.map(tpl => {
                const Icon = tpl.icon;
                const isSelected = selectedTemplate === tpl.id;
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    className={`template-choice-pill ${isSelected ? 'selected' : ''}`}
                    onClick={() => onChangeTemplate(tpl.id)}
                  >
                    <Icon size={14} />
                    <span>{tpl.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 1: Personal Info */}
        <section id="sec-personal" className="form-section-block">
          <div className="section-title-bar">
            <div className="section-title-group">
              <div className="section-icon-badge">
                <User size={18} />
              </div>
              <h3 className="section-form-title">Personal Details</h3>
            </div>

            <button
              type="button"
              onClick={onSaveCurrentResume}
              className="btn btn-sm btn-primary"
              title="Save current resume data to dashboard"
            >
              <BookmarkPlus size={15} />
              <span>Save Data</span>
            </button>
          </div>

          <div className="form-grid">
            <div className="form-group full-width">
              <label>Full Name *</label>
              <input
                type="text"
                name="fullName"
                placeholder="e.g. Jane Doe"
                value={resumeData.personalInfo.fullName}
                onChange={handlePersonalChange}
              />
            </div>

            <div className="form-group">
              <label>Job Title / Headline</label>
              <input
                type="text"
                name="jobTitle"
                placeholder="e.g. Senior Software Engineer"
                value={resumeData.personalInfo.jobTitle}
                onChange={handlePersonalChange}
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="e.g. jane.doe@example.com"
                value={resumeData.personalInfo.email}
                onChange={handlePersonalChange}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="e.g. +1 (555) 019-2834"
                value={resumeData.personalInfo.phone}
                onChange={handlePersonalChange}
              />
            </div>

            <div className="form-group">
              <label>Location (City, State/Country)</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. New York, NY"
                value={resumeData.personalInfo.location}
                onChange={handlePersonalChange}
              />
            </div>

            <div className="form-group">
              <label>Website / Portfolio</label>
              <input
                type="text"
                name="website"
                placeholder="e.g. https://janedoe.dev"
                value={resumeData.personalInfo.website}
                onChange={handlePersonalChange}
              />
            </div>

            <div className="form-group">
              <label>LinkedIn Profile</label>
              <input
                type="text"
                name="linkedin"
                placeholder="e.g. linkedin.com/in/janedoe"
                value={resumeData.personalInfo.linkedin}
                onChange={handlePersonalChange}
              />
            </div>

            <div className="form-group full-width">
              <label>GitHub / Portfolio</label>
              <input
                type="text"
                name="github"
                placeholder="e.g. github.com/janedoe"
                value={resumeData.personalInfo.github}
                onChange={handlePersonalChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Professional Summary</label>
              <textarea
                name="summary"
                rows={3}
                placeholder="Brief high-impact summary of your experience, skills, and goals..."
                value={resumeData.personalInfo.summary}
                onChange={handlePersonalChange}
              />
            </div>
          </div>
        </section>

        {/* Section 2: Work Experience */}
        <section id="sec-experience" className="form-section-block">
          <div className="section-title-bar">
            <div className="section-title-group">
              <div className="section-icon-badge">
                <Briefcase size={18} />
              </div>
              <h3 className="section-form-title">Work Experience</h3>
            </div>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => addArrayItem('workExperience', {
                company: '',
                jobTitle: '',
                location: '',
                startDate: '',
                endDate: '',
                currentlyWorking: false,
                description: ''
              })}
            >
              <Plus size={15} /> Add Position
            </button>
          </div>

          {resumeData.workExperience.length === 0 ? (
            <div className="empty-state">
              <p>No work experience added. Click "+ Add Position" to add your roles.</p>
            </div>
          ) : (
            <div className="dynamic-list">
              {resumeData.workExperience.map((exp, index) => (
                <div key={exp.id} className="dynamic-item-card">
                  <div className="dynamic-card-header">
                    <span className="card-badge">Position #{index + 1}</span>
                    <button
                      className="btn-icon-danger"
                      onClick={() => removeArrayItem('workExperience', exp.id)}
                      title="Delete position"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label>Job Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Frontend Developer"
                        value={exp.jobTitle}
                        onChange={(e) => handleArrayItemChange('workExperience', exp.id, 'jobTitle', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Company / Organization</label>
                      <input
                        type="text"
                        placeholder="e.g. Acme Corp"
                        value={exp.company}
                        onChange={(e) => handleArrayItemChange('workExperience', exp.id, 'company', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Location</label>
                      <input
                        type="text"
                        placeholder="e.g. Remote / Chicago, IL"
                        value={exp.location}
                        onChange={(e) => handleArrayItemChange('workExperience', exp.id, 'location', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Start Date</label>
                      <input
                        type="text"
                        placeholder="e.g. Jan 2021"
                        value={exp.startDate}
                        onChange={(e) => handleArrayItemChange('workExperience', exp.id, 'startDate', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>End Date</label>
                      <input
                        type="text"
                        placeholder="e.g. Present"
                        disabled={exp.currentlyWorking}
                        value={exp.currentlyWorking ? "Present" : exp.endDate}
                        onChange={(e) => handleArrayItemChange('workExperience', exp.id, 'endDate', e.target.value)}
                      />
                    </div>

                    <div className="form-group full-width checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={exp.currentlyWorking || false}
                          onChange={(e) => handleArrayItemChange('workExperience', exp.id, 'currentlyWorking', e.target.checked)}
                        />
                        <span>I currently work here</span>
                      </label>
                    </div>

                    <div className="form-group full-width">
                      <label>Key Responsibilities & Accomplishments</label>
                      <textarea
                        rows={3}
                        placeholder="• Built responsive features using React&#10;• Reduced load times by 30%..."
                        value={exp.description}
                        onChange={(e) => handleArrayItemChange('workExperience', exp.id, 'description', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Section 3: Education */}
        <section id="sec-education" className="form-section-block">
          <div className="section-title-bar">
            <div className="section-title-group">
              <div className="section-icon-badge">
                <GraduationCap size={18} />
              </div>
              <h3 className="section-form-title">Education</h3>
            </div>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => addArrayItem('education', {
                institution: '',
                degree: '',
                location: '',
                startDate: '',
                endDate: '',
                grade: ''
              })}
            >
              <Plus size={15} /> Add Education
            </button>
          </div>

          {resumeData.education.length === 0 ? (
            <div className="empty-state">
              <p>No education details added. Click "+ Add Education" to add your degree.</p>
            </div>
          ) : (
            <div className="dynamic-list">
              {resumeData.education.map((edu, index) => (
                <div key={edu.id} className="dynamic-item-card">
                  <div className="dynamic-card-header">
                    <span className="card-badge">Education #{index + 1}</span>
                    <button
                      className="btn-icon-danger"
                      onClick={() => removeArrayItem('education', edu.id)}
                      title="Delete education"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label>Degree / Qualification</label>
                      <input
                        type="text"
                        placeholder="e.g. Bachelor of Science in Computer Science"
                        value={edu.degree}
                        onChange={(e) => handleArrayItemChange('education', edu.id, 'degree', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Institution / University</label>
                      <input
                        type="text"
                        placeholder="e.g. Stanford University"
                        value={edu.institution}
                        onChange={(e) => handleArrayItemChange('education', edu.id, 'institution', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Location</label>
                      <input
                        type="text"
                        placeholder="e.g. Stanford, CA"
                        value={edu.location}
                        onChange={(e) => handleArrayItemChange('education', edu.id, 'location', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Start Date</label>
                      <input
                        type="text"
                        placeholder="e.g. 2018"
                        value={edu.startDate}
                        onChange={(e) => handleArrayItemChange('education', edu.id, 'startDate', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Graduation Date</label>
                      <input
                        type="text"
                        placeholder="e.g. 2022"
                        value={edu.endDate}
                        onChange={(e) => handleArrayItemChange('education', edu.id, 'endDate', e.target.value)}
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>GPA / Honors (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. 3.9 GPA, Dean's List"
                        value={edu.grade || ''}
                        onChange={(e) => handleArrayItemChange('education', edu.id, 'grade', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Section 4: Skills */}
        <section id="sec-skills" className="form-section-block">
          <div className="section-title-bar">
            <div className="section-title-group">
              <div className="section-icon-badge">
                <Code2 size={18} />
              </div>
              <h3 className="section-form-title">Skills & Competencies</h3>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group full-width">
              <label>Technical Skills (separated by commas)</label>
              <textarea
                rows={2}
                placeholder="JavaScript, React, Node.js, Python, PostgreSQL, AWS..."
                value={resumeData.skills?.technical ? resumeData.skills.technical.join(', ') : ''}
                onChange={(e) => handleSkillsChange('technical', e.target.value)}
              />
            </div>

            <div className="form-group full-width">
              <label>Soft Skills & Methodologies (separated by commas)</label>
              <textarea
                rows={2}
                placeholder="Team Leadership, Problem Solving, Agile/Scrum, Communication..."
                value={resumeData.skills?.soft ? resumeData.skills.soft.join(', ') : ''}
                onChange={(e) => handleSkillsChange('soft', e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Section 5: Projects */}
        <section id="sec-projects" className="form-section-block">
          <div className="section-title-bar">
            <div className="section-title-group">
              <div className="section-icon-badge">
                <FolderKanban size={18} />
              </div>
              <h3 className="section-form-title">Key Projects</h3>
            </div>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => addArrayItem('projects', {
                title: '',
                technologies: '',
                link: '',
                description: ''
              })}
            >
              <Plus size={15} /> Add Project
            </button>
          </div>

          {resumeData.projects.length === 0 ? (
            <div className="empty-state">
              <p>No projects added. Click "+ Add Project" to feature your work.</p>
            </div>
          ) : (
            <div className="dynamic-list">
              {resumeData.projects.map((proj, index) => (
                <div key={proj.id} className="dynamic-item-card">
                  <div className="dynamic-card-header">
                    <span className="card-badge">Project #{index + 1}</span>
                    <button
                      className="btn-icon-danger"
                      onClick={() => removeArrayItem('projects', proj.id)}
                      title="Delete project"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label>Project Title</label>
                      <input
                        type="text"
                        placeholder="e.g. E-Commerce Web App"
                        value={proj.title}
                        onChange={(e) => handleArrayItemChange('projects', proj.id, 'title', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Project URL / Link</label>
                      <input
                        type="text"
                        placeholder="e.g. github.com/user/project"
                        value={proj.link}
                        onChange={(e) => handleArrayItemChange('projects', proj.id, 'link', e.target.value)}
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>Technologies Used</label>
                      <input
                        type="text"
                        placeholder="e.g. React, Redux, Stripe API, Tailwind"
                        value={proj.technologies}
                        onChange={(e) => handleArrayItemChange('projects', proj.id, 'technologies', e.target.value)}
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>Description & Impact</label>
                      <textarea
                        rows={3}
                        placeholder="Briefly describe what you built, problem solved, and key features..."
                        value={proj.description}
                        onChange={(e) => handleArrayItemChange('projects', proj.id, 'description', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Section 6: Certifications */}
        <section id="sec-certifications" className="form-section-block">
          <div className="section-title-bar">
            <div className="section-title-group">
              <div className="section-icon-badge">
                <Award size={18} />
              </div>
              <h3 className="section-form-title">Certifications & Awards</h3>
            </div>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => addArrayItem('certifications', {
                name: '',
                issuer: '',
                date: ''
              })}
            >
              <Plus size={15} /> Add Certification
            </button>
          </div>

          {resumeData.certifications.length === 0 ? (
            <div className="empty-state">
              <p>No certifications added. Click "+ Add Certification".</p>
            </div>
          ) : (
            <div className="dynamic-list">
              {resumeData.certifications.map((cert, index) => (
                <div key={cert.id} className="dynamic-item-card">
                  <div className="dynamic-card-header">
                    <span className="card-badge">Certification #{index + 1}</span>
                    <button
                      className="btn-icon-danger"
                      onClick={() => removeArrayItem('certifications', cert.id)}
                      title="Delete certification"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label>Certification Name</label>
                      <input
                        type="text"
                        placeholder="e.g. AWS Certified Developer"
                        value={cert.name}
                        onChange={(e) => handleArrayItemChange('certifications', cert.id, 'name', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Issuing Organization</label>
                      <input
                        type="text"
                        placeholder="e.g. Amazon Web Services"
                        value={cert.issuer}
                        onChange={(e) => handleArrayItemChange('certifications', cert.id, 'issuer', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Date Issued</label>
                      <input
                        type="text"
                        placeholder="e.g. 2023"
                        value={cert.date}
                        onChange={(e) => handleArrayItemChange('certifications', cert.id, 'date', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Back to top helper */}
        <div className="scroll-top-wrapper">
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => scrollToSection('personal')}
          >
            <ChevronUp size={16} />
            <span>Back to top</span>
          </button>
        </div>

      </div>
    </div>
  );
};
