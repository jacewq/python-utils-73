# python-utils-73

A collection of lightweight, high-performance TypeScript utilities designed to simplify common data manipulation and string formatting tasks. This library focuses on providing type-safe solutions for everyday development challenges in Node.js and browser environments.

## Features

*   **Advanced Type Guards**: Comprehensive runtime validation for complex objects and nested data structures.
*   **Performance-Optimized Parsers**: Efficient utilities for transforming JSON-like strings and URL query parameters without overhead.
*   **Zero-Dependency Core**: Built entirely with native TypeScript, ensuring a minimal footprint and no vulnerability risks from third-party packages.
*   **Formatting Engine**: Robust set of helpers for standardizing date strings, currency values, and slugification.

## Installation

Install the package via npm or yarn:

```bash
npm install python-utils-73
# or
yarn add python-utils-73
```

## Basic Usage

Import the required modules to clean data or format outputs directly in your project:

```typescript
import { slugify, isObject } from 'python-utils-73';

// Standardize strings
const title = "Hello World: Python Utilities!";
console.log(slugify(title)); // "hello-world-python-utilities"

// Type safe validation
const data = { id: 1 };
if (isObject(data)) {
  console.log("Valid object detected");
}
```

## Contributing

We welcome contributions! Please open an issue to discuss proposed changes or submit a pull request with unit tests for any new utility functions.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.