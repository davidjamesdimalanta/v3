export default function Button({ text, className = "", ...props }) {
  const baseStyles = "px-6 py-3 rounded-full cursor-pointer";
  const variantStyles = "bd text-small text-400 hover:bd-text hover:bd-active transition-all duration-150";

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {text}
    </button>
  );
}
