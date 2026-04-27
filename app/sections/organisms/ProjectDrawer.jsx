"use client";

import { Drawer } from "vaul";
import Image from "next/image";
import Button from "../../ui/Button";
import SkillTag from "../../ui/SkillTag";

export default function ProjectDrawer({ open, onOpenChange, project }) {
  if (!project) return null;

  const { slug, name, title, coverImage, details, skills = [] } = project;

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-black/40" />
        <Drawer.Content
          className="fixed bottom-0 left-0 right-0 z-50 bg-surface rounded-t-[24px] bd flex flex-col max-h-[90vh] outline-none"
          aria-labelledby="drawer-title"
        >
          {/* Handle */}
          <div className="mx-auto mt-3 h-1 w-9 shrink-0 rounded-full bg-[var(--schemes-on-surface-variant)]/30" />

          <Drawer.Title id="drawer-title" className="sr-only">
            {name}
          </Drawer.Title>

          {/* Scrollable body */}
          <div className="overflow-y-auto flex-1">
            <div className="max-w-[1200px] mx-auto px-6 py-8">
              {/* Two-col desktop / single-col mobile */}
              <div className="flex flex-col md:flex-row gutter-base md:gutter-lg">
                {/* Left — cover art */}
                {coverImage && (
                  <div className="flex-1 relative aspect-video md:aspect-auto md:min-h-[280px] rounded-[16px] overflow-hidden shrink-0">
                    <Image
                      src={coverImage}
                      alt={`${name} cover`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Right — metadata */}
                <div className="flex-1 flex flex-col gutter-base">
                  {/* Meta line */}
                  <span className="t-label text-on-surface-variant">
                    {details?.type}
                    {details?.year ? ` · ${details.year}` : ""}
                  </span>

                  {/* Title */}
                  <div className="flex flex-col gap-1">
                    <h2 id="drawer-title-visible" className="t-h3 text-on-surface">{name}</h2>
                    {title && <p className="t-p text-on-surface-variant">{title}</p>}
                  </div>

                  {/* Skills */}
                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, i) => (
                        <SkillTag key={i} skill={skill.name} category={skill.category} />
                      ))}
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3 mt-auto pt-2">
                    <Button
                      text="View case study"
                      href={`/project/${slug}`}
                      soundEffect="navigateProject"
                    />
                    <Button
                      text="Close"
                      onClick={() => onOpenChange(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
