# Contributing to DEX

Thank you for your interest in contributing to DEX! We welcome contributions from the community.

---

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment. Be kind, be professional, and be collaborative.

---

## Ways to Contribute

There are many ways to contribute to DEX:

- **Report Bugs:** Found a bug? Open an issue with reproduction steps
- **Suggest Features:** Have an idea? Share it in GitHub Discussions or Issues
- **Improve Documentation:** Fix typos, clarify instructions, add examples
- **Write Code:** Fix bugs, implement features, improve performance
- **Review Pull Requests:** Help review and test community contributions

---

## Development Setup

Before contributing code, set up your development environment:

1. Read the [Development Guide](./DEVELOPMENT.md)
2. Fork the repository
3. Clone your fork locally
4. Install dependencies: `pnpm install`
5. Set up environment variables
6. Start the database: `pnpm db:up && pnpm db:migrate`
7. Run the app: `pnpm dev`

---

## Branching Strategy

We use a simple branching model:

- **`main`** - Stable production branch
- **`feature/*`** - New features (e.g., `feature/add-export-functionality`)
- **`fix/*`** - Bug fixes (e.g., `fix/collection-delete-error`)
- **`docs/*`** - Documentation updates (e.g., `docs/update-api-guide`)
- **`chore/*`** - Maintenance tasks (e.g., `chore/update-dependencies`)

### Creating a Branch

```bash
# For a new feature
git checkout -b feature/your-feature-name

# For a bug fix
git checkout -b fix/issue-description

# For documentation
git checkout -b docs/what-you-are-documenting
```

---

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/) for clear commit history:

**Format:**

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, no logic change)
- `refactor` - Code refactoring (no functional change)
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Maintenance tasks, dependencies
- `ci` - CI/CD changes

**Scopes:**

- `web` - Frontend application
- `server` - Backend API
- `extension` - Browser extension
- `ui` - Shared UI components
- `db` - Database schema/migrations

**Examples:**

```bash
# Adding a feature to the web app
git commit -m "feat(web): add collection search functionality"

# Fixing a bug in the server
git commit -m "fix(server): resolve auth token expiry issue"

# Updating documentation
git commit -m "docs: update API documentation with examples"

# Refactoring code
git commit -m "refactor(server): simplify collection access logic"

# Updating dependencies
git commit -m "chore: update dependencies to latest versions"

# Database changes
git commit -m "feat(db): add full-text search index to items table"
```

---

## Pull Request Process

### Before Submitting

1. **Fork the repository** to your GitHub account
2. **Create a feature branch** from `main`
3. **Make your changes** with clear, logical commits
4. **Write or update tests** (when applicable)
5. **Update documentation** if you changed functionality
6. **Run quality checks:**
   ```bash
   pnpm format    # Format code
   pnpm lint      # Check for linting errors
   pnpm build     # Ensure everything builds
   ```

### Submitting a Pull Request

1. **Push your branch** to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a Pull Request** against the `main` branch

3. **Fill out the PR template** with:
   - Clear description of changes
   - Related issue numbers (e.g., "Closes #123")
   - Screenshots (for UI changes)
   - Testing instructions

4. **Wait for CI checks** to pass:
   - Build success
   - Type checking
   - Linting

5. **Respond to review feedback** promptly and professionally

6. **Request re-review** after making requested changes

### PR Title Format

Use the same conventional commit format:

```
feat(web): add dark mode toggle
fix(server): resolve memory leak in tRPC middleware
docs: improve quick start guide
```

---

## Code Style

### General Guidelines

- **TypeScript Strict Mode:** All code must pass strict type checking
- **Functional Components:** Use React function components with hooks
- **Composition:** Prefer composition over inheritance
- **Immutability:** Avoid mutating objects and arrays
- **Descriptive Names:** Use clear, self-documenting variable and function names

### Formatting

We use **Prettier** for automatic code formatting:

```bash
pnpm format
```

**Configuration:**

- 2 spaces for indentation
- Single quotes for strings
- Semicolons required
- Trailing commas in multi-line structures

Prettier runs automatically on commit via Husky hooks.

### Linting

We use **ESLint** for code quality:

```bash
pnpm lint
```

**Key rules:**

- No unused variables
- No console.log in production code (use proper logging)
- Prefer const over let
- Explicit return types on exported functions

### TypeScript

- **Avoid `any`:** Use proper types or `unknown`
- **Use type inference:** Don't over-annotate obvious types
- **Export types:** Share types between packages
- **Zod for validation:** Use Zod schemas for runtime validation

**Good:**

```typescript
export type Collection = {
  id: string;
  title: string;
  createdAt: Date;
};

export async function getCollection(id: string): Promise<Collection> {
  return await db.query.collections.findFirst({
    where: eq(collections.id, id),
  });
}
```

**Bad:**

```typescript
export async function getCollection(id: any) {
  return await db.query.collections.findFirst({
    where: eq(collections.id, id),
  });
}
```

---

## Testing Guidelines

### Running Tests

```bash
pnpm test
```

(Note: Test suite is currently under development)

### Writing Tests

- **Unit tests:** Test individual functions and components
- **Integration tests:** Test API endpoints and database operations
- **E2E tests:** Test critical user flows

### Test Structure

```typescript
describe("Collection Service", () => {
  it("should create a new collection", async () => {
    const collection = await createCollection({ title: "Test Collection" });
    expect(collection.title).toBe("Test Collection");
  });

  it("should throw error for duplicate collection titles", async () => {
    await createCollection({ title: "Duplicate" });
    await expect(createCollection({ title: "Duplicate" })).rejects.toThrow();
  });
});
```

---

## Documentation Guidelines

### Code Comments

- **Comment why, not what:** Code should be self-explanatory
- **Document complex logic:** Explain non-obvious algorithms
- **Add JSDoc for public APIs:** Help IDE autocomplete

**Good:**

```typescript
// Use debounce to prevent excessive API calls during rapid typing
const debouncedSearch = useDebouncedCallback(searchItems, 300);
```

**Bad:**

```typescript
// Set the value to 300
const debouncedSearch = useDebouncedCallback(searchItems, 300);
```

### Documentation Files

When adding features, update relevant docs:

- **README.md** - If changing setup or core concepts
- **ARCHITECTURE.md** - If changing system design
- **DEVELOPMENT.md** - If changing dev workflow
- **API.md** - If adding/changing API endpoints

---

## Issue Guidelines

### Reporting Bugs

**Use the bug report template:**

- **Title:** Clear, concise description
- **Description:** What happened vs. what you expected
- **Reproduction:** Step-by-step instructions
- **Environment:** OS, browser, Node version
- **Screenshots:** If applicable

**Example:**

```
Title: Collection deletion fails with shared collections

Description:
When attempting to delete a collection that has been shared with other users,
the deletion fails silently. Expected behavior: collection should be deleted
and all members should lose access.

Reproduction:
1. Create a collection
2. Share it with another user
3. Attempt to delete the collection as the owner
4. Collection remains in the database

Environment:
- OS: macOS 14.0
- Browser: Chrome 120
- Node: v22.0.0
```

### Feature Requests

**Be specific:**

- **What:** Describe the feature clearly
- **Why:** Explain the use case and benefit
- **How:** Suggest implementation approach (optional)

---

## Community Guidelines

### Communication

- **Be respectful:** Treat all contributors with respect
- **Be patient:** Remember that maintainers are volunteers
- **Be constructive:** Provide actionable feedback
- **Be inclusive:** Welcome newcomers and help them succeed

### Review Process

When reviewing PRs:

- **Focus on code quality:** Check for bugs, style, best practices
- **Be constructive:** Suggest improvements, not just criticism
- **Ask questions:** If you don't understand something, ask
- **Approve when ready:** Don't block unnecessarily

When receiving reviews:

- **Be open:** Consider feedback objectively
- **Ask for clarification:** If feedback is unclear
- **Discuss disagreements:** Explain your reasoning
- **Say thank you:** Appreciate the reviewer's time

---

## Recognition

Contributors are recognized in:

- GitHub Contributors page
- Release notes (for significant contributions)
- Special thanks in documentation (for major features)

---

## Getting Help

Stuck? Need help?

- **GitHub Discussions:** Ask questions, share ideas
- **GitHub Issues:** Report bugs, suggest features
- **Pull Request Comments:** Get feedback on your code

---

## License

By contributing to DEX, you agree that your contributions will be licensed under the project's MIT License.

---

Thank you for contributing to DEX! Your efforts help make this project better for everyone.
