import React from 'react';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Code2, FolderKanban, Award } from 'lucide-react';

const LinkedinIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GithubIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

export const CompactTemplate = ({ data }) => {
  const { personalInfo, workExperience, education, skills, projects, certifications } = data;

  return (
    <div className="resume-paper compact-template">
      {/* Top Blue Accent Strip */}
      <div className="compact-top-strip"></div>

      {/* Header */}
      <header className="compact-header">
        <h1 className="compact-name">{personalInfo.fullName || "Your Full Name"}</h1>
        {personalInfo.jobTitle && <p className="compact-title">{personalInfo.jobTitle}</p>}

        <div className="compact-contact-row">
          {personalInfo.email && (
            <span><Mail size={12} /> {personalInfo.email}</span>
          )}
          {personalInfo.phone && (
            <span>• <Phone size={12} /> {personalInfo.phone}</span>
          )}
          {personalInfo.location && (
            <span>• <MapPin size={12} /> {personalInfo.location}</span>
          )}
          {personalInfo.website && (
            <span>• <Globe size={12} /> {personalInfo.website}</span>
          )}
          {personalInfo.linkedin && (
            <span>• <LinkedinIcon size={12} /> {personalInfo.linkedin}</span>
          )}
          {personalInfo.github && (
            <span>• <GithubIcon size={12} /> {personalInfo.github}</span>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="compact-section compact-summary-box">
          <p>{personalInfo.summary}</p>
        </section>
      )}

      {/* Main Grid Content: 2-Column Split */}
      <div className="compact-grid-split">
        {/* Left Column: Work Experience & Projects */}
        <div className="compact-col-left">
          {workExperience && workExperience.length > 0 && (
            <section className="compact-section">
              <h2 className="compact-section-heading">
                <Briefcase size={16} className="text-blue" />
                <span>Experience</span>
              </h2>
              <div className="compact-exp-list">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="compact-exp-item">
                    <div className="compact-item-top">
                      <strong className="compact-item-role">{exp.jobTitle}</strong>
                      <span className="compact-date">{exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}</span>
                    </div>
                    <div className="compact-company">{exp.company} {exp.location && `• ${exp.location}`}</div>
                    {exp.description && (
                      <div className="compact-desc">
                        {exp.description.split('\n').map((line, idx) => (
                          <p key={idx}>{line}</p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects && projects.length > 0 && (
            <section className="compact-section">
              <h2 className="compact-section-heading">
                <FolderKanban size={16} className="text-blue" />
                <span>Projects</span>
              </h2>
              <div className="compact-proj-list">
                {projects.map((proj) => (
                  <div key={proj.id} className="compact-proj-item">
                    <div className="compact-item-top">
                      <strong>{proj.title}</strong>
                      {proj.link && <span className="compact-proj-link">{proj.link}</span>}
                    </div>
                    {proj.technologies && <div className="compact-tech">Tech: {proj.technologies}</div>}
                    {proj.description && <p className="compact-proj-desc">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Skills, Education, Certifications */}
        <div className="compact-col-right">
          {((skills?.technical && skills.technical.length > 0) || (skills?.soft && skills.soft.length > 0)) && (
            <section className="compact-section">
              <h2 className="compact-section-heading">
                <Code2 size={16} className="text-blue" />
                <span>Skills</span>
              </h2>
              {skills.technical && skills.technical.length > 0 && (
                <div className="compact-skill-group">
                  <span className="compact-skill-label">Technical:</span>
                  <div className="compact-badges">
                    {skills.technical.map((sk, i) => (
                      <span key={i} className="compact-badge blue-badge">{sk}</span>
                    ))}
                  </div>
                </div>
              )}
              {skills.soft && skills.soft.length > 0 && (
                <div className="compact-skill-group">
                  <span className="compact-skill-label">Soft Skills:</span>
                  <div className="compact-badges">
                    {skills.soft.map((sk, i) => (
                      <span key={i} className="compact-badge gray-badge">{sk}</span>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {education && education.length > 0 && (
            <section className="compact-section">
              <h2 className="compact-section-heading">
                <GraduationCap size={16} className="text-blue" />
                <span>Education</span>
              </h2>
              <div className="compact-edu-list">
                {education.map((edu) => (
                  <div key={edu.id} className="compact-edu-item">
                    <strong>{edu.degree}</strong>
                    <div className="compact-company">{edu.institution}</div>
                    <div className="compact-date">{edu.startDate} – {edu.endDate} {edu.grade && `• GPA: ${edu.grade}`}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications && certifications.length > 0 && (
            <section className="compact-section">
              <h2 className="compact-section-heading">
                <Award size={16} className="text-blue" />
                <span>Certifications</span>
              </h2>
              <div className="compact-cert-list">
                {certifications.map((cert) => (
                  <div key={cert.id} className="compact-cert-item">
                    <strong>{cert.name}</strong>
                    <div className="compact-company">{cert.issuer} ({cert.date})</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
