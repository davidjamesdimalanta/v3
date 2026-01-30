export default function ProjectContent({ children, className = "" }) {
  const baseClassName = "p-4 md:p-8 flex flex-col gap-4 lg:max-w-[min(75vw,120vh)] lg:flex-1 lg:basis-[75vw] lg:pl-0";

  return (
    <main className={`${baseClassName} ${className}`}>
      {children}
    </main>
  );
}
