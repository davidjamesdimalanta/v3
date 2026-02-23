import React from 'react';

/**
 * Case Study Text Block Component
 *
 * A centered text block for detailed case study sections, inspired by Daybreak Studio's layout.
 * Text is automatically centered with a max-width constraint for optimal readability.
 *
 * @param {string} sectionHeading - Optional section heading (h5, appears above title)
 * @param {string|JSX} title - Optional title for the text block
 * @param {string|string[]} text - Text content (string for single paragraph, array for multiple)
 * @param {string} id - Optional ID for intersection observer tracking
 * @param {string} className - Additional custom classes
 */
export default function CaseStudyTextBlock({ sectionHeading, title, text, id, className = "" }) {
  // Helper function to render text (handles both string and array)
  const renderText = (textContent) => {
    if (Array.isArray(textContent)) {
      return textContent.map((paragraph, index) => {
        // If it's already a block-level flex container, render as-is without wrapping in <p>
        if (
          typeof paragraph === 'object' &&
          paragraph?.props?.className?.includes('flex')
        ) {
          return React.cloneElement(paragraph, { key: index });
        }
        // Otherwise wrap in <p>
        return (
          <p key={index} className="text-p text-400 text-[#2C4E47]">
            {paragraph}
          </p>
        );
      });
    }
    return <p className="text-p text-400 text-[#2C4E47]">{textContent}</p>;
  };

  return (
    <div id={id} className={`max-w-lg mx-auto flex flex-col gap-2 ${className}`}>
      {/* Optional Section Heading */}
      {sectionHeading && (
        <span className="text-small uppercase tracking-wide text-[#799A92]">
          {sectionHeading}
        </span>
      )}

      {/* Optional Title */}
      {title && (
        <h3 className="text-h5 text-600">
          {typeof title === "string" ? title : <>{title}</>}
        </h3>
      )}

      {/* Text Content */}
      {text && renderText(text)}
    </div>
  );
}
