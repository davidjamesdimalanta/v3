import MediaBlock from "./MediaBlock";

export default function ContentBlock({
  title,
  text,
  media,
  thumbnail, // Optional thumbnail for video media (e.g., Mux thumbnail)
  caption,
  className = "",
  isFirstVideo = false, // Pass through to MediaBlock for first video delay
  priority = false, // Eager loading for above-the-fold images/thumbnails
}) {
  // Helper function to render text (handles both string and array)
  const renderText = (textContent) => {
    if (Array.isArray(textContent)) {
      return textContent.map((paragraph, index) => (
        <p key={index} className="text-p text-400">
          {paragraph}
        </p>
      ));
    }
    return <p className="text-p text-400">{textContent}</p>;
  };

  return (
    <section className={`flex flex-col gutter-sm ${className}`}>
      {/* Optional Title */}
      {title && <h3 className="text-h5">{typeof title === 'string' ? title : <>{title}</>}</h3>}

      {/* Optional Text Content */}
      {text && renderText(text)}

      {/* Optional Media Block */}
      {media?.src && <MediaBlock {...media} thumbnail={thumbnail} isFirstVideo={isFirstVideo} priority={priority} />}

      {/* Optional Caption (separate from media caption) */}
      {caption && <p className="text-tiny text-400 opacity-60">{caption}</p>}
    </section>
  );
}
