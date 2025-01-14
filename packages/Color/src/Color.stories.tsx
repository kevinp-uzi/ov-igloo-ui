import React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import variables from '@igloo-ui/tokens/dist/base10/tokens.json';
import Section from '@components/section';
import readme from '../README.md';

import Color from './Color';

const iglooColors = [
  variables.coral800,
  variables.electricBlue700,
  variables.sky100,
  variables.coral200,
  variables.samoyed,
  variables.coral900
]

const workleapColors = [
  "var(--hop-decorative-option2-surface)",
  "var(--hop-decorative-option4-surface)",
  "var(--hop-decorative-option5-surface)",
  "var(--hop-decorative-option8-surface)",
  "var(--hop-decorative-option4-text)",
  "var(--hop-decorative-option8-text)"
]

const getColors = (brand: string) => {
  const colors = brand === 'workleap' ? workleapColors : iglooColors;
  return colors;
}

export default {
  title: 'Components/Color',
  component: Color,
  parameters: {
    docs: {
      description: {
        component: readme.replace(/<Example is="custom" \/>/g, '').replace(/<ReferenceLinks is="custom" \/>/g, ''),
      }
    }
  },
  argTypes: {
    children: {
      control: { type: 'text' },
    },
  },
} as Meta<typeof Color>;

type Story = StoryObj<typeof Color>;

export const Overview: Story = {
  render: (args, { globals: { brand } }) => {
    return (
      <Section>
        <Color color={getColors(brand)[2]} size={args.size} />
      </Section>
    );
  },
  args: {
    size: 'large',
  },
};

export const Sizes: Story = {
  render: (_args, { globals: { brand } }) => {
    return (
      <Section>
        <Color color={getColors(brand)[0]} size="small" />
        <Color color={getColors(brand)[0]} size="medium" />
        <Color color={getColors(brand)[0]} size="large" />
        <Color color={getColors(brand)[0]} size="xlarge" />
      </Section>
    );
  }
};

export const Initials: Story = {
  render: (_args, { globals: { brand } }) => {
    return (
      <Section>
        <Color
          color={getColors(brand)[3]}
          textColor={getColors(brand)[5]}
          size="xlarge"
          name="Awesome Possum Team"
        />
      </Section>
    );
  }
};

export const CustomText: Story = {
  render: (_args, { globals: { brand } }) => {
    return (
      <Section>
        <Color color={getColors(brand)[1]} textColor={getColors(brand)[4]} size="xlarge" name="VC" />
      </Section>
    );
  }
};
