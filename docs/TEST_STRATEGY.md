# 🎯 Concise Test Strategy & Quality Plan

**Project**: Toolshop Practice App QA Assessment  
**Author**: AI-Augmented QA Engineer / SDET  
**Date**: October 2026  
**Target Build (Buggy)**: `https://with-bugs.practicesoftwaretesting.com` | API: `https://api-with-bugs.practicesoftwaretesting.com`  
**Reference Oracle (Clean)**: `https://practicesoftwaretesting.com` | API: `https://api.practicesoftwaretesting.com`

---

## 1. Executive Summary & Strategy Overview
This document outlines the test strategy and quality assurance plan for evaluating the **Toolshop** practice application. The objective is to identify, prove, report, and automate regression coverage for real functional and financial defects in the target build using the clean reference build as the behavioral oracle.

---

## 2. ISO/IEC 25010 Quality Characteristics Prioritization

| Quality Characteristic | Priority | Justification & Focus Area |
| :--- | :---: | :--- |
| **Functional Suitability** | `P1 - CRITICAL` | Verification of end-to-end shopping journey (Search $\rightarrow$ Cart $\rightarrow$ Checkout $\rightarrow$ Payment $\rightarrow$ Invoice) and money math accuracy. |
| **Reliability** | `P1 - CRITICAL` | Prevention of state corruption, cart math miscalculations, order submission failures, and API schema contract violations. |
| **Usability** | `P2 - HIGH` | Validation of UI error feedback, input validation boundary enforcement, and form responsiveness. |
| **Security** | `P2 - HIGH` | Validation of authentication tokens, password masking, unauthorized order access, and data sanitization. |
| **Performance Efficiency** | `P3 - MEDIUM` | Monitoring API response times and page load benchmarks during key checkout actions. |

---

## 3. Functional Scope & Boundaries

### 🟢 In-Scope (High-Risk Customer Value Flow)
1. **Catalog Browsing & Search**: Search filtering, category selection, price range sliders, and pagination.
2. **Product Detail & Stock Management**: Product metadata display, unit prices, quantity increment/decrement, stock limits.
3. **Cart Management**: Cart state persistence, item addition/removal, quantity modifications, subtotal calculation.
4. **Checkout & Financial Validation**: Money math verification, subtotal + tax + shipping - discount vouchers = grand total, rounding verification.
5. **Authentication & User Account**: User registration, login, JWT token handling, profile update, past invoice retrieval.
6. **REST API Endpoint Contracts**: Product search `/products`, cart validation, auth `/users/login`, order processing `/orders`.

### 🔴 Deliberately Out-of-Scope (Timebox & Risk Management)
- Third-party payment gateway integration edge cases (Stripe/PayPal external sandbox redirects).
- Cross-browser rendering micro-variations on legacy mobile platforms (focus on Chromium standard desktop/responsive views).
- Volumetric stress/load testing (beyond standard API response latency checks).
- Localization / i18n translation completeness across secondary languages.

---

## 4. Test Design & Analysis Methodology

All test cases are designed using formal ISTQB black-box test design techniques:
1. **Equivalence Partitioning (EP)**: Validating input fields (email formats, search queries, password complexity).
2. **Boundary Value Analysis (BVA)**: Money math ($0.00$, $0.01$, max quantities, cart boundary limits $0, 1, \text{Max}, \text{Max}+1$).
3. **Decision Table Testing**: Voucher discount application combinations, tax rates, shipping fee logic.
4. **State Transition Testing**: User authentication flow, cart state progression ($\text{Empty} \rightarrow \text{Items Added} \rightarrow \text{Checkout} \rightarrow \text{Paid} \rightarrow \text{Invoice Created}$).

---

## 5. Defect Classification Framework

Defects are rated on two independent axes:

```
                  HIGH SEVERITY
                       │
  [P2/S1] High Impact,  │  [P1/S1] Critical Defect
  Low Business Urgency  │  Immediate Release Blocker
                       │
LOW PRIORITY ──────────┼────────── HIGH PRIORITY
                       │
  [P3/S3] Minor Defect  │  [P1/S3] High Priority,
  Low Impact           │  Cosmetic/Copy Issue
                       │
                  LOW SEVERITY
```

- **Severity (Technical Impact)**: Measured by system failure extent, data corruption risk, or financial calculation error magnitude.
- **Priority (Business Urgency)**: Measured by customer impact on revenue-generating core flows.

---

## 6. Automation Architecture (Playwright TypeScript)

- **Unified Suite**: UI + API testing in a single framework.
- **Data-Driven Financial Asserts**: Pinned numeric expectations to the exact cent ($0.01$).
- **Dual-State Test Results**:
  - 🟢 **Green Specs**: Verify working features and core happy path flows.
  - 🔴 **Red Specs (Bug-Pinning)**: Explicitly test and pin real defects discovered during exploration so they fail cleanly until resolved by developers.
- **Single Command Execution**: `npm test` runs full suite and generates consolidated HTML report.
