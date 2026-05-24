import React from 'react';
import { InView } from '@/components/motion-primitives/in-view';

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
export default function CaseStudyTextBlock({
  sectionHeading,
  title,
  text,
  id,
  className = "",
  stackClassName = "gutter-sm",
  bodyClassName = "gutter-xs",
  children,
}) {
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
          <p key={index} className="text-p text-400 text-(--text-color-80)">
            {paragraph}
          </p>
        );
      });
    }
    return <p className="text-p text-400 text-(--text-color-80)">{textContent}</p>;
  };

  const body = children ? children : text && renderText(text);

  return (
    <InView
      variants={{
        hidden: { opacity: 0, y: 8, filter: 'blur(4px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
      }}
      transition={{ type: 'spring', duration: 0.45, bounce: 0 }}
    >
      <div id={id} className={`max-w-lg mx-auto flex flex-col ${stackClassName} px-4 ${className}`}>
        {(sectionHeading || title) && (
          <div className="flex flex-col gutter-xs">
            {/* Optional Section Heading */}
            {sectionHeading && (
              <span className="text-sm uppercase tracking-wide text-(--text-color-60)">
                {sectionHeading}
              </span>
            )}

            {/* Optional Title */}
            {title && (
              <h2 className="text-h4 text-600 text-(--text-color-100)">
                {typeof title === "string" ? title : <>{title}</>}
              </h2>
            )}
          </div>
        )}

        {/* Text Content */}
        {body && (
          <div className={`flex flex-col ${bodyClassName}`}>
            {body}
          </div>
        )}
      </div>
    </InView>
  );
}
