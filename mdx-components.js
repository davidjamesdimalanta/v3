import {
  CaseFixed,
  CaseGroup,
  CaseHighlights,
  CaseMedia,
  CasePersonas,
  CaseScroll,
  CaseText,
  Def,
} from "./app/project/_components/CaseStudyMdxComponents";

const markdownComponents = {
  p({ children }) {
    return <p className="text-p text-400 text-(--text-color-80)">{children}</p>;
  },
  strong({ children }) {
    return <strong className="text-700 text-(--text-color-100)">{children}</strong>;
  },
  em({ children }) {
    return <em className="italic">{children}</em>;
  },
  ul({ children }) {
    return <ul className="flex flex-col gap-2 list-disc pl-5">{children}</ul>;
  },
  ol({ children }) {
    return <ol className="flex flex-col gap-2 list-decimal pl-5">{children}</ol>;
  },
  li({ children }) {
    return <li className="text-p text-400 text-(--text-color-80)">{children}</li>;
  },
  blockquote({ children }) {
    return (
      <blockquote className="border-l-2 border-(--schemes-tertiary) pl-4 my-1">
        <div className="text-p text-400 italic text-(--text-color-60)">{children}</div>
      </blockquote>
    );
  },
  br() {
    return <br />;
  },
  a({ children, href }) {
    return (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="underline underline-offset-2 hover:bd-text transition-all duration-150"
      >
        {children}
      </a>
    );
  },
};

export const caseStudyMdxComponents = {
  ...markdownComponents,
  Def,
  CaseText,
  CaseMedia,
  CaseScroll,
  CaseFixed,
  CasePersonas,
  CaseHighlights,
  CaseGroup,
};

export function useMDXComponents(components) {
  return {
    ...caseStudyMdxComponents,
    ...components,
  };
}
