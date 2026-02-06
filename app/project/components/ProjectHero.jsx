"use client";

import { useSoundEffects } from "../../ui/hooks/useSoundEffects";
import SkillTag from "../../ui/SkillTag";

export default function ProjectHero({
  title,
  links = [],
  awards = [],
  description = [],
  details = {},
  skills = [],
  onClose
}) {
  // Sound effects
  const { playHover, playNavigateHome } = useSoundEffects();
  return (
    <aside className="relative flex flex-1 flex-col lg:basis-[720px]">
      <div className="justify-between sticky top-0 flex h-full flex-col lg:max-h-svh px-4 py-8 md:p-8">
        <div className="flex flex-col gutter-base pb-4 md:pb-0">
          {/* Close Button */}
          <button
            onClick={() => {
              playNavigateHome();
              onClose();
            }}
            className="flex items-center gutter-xs text-button text-400 hover:bd-text transition-all duration-150 w-hug cursor-pointer"
            aria-label="Close project"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7407 0.740723L0.740723 10.7407M0.740723 0.740723L10.7407 10.7407" stroke="currentColor" strokeWidth="1.48148" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>
              Close
            </span>
          </button>

          {/* Project Title */}
          <h1 className="text-h3 md:text-h1 text-400">
            {title}
          </h1>

          {/* Live Project Links */}
          {links.length > 0 && (
            <div className="flex flex-col gutter-xs">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-button text-400 hover:bd-text transition-all duration-150 w-hug"
                  onMouseEnter={playHover}
                >
                  {link.label} →
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gutter-xs">
          {/* Awards Section */}
          {awards.length > 0 && (
            <div className="flex flex-col gutter-sm pt-4">
              <h2 className="text-sm text-500 opacity-60">Recognition</h2>
              <div className="flex flex-col gutter-xs">
                {awards.map((award, index) => (
                  <a
                    key={index}
                    href={award.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between text-p text-400 hover:bd-text transition-all duration-150"
                    onMouseEnter={playHover}
                  >
                    <span>{award.name}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">→</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Project Details */}
          {Object.keys(details).length > 0 && (
            <div className="flex flex-col gutter-sm pt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                {details.role && (
                  <div className="flex flex-col gutter-xs">
                    <span className="text-xs opacity-60">Role</span>
                    <span>{details.role}</span>
                  </div>
                )}
                {details.timeline && (
                  <div className="flex flex-col gutter-xs">
                    <span className="text-xs opacity-60">Timeline</span>
                    <span>{details.timeline}</span>
                  </div>
                )}
                {details.team && (
                  <div className="flex flex-col gutter-xs">
                    <span className="text-xs opacity-60">Team</span>
                    <span>{details.team}</span>
                  </div>
                )}
                {details.year && (
                  <div className="flex flex-col gutter-xs">
                    <span className="text-xs opacity-60">Year</span>
                    <span>{details.year}</span>
                  </div>
                )}
              </div>
            </div>

          )}

          {/* Skills Tags */}
          {skills.length > 0 && (
            <div className="flex flex-col gutter-sm pt-4">
              <h2 className="text-xs text-500 opacity-60">Skills</h2>
              <div className="flex flex-wrap gutter-xs">
                {skills.map((skill, index) => (
                  <SkillTag
                    key={index}
                    skill={skill.name}
                    category={skill.category}
                  />
                ))}
              </div>
            </div>
          )}
          {/* Project Description */}
          {description.length > 0 && (
            <div className="flex flex-col gutter-sm pt-4 md:pt-4">
              <div className="flex flex-col gutter-xs text-p">
                {description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </aside>
  );
}
