import Footer from '../Footer';

export default {
  title: 'UI/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Site footer with a cycling `TextLoop` of tech credits on the left and nav links on the right. ' +
          'Hovering a technology name pauses the loop. Sound effects fire on hover but fail silently in Storybook.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  name: 'Default',
};

export const OnDarkBackground = {
  name: 'On dark background',
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
