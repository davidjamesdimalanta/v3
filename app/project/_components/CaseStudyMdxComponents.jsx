"use client";

import React, { createContext, useContext } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CaseStudyTextBlock from "../components/contentTypes/CaseStudyTextBlock";
import CaseStudyMediaBlock from "../components/contentTypes/CaseStudyMediaBlock";
import CaseStudyMorphingMediaBlock from "../components/contentTypes/CaseStudyMorphingMediaBlock";
import { CaseStudySectionBlock, CaseStudySectionBlockFixed } from "../components/contentTypes/CaseStudySectionBlock";
import CaseStudyHighlightsBlock from "../components/contentTypes/CaseStudyHighlightsBlock";
import CaseStudyPersonas from "../components/contentTypes/CaseStudyPersonas";
import DefinitionCard from "../components/contentTypes/DefinitionCard";
import ParticipantDemographics from "../components/contentTypes/ParticipantDemographics";
import { useSoundEffects } from "../../ui/hooks/useSoundEffects";

const CaseStudyMdxContext = createContext(null);
const CaseMediaDialogContext = createContext(false);

const COMPONENT_REGISTRY = {
  ParticipantDemographics,
};

const GROUP_VARIANTS = {
  plain: "",
  discovery: "flex flex-col gutter-md py-48",
  surfaceStack: "flex flex-col gutter-xl bg-(--schemes-surface-container-high) py-16 px-4 md:px-8",
  iterations: "flex flex-col gutter-2xl",
};

function asBoolean(value) {
  return value === true || value === "true" || value === "";
}

function childrenToLabel(children) {
  return React.Children.toArray(children)
    .map((child) => (typeof child === "string" || typeof child === "number" ? child : ""))
    .join("")
    .trim();
}

function useCaseStudyMdx() {
  const value = useContext(CaseStudyMdxContext);
  if (!value) {
    throw new Error("Case study MDX components must be rendered inside CaseStudyMdxProvider.");
  }
  return value;
}

const markdownComponents = {
  p({ children }) {
    return <p className="text-p text-400 text-current">{children}</p>;
  },
  h3({ children }) {
    return <h3 className="text-h6 text-600 text-current">{children}</h3>;
  },
  strong({ children }) {
    return <strong className="text-700 text-current">{children}</strong>;
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
    return <li className="text-p text-400 text-current">{children}</li>;
  },
  blockquote({ children }) {
    return (
      <blockquote className="border-l-2 border-(--schemes-tertiary) pl-4 my-1">
        <div className="text-p text-400 italic text-current">{children}</div>
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

function RichMarkdown({ value }) {
  if (!value) return null;

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {value}
    </ReactMarkdown>
  );
}

export function CaseStudyMdxProvider({ caseStudy, children }) {
  const { playButtonHover } = useSoundEffects();

  return (
    <CaseStudyMdxContext.Provider value={{ caseStudy, playButtonHover }}>
      {children}
    </CaseStudyMdxContext.Provider>
  );
}

export function Def({ definition: definitionKey, children }) {
  const { caseStudy, playButtonHover } = useCaseStudyMdx();
  const definition = caseStudy.definitions[definitionKey];
  if (!definition) return <>{children}</>;

  const Component = definition.component ? COMPONENT_REGISTRY[definition.component] : null;
  const content = Component ? <Component /> : <RichMarkdown value={definition.content} />;

  return (
    <DefinitionCard
      trigger={children}
      triggerLabel={childrenToLabel(children)}
      shimmerVariant={definition.shimmerVariant || "brown"}
      triggerProps={{ onMouseEnter: playButtonHover }}
      content={content}
      image={definition.image}
      caption={definition.caption}
      side={definition.side || "right"}
      width={definition.width || "w-80"}
      mobileWidth={definition.mobileWidth}
      desktopWidth={definition.desktopWidth}
      sideOffset={definition.sideOffset || "1"}
    />
  );
}

export function CaseText({ id, sectionHeading, title, className = "", stackClassName, bodyClassName, children }) {
  const resolvedStackClassName = stackClassName || (id === "closing" ? "gutter-md" : undefined);
  const resolvedBodyClassName = bodyClassName || (id === "closing" ? "gutter-base" : undefined);

  return (
    <CaseStudyTextBlock
      id={id}
      sectionHeading={sectionHeading}
      title={title}
      className={className}
      stackClassName={resolvedStackClassName}
      bodyClassName={resolvedBodyClassName}
    >
      {children}
    </CaseStudyTextBlock>
  );
}

export function CaseThought({ title, children }) {
  return (
    <article className="flex flex-col gutter-xs">
      {title && <h3 className="text-h6 text-600 text-(--text-color-100)">{title}</h3>}
      {children}
    </article>
  );
}

export function CaseMedia({
  asset,
  type,
  src,
  alt,
  caption,
  thumbnail,
  hevcSrc,
  size,
  aspectRatio,
  bgColor,
  fgColor,
  className,
  first,
  isFirstVideo,
  priority,
  enableDialog = false,
}) {
  const { caseStudy } = useCaseStudyMdx();
  const enableDialogFromContext = useContext(CaseMediaDialogContext);
  const media = asset ? caseStudy.assets[asset] || {} : {};
  const MediaComponent = enableDialog || enableDialogFromContext ? CaseStudyMorphingMediaBlock : CaseStudyMediaBlock;

  return (
    <MediaComponent
      {...media}
      type={type || media.type}
      src={src || media.src}
      alt={alt ?? media.alt}
      caption={caption ?? media.caption}
      thumbnail={thumbnail ?? media.thumbnail}
      hevcSrc={hevcSrc ?? media.hevcSrc}
      size={size || media.size}
      aspectRatio={aspectRatio || media.aspectRatio}
      bgColor={bgColor || media.bgColor}
      fgColor={fgColor || media.fgColor}
      className={className || media.className || ""}
      isFirstVideo={asBoolean(first) || asBoolean(isFirstVideo) || media.isFirstVideo}
      priority={asBoolean(priority) || media.priority}
    />
  );
}

export function CaseScroll({
  id,
  block: blockKey,
  sectionHeading,
  title,
  description,
  dark,
  className = "",
  children,
}) {
  const { caseStudy } = useCaseStudyMdx();
  const block = caseStudy.scrollBlocks[blockKey] || {};
  const content = (
    <CaseStudySectionBlock
      sectionHeading={sectionHeading || block.sectionHeading}
      title={title || block.title}
      description={description || block.description}
      textStates={block.textStates}
      dark={asBoolean(dark) || block.dark}
      className={className}
    >
      <CaseMediaDialogContext.Provider value={true}>
        {children}
      </CaseMediaDialogContext.Provider>
    </CaseStudySectionBlock>
  );

  return id ? <div id={id}>{content}</div> : content;
}

export function CaseFixed({
  id,
  block: blockKey,
  sectionHeading,
  title,
  dark,
  className = "",
  children,
}) {
  const { caseStudy } = useCaseStudyMdx();
  const block = caseStudy.fixedBlocks[blockKey] || {};
  const childNodes = React.Children.toArray(children).filter((child) => {
    return typeof child !== "string" || child.trim().length > 0;
  });
  const mediaChildren = childNodes.filter((child) => {
    return React.isValidElement(child) && (child.props?.asset || child.type === CaseMedia || child.type?.name === "CaseMedia");
  });
  const textChildren = childNodes.filter((child) => !mediaChildren.includes(child));
  const content = (
    <CaseStudySectionBlockFixed
      sectionHeading={sectionHeading || block.sectionHeading}
      title={title || block.title}
      descriptionNode={textChildren.length > 0 ? <>{textChildren}</> : <RichMarkdown value={block.description} />}
      dark={asBoolean(dark) || block.dark}
      className={className}
    >
      <CaseMediaDialogContext.Provider value={true}>
        {mediaChildren.length > 0 ? mediaChildren : children}
      </CaseMediaDialogContext.Provider>
    </CaseStudySectionBlockFixed>
  );

  return id ? <div id={id}>{content}</div> : content;
}

export function CasePersonas({ id = "personas", sectionHeading = "Personas", title, text, hint, spacingClassName }) {
  const { caseStudy } = useCaseStudyMdx();

  return (
    <CaseStudyPersonas
      id={id}
      personas={caseStudy.personas}
      sectionHeading={sectionHeading}
      title={title}
      text={text || undefined}
      hint={hint || caseStudy.personaHint}
      spacingClassName={spacingClassName}
    />
  );
}

export function CaseHighlights({ id, block: blockKey, sectionHeading, title, dark }) {
  const { caseStudy } = useCaseStudyMdx();
  const block = caseStudy.highlights[blockKey] || {};
  const content = (
    <CaseStudyHighlightsBlock
      sectionHeading={sectionHeading || block.sectionHeading}
      title={title || block.title}
      descriptionNode={<RichMarkdown value={block.description} />}
      videos={block.videos}
      dark={asBoolean(dark) || block.dark}
    />
  );

  return id ? <div id={id}>{content}</div> : content;
}

export function CaseGroup({ id, variant = "plain", className = "", children }) {
  const variantClassName = GROUP_VARIANTS[variant] || "";

  return (
    <div id={id} className={`${variantClassName} ${className}`.trim()}>
      {children}
    </div>
  );
}
