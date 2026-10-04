# 🎬 3-5 Minute Submission Video Script & Outline

**Target Audience**: Hiring Manager / Lead SDET Evaluator  
**Duration**: ~3 to 4 Minutes  
**Goal**: Walk through highest-severity defects, test case strategy, financial math derivation, and automated suite execution.

---

## ⏱️ Timeline & Talking Points

### 0:00 – 0:45 | Executive Overview & Test Strategy
> *"Hello! I'm presenting my QA Take-Home Assessment for the Toolshop practice e-commerce application. My approach focused on three pillars: truth, clarity, and technical rigor.*  
> *I set up a unified Playwright TypeScript suite testing both the buggy web UI and REST API against the clean reference build as my oracle. I prioritized ISO 25010 Functional Suitability and Financial Rigor—making sure every number is verified to the last cent."*

---

### 0:45 – 2:00 | Highest Severity Bug Walkthrough (Financial & API)
> *"Let me show you my highest-severity findings:*  
> 
> **1. Critical REST API Failure (BUG-API-001)**:  
> *When calling `POST /carts` to create a session, the API returns a `404 Resource Not Found` error instead of returning `201 Created` with a new cart ID as the clean oracle does. This breaks API-based cart integrations.*  
> 
> **2. Financial Display Contradiction (BUG-UI-002)**:  
> *On the UI cart checkout page, when adding 3 units of Combination Pliers ($14.15 each), the expected line total is $42.45. But the line price column displays `$00.00`! Interestingly, the overall cart total row below correctly calculates `$42.45`, creating a direct internal UI contradiction."*

---

### 2:00 – 3:00 | Test Design & Automation Suite (Green vs Red Specs)
> *"I designed 10 ISTQB-aligned test cases covering Equivalence Partitioning, Boundary Value Analysis, Decision Tables, and State Transitions.*  
> 
> *In my Playwright automation suite, I implemented a deliberate mix of passing features (green) and failing bug-pinning tests (red):*  
> - `npm run test:pass` runs 3 green specs covering catalog search, valid quantity additions, and registration form errors. All 3 pass cleanly.  
> - `npm run test:pinned` runs red specs with strict numerical assertions pinning each defect. These fail cleanly as expected, ensuring no tautological or assertion-free tests exist."*

---

### 3:00 – 3:45 | Single Command Execution Demo & Wrap Up
> *"Let's run `npm test`. In one single command, Playwright executes the full UI and API suite across all projects and generates an HTML report.*  
> 
> *All deliverables—including bug reports, financial working paper, AI transparency log, and README—are documented in the repo. Thank you for your time!"*
