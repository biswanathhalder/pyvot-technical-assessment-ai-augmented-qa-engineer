# 🧪 Toolshop QA & SDET Automation Assessment Suite

[![Playwright](https://img.shields.io/badge/Playwright-TypeScript-blue?logo=playwright)](https://playwright.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-v20%2B-green?logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-ISC-orange.svg)](LICENSE)

An end-to-end Quality Assurance & SDET test automation repository for evaluating the **Toolshop** practice application (`with-bugs` target vs `clean` oracle reference). Built with **Playwright (TypeScript)** for unified UI + REST API testing.

---

## 📌 Executive Summary

- **Buggy Target (UI)**: `https://with-bugs.practicesoftwaretesting.com`
- **Buggy Target (API)**: `https://api-with-bugs.practicesoftwaretesting.com`
- **Oracle Reference (UI)**: `https://practicesoftwaretesting.com`
- **Oracle Reference (API)**: `https://api.practicesoftwaretesting.com`

This repository delivers:
1. **Defect Discovery**: Proven, reproducible bug reports rated on separate Severity & Priority axes.
2. **Financial Math Rigor**: Exact money math proofs for subtotals, line items, and quantities ($0.01$ precision).
3. **Formal ISTQB Test Design**: 10 designed test cases using Equivalence Partitioning, Boundary Value Analysis, Decision Tables, and State Transitions.
4. **Automated Regression Suite**: Deliberate mix of 🟢 **Green (Passing)** happy path tests and 🔴 **Red (Defect Pinning)** failing assertions with strict expected values.
5. **AI Usage Transparency**: Documented breakdown of AI pairing, selector corrections, and discarded tautological tests.

---

## 🛠️ Technology Stack & Framework Selection

| Layer / Component | Technology Used | Architectural Rationale & Purpose |
| :--- | :--- | :--- |
| **Test Automation Engine** | **Playwright Test** (`@playwright/test` `^1.55`) | Single unified runner handling both browser UI automation and REST API HTTP testing natively. |
| **Language & Type Safety** | **TypeScript** (`^5.9`) | Provides strict type safety, clean OOP interfaces, and compile-time error prevention. |
| **Design Pattern** | **Page Object Model (POM)** | Decouples UI locator selectors & actions (`src/pages/`) from test specs (`tests/`). |
| **Environment Management**| **`dotenv` (`^17.2`)** | Provides dynamic environment URL loading via `.env` file (`BASE_URL`, `API_URL`). |
| **API Exploration Tools** | **`axios` + `tsx`** | Enables rapid exploratory script execution and raw API HTTP comparison probing. |
| **Browser Execution** | **Google Chrome (Chromium)** | Native desktop browser execution engine. |
| **Reporting & Tracing** | **Playwright HTML Report & Tracing** | Built-in interactive HTML reporting with step-by-step DOM snapshots and network logs. |

### 💡 Why Playwright (TypeScript) Was Selected:
1. **Unified UI + API Engine**: Handles browser UI automation (`page`) and REST API HTTP testing (`request`) in a single test runner without extra dependencies.
2. **Auto-Waiting Capability**: Eliminates flaky sleeps by automatically waiting for elements to be visible, enabled, and actionable.
3. **Multi-Project Matrix**: Allows distinct test profiles (`ui-happy-path`, `ui-defects-pinned`, `api-suite`) in `playwright.config.ts`.
4. **Rich Debugging Ecosystem**: Provides time-travel Trace Viewer, interactive `--ui` GUI runner, automatic failure screenshots, and step-by-step DOM snapshots.

---

## 🏛️ Framework Architecture & Design Principles

```
                              ┌───────────────────────────┐
                              │  playwright.config.ts     │
                              │ (Multi-Project & Env Map) │
                              └─────────────┬─────────────┘
                                            │
                  ┌─────────────────────────┴─────────────────────────┐
                  ▼                                                   ▼
      ┌───────────────────────┐                           ┌───────────────────────┐
      │   UI Test Layer       │                           │   API Test Layer      │
      │ (Page Object Models)  │                           │  (Playwright Request) │
      └───────────┬───────────┘                           └───────────┬───────────┘
                  │                                                   │
        ┌─────────┴─────────┐                               ┌─────────┴─────────┐
        ▼                   ▼                               ▼                   ▼
 🟢 Green Specs     🔴 Red Specs                     🟢 Green API        🔴 Red API
 (happy_path.ts) (defects_pinned.ts)                 (PASS-001/002)     (PIN-001/002)
```

### Key Architectural Layers:

1. **Page Object Model (POM) Abstraction (`src/pages/`)**:
   - Encapsulates UI locators and user interactions behind structured page classes (`HomePage`, `ProductPage`, `CartPage`, `RegisterPage`).
   - Extends from a centralized `BasePage` class containing shared navigation elements and state accessors.

2. **Unified Dynamic Environment Layer (`dotenv` + `.env`)**:
   - Eliminates hardcoded URLs in test files.
   - Tests navigate relative to `process.env.BASE_URL` and `process.env.API_URL`, allowing seamless execution across Staging, Production, or local targets.

3. **Dual-State Test Architecture (Green vs Red Specs)**:
   - **🟢 Green Specs (`tests/ui/happy_path.spec.ts`)**: Verify working features (catalog search, valid quantity entry, input validations).
   - **🔴 Red Specs (`tests/ui/defects_pinned.spec.ts`)**: Contain strict mathematical and text assertions pinning real bugs, ensuring no tautological or assertion-free tests exist.

4. **Single-Worker Deterministic Execution**:
   - Configured with `workers: 1` and `fullyParallel: false` to guarantee state isolation during registration and shopping cart checkout flows.

---

## 📁 Repository Directory Structure & Artifact Map

```
qa-test-automation/
├── bug-reports/                   # 📄 Formal Defect Reports (Appendix A Format)
│   ├── BUG-API-001.md            # Critical: POST /carts returns 404
│   ├── BUG-API-002.md            # Medium: Product schema integer ID mismatch
│   ├── BUG-UI-002.md             # Major: Cart line total displays $00.00
│   ├── BUG-UI-003.md             # Major: Quantity 0 increments cart badge to 1
│   └── BUG-UI-004.md             # Low: Top nav copy typo "Contakt"
├── docs/                          # 📄 Project Strategy & Specifications
│   ├── TEST_STRATEGY.md          # 1-page Test Strategy (ISO 25010 aligned)
│   ├── TEST_CASES.md             # 10 Designed Test Cases (ISTQB techniques)
│   ├── FINANCIAL_VALIDATION.md   # Exact Money Math Derivations & Proofs
│   ├── AI_TRANSPARENCY.md        # AI Usage, Discarded Tests & Selector Fixes
│   └── VIDEO_SCRIPT.md           # 3-5 Minute Presentation Recording Script
├── src/                           # ⚙️ Page Object Models & Utilities
│   ├── pages/                    # BasePage, HomePage, ProductPage, CartPage, RegisterPage
│   └── utils/                    # Exploration and audit helpers
├── tests/                         # 🧪 Automated Playwright Test Suites
│   ├── ui/
│   │   ├── happy_path.spec.ts    # 🟢 Green Specs (Passing features)
│   │   └── defects_pinned.spec.ts# 🔴 Red Specs (Pinning real bugs)
│   └── api/
│       └── api_regression.spec.ts# 📡 API Passing & Pinning Specs
├── test-results/                  # 📸 Test Execution Screenshots & Failure Contexts
├── playwright-report/             # 📊 Generated Playwright HTML Report
├── .env                           # Active Environment Configuration
├── .env.example                   # Template Environment File
├── playwright.config.ts           # Multi-project Playwright Configuration
├── package.json                   # Dependencies and npm test scripts
└── tsconfig.json                  # TypeScript Compiler Configuration
```

---

## ⚡ Quick Start & Execution Guide

### 1. Prerequisites
- Node.js (v18 or higher)
- Google Chrome installed locally

### 2. Setup & Installation
```bash
# Install dependencies
npm install
```

### 3. Environment Configuration
URL targets are dynamic and configurable via [.env](file:///Users/biswanathhalder/projects/interview/qa-test-automation/.env):

```env
BASE_URL=https://with-bugs.practicesoftwaretesting.com
API_URL=https://api-with-bugs.practicesoftwaretesting.com
ORACLE_BASE_URL=https://practicesoftwaretesting.com
ORACLE_API_URL=https://api.practicesoftwaretesting.com
```

Or pass dynamic environment URLs on the command line:
```bash
BASE_URL=https://staging.myproject.com API_URL=https://api-staging.myproject.com npm test
```

---

## 🚀 How to Run Tests & Modes

### 1. Run Full Regression Suite (Single Command)
```bash
npm test
```
*Executes all 10 UI and REST API test specs in headless mode.*

---

### 2. Run in Interactive Headed Mode (Watch Browser Live)
```bash
npx playwright test --headed
```
*Launches visible Google Chrome windows so you can watch automated clicks and typing live.*

---

### 3. Launch Playwright Interactive UI Mode (Visual Debugger)
```bash
npx playwright test --ui
```
*Opens Playwright's visual runner GUI with time-travel DOM snapshots, locator picker, and network inspector.*

---

### 4. Run Targeted Test Subsets
```bash
# 🟢 Run ONLY Passing Happy-Path UI Tests
npm run test:pass

# 🔴 Run ONLY Pinned Defect UI Tests (Deliberately failing bug assertions)
npm run test:pinned

# 📡 Run REST API Regression Suite (Passing + Pinned API bugs)
npm run test:api
```

---

## 📊 Where to Find Results, Reports & Failure Artifacts

### 1. Playwright HTML Report (Interactive Web Report)
After running tests, open the generated HTML report:
```bash
npm run report
# OR
npx playwright show-report
```
- **What it contains**: Interactive test dashboard listing pass/fail breakdown, execution times, console logs, and step details.
- **Access URL**: Opens automatically in your browser at `http://localhost:9323`.

### 2. Screenshots & Error Traces (`test-results/`)
Whenever a test fails (such as our bug-pinning red specs), Playwright automatically captures full-page failure screenshots and trace files:
- **Location**: Look in `test-results/` directory.
- **Example screenshot**: `test-results/.../test-failed-1.png`
- **Trace files**: Opened via `npx playwright show-trace test-results/.../trace.zip`.

---

## 📄 Documentation & Result Artifacts Index

| Document / Result Artifact | File Path | Content Summary |
| :--- | :--- | :--- |
| 📋 **Test Strategy** | [docs/TEST_STRATEGY.md](file:///Users/biswanathhalder/projects/interview/qa-test-automation/docs/TEST_STRATEGY.md) | 1-page ISO/IEC 25010 Quality Characteristics & Scope |
| 🧪 **Test Cases Specification** | [docs/TEST_CASES.md](file:///Users/biswanathhalder/projects/interview/qa-test-automation/docs/TEST_CASES.md) | 10 designed cases with ISTQB techniques |
| 💰 **Financial Working Paper** | [docs/FINANCIAL_VALIDATION.md](file:///Users/biswanathhalder/projects/interview/qa-test-automation/docs/FINANCIAL_VALIDATION.md) | Exact money math derivations & subtotal proofs |
| 🤖 **AI Transparency Log** | [docs/AI_TRANSPARENCY.md](file:///Users/biswanathhalder/projects/interview/qa-test-automation/docs/AI_TRANSPARENCY.md) | AI assistance, prompt fixes, discarded tautologies |
| 🎬 **Presentation Video Script** | [docs/VIDEO_SCRIPT.md](file:///Users/biswanathhalder/projects/interview/qa-test-automation/docs/VIDEO_SCRIPT.md) | 3-5 minute presentation script for recording |

---

## 🐛 Summary of Discovered Defects & Reports

| Bug ID | Type | Title / Summary | Severity | Priority | Formal Bug Report |
| :--- | :---: | :--- | :---: | :---: | :--- |
| `BUG-API-001` | API | `POST /carts` returns 404 Not Found instead of 201 Created | `S1 Critical` | `P1 High` | [BUG-API-001.md](file:///Users/biswanathhalder/projects/interview/qa-test-automation/bug-reports/BUG-API-001.md) |
| `BUG-UI-002` | Financial | Cart line item price displays `$00.00` for 3 items @ `$14.15` | `S2 Major` | `P1 High` | [BUG-UI-002.md](file:///Users/biswanathhalder/projects/interview/qa-test-automation/bug-reports/BUG-UI-002.md) |
| `BUG-UI-003` | BVA | Quantity input accepts `0` and increments cart count to `1` | `S2 Major` | `P2 High` | [BUG-UI-003.md](file:///Users/biswanathhalder/projects/interview/qa-test-automation/bug-reports/BUG-UI-004.md) |
| `BUG-UI-004` | Copy | Top nav link displays misspelled label `"Contakt"` | `S4 Low` | `P2 High` | [BUG-UI-004.md](file:///Users/biswanathhalder/projects/interview/qa-test-automation/bug-reports/BUG-UI-004.md) |
| `BUG-API-002` | Contract | `/products` schema returns integer IDs (`1`) vs ULID strings | `S3 Medium` | `P3 Medium` | [BUG-API-002.md](file:///Users/biswanathhalder/projects/interview/qa-test-automation/bug-reports/BUG-API-002.md) |

---

## 💰 Financial Math Verification Summary

- **Product Unit Price**: `$14.15`
- **Quantity Purchased**: `3` units
- **Derived Line Item Total**: $\$14.15 \times 3 = \$42.45$
- **Buggy UI Line Total**: **`$00.00`** ❌ *(Pinned in `TC-FIN-001`)*
- **Buggy UI Subtotal Footer**: **`$42.45`** 🟢

For complete formulas and step-by-step working, see [FINANCIAL_VALIDATION.md](file:///Users/biswanathhalder/projects/interview/qa-test-automation/docs/FINANCIAL_VALIDATION.md).

---

## 🔮 Future Roadmap (Next Steps with More Time)

1. **Visual Regression Testing**: Add Playwright screenshot diffing (`toHaveScreenshot()`) for cross-browser visual layout checks.
2. **CI/CD Integration**: Configure GitHub Actions workflow running `npm test` on every pull request with automated HTML report publishing.
3. **Data-Driven Performance Benchmarking**: Monitor API response latencies during checkout steps to detect p95 degradation.
