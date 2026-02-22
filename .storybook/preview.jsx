import '../app/globals.css';
import { aspekta, inter } from '../app/fonts';

/** @type { import('@storybook/react').Preview } */
const preview = {
  decorators: [
    (Story) => (
      <div
        className={`${aspekta.variable} ${inter.variable}`}
        style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', padding: '2rem' }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
    backgrounds: {
      default: 'canvas',
      values: [
        { name: 'canvas', value: 'rgb(237, 236, 234)' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
  },
};

export default preview;
