"use client";
import { useSoundEffects } from "../../ui/hooks/useSoundEffects";
import Button from "../../ui/Button";

export default function ProjectHero({
  name,
  title,
  links = [],
  awards = [],
  description = [],
  details = {},
  onClose
}) {
  // Sound effects
  const { playButtonHover, playNavigateHome } = useSoundEffects();
  return (
    <section className="w-full px-4 py-8 md:p-8">
      {/* Close Button */}
      <Button
        icon="close"
        onClick={() => {
          playNavigateHome();
          onClose();
        }}
        aria-label="Close project"
      />

      {/* Two-column row: title/links left, meta/description right */}
      <div className="flex flex-col md:flex-row gutter-lg pt-4">

        {/* LEFT: Title + links + awards */}
        <div className="flex flex-col gutter-base flex-1">
          <div className="flex flex-col gutter-xs">
            <h1 className="text-h3 md:text-h1 text-400">{name}</h1>
            <h6 className="text-h6 text-400 text-[#427067]">{title}</h6>
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
        <div className="flex flex-col gutter-base flex-1">
          {Object.keys(details).length > 0 && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              {details.role && (
                <div className="flex flex-col gutter-xs">
                  <span className="text-xs text-[#427067]">Role</span>
                  <span>{details.role}</span>
                </div>
              )}
              {details.timeline && (
                <div className="flex flex-col gutter-xs">
                  <span className="text-xs text-[#427067]">Timeline</span>
                  <span>{details.timeline}</span>
                </div>
              )}
              {details.team && (
                <div className="flex flex-col gutter-xs">
                  <span className="text-xs text-[#427067]">Team</span>
                  <span>{details.team}</span>
                </div>
              )}
              {details.year && (
                <div className="flex flex-col gutter-xs">
                  <span className="text-xs text-[#427067]">Year</span>
                  <span>{details.year}</span>
                </div>
              )}
            </div>
          )}

          {description.length > 0 && (
            <div className="flex flex-col gutter-xs text-p">
              {description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
