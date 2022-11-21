import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Section from '@components/section';
import readme from '../README.md';

import Filter from './Filter';

export default {
  title: 'Components/Filter',
  component: Filter,
  parameters: {
    description: readme,
  },
} as ComponentMeta<typeof Filter>;

const Template: ComponentStory<typeof Filter> = (args) => <Filter {...args} />;
export const Overview = Template.bind({});
Overview.args = {
  children: 'Assigned to me (5)',
  onClick: () => {
    alert('Filter was clicked');
  },
};

export const Count = () => {
  const [amount, setAmount] = React.useState(3);
  return (
    <Section>
      <Filter
        onClick={() => {
          setAmount(amount + 1);
        }}
      >
        Click to add count: ({amount})
      </Filter>
    </Section>
  );
};

export const States = () => (
  <Section style={{ padding: '1.6rem' }}>
    <Filter disabled>Disabled Filter</Filter>
    <Filter id="filterHover">Filter with hover state</Filter>
    <Filter selected>Selected Filter</Filter>
    <Filter id="filterFocus" className="focus">
      Filter with focus state
    </Filter>
  </Section>
);

States.parameters = {
  pseudo: {
    hover: ['#filterHover'],
  },
};

export const SelectedStates = () => (
  <Section>
    <Filter selected>Selected Filter</Filter>
    <Filter id="filterSelectedHover" selected>
      Selected filter with hover state
    </Filter>
  </Section>
);

SelectedStates.parameters = {
  pseudo: {
    hover: ['#filterSelectedHover'],
  },
};

export const Selectable = () => {
  const [selected, setSelected] = React.useState(false);

  return (
    <Section>
      <Filter
        onClick={() => {
          setSelected(!selected);
        }}
        selected={selected}
      >
        Click me
      </Filter>
    </Section>
  );
};
