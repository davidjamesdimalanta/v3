import { TextShimmer } from '../text-shimmer';

export default {
  title: 'UI/TextShimmer',
  component: TextShimmer,
  tags: ['autodocs'],
  args: {
    children: 'David Dimalanta',
    variant: 'brown',
    as: 'span',
    duration: 1.8,
    spread: 2.5,
  },
  argTypes: {
    children: { control: 'text' },
    variant: {
      control: 'select',
      options: ['brown', 'green'],
    },
    as: {
      control: 'select',
      options: ['span', 'div', 'p', 'h1', 'h2', 'h3'],
    },
    duration: { control: { type: 'range', min: 0.5, max: 5, step: 0.1 } },
    spread: { control: { type: 'range', min: 0.5, max: 5, step: 0.1 } },
  },
};

export const BrownVariant = {
  args: {
    children: 'David Dimalanta',
    variant: 'brown',
    as: 'span',
  },
};

export const GreenVariant = {
  args: {
    children: 'Product Designer',
    variant: 'green',
    as: 'span',
  },
};

export const AsHeading = {
  args: {
    children: 'Hello, World',
    variant: 'brown',
    as: 'h1',
    className: 'text-h1',
  },
};

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TextShimmer as="p" variant="brown" className="text-h3">
        Brown shimmer variant
      </TextShimmer>
      <TextShimmer as="p" variant="green" className="text-h3">
        Green shimmer variant
      </TextShimmer>
      <TextShimmer as="h1" variant="brown" className="text-h1">
        Large heading shimmer
      </TextShimmer>
    </div>
  ),
};
