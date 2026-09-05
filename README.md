# python-utils-73

A robust collection of TypeScript utility functions designed to bridge the gap between common Python patterns and modern JavaScript development. This library provides type-safe implementations of frequent operations to streamline data manipulation and workflow automation.

## Features

*   **Native-like Range Generators**: Implement `range(start, stop, step)` logic with lazy iteration support, perfect for loop control and sequence generation.
*   **Dictionary Deep Merge**: Perform recursive merging of nested objects with conflict resolution, similar to Python’s `dict.update()`.
*   **Case Conversion Utilities**: Seamlessly transform strings between `snake_case`, `camelCase`, and `PascalCase` with zero dependencies.
*   **Safe Path Resolution**: Simplified cross-platform file path normalization that mimics `os.path` behaviors for reliable directory management.

## Installation

Install the package via npm:

```bash
npm install python-utils-73
```

Or using yarn:

```bash
yarn add python-utils-73
```

## Basic Usage

Import the desired utilities and integrate them into your TypeScript projects with full IDE autocompletion support.

```typescript
import { range, snakeToCamel } from 'python-utils-73';

// Generate a sequence of numbers
const sequence = Array.from(range(0, 10, 2));
console.log(sequence); // [0, 2, 4, 6, 8]

// Convert naming conventions
const key = snakeToCamel('user_profile_id');
console.log(key); // "userProfileId"
```

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Distributed under the MIT License. See `LICENSE` for more information.