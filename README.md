# python-utils-73

A robust collection of TypeScript utility functions designed to bridge the gap between common Python idioms and modern JavaScript development. This library streamlines data manipulation and object handling with type-safe, production-ready helpers.

## Features

*   **Type-Safe Object Traversal:** Safely access deeply nested object properties using string paths, preventing `undefined` reference errors.
*   **Enhanced Array Utilities:** Built-in Python-inspired methods such as `chunk`, `flatten`, and `range` for more expressive data processing.
*   **Time-Delta Formatting:** Simplified date manipulation tools to calculate relative time differences and format human-readable durations.
*   **Deep Equality Comparison:** Reliable utility for comparing complex nested objects and arrays without external dependencies.

## Installation

Install the package via npm or yarn:

```bash
npm install python-utils-73
# or
yarn add python-utils-73
```

## Basic Usage

Import the utilities directly into your TypeScript files to leverage strict type inference:

```typescript
import { range, getByPath } from 'python-utils-73';

// Generate a sequence of numbers
const sequence = range(0, 10, 2); // [0, 2, 4, 6, 8]

// Access deep properties safely
const user = { profile: { settings: { theme: 'dark' } } };
const theme = getByPath(user, 'profile.settings.theme'); 

console.log(theme); // 'dark'
```

## License

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

Distributed under the MIT License. See `LICENSE` for more information.