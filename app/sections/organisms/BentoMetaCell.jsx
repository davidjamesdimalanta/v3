"use client";

import Link from "next/link";
import { toast } from "sonner";
import Button from "../../ui/Button";
import { useSoundEffects } from "../../ui/hooks/useSoundEffects";

export default function BentoMetaCell({ project }) {
  const { playButtonHover, playNavigateProject } = useSoundEffects();
  const subtitle = project.tagline || project.description?.[0] || project.details?.type;
  const category = project.featuredCategory || project.details?.type || "Project";
  const cardClassName =
    "flex flex-col justify-between gutter-base h-full md:flex-1 min-h-[260px] border rounded-[40px] hover:rounded-[56px] p-6 overflow-hidden bd-liquid-glass-primary hover:bd-liquid-glass-primary-hover";

  const handleComingSoon = () => {
    toast("Coming soon", {
      description: "This project is currently being documented.",
    });
  };

  if (project.comingSoon) {
    return (
      <div className={cardClassName}>
        <div className="flex flex-col gutter-xs">
          <span className="t-label text-(--extended-colors-sage-green) uppercase bd-text">{category}</span>
          <h2 className="t-h2 text-on-surface">{project.name}</h2>
          {subtitle && <p className="t-p text-on-surface-variant">{subtitle}</p>}
        </div>

        <Button
          type="button"
          variant="primary"
          size="sm"
          text="Coming soon"
          className="self-start"
          onClick={handleComingSoon}
          aria-disabled="true"
        />
      </div>
    );
  }

  return (
    <Link
      href={`/project/${project.slug}`}
      className={`${cardClassName} group cursor-pointer focus-visible:outline-2 focus-visible:outline-(--schemes-primary) focus-visible:outline-offset-2`}
      onMouseEnter={playButtonHover}
      onClick={playNavigateProject}
    >
      <div className="flex flex-col gutter-xs">
        <span className="t-label text-(--extended-colors-sage-green) uppercase bd-text">{category}</span>
        <h2 className="t-h2 text-on-surface">{project.name}</h2>
        {subtitle && <p className="t-p text-on-surface-variant">{subtitle}</p>}
      </div>

      <span className="btn-base btn-sm btn-primary hover-surface self-start group-hover:bg-(--schemes-on-primary-container) group-focus-visible:bg-(--schemes-on-primary-container)">
        View Case Study
      </span>
    </Link>
  );
}
