import React from 'react';
import { Text, View } from 'react-native';

const SimpleTest = ({ text = 'Hello Storybook!' }) => {
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        margin: 10,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          color: '#333',
          textAlign: 'center',
        }}
      >
        {text}
      </Text>
    </View>
  );
};

const meta = {
  title: 'Test/Simple Component',
  component: SimpleTest,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A simple test component to verify React Native Web setup.',
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Text to display',
    },
  },
};

export default meta;

export const Default = {
  args: {
    text: 'Hello Storybook!',
  },
};

export const CustomText = {
  args: {
    text: 'React Native Web is working!',
  },
};
