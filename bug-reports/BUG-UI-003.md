# 🐛 Defect Report: BUG-UI-003

**Title**: Quantity Input Accepts $0$ and Increments Cart Item Badge Count to `1`  
**Bug ID**: `BUG-UI-003`  
**Environment**: Buggy Web UI (`https://with-bugs.practicesoftwaretesting.com/#/product/1`)  
**Reproduction Rate**: 100% (Always)  
**Severity**: `S2 - MAJOR` (Allows invalid zero-quantity items into cart state)  
**Priority**: `P2 - HIGH` (Negative BVA boundary check failure)

---

## 📝 Description
On the Product Detail Page, entering `0` into the quantity input field and clicking "Add to Cart" is accepted by the application. The navigation header cart badge increments from empty/0 to `1`. On the oracle build, setting quantity to $0$ is rejected with a validation message or does not increment cart state.

---

## 🔄 Steps to Reproduce
1. Navigate to Product Detail page `https://with-bugs.practicesoftwaretesting.com/#/product/1`.
2. Clear quantity input field `[data-test="quantity"]` and type `0`.
3. Click `Add to cart` button `[data-test="add-to-cart"]`.
4. Check cart quantity badge in top navigation header `[data-test="cart-quantity"]`.

---

## 🎯 Expected Result (Oracle Reference)
- Cart quantity badge remains unchanged ($0$).
- Toast or inline validation message appears indicating quantity must be $\ge 1$.

---

## ❌ Actual Result (Buggy Build)
- Cart quantity badge updates to `"1"`.
- Zero-quantity item is added into local storage cart state.

---

## 🧪 Pinned Automated Test
- Spec File: `tests/ui/defects_pinned.spec.ts`
- Test Name: `TC-BVA-001 [PIN BUG-UI-003]: Quantity 0 must not increment cart item count`
