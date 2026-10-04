# 🤖 AI Assistance & Transparency Audit Log

**Requirement Reference**: Section 4.7 (*Use of AI (be explicit)*)  
**Rule**: "Tell us, briefly, what you changed or threw away — the tautological tests you deleted, the edge cases the model missed that you added, the hallucinated selectors or endpoints you corrected."

---

## 1. Summary of AI Engagement Model
Throughout this take-home assessment, AI (Gemini 3.6 Flash / Advanced Agentic Assistant) was utilized as a collaborative pair-programmer for initial exploratory script drafting, Playwright test boilerplate generation, and markdown report formatting. All generated output was empirically tested, corrected, and verified against the live application targets before inclusion.

---

## 2. Refinements, Corrections & Discarded Code

### 🗑️ 1. Discarded Tautological & Flaky Tests
- **Discarded Tautology**: AI initially drafted generic assertions such as `expect(price).toBeDefined()` or `expect(products.length).toBeGreaterThan(0)` for financial checks.
  - **Correction**: Replaced with strict numerical pinned values (`expect(actualLinePrice).toBe(42.45)`). A financial test must be data-driven and capable of failing when logic breaks.
- **Discarded Flaky Wait State**: AI suggested `page.waitForLoadState('networkidle')` across single-page application routes.
  - **Correction**: Removed `networkidle` because background image/analytics requests caused 30-second timeouts. Replaced with explicit element state triggers (`page.waitForSelector('[data-test="quantity"]')`).

---

### 🔧 2. Selector & URL Hash Router Corrections
- **Hallucinated URL Format**: AI initially navigated to standard HTML5 URLs like `https://with-bugs.practicesoftwaretesting.com/product/1`.
  - **Correction**: The target application uses Angular Hash Routing (`/#/product/1`, `/#/checkout`). Updated all page object navigation calls to include `/#/` prefix.
- **Missing / Misidentified Data-Test Selectors**:
  - AI assumed cart line price selector was `.cart-total`.
  - Empirical DOM inspection revealed exact attribute: `[data-test="line-price"]`.
  - AI assumed cart subtotal selector was `#subtotal`.
  - Empirical DOM inspection revealed exact attribute: `[data-test="cart-subtotal"]`.

---

### 💡 3. Edge Cases Discovered & Added by Engineer
- **Quantity BVA ($0$)**: Added test case `TC-BVA-001` to explicitly probe zero-quantity submission. Uncovered that the buggy UI accepts $0$ and increments cart badge to `1`.
- **Top Nav Label Verification**: Added static copy inspection `TC-UI-001` which uncovered the `"Contakt"` spelling typo.
- **API Schema Primitive Type Audit**: Added explicit type assertions (`typeof id === 'string'`) which pinned the integer vs ULID contract mismatch in `/products`.
