import React from 'react';

// Mock React Native components for Storybook
export const View = ({ style, children, ...props }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);

export const Text = ({ style, children, ...props }) => (
  <span
    style={{
      fontFamily: 'system-ui, -apple-system, sans-serif',
      ...style,
    }}
    {...props}
  >
    {children}
  </span>
);

export const TouchableOpacity = ({
  style,
  children,
  onPress,
  disabled,
  activeOpacity = 0.8,
  ...props
}) => (
  <button
    style={{
      border: 'none',
      background: 'transparent',
      padding: 0,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      ...style,
    }}
    onClick={disabled ? undefined : onPress}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

export const ScrollView = ({ style, children, ...props }) => (
  <div
    style={{
      overflow: 'auto',
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);

export const StyleSheet = {
  create: (styles) => styles,
};

export const Dimensions = {
  get: () => ({
    width: 375,
    height: 812,
  }),
};

// Default export for compatibility
export default {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
};
