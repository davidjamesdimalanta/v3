import {
  CaseFixed,
  CaseGroup,
  CaseHighlights,
  CaseMedia,
  CasePersonas,
  CaseScroll,
  CaseText,
  CaseThought,
  Def,
} from "./app/project/_components/CaseStudyMdxComponents";

const markdownComponents = {
  p({ children }) {
    return <p className="text-p text-400 text-(--text-color-80)">{children}</p>;
  },
  h3({ children }) {
    return <h3 className="text-h6 text-600 text-(--text-color-100)">{children}</h3>;
  },
  strong({ children }) {
    return <strong className="text-700 text-(--text-color-100)">{children}</strong>;
  },
  em({ children }) {
    return <em className="italic">{children}</em>;
  },
  ul({ children }) {
    return <ul className="flex flex-col gutter-xs list-disc pl-5">{children}</ul>;
  },
  ol({ children }) {
    return <ol className="flex flex-col gutter-xs list-decimal pl-5">{children}</ol>;
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
  CaseThought,
};

export function useMDXComponents(components) {
  return {
    ...caseStudyMdxComponents,
    ...components,
  };
}
