# ARSLAAN_07 Profile README Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a visually striking, accessible GitHub profile README that presents Arslaan as an AI Full-Stack Engineer.

**Architecture:** A custom `assets/terminal-header.svg` provides the neon terminal identity, while `README.md` contains the professional narrative and public dynamic GitHub widgets. A dependency-free shell validator ensures future edits preserve every essential profile element.

**Tech Stack:** GitHub Flavored Markdown, SVG image URLs, POSIX shell, Git.

## Global Constraints

- Repository name is `arslaan07` so GitHub can render it as the `arslaan07` profile README.
- Use the exact positioning: AI Full-Stack Engineer building production-grade systems where web engineering meets applied AI.
- Include TypeScript, Next.js, React, NestJS, PostgreSQL, Python, LangChain, RAG, and LLM applications.
- Do not claim projects, employment, metrics, social accounts, or contact details that have not been provided.
- Every visible image must have descriptive alt text.
- Use no package manager, runtime dependency, or build step.

---

### Task 1: Create the profile README

**Files:**
- Create: `README.md`
- Create: `assets/terminal-header.svg`

**Interfaces:**
- Consumes: GitHub's profile repository convention and `https://github.com/arslaan07`.
- Produces: A self-contained Markdown profile rendered by GitHub.

- [ ] **Step 1: Write the failing content validation command**

Run:

```bash
test -f README.md
```

Expected: FAIL with a non-zero exit status because `README.md` does not exist.

- [ ] **Step 2: Create `README.md` with this content**

```markdown
<h1 align="center">ARSLAAN_07 // AI FULL-STACK ENGINEER</h1>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=18&pause=1200&color=22D3EE&center=true&vCenter=true&width=700&lines=Building+production-grade+systems+where+web+engineering+meets+applied+AI.;TypeScript+%E2%80%A2+Next.js+%E2%80%A2+NestJS+%E2%80%A2+Python+%E2%80%A2+RAG+%E2%80%A2+LLM+Applications" alt="Animated introduction: Arslaan is an AI Full-Stack Engineer" />
</p>

```text
> BOOT_SEQUENCE: COMPLETE
> STATUS: Building intelligent products from interface to inference.
```

## ◈ System profile

I am **Arslaan**, an AI Full-Stack Engineer focused on building production-grade systems where thoughtful web engineering meets applied AI. I work across modern TypeScript platforms, robust backend services, and LLM-powered experiences that solve real user problems.

## ◈ Installed modules

| Layer | Capabilities |
| --- | --- |
| `WEB_PLATFORM` | TypeScript · Next.js · React |
| `BACKEND_AND_DATA` | NestJS · PostgreSQL |
| `APPLIED_AI` | Python · LangChain · RAG · LLM applications |

## ◈ Current transmission

```text
// Designing fast, thoughtful product experiences.
// Engineering reliable APIs, databases, and full-stack foundations.
// Exploring practical RAG and LLM applications that earn their place in production.
```

## ◈ GitHub telemetry

<p>
  <img width="49%" src="https://github-readme-stats.vercel.app/api?username=arslaan07&show_icons=true&hide_border=true&bg_color=0D1117&title_color=22D3EE&icon_color=A78BFA&text_color=E5E7EB&ring_color=22D3EE" alt="Arslaan's GitHub statistics" />
  <img width="49%" src="https://github-readme-streak-stats.herokuapp.com/?user=arslaan07&hide_border=true&background=0D1117&stroke=22D3EE&ring=A78BFA&fire=22D3EE&currStreakLabel=E5E7EB&sideLabels=E5E7EB&dates=9CA3AF" alt="Arslaan's GitHub contribution streak" />
</p>

<p>
  <img width="49%" src="https://github-readme-stats.vercel.app/api/top-langs/?username=arslaan07&layout=compact&hide_border=true&bg_color=0D1117&title_color=22D3EE&text_color=E5E7EB" alt="Most used programming languages in Arslaan's public GitHub repositories" />
</p>

## ◈ Open channel

- GitHub: [@arslaan07](https://github.com/arslaan07)
- The linked GitHub profile is the only contact path shown because no other contact details were supplied.

---

<p align="center"><sub>Connection established. Build something useful.</sub></p>

<!-- sudo collaborate --with arslaan07 -->
```

- [ ] **Step 3: Run the initial validation command**

Run:

```bash
test -f README.md && rg -n "ARSLAAN_07|AI Full-Stack Engineer|TypeScript|Next.js|React|NestJS|PostgreSQL|Python|LangChain|RAG|LLM applications|https://github.com/arslaan07" README.md
```

Expected: PASS and report each required profile element.

- [ ] **Step 4: Commit the README**

Run:

```bash
git add README.md
git commit -m "feat: add AI full-stack profile README"
```

### Task 2: Add an offline README contract validator

**Files:**
- Create: `scripts/validate-readme.sh`
- Test: `scripts/validate-readme.sh`

**Interfaces:**
- Consumes: `README.md` at the repository root.
- Produces: Exit code `0` with `README validation passed.` when every required string is present; exit code `1` otherwise.

- [ ] **Step 1: Write the failing test**

Run:

```bash
scripts/validate-readme.sh
```

Expected: FAIL with a missing-file error because the validator does not exist.

- [ ] **Step 2: Create `scripts/validate-readme.sh`**

```bash
#!/usr/bin/env bash
set -euo pipefail

readonly readme_path="README.md"
readonly required_content=(
  "ARSLAAN_07"
  "AI Full-Stack Engineer"
  "TypeScript"
  "Next.js"
  "React"
  "NestJS"
  "PostgreSQL"
  "Python"
  "LangChain"
  "RAG"
  "LLM applications"
  "https://github.com/arslaan07"
)

if [[ ! -f "$readme_path" ]]; then
  echo "Missing $readme_path" >&2
  exit 1
fi

for required_item in "${required_content[@]}"; do
  if ! grep -Fq "$required_item" "$readme_path"; then
    echo "README is missing required content: $required_item" >&2
    exit 1
  fi
done

echo "README validation passed."
```

- [ ] **Step 3: Make the validator executable and run it**

Run:

```bash
chmod +x scripts/validate-readme.sh
scripts/validate-readme.sh
```

Expected: PASS with `README validation passed.`.

- [ ] **Step 4: Verify the validator catches a regression without retaining any file changes**

Run:

```bash
temporary_readme="$(mktemp)"
cp README.md "$temporary_readme"
sed '/LangChain/d' README.md > README.md.check && mv README.md.check README.md
if scripts/validate-readme.sh; then
  echo "Expected validator failure" >&2
  exit 1
fi
cp "$temporary_readme" README.md
rm "$temporary_readme"
scripts/validate-readme.sh
```

Expected: The first validator run reports missing `LangChain`; the restored README passes.

- [ ] **Step 5: Commit the validator**

Run:

```bash
git add scripts/validate-readme.sh
git commit -m "test: validate profile README content"
```

### Task 3: Perform final repository verification

**Files:**
- Verify: `README.md`
- Verify: `scripts/validate-readme.sh`

**Interfaces:**
- Consumes: Completed README and validator.
- Produces: A clean Git working tree with all profile requirements validated.

- [ ] **Step 1: Run the offline contract validator**

Run:

```bash
scripts/validate-readme.sh
```

Expected: PASS with `README validation passed.`.

- [ ] **Step 2: Inspect Markdown structure and accessibility markers**

Run:

```bash
rg -n '^#{1,2} |<img |alt="|<!-- sudo collaborate' README.md
```

Expected: Report the hero, visible sections, image alt attributes, and the hidden Easter egg.

- [ ] **Step 3: Inspect repository state**

Run:

```bash
git log --oneline -3
git status --short --branch
```

Expected: The README and validator commits are listed and the working tree is clean on `main`.
