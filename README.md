# python-utils-73

A high-performance TypeScript toolkit designed to bridge the gap between Python-style data manipulation and native JavaScript performance. This library provides a robust collection of functional utilities for complex array transformations, object deep-merging, and asynchronous workflow orchestration.

## Features

*   **Pythonic Iterables:** Implements lazy evaluation patterns and generators similar to Python’s `itertools` for memory-efficient data processing.
*   **Deep Object Utilities:** Advanced deep-clone, recursive merge, and property-path resolution with built-in schema validation.
*   **Type-Safe Async Pipelines:** Compose complex asynchronous tasks using a fluent interface that preserves strict TypeScript definitions at every step.
*   **Zero-Dependency Core:** Built using pure TypeScript with zero external dependencies to ensure minimal bundle sizes and high security.

## Installation

Install the package via npm or yarn:

```bash
npm install python-utils-73
# or
yarn add python-utils-73
```

## Basic Usage

```typescript
import { chunk, pipe } from 'python-utils-73';

const data = [1, 2, 3, 4, 5, 6];

// Chain utility functions for clean, readable data manipulation
const result = pipe(
  data,
  (arr) => chunk(arr, 2),
  (chunks) => chunks.flat().map(n => n * 2)
);

console.log(result); // [2, 4, 6, 8, 10, 12]
```

## Contributing

Contributions are welcome! Please open an issue to discuss proposed features or submit a pull request with full test coverage for any new utility functions.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.