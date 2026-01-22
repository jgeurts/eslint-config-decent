---
name: enforcing-typescript-standards
description: Enforces the project's core TypeScript standards including explicit typing, import organization, class member ordering, and code safety rules.
---

# Enforcing TypeScript Standards

Enforces the project's core TypeScript standards including explicit typing, import organization, class member ordering, and code safety rules.

## Triggers

Activate this skill when:

- Creating a new `.ts` or `.tsx` file
- Modifying existing TypeScript code
- Reviewing TypeScript code for compliance

## Core Standards

### Type Safety

- **Explicit return types**: Prefer explicit return types when practical; omit when inference is obvious and adds no clarity
- **Explicit member accessibility**: Class members require `public`, `private`, or `protected`
- **Type-only imports**: Use `import type` for types: `import type { Foo } from './foo.js'`
- **Sorted type constituents**: Union/intersection types must be alphabetically sorted
- **Only throw Error objects**: Never throw strings or other primitives
- **Avoid `any` and type assertions**: Prefer proper typing over `any` or `as` casts; use them only when truly necessary

### Import Organization

- **Import order**: builtin → external → internal → parent → sibling → index (alphabetized within groups)
- **No duplicate imports**: Consolidate imports from the same module
- **Newline after imports**: Blank line required after import block

### Class Member Ordering

1. Signatures (call/construct)
2. Fields: private → public → protected
3. Constructors: public → protected → private
4. Methods: public → protected → private

### Code Style

- **Simplicity over cleverness**: Straightforward, readable code is better than clever one-liners
- **Early returns**: Use guard clauses to reduce nesting; return early for edge cases
- **Nullish coalescing**: Prefer `??` over `||` for defaults (avoids false positives on `0` or `''`)
- **Optional chaining**: Use `?.` for safe property access
- **Match existing patterns**: Follow conventions already established in the codebase
- **Meaningful identifiers**: Names must be descriptive (exceptions: `_`, `i`, `j`, `k`, `e`, `x`, `y`)
- **Function declarations**: Use `function foo()` not `const foo = function()`
- **Prefer const**: Use `const` unless reassignment is needed
- **No var**: Always use `const` or `let`
- **Object shorthand**: Use `{ foo }` not `{ foo: foo }`
- **Template literals**: Use `` `Hello ${name}` `` not `'Hello ' + name`
- **Strict equality**: Use `===` except for null comparisons
- **One class per file**: Maximum one class definition per file
- **Avoid `reduce`**: Prefer `for...of` loops or other array methods for clarity

### Naming Conventions

- **Enum members**: Use `PascalCase` (e.g., `MyValue`)
- **No trailing underscores**: Identifiers cannot end with `_`

### Comments

- **No redundant comments**: Never comment what the code already expresses clearly
- **No duplicate comments**: Don't repeat information from function names, types, or nearby comments
- **Meaningful only**: Only add comments to explain *why*, not *what* — the code shows what it does

### Boolean Expressions

- **Prefer truthiness checks**: Use implicit truthy/falsy checks over explicit comparisons
- **Exception**: Use explicit checks when distinguishing `0`/`''` (valid values) from `null`/`undefined` is semantically important

### Testing

- **Minimize mocking**: Avoid mocking everything; use real implementations and data generators when available
- **Test real behavior**: Testing mocks provides little value — test actual code paths
- **Don't be lazy**: Write thorough tests that cover edge cases, not just happy paths

### Error Handling

- **Specific error types**: Prefer specific error types over generic `Error` when meaningful
- **Avoid silent failures**: Don't swallow errors with empty catch blocks
- **Handle rejections**: Always handle promise rejections

## Negative Knowledge

Avoid these anti-patterns:

- `console.log()` statements in production code
- `eval()` or `Function()` constructor
- Nested ternary operators
- `await` inside loops when `Promise.all` would be simpler (sequential awaits are fine when order matters or parallelism adds complexity)
- Empty interfaces
- Variable shadowing
- Functions defined inside loops
- `@ts-ignore` without explanation (use `@ts-expect-error` with 10+ char description)
- Comments that restate the code: `// increment counter` above `counter++`
- Comments that duplicate type information: `// returns a string` when return type is `: string`
- Commented-out code (delete it; use version control)
- Verbose boolean comparisons: `arr.length > 0`, `str !== ''`, `obj !== null && obj !== undefined`
- Disabling lint rules via comments (fix the code instead)
- Overuse of `any` type or `as` type assertions
- Over-mocking in tests instead of using real implementations or data generators
- Empty catch blocks that silently swallow errors
- Using `||` for defaults when `??` is more appropriate
- Deep nesting when early returns would simplify

## Verification Workflow

1. **Analyze**: Compare the code change against these TypeScript standards
2. **Generate/Refactor**: Write or modify code to comply with all rules above
3. **Simplify**: Review for opportunities to simplify — prefer clear, straightforward code over clever solutions
4. **Review naming**: Verify variable and function names still make sense in context after changes
5. **Build**: Verify types compile without errors (e.g., `npm run build` or `npx tsc --noEmit`)
6. **Lint**: Run `npm run lint` to confirm compliance before completing the task

## Examples

### Comments Examples

```ts
// Standard
// Retry with exponential backoff to handle transient network failures
async function fetchWithRetry(url: string, attempts = 3): Promise<Response> {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fetch(url);
    } catch {
      await sleep(2 ** i * 100);
    }
  }
  throw new Error(`Failed after ${attempts} attempts`);
}

// Non-Standard
/**
 * Fetches data from a URL with retry logic
 * @param url - The URL to fetch from
 * @param attempts - Number of attempts (default 3)
 * @returns A Promise that resolves to a Response
 */
async function fetchWithRetry(url: string, attempts = 3): Promise<Response> {
  // Loop through attempts
  for (let i = 0; i < attempts; i++) {
    try {
      // Try to fetch the URL
      return await fetch(url);
    } catch {
      // Wait before retrying
      await sleep(2 ** i * 100);
    }
  }
  // Throw error if all attempts fail
  throw new Error(`Failed after ${attempts} attempts`);
}
```

### Boolean Expressions Examples

```ts
// Standard
if (myArray.length) { }
if (myString) { }
if (myObject) { }
if (!value) { }

// Non-Standard
if (myArray.length !== 0) { }
if (myArray.length > 0) { }
if (myString !== '') { }
if (myObject !== null && myObject !== undefined) { }
if (value === null || value === undefined) { }
```

### Early Return Examples

```ts
// Standard
function processUser(user: User | null): Result {
  if (!user) {
    return { error: 'No user provided' };
  }
  if (!user.isActive) {
    return { error: 'User is inactive' };
  }
  return { data: transform(user) };
}

// Non-Standard
function processUser(user: User | null): Result {
  if (user) {
    if (user.isActive) {
      return { data: transform(user) };
    } else {
      return { error: 'User is inactive' };
    }
  } else {
    return { error: 'No user provided' };
  }
}
```
