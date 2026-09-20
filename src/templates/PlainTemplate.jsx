import React from 'react';

export const PlainTemplate = ({ data }) => {
  const { personalInfo, workExperience, education, skills, projects, certifications } = data;

  return (
    <div className="resume-paper plain-template">
      {/* Header */}
      <header className="plain-header">
        <h1 className="plain-name">{personalInfo.fullName || "Your Full Name"}</h1>
        {personalInfo.jobTitle && (
          <div className="plain-title">{personalInfo.jobTitle}</div>
        )}
        <div className="plain-contact-line">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>• {personalInfo.github}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="plain-section">
          <h2 className="plain-section-title">Professional Summary</h2>
          <p className="plain-summary-text">{personalInfo.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience && workExperience.length > 0 && (
        <section className="plain-section">
          <h2 className="plain-section-title">Work Experience</h2>
          <div className="plain-list">
            {workExperience.map((exp) => (
              <div key={exp.id} className="plain-item">
                <div className="plain-item-header">
                  <div>
                    <strong className="plain-role">{exp.jobTitle}</strong>
                    {exp.company && <span className="plain-company"> — {exp.company}</span>}
                  </div>
                  <div className="plain-date-location">
                    {exp.startDate && (
                      <span>
                        {exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}
                      </span>
                    )}
                    {exp.location && <span> | {exp.location}</span>}
                  </div>
                </div>
                {exp.description && (
                  <div className="plain-description">
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

      {/* Education */}
      {education && education.length > 0 && (
        <section className="plain-section">
          <h2 className="plain-section-title">Education</h2>
          <div className="plain-list">
            {education.map((edu) => (
              <div key={edu.id} className="plain-item">
                <div className="plain-item-header">
                  <div>
                    <strong className="plain-degree">{edu.degree}</strong>
                    {edu.institution && <span className="plain-institution"> — {edu.institution}</span>}
                  </div>
                  <div className="plain-date-location">
                    {edu.startDate && (
                      <span>
                        {edu.startDate} – {edu.endDate}
                      </span>
                    )}
                    {edu.grade && <span> ({edu.grade})</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {((skills?.technical && skills.technical.length > 0) || (skills?.soft && skills.soft.length > 0)) && (
        <section className="plain-section">
          <h2 className="plain-section-title">Skills</h2>
          <div className="plain-skills-container">
            {skills.technical && skills.technical.length > 0 && (
              <div className="plain-skill-group">
                <strong>Technical Skills: </strong>
                <span>{skills.technical.join(', ')}</span>
              </div>
            )}
            {skills.soft && skills.soft.length > 0 && (
              <div className="plain-skill-group">
                <strong>Soft Skills & Tools: </strong>
                <span>{skills.soft.join(', ')}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="plain-section">
          <h2 className="plain-section-title">Key Projects</h2>
          <div className="plain-list">
            {projects.map((proj) => (
              <div key={proj.id} className="plain-item">
                <div className="plain-item-header">
                  <strong>{proj.title}</strong>
                  {proj.link && <span className="plain-link"> ({proj.link})</span>}
                </div>
                {proj.technologies && (
                  <div className="plain-tech-stack">
                    <em>Technologies: {proj.technologies}</em>
                  </div>
                )}
                {proj.description && <p className="plain-proj-desc">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="plain-section">
          <h2 className="plain-section-title">Certifications & Honors</h2>
          <ul className="plain-cert-list">
            {certifications.map((cert) => (
              <li key={cert.id}>
                <strong>{cert.name}</strong> {cert.issuer && `— ${cert.issuer}`} {cert.date && `(${cert.date})`}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};
