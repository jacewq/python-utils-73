# python-utils-73

A high-performance utility library designed to bridge common gaps in TypeScript development. This package provides robust, type-safe helpers for data transformation, object manipulation, and asynchronous workflows.

## Features

*   **Deep Object Diffing:** Effortlessly track state changes with recursive object comparison and patch generation.
*   **Safe Async Queue:** Execute promise-based tasks with configurable concurrency limits and automatic retry logic.
*   **Type-Guarded Parsing:** Validate and sanitize complex JSON structures using lightweight runtime schemas.
*   **Time-Series Aggregation:** Efficiently bucket and normalize timestamped data points for analytics dashboard integration.

## Installation

Install the package via npm or yarn:

```bash
npm install python-utils-73
# or
yarn add python-utils-73
```

## Usage

```typescript
import { asyncQueue, diffObjects } from 'python-utils-73';

// 1. Efficiently compare state changes
const oldState = { user: { id: 1, name: 'Alice' } };
const newState = { user: { id: 1, name: 'Bob' } };
const changes = diffObjects(oldState, newState); // { 'user.name': 'Bob' }

// 2. Manage concurrent operations
const queue = asyncQueue({ concurrency: 2 });
queue.add(async () => {
  const data = await fetchData('/api/endpoint');
  console.log(data);
});
```

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.