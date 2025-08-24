/**
 * Unistyles configuration for the example app
 * This demonstrates how to set up the Portable Content Unistyles Adapter
 */
declare const adapter: import('@/types').AdapterInstance;
type AppThemes = typeof adapter.themes;
type AppBreakpoints = typeof adapter.breakpoints;
declare module 'react-native-unistyles' {
  interface UnistylesThemes extends AppThemes {}
  interface UnistylesBreakpoints extends AppBreakpoints {}
}
export { adapter };
//# sourceMappingURL=unistyles.d.ts.map
