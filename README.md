# python-utils-73

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

`python-utils-73` is a lightweight TypeScript library that brings the simplicity and power of Python's most beloved built-in functions directly into modern JavaScript and TypeScript workflows. It provides highly optimized, fully type-safe implementations of utilities like `range`, `zip`, and Python-style collections to streamline your data manipulation tasks.

## Features

* **Lazy Iterables:** Optimized generator-based implementations of `range()`, `zip()`, and `enumerate()` for memory-efficient looping.
* **Pythonic Collections:** Fully-typed `Counter` and `DefaultDict` classes that mimic their Python standard library counterparts.
* **String Utilities:** Native TS ports of helper functions like `title()`, `swapcase()`, and advanced slice simulators.
* **Zero Dependencies:** Extremely small footprint, written in strict TypeScript with comprehensive test coverage.

## Installation

Install the package via npm, yarn, or pnpm:

```bash
npm install python-utils-73
```

Or using yarn:

```bash
yarn add python-utils-73
```

## Usage

Here is how easily you can use Pythonic concepts in TypeScript:

```typescript
import { range, zip, Counter, DefaultDict } from 'python-utils-73';

// 1. Lazy evaluation with range and zip
const indices = range(0, 6, 2); // [0, 2, 4]
const letters = ['a', 'b', 'c'];

for (const [num, char] of zip(indices, letters)) {
  console.log(`${num} -> ${char}`); 
  // Outputs: "0 -> a", "2 -> b", "4 -> c"
}

// 2. High-performance collections
const wordCount = new Counter('abracadabra');
console.log(wordCount.mostCommon(2)); 
// Outputs: [ ['a', 5], ['b', 2] ]

const listDict = new DefaultDict<string, number[]>(() => []);
listDict.get('user_ids').push(101);
console.log(listDict.get('user_ids')); // Outputs: [101]
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.