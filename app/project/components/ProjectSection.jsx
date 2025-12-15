export default function ProjectSection({ title, children, className = "" }) {
  return (
    <section className={`flex flex-col gutter-base ${className}`}>
      {title && (
        <h3 className="text-medium text-600">{title}</h3>
      )}
      {children}
    </section>
  );
}
