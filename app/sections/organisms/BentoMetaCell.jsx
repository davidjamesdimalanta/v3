"use client";

import { toast } from "sonner";
import Button from "../../ui/Button";

export default function BentoMetaCell({ project }) {
  const subtitle = project.tagline || project.description?.[0] || project.details?.type;
  const category = project.featuredCategory || project.details?.type || "Project";
  const cardClassName =
    "flex flex-col gutter-md h-full md:flex-1 min-h-[260px] py-6 overflow-hidden";

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
          {subtitle && <h2 className="t-h5 text-on-surface">{subtitle}</h2>}
          <p className="t-p text-on-surface-variant">{project.name}</p>
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
    <div className={cardClassName}>
      <div className="flex flex-col gutter-xs">
        <span className="t-label text-(--extended-colors-sage-green) uppercase bd-text">{category}</span>
        {subtitle && <h2 className="t-h5 text-on-surface">{subtitle}</h2>}
        <p className="t-p text-on-surface-variant">{project.name}</p>
      </div>

      <Button
        href={`/project/${project.slug}`}
        variant="primary"
        size="sm"
        text="View Case Study"
        className="self-start"
        soundEffect="navigateProject"
      />
    </div>
  );
}
