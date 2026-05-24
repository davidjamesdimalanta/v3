/**
 * Iteration Card Component
 *
 * A three-part evidence card used in iteration sections.
 * Structure: what happened → participant quote → what changed.
 *
 * The quote is visually subordinate (inline evidence) — it supports
 * the insight rather than leading it. All three parts are scannable
 * in under 10 seconds per card.
 *
 * @param {string} sectionHeading - Optional uppercase overline label
 * @param {string} title - Card heading
 * @param {string} whatHappened - Observation from the test session
 * @param {string} quote - Direct participant quote
 * @param {string} whatChanged - What was changed in the design as a result
 * @param {string} className - Additional custom classes
 */
export default function IterationCard({
  sectionHeading,
  title,
  whatHappened,
  quote,
  whatChanged,
  className = "",
}) {
  return (
    <div className={`max-w-lg mx-auto flex flex-col gutter-sm ${className}`}>
      {(sectionHeading || title) && (
        <div className="flex flex-col gutter-xs">
          {sectionHeading && (
            <span className="text-sm uppercase tracking-wide text-(--text-color-60)">
              {sectionHeading}
            </span>
          )}

          {title && (
            <h3 className="text-h5 text-600 text-(--text-color-100)">{title}</h3>
          )}
        </div>
      )}

      <div className="flex flex-col gutter-xs">
        {whatHappened && (
          <p className="text-p text-400 text-(--text-color-80)">{whatHappened}</p>
        )}

        {quote && (
          <blockquote className="border-l-2 border-(--schemes-tertiary) pl-4 my-1">
            <p className="text-p text-400 italic text-(--text-color-60)">
              &ldquo;{quote}&rdquo;
            </p>
          </blockquote>
        )}

        {whatChanged && (
          <p className="text-p text-400 text-(--text-color-80)">{whatChanged}</p>
        )}
      </div>
    </div>
  );
}
