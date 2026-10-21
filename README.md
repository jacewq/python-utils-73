# python-utils-73

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

`python-utils-73` brings Python's most ergonomic standard library utilities and built-in functions directly into modern TypeScript environments. It offers type-safe, zero-dependency implementations of Python-style iterators, collection primitives, and string manipulators for Node.js and browser runtimes.

## Features

- **Pythonic Iterators:** Lazy-evaluation generators including `range()`, `zip()`, `enumerate()`, and `chunk()` designed for clean iteration pipelines.
- **Rich Collections:** Fully typed equivalents of Python's `Counter`, `defaultdict`, and double-ended queue (`deque`).
- **String Utilities:** Native-feeling string methods like `strip()`, `zfill()`, `partition()`, and `title()` with strict type signatures.
- **Zero Dependencies:** Ultra-lightweight codebase built entirely in TypeScript with full ESM and CommonJS support.

## Installation

Install via your preferred package manager:

```bash
npm install python-utils-73
```

```bash
pnpm add python-utils-73
```

```bash
yarn add python-utils-73
```

## Quick Start

```typescript
import { range, zip, Counter, defaultdict } from 'python-utils-73';

// 1. Lazy iteration with range and zip
const indices = range(1, 5);
const labels = ['alpha', 'beta', 'gamma', 'delta'];

for (const [index, label] of zip(indices, labels)) {
  console.log(`${index}: ${label}`);
}
// Output: "1: alpha", "2: beta", "3: gamma", "4: delta"

// 2. Frequency counting with Counter
const tally = new Counter(['apple', 'banana', 'apple', 'orange', 'apple']);
console.log(tally.mostCommon(1)); 
// Output: [['apple', 3]]

// 3. Auto-initializing maps with defaultdict
const grouped = new defaultdict<string, number[]>(() => []);
grouped.get('scores').push