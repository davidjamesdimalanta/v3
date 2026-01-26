/**
 * Case Study Text Block Component
 *
 * A centered text block for detailed case study sections, inspired by Daybreak Studio's layout.
 * Text is automatically centered with a max-width constraint for optimal readability.
 *
 * @param {string|JSX} title - Optional title for the text block
 * @param {string|string[]} text - Text content (string for single paragraph, array for multiple)
 * @param {string} className - Additional custom classes
 */
export default function CaseStudyTextBlock({ title, text, className = "" }) {
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
    <div className={`max-w-lg mx-auto text-center flex flex-col gap-4 ${className}`}>
      {/* Optional Title */}
      {title && (
        <h3 className="text-h5">
          {typeof title === "string" ? title : <>{title}</>}
        </h3>
      )}

      {/* Text Content */}
      {text && renderText(text)}
    </div>
  );
}
