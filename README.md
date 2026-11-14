# python-utils-73

A high-performance TypeScript utility library designed to bridge the gap between Pythonic development patterns and strongly-typed environments. This toolkit provides drop-in replacements for common Python standard library functions, optimized for modern Node.js and browser runtimes.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

*   **Collection Pipelines:** Chainable functional utilities for arrays that mirror `itertools` and `list` comprehensions, including `chunk`, `partition`, and `uniqueBy`.
*   **Dict Transformations:** Robust object manipulation helpers like `pluck`, `invert`, and `deepMerge` with built-in type safety.
*   **Type Guards:** Comprehensive runtime validation utilities for checking complex schema structures, mimicking Python's `isinstance` logic for complex types.
*   **Zero-Dependency:** Lightweight footprint designed to keep bundle sizes minimal while ensuring full compatibility with ESNext.

## Installation

Install the package via your preferred package manager:

```bash
npm install python-utils-73
# or
yarn add python-utils-73
```

## Basic Usage

The library is designed to be tree-shakeable. Import only the utilities you need to keep your production builds small:

```typescript
import { chunk, pluck } from 'python-utils-73';

const data = [{ id: 1, val: 'a' }, { id: 2, val: 'b' }, { id: 3, val: 'c' }];

// Pluck specific keys
const ids = pluck(data, 'id'); // [1, 2, 3]

// Chunk data into sub-arrays
const pages = chunk(ids, 2); // [[1, 2], [3]]
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.