# 14: Pre-commit Hooks & Code Quality

**What to build:** Husky pre-commit hooks running ESLint for linting, Prettier for code formatting, and TypeScript type-checking before each commit. Commits are blocked if any checks fail. Conventional commit message enforcement to maintain clean git history. All code passes linting and formatting standards automatically.

**Blocked by:** 01 (Project Foundation & Build Setup)

**Status:** ready-for-agent

- [ ] Install Husky and lint-staged
- [ ] Configure Husky pre-commit hook
- [ ] Set up lint-staged to run on staged files
- [ ] Add ESLint to pre-commit checks
- [ ] Add Prettier to pre-commit checks
- [ ] Add TypeScript type-checking to pre-commit
- [ ] Configure conventional commit message enforcement
- [ ] Create `.husky/pre-commit` hook script
- [ ] Test hook blocks commits with linting errors
- [ ] Document commit message format in README
