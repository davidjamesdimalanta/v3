/**
 * SkillTag Component
 *
 * A reusable pill-shaped tag component for displaying skills/technologies
 * with category-based color coding.
 *
 * @param {string} skill - The skill name to display
 * @param {string} category - The category type: 'design' | 'dev' | 'tools' | 'specialized'
 */

export default function SkillTag({ skill, category = 'tools' }) {
  // Define category color classes
  const getCategoryStyles = (category) => {
    switch (category) {
      case 'design':
        return 'bd-tag text-(--primary-900)';

      case 'dev':
        return 'bd-tag text-(--primary-900)';

      case 'specialized':
        return 'bd-tag text-(--primary-900)';

      case 'tools':

      default:
        return 'bd-tag text-(--primary-900)';
      }
  };

  return (
    <span
      // style={{ fontFamily: 'var(--font-new-rodin-pro)' }}
      className={`
        inline-block w-hug h-hug
        px-3 py-1
        rounded-full
        text-xs text-500
        ${getCategoryStyles(category)}
      `}
    >
      {skill}
    </span>
  );
}
