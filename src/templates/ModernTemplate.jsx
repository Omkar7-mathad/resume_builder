import React from 'react';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Code2, FolderKanban, Award, User } from 'lucide-react';

const LinkedinIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GithubIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

export const ModernTemplate = ({ data }) => {
  const { personalInfo, workExperience, education, skills, projects, certifications } = data;

  return (
    <div className="resume-paper modern-template">
      {/* Modern Blue Header Banner */}
      <header className="modern-header">
        <div className="modern-header-content">
          <h1 className="modern-name">{personalInfo.fullName || "Your Full Name"}</h1>
          {personalInfo.jobTitle && (
            <p className="modern-title">{personalInfo.jobTitle}</p>
          )}

          <div className="modern-contact-grid">
            {personalInfo.email && (
              <div className="modern-contact-item">
                <Mail size={14} />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="modern-contact-item">
                <Phone size={14} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="modern-contact-item">
                <MapPin size={14} />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="modern-contact-item">
                <Globe size={14} />
                <span>{personalInfo.website}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="modern-contact-item">
                <LinkedinIcon size={14} />
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="modern-contact-item">
                <GithubIcon size={14} />
                <span>{personalInfo.github}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="modern-body">
        {/* Professional Summary */}
        {personalInfo.summary && (
          <section className="modern-section">
            <h2 className="modern-section-title">
              <User size={18} className="modern-icon" />
              <span>Professional Summary</span>
            </h2>
            <p className="modern-summary">{personalInfo.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {workExperience && workExperience.length > 0 && (
          <section className="modern-section">
            <h2 className="modern-section-title">
              <Briefcase size={18} className="modern-icon" />
              <span>Work Experience</span>
            </h2>
            <div className="modern-timeline">
              {workExperience.map((exp) => (
                <div key={exp.id} className="modern-timeline-item">
                  <div className="modern-item-header">
                    <div>
                      <h3 className="modern-role">{exp.jobTitle}</h3>
                      <div className="modern-company">{exp.company} {exp.location && `• ${exp.location}`}</div>
                    </div>
                    <div className="modern-badge">
                      {exp.startDate && (
                        <span>
                          {exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}
                        </span>
                      )}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="modern-desc">
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

        {/* Skills */}
        {((skills?.technical && skills.technical.length > 0) || (skills?.soft && skills.soft.length > 0)) && (
          <section className="modern-section">
            <h2 className="modern-section-title">
              <Code2 size={18} className="modern-icon" />
              <span>Skills & Expertise</span>
            </h2>
            <div className="modern-skills-wrapper">
              {skills.technical && skills.technical.length > 0 && (
                <div className="modern-skill-category">
                  <h4 className="modern-skill-subhead">Technical Skills</h4>
                  <div className="modern-pill-container">
                    {skills.technical.map((skill, index) => (
                      <span key={index} className="modern-pill primary-pill">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
              {skills.soft && skills.soft.length > 0 && (
                <div className="modern-skill-category">
                  <h4 className="modern-skill-subhead">Soft Skills & Methodologies</h4>
                  <div className="modern-pill-container">
                    {skills.soft.map((skill, index) => (
                      <span key={index} className="modern-pill secondary-pill">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className="modern-section">
            <h2 className="modern-section-title">
              <GraduationCap size={18} className="modern-icon" />
              <span>Education</span>
            </h2>
            <div className="modern-grid-list">
              {education.map((edu) => (
                <div key={edu.id} className="modern-card-item">
                  <div className="modern-item-header">
                    <div>
                      <h3 className="modern-role">{edu.degree}</h3>
                      <div className="modern-company">{edu.institution} {edu.location && `• ${edu.location}`}</div>
                    </div>
                    <div className="modern-badge">
                      {edu.startDate && <span>{edu.startDate} – {edu.endDate}</span>}
                    </div>
                  </div>
                  {edu.grade && <div className="modern-grade">GPA / Grade: {edu.grade}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key Projects */}
        {projects && projects.length > 0 && (
          <section className="modern-section">
            <h2 className="modern-section-title">
              <FolderKanban size={18} className="modern-icon" />
              <span>Featured Projects</span>
            </h2>
            <div className="modern-projects-list">
              {projects.map((proj) => (
                <div key={proj.id} className="modern-project-card">
                  <div className="modern-project-head">
                    <h3 className="modern-proj-title">{proj.title}</h3>
                    {proj.link && (
                      <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="modern-proj-link">
                        {proj.link}
                      </a>
                    )}
                  </div>
                  {proj.technologies && (
                    <div className="modern-proj-tech">
                      <span>Tech: {proj.technologies}</span>
                    </div>
                  )}
                  {proj.description && <p className="modern-proj-desc">{proj.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section className="modern-section">
            <h2 className="modern-section-title">
              <Award size={18} className="modern-icon" />
              <span>Certifications & Honors</span>
            </h2>
            <div className="modern-cert-grid">
              {certifications.map((cert) => (
                <div key={cert.id} className="modern-cert-card">
                  <strong className="modern-cert-name">{cert.name}</strong>
                  <div className="modern-cert-meta">
                    {cert.issuer && <span>{cert.issuer}</span>}
                    {cert.date && <span> • {cert.date}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
