export default function Button({ children, variant = "default", className = "", ...props }) {
  const baseStyles = "px-6 py-3 rounded-full cursor-pointer transition-all duration-300";

  const variants = {
    default: "bd text-sm text-400",
    active: "bd-active text-sm text-400",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
