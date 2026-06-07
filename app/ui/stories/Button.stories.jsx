import Button from '../Button';

export default {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    icon: { control: 'select', options: [undefined, 'close'] },
    href: { control: 'text' },
    target: { control: 'select', options: [undefined, '_blank'] },
    soundEffect: { control: 'select', options: [undefined, 'navigateHome', 'navigateProject'] },
    className: { control: 'text' },
  },
};

export const Default = {
  args: {
    text: 'About',
  },
};

export const InternalLink = {
  args: {
    text: 'About',
    href: '/about',
  },
};

export const ExternalLink = {
  args: {
    text: 'CV',
    href: 'https://example.com',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
};

export const IconOnly = {
  args: {
    icon: 'close',
  },
};

export const WithSoundEffect = {
  args: {
    text: 'All Projects',
    href: '/#all-projects',
    soundEffect: 'navigateProject',
  },
};

export const AllVariants = {
  render: () => (
    <div className="flex flex-wrap items-center gutter-sm">
      <Button text="Plain button" />
      <Button text="Internal link" href="/about" />
      <Button text="External link" href="https://example.com" target="_blank" rel="noopener noreferrer" />
      <Button icon="close" />
    </div>
  ),
};
