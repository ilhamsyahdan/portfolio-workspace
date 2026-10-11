# 12: Error Boundaries & Loading States

**What to build:** Error boundary components wrapping key sections (especially MDX blog rendering) to catch JavaScript errors and display fallback UI instead of crashing the application. Loading spinner components for asynchronous content loading. Graceful error messages that maintain the dark theme design. Application remains functional even when individual sections encounter errors.

**Blocked by:** 09 (Blog Post Viewer with Syntax Highlighting)

**Status:** ready-for-agent

- [ ] Create [`ErrorBoundary`](src/components/ErrorBoundary.tsx:1) component
- [ ] Wrap Blog section with error boundary
- [ ] Wrap individual blog post rendering with error boundary
- [ ] Create [`LoadingSpinner`](src/components/LoadingSpinner.tsx:1) component
- [ ] Add loading states to async data fetching
- [ ] Design error fallback UI with dark theme
- [ ] Log errors to console for debugging
- [ ] Add "Retry" functionality to error states
- [ ] Test error boundaries by simulating MDX errors
- [ ] Verify app doesn't crash when errors occur
