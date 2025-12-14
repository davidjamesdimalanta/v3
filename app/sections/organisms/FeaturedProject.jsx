import Image from "next/image";
import Button from "../../ui/Button";
import Link from "next/link";

export default function FeaturedProject({
  title,
  description,
  imageSrc,
  imageAlt,
  tags = [],
  year
}) {
  return (
    <div className="bd hover:bd-active overflow-hidden w-fill flex flex-col">
      {/* Image Container */}
      <div className="relative w-full aspect-video">
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
      <div className="px-4 py-2 flex flex-col gutter-base">
        {/* Header with title and year */}
        <div className="flex justify-between items-start gutter-sm">
          <h3 className="text-md text-500">{title}</h3>
          {description && ( <p className="text-sm text-400">{description}</p>)}        
        </div>
      </div>
    </div>
  );
}
