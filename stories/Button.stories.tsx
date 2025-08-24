import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Mock theme (will be replaced with real adapter)
const mockTheme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: '#000000',
    textSecondary: '#8E8E93',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
  },
  typography: {
    fontSize: {
      sm: 14,
      md: 16,
      lg: 18,
    },
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
};

interface ButtonProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onPress?: () => void;
  theme?: 'light' | 'dark';
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onPress,
  theme = 'light',
}) => {
  const currentTheme = theme === 'dark' ? {
    ...mockTheme,
    colors: {
      ...mockTheme.colors,
      primary: '#0A84FF',
      background: '#000000',
      text: '#FFFFFF',
    }
  } : mockTheme;

  const getButtonStyle = () => {
    const baseStyle = {
      borderRadius: currentTheme.borderRadius.md,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      opacity: disabled ? 0.6 : 1,
    };

    const sizeStyles = {
      small: {
        paddingVertical: currentTheme.spacing.sm,
        paddingHorizontal: currentTheme.spacing.md,
      },
      medium: {
        paddingVertical: currentTheme.spacing.md,
        paddingHorizontal: currentTheme.spacing.lg,
      },
      large: {
        paddingVertical: currentTheme.spacing.lg,
        paddingHorizontal: currentTheme.spacing.xl,
      },
    };

    const variantStyles = {
      primary: {
        backgroundColor: currentTheme.colors.primary,
      },
      secondary: {
        backgroundColor: currentTheme.colors.secondary,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: currentTheme.colors.primary,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const getTextStyle = () => {
    const baseStyle = {
      fontWeight: '600' as const,
    };

    const sizeStyles = {
      small: {
        fontSize: currentTheme.typography.fontSize.sm,
      },
      medium: {
        fontSize: currentTheme.typography.fontSize.md,
      },
      large: {
        fontSize: currentTheme.typography.fontSize.lg,
      },
    };

    const variantStyles = {
      primary: {
        color: '#FFFFFF',
      },
      secondary: {
        color: '#FFFFFF',
      },
      outline: {
        color: currentTheme.colors.primary,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable button component showcasing different variants, sizes, and states.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Button text',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline'],
      description: 'Button style variant',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Theme variant',
    },
    onPress: {
      action: 'pressed',
      description: 'Button press handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'Primary Button',
    variant: 'primary',
    size: 'medium',
  },
};

export const Secondary: Story = {
  args: {
    title: 'Secondary Button',
    variant: 'secondary',
    size: 'medium',
  },
};

export const Outline: Story = {
  args: {
    title: 'Outline Button',
    variant: 'outline',
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    title: 'Small Button',
    variant: 'primary',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    title: 'Large Button',
    variant: 'primary',
    size: 'large',
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled Button',
    variant: 'primary',
    size: 'medium',
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: (args) => (
    <View style={{
      gap: 16,
      padding: 20,
      backgroundColor: args.theme === 'dark' ? '#000000' : '#FFFFFF',
    }}>
      <Button {...args} title="Primary" variant="primary" />
      <Button {...args} title="Secondary" variant="secondary" />
      <Button {...args} title="Outline" variant="outline" />
    </View>
  ),
  args: {
    size: 'medium',
    theme: 'light',
  },
  parameters: {
    docs: {
      description: {
        story: 'All button variants displayed together.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: (args) => (
    <View style={{
      gap: 16,
      padding: 20,
      backgroundColor: args.theme === 'dark' ? '#000000' : '#FFFFFF',
    }}>
      <Button {...args} title="Small" size="small" />
      <Button {...args} title="Medium" size="medium" />
      <Button {...args} title="Large" size="large" />
    </View>
  ),
  args: {
    variant: 'primary',
    theme: 'light',
  },
  parameters: {
    docs: {
      description: {
        story: 'All button sizes displayed together.',
      },
    },
  },
};
