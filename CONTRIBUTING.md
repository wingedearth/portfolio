# Contributing Guide

## Commit Message Format

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for commit messages. All commits are automatically validated using commitlint.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes only
- **style**: Code style changes (formatting, missing semi-colons, etc)
- **refactor**: Code changes that neither fix a bug nor add a feature
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **build**: Changes to build system or dependencies
- **ci**: Changes to CI/CD configuration
- **chore**: Other changes that don't modify src or test files
- **revert**: Revert a previous commit

### Scope (Optional)

The scope specifies the area of the codebase affected by the change:
- `components`: React components
- `pages`: Page components
- `data`: Data files
- `types`: TypeScript types
- `config`: Configuration files

### Examples

#### Feature
```bash
git commit -m "feat(components): add navigation menu component"
```

#### Bug Fix
```bash
git commit -m "fix(components): resolve image loading issue in MediaGallery"
```

#### Documentation
```bash
git commit -m "docs: update README with deployment instructions"
```

#### Refactoring
```bash
git commit -m "refactor(pages): extract Header component from Home"
```

#### Breaking Change
```bash
git commit -m "feat(types)!: update Project interface

BREAKING CHANGE: removed deprecated 'category' field from Project type"
```

## Releasing

This project uses [standard-version](https://github.com/conventional-changelog/standard-version) for automated versioning and changelog generation.

### Create a Release

```bash
# Automatically determine version bump based on commits
npm run release

# Create a specific version
npm run release:patch  # 0.1.0 -> 0.1.1
npm run release:minor  # 0.1.0 -> 0.2.0
npm run release:major  # 0.1.0 -> 1.0.0
```

### What Happens

1. Bumps version in `package.json`
2. Generates/updates `CHANGELOG.md` based on commits
3. Creates a git tag for the new version
4. Commits the changes

### After Release

```bash
# Push changes and tags to remote
git push --follow-tags origin master
```

## Git Hooks

This project uses Husky to enforce commit message format:
- **commit-msg**: Validates commit message format using commitlint

If your commit message doesn't follow the conventional format, the commit will be rejected with an error message.
