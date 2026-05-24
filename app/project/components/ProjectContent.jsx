export default function ProjectContent({ children, className = "" }) {
  const baseClassName = "w-full max-w-[1200px] mx-auto p-4 md:p-8 flex flex-col gutter-base";

  return (
    <div className="w-full px-4 md:px-5">
      <main className={`max-w-[1200px] w-full mx-auto pb-4 md:pb-8 flex flex-col gutter-base ${className}`}>
        {children}
      </main>
    </div>
  );
}
