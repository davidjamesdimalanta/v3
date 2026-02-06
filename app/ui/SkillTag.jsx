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
        return 'bg-gradient-to-r from-[#0B99FF] to-[#6CC2FF] text-black';
      case 'dev':
        return 'bg-gradient-to-r from-[#39FF14] to-[#71CF88] text-black';
      case 'specialized':
        // Alternate between blue and green for visual interest
        // This can be enhanced later with index-based logic if needed
        return 'bg-gradient-to-r from-[#0B99FF] to-[#6CC2FF] text-black';
      case 'tools':
      default:
        return 'bd text-white';
    }
  };

  return (
    <span
      className={`
        inline-block w-hug h-hug
        px-3 py-1.5
        rounded-full
        text-xs text-400
        transition-all duration-150
        ${getCategoryStyles(category)}
      `}
    >
      {skill}
    </span>
  );
}
