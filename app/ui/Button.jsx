import Link from "next/link";

export default function Button({ text, href, className = "", target, rel, ...props }) {
  const baseStyles = "px-4 md:px-6 py-3 rounded-full cursor-pointer inline-block text-center";
  const variantStyles = "bd text-small text-400 hover:bd-text hover:bd-active transition-all duration-150";

  // If href is provided, render as a Link
  if (href) {
    return (
      <Link
        href={href}
        className={`${baseStyles} ${variantStyles} ${className}`}
        target={target}
        rel={rel}
        {...props}
      >
        {text}
      </Link>
    );
  }

  // Otherwise, render as a button
  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {text}
    </button>
  );
}
