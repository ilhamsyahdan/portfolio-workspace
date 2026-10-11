# 04: Projects Data Structure & Type System

**What to build:** TypeScript interfaces defining the project data shape and a JSON file at [`data/projects.json`](data/projects.json:1) containing sample project entries. Each project includes title, description, tech stack array, image path, demo link, and source code link. Components can import this data with full type safety.

**Blocked by:** 01 (Project Foundation & Build Setup)

**Status:** ready-for-agent

- [ ] Create TypeScript interface for project data structure
- [ ] Define types for tech stack, links, and metadata
- [ ] Create [`data/projects.json`](data/projects.json:1) with 3-5 sample projects
- [ ] Add project images to [`public/images/projects/`](public/images/projects/:1)
- [ ] Create utility function to load and type-check project data
- [ ] Export typed project data for component consumption
- [ ] Verify type checking works when importing data
- [ ] Document project data schema in types file
