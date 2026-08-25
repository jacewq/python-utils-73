# python-utils-73

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

python-utils-73 is a TypeScript library offering a set of utility functions modeled after Python's standard library. It enables developers to use familiar iteration, collection, and data handling patterns directly in their TypeScript projects with complete type definitions.

## Features
- Provides `range`, `enumerate`, and `zip` functions for efficient iterable processing with full TypeScript generics.
- Includes object utilities for deep cloning and merging that replicate Python dict behaviors.
- Offers string formatting tools including template and format functions for readable string construction.
- Supports lazy collection operations to optimize performance when working with large datasets.

## Installation

```bash
npm install python-utils-73
```

## Basic Usage

```typescript
import { range, enumerate, zip } from 'python-utils-73';

const numbers = Array.from(range(0, 10, 2)); // [0, 2, 4, 6, 8]
const indexed = Array.from(enumerate(['apple', 'banana']));
const zipped = Array.from(zip([1, 2, 3], ['one', 'two', 'three']));
```