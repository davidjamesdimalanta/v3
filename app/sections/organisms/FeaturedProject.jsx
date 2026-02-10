import Image from "next/image";
import SkillTag from "../../ui/SkillTag";

export default function FeaturedProject({
  title,
  description,
  imageSrc,
  imageAlt,
  tags = [],
  skills = [],
  year
}) {
  return (
    <div className="bd hover:bd-active transition-all duration-150 overflow-hidden w-fill h-fill flex flex-col">
      {/* Image Container */}
      <div className="relative w-full aspect-11/6">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col xl:flex-row gutter-base h-fill">
        {/* Header with title and year */}
        <div className="flex flex-col flex-1 h-hug lg:h-fill items-start gap-2">
          <h3 className="text-h4 text-400 leading-none">{title}</h3>
          {description && ( <p className="text-base text-[#cdcdcd] leading-none">{description}</p>)}
        </div>

        {/* Skills Tags */}
        {skills.length > 0 && (
          <div className="h-hug flex flex-1 flex-wrap justify-start md:justify-end items-start gutter-xs">
            {skills.map((skill, index) => (
              <SkillTag
                key={index}
                skill={skill.name}
                category={skill.category}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
