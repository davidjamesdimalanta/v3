"use client";
import { useSoundEffects } from "../../ui/hooks/useSoundEffects";

export default function ProjectHero({
  name,
  title,
  links = [],
  awards = [],
  description = [],
  details = {},
}) {
  // Sound effects
  const { playButtonHover } = useSoundEffects();
  return (
    <section className="w-full px-4 pt-20 pb-8 md:px-5 md:pt-24 md:pb-8">
      <div className="max-w-[1200px] w-full mx-auto">
        {/* Two-column row: title/links left, meta/description right */}
        <div className="flex flex-col md:flex-row gutter-base md:gutter-lg pt-4">

        {/* LEFT: Title + links + awards */}
        <div className="flex flex-col gutter-base flex-1 lg:basis-[720px]">
          <div className="flex flex-col gutter-xs">
            <h1 className="text-h3 md:text-h1 text-400">{name}</h1>
            <h6 className="text-h6 text-400 text-(--schemes-tertiary)">{title}</h6>
          </div>

          {links.length > 0 && (
            <div className="flex flex-col gutter-xs">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-button text-400 uppercase hover:bd-text transition-all duration-150 w-hug"
                  onMouseEnter={playButtonHover}
                >
                  {link.label} →
                </a>
              ))}
            </div>
          )}

          {awards.length > 0 && (
            <div className="flex flex-col gutter-sm">
              <h2 className="text-sm text-500 opacity-60">Recognition</h2>
              <div className="flex flex-col gutter-xs">
                {awards.map((award, index) => (
                  <a
                    key={index}
                    href={award.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between text-p text-400 hover:bd-text transition-all duration-150"
                    onMouseEnter={playButtonHover}
                  >
                    <span>{award.name}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">→</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Details grid + description */}
        <div className="flex flex-col lg:flex-row gutter-base lg:gutter-lg flex-1 max-w-full lg:max-w-[min(75vw,120vh)] lg:basis-[75vw]">
          {description.length > 0 && (
            <div className="flex flex-col gutter-xs text-p flex-1 lg:flex-2">
              {description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          )}

                    {Object.keys(details).length > 0 && (
            <div className="grid grid-cols-2 gap-4 text-sm flex-1">
              {details.role && (
                <div className="flex flex-col gutter-xs">
                  <span className="text-xs text-(--schemes-tertiary)">Role</span>
                  <span>{details.role}</span>
                </div>
              )}
              {details.timeline && (
                <div className="flex flex-col gutter-xs">
                  <span className="text-xs text-(--schemes-tertiary)">Timeline</span>
                  <span>{details.timeline}</span>
                </div>
              )}
              {details.team && (
                <div className="flex flex-col gutter-xs">
                  <span className="text-xs text-(--schemes-tertiary)">Team</span>
                  <span>{details.team}</span>
                </div>
              )}
              {details.year && (
                <div className="flex flex-col gutter-xs">
                  <span className="text-xs text-(--schemes-tertiary)">Year</span>
                  <span>{details.year}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      </div>
    </section>
  );
}
