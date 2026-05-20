# ADR-0002 Frontend Architecture Decision

## Status
Accepted

## Context

During development, the initial Vite project was created using the vanilla TypeScript template instead of React.

This caused:
- JSX parsing errors
- Missing React dependencies
- White screen rendering issues

## Decision

The project was migrated to a React-compatible structure using:
- React
- ReactDOM
- TSX components

## Reason

The project requirements needed:
- Component-based UI
- Dynamic rendering
- State management

React provided the simplest solution.

## Consequences

The application became:
- Easier to extend
- Easier to manage
- More aligned with modern frontend practices