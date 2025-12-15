"use client";

export default function ProjectHero({
  title,
  liveUrl,
  awards = [],
  description = [],
  details = {},
  onClose
}) {
  return (
    <aside className="relative flex flex-1 flex-col lg:basis-[720px]">
      <div className="justify-between sticky top-0 flex h-full flex-col lg:max-h-svh padding-page bg-black">
        <div className="flex flex-col gutter-xs">
          {/* Close Button - Desktop Only */}
          <button
            onClick={onClose}
            className="hidden lg:flex items-center gutter-xs text-small text-400 hover:bd-text transition-all duration-150 w-hug"
            aria-label="Close project"
          >
            <span>←</span>
            <span>Close</span>
          </button>

          {/* Project Title */}
          <h1 className="text-medium md:text-large text-400">
            {title}
          </h1>

          {/* Live Project Link */}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-400 hover:bd-text transition-all duration-150 w-hug"
            >
              Visit Live Project →
            </a>
          )}
        </div>

        <div className="flex flex-col gutter-xs">
          {/* Awards Section */}
          {awards.length > 0 && (
            <div className="flex flex-col gutter-sm pt-4">
              <h2 className="text-small text-500 opacity-60">Recognition</h2>
              <div className="flex flex-col gutter-xs">
                {awards.map((award, index) => (
                  <a
                    key={index}
                    href={award.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between text-base text-400 hover:bd-text transition-all duration-150"
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
              <div className="grid grid-cols-2 gap-4 text-small text-500">
                {details.role && (
                  <div className="flex flex-col gutter-xs">
                    <span className="text-tiny opacity-60">Role</span>
                    <span>{details.role}</span>
                  </div>
                )}
                {details.timeline && (
                  <div className="flex flex-col gutter-xs">
                    <span className="text-tiny opacity-60">Timeline</span>
                    <span>{details.timeline}</span>
                  </div>
                )}
                {details.team && (
                  <div className="flex flex-col gutter-xs">
                    <span className="text-tiny opacity-60">Team</span>
                    <span>{details.team}</span>
                  </div>
                )}
                {details.year && (
                  <div className="flex flex-col gutter-xs">
                    <span className="text-tiny opacity-60">Year</span>
                    <span>{details.year}</span>
                  </div>
                )}
              </div>
            </div>

          )}
          {/* Project Description */}
          {description.length > 0 && (
            <div className="flex flex-col gutter-sm pt-4">
              <div className="flex flex-col gutter-xs text-small text-500">
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
