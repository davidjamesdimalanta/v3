"use client";
import Link from "next/link";
import { useSoundEffects } from "../../ui/hooks/useSoundEffects";
import MediaBlock from "./contentTypes/MediaBlock";

export default function ProjectHero({
  name,
  title,
  links = [],
  awards = [],
  description = [],
  details = {},
  skills = [],
  heroMedia = [],
}) {
  // Sound effects
  const { playButtonHover, playNavigateHome } = useSoundEffects();
  const primaryHeroMedia = heroMedia[0];
  const toolSkills = skills
    .filter((skill) => skill.category === "tools")
    .map((skill) => skill.name);
  const detailItems = [
    details.role && { label: "Role", value: details.role },
    toolSkills.length > 0 && { label: "Tools", value: toolSkills.join(", ") },
    details.team && { label: "Team", value: details.team },
    details.timeline && { label: "Duration", value: details.timeline },
  ].filter(Boolean);

  return (
    <section className="w-full px-4 pt-20 pb-8 md:px-5 md:pt-24 md:pb-8">
      <div className="max-w-[1200px] w-full mx-auto flex flex-col gutter-lg">
        <Link
          href="/"
          className="group w-hug inline-flex min-h-[44px] items-center gutter-xs text-button text-400 uppercase text-(--schemes-on-surface-variant) transition-opacity duration-150 hover:opacity-70"
          onClick={playNavigateHome}
          onMouseEnter={playButtonHover}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 12 12"
            className="size-[1cap] overflow-visible transition-transform duration-150 group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          >
            <path d="M5.5 1 1 6l4.5 5" />
            <path d="M1.5 6H11" />
          </svg>
          <span>Back</span>
        </Link>

        <div className="flex flex-col gutter-md">
          <div className="flex flex-col gutter-sm">
            <p className="text-button text-500 uppercase text-(--schemes-on-surface-variant)">
              {name}
            </p>
            <h1 className="text-h2 text-400 max-w-[980px]">{title}</h1>
          </div>

          <div className="h-px w-full bg-(--schemes-outline-variant)" />

          <div className="grid grid-cols-1 gutter-base md:grid-cols-[minmax(220px,1fr)_minmax(0,1fr)] md:gutter-lg">
            <div className="order-2 flex flex-col items-start gutter-sm md:order-none">
              {links.length > 0 && (
                <div className="flex flex-wrap gutter-xs">
                  {links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-base btn-md btn-ghost hover-surface min-h-[44px] gutter-xs"
                      onMouseEnter={playButtonHover}
                    >
                      <span aria-hidden="true">↗</span>
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              )}

              {awards.length > 0 && (
                <div className="flex flex-col gutter-xs">
                  <h2 className="text-xs text-500 uppercase text-(--schemes-tertiary)">
                    Recognition
                  </h2>
                  {awards.map((award, index) => {
                    if (!award.url) {
                      return (
                        <p key={index} className="text-sm text-400">
                          {award.name}
                        </p>
                      );
                    }

                    return (
                      <a
                        key={index}
                        href={award.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gutter-xs text-sm text-400 transition-all duration-150 hover:bd-text"
                        onMouseEnter={playButtonHover}
                      >
                        <span>{award.name}</span>
                        <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1">
                          →
                        </span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {description.length > 0 && (
              <div className="order-1 flex flex-col gutter-xs text-p text-400 md:order-none md:col-start-2 md:row-start-1 md:max-w-[620px]">
                {description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>

          {primaryHeroMedia?.src && (
            <MediaBlock
              {...primaryHeroMedia}
              className="w-full"
              thumbnail={primaryHeroMedia.thumbnail}
              isFirstVideo={primaryHeroMedia.isFirstVideo}
              priority={primaryHeroMedia.priority}
            />
          )}

          {detailItems.length > 0 && (
            <dl className="grid grid-cols-2 gutter-base text-xs lg:flex lg:flex-row lg:items-start lg:justify-between">
              {detailItems.map((item) => (
                <div key={item.label} className="flex w-hug max-w-full flex-col gutter-xs md:whitespace-nowrap">
                  <dt className="text-xs text-600 uppercase text-(--schemes-tertiary)">
                    {item.label}
                  </dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}
