import SkillTag from '../SkillTag';

export default {
  title: 'UI/SkillTag',
  component: SkillTag,
  tags: ['autodocs'],
  argTypes: {
    skill: { control: 'text' },
    category: {
      control: 'select',
      options: ['design', 'dev', 'tools', 'specialized'],
    },
  },
};

export const Design = {
  args: {
    skill: 'Figma',
    category: 'design',
  },
};

export const Dev = {
  args: {
    skill: 'React',
    category: 'dev',
  },
};

export const Tools = {
  args: {
    skill: 'Storybook',
    category: 'tools',
  },
};

export const Specialized = {
  args: {
    skill: 'Design Systems',
    category: 'specialized',
  },
};

export const AllCategories = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <SkillTag skill="Figma" category="design" />
      <SkillTag skill="Prototyping" category="design" />
      <SkillTag skill="React" category="dev" />
      <SkillTag skill="Next.js" category="dev" />
      <SkillTag skill="Storybook" category="tools" />
      <SkillTag skill="Notion" category="tools" />
      <SkillTag skill="Design Systems" category="specialized" />
      <SkillTag skill="Motion Design" category="specialized" />
    </div>
  ),
};
