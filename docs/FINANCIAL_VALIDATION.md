# 💰 Financial & Calculation Validation Working Paper

**Requirement Reference**: Section 4.4 (*Financial / Calculation Validation*)  
**Core Rule**: "Verify the numbers exactly... Show your working. For each figure, state the expected value and how you derived it. Correct to the last unit."

---

## 1. Mathematical Formulas & Governing Rules

All financial calculations in the Toolshop e-commerce application adhere to standard monetary accounting logic rounded to two decimal places ($0.01$ currency unit):

$$\text{Line Item Total} = \text{Unit Price} \times \text{Quantity}$$

$$\text{Subtotal} = \sum_{i=1}^{n} \text{Line Item Total}_i$$

$$\text{Discount Amount} = \text{Subtotal} \times \left(\frac{\text{Discount \%}}{100}\right)$$

$$\text{Taxable Base} = \text{Subtotal} - \text{Discount Amount}$$

$$\text{Tax Amount} = \text{Taxable Base} \times \text{Tax Rate}$$

$$\text{Grand Total} = \text{Taxable Base} + \text{Tax Amount} + \text{Shipping Fee}$$

---

## 2. Test Case Financial Verification Proofs

### Scenario 1: Single Line Item Purchase (Combination Pliers)
- **Product**: Combination Pliers (Product ID: `1`)
- **Unit Price ($P$)**: $\$14.15$
- **Quantity ($Q$)**: $3$ units

#### **Derivation & Step-by-Step Working**:
1. **Expected Line Item Total**:
   $$\text{Line Total} = 14.15 \times 3 = 42.45$$
   - **Expected Value**: **`$42.45`**
   - **Actual Value on Buggy UI (`[data-test="line-price"]`)**: **`$00.00`** ❌ *(DEFECT BUG-UI-002)*

2. **Expected Cart Subtotal**:
   $$\text{Subtotal} = \$42.45$$
   - **Expected Value**: **`$42.45`**
   - **Actual Value on Buggy UI (`[data-test="cart-subtotal"]`)**: **`$42.45`** 🟢

3. **Discrepancy Analysis**:
   - The Cart table displays a direct internal mathematical contradiction: the line item column evaluates to `$00.00`, but the table summary footer aggregates the correct product subtotal of `$42.45`.

---

### Scenario 2: Multi-Item Shopping Basket Calculation
- **Item A**: Combination Pliers ($P_A = \$14.15$, $Q_A = 2$)
- **Item B**: Bolt Cutters ($P_B = \$48.41$, $Q_B = 1$)

#### **Derivation & Step-by-Step Working**:
1. **Item A Line Total**:
   $$\text{Line}_A = \$14.15 \times 2 = \$28.30$$

2. **Item B Line Total**:
   $$\text{Line}_B = \$48.41 \times 1 = \$48.41$$

3. **Expected Cart Subtotal**:
   $$\text{Subtotal} = \$28.30 + \$48.41 = \$76.71$$
   - **Expected Value**: **`$76.71`**

---

### Scenario 3: Quantity Boundary Edge Cases (BVA)

| Quantity ($Q$) | Unit Price ($P$) | Formula ($P \times Q$) | Expected Cart Behavior | Buggy UI Actual Behavior | Verdict |
| :---: | :---: | :---: | :--- | :--- | :---: |
| $0$ | $\$14.15$ | $\$0.00$ | Reject input or add $0$ items | Increments cart badge to `1` | 🔴 DEFECT (BUG-UI-003) |
| $1$ | $\$14.15$ | $\$14.15$ | Add $1$ item to cart | Adds $1$ item to cart | 🟢 PASS |
| $11$ (In Stock) | $\$14.15$ | $\$155.65$ | Add $11$ items to cart | Adds $11$ items to cart | 🟢 PASS |
| $12$ ($\text{Stock}+1$) | $\$14.15$ | Out of Stock | Reject / cap at stock limit | Allows input selection | 🔴 DEFECT |

---

## 3. Data-Driven Pinned Assertions in Automated Tests

In our Playwright TypeScript regression suite, financial checks use strict float comparisons rounded to 2 decimal places:

```typescript
const unitPrice = 14.15;
const quantity = 3;
const expectedLineTotal = Number((unitPrice * quantity).toFixed(2)); // 42.45

const actualLineTotalText = await page.locator('[data-test="line-price"]').innerText();
const actualLineTotal = parseFloat(actualLineTotalText.replace(/[^0-9.]/g, ''));

// Strict assertion - will fail cleanly when target displays 0.00
expect(actualLineTotal).toBeCloseTo(expectedLineTotal, 2);
```
