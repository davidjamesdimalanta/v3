import Nav from '../nav';

export default {
  title: 'UI/Nav',
  component: Nav,
  tags: ['autodocs'],
  parameters: {
    // Nav is position:fixed — use a tall layout so it sits naturally at the top
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Fixed top navigation bar. Fades out on scroll (scroll-based opacity via `useNavbarScrollFade`). ' +
          'Entrance animation triggers after the WebGL wave completes — in Storybook it resolves immediately.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '200px', position: 'relative' }}>
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
