import MediaBlock from "./MediaBlock";

export default function ContentBlock({
  title,
  text,
  media,
  caption,
  className = ""
}) {
  // Helper function to render text (handles both string and array)
  const renderText = (textContent) => {
    if (Array.isArray(textContent)) {
      return textContent.map((paragraph, index) => (
        <p key={index} className="text-base text-400 leading-relaxed">
          {paragraph}
        </p>
      ));
    }
    return <p className="text-base text-400 leading-relaxed">{textContent}</p>;
  };

  return (
    <section className={`flex flex-col gutter-base ${className}`}>
      {/* Optional Title */}
      {title && <h3 className="text-medium text-600">{title}</h3>}

      {/* Optional Text Content */}
      {text && renderText(text)}

      {/* Optional Media Block */}
      {media?.src && <MediaBlock {...media} />}

      {/* Optional Caption (separate from media caption) */}
      {caption && <p className="text-tiny text-400 opacity-60">{caption}</p>}
    </section>
  );
}
