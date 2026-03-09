export default function ProjectContent({ children, className = "" }) {
  const baseClassName = "w-full p-4 md:p-8 flex flex-col gap-6";

  return (
    <main className={`${baseClassName} ${className}`}>
      {children}
    </main>
  );
}
