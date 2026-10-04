# 🐛 Defect Report: BUG-UI-002

**Title**: Cart Page Line Item Total Displays `$00.00` Instead of Calculated Unit Price $\times$ Quantity ($42.45)  
**Bug ID**: `BUG-UI-002`  
**Environment**: Buggy Web UI (`https://with-bugs.practicesoftwaretesting.com/#/checkout`)  
**Reproduction Rate**: 100% (Always)  
**Severity**: `S2 - MAJOR` (Incorrect financial display creates customer distrust and billing confusion)  
**Priority**: `P1 - HIGH` (Core checkout revenue flow)

---

## 📝 Description
In the Cart summary table (`/#/checkout`), when a product with Unit Price `$14.15` is added with Quantity `3`, the Line Item Total column displays `$00.00`. However, the overall Cart Total footer below correctly aggregates the subtotal to `$42.45`. This creates an immediate internal contradiction on the cart UI.

---

## 🔄 Steps to Reproduce
1. Navigate to Product Detail page `https://with-bugs.practicesoftwaretesting.com/#/product/1` (Combination Pliers @ `$14.15`).
2. Set quantity input to `3`.
3. Click `Add to cart`.
4. Click Cart Icon or navigate to `https://with-bugs.practicesoftwaretesting.com/#/checkout`.
5. Observe the product row "Total" column (`[data-test="line-price"]`) vs the Cart Total row below (`[data-test="cart-subtotal"]`).

---

## 🎯 Expected Result (Oracle Reference)
- **Line Item Total Column**: `$42.45` ($14.15 \times 3$)
- **Cart Subtotal Row**: `$42.45`

---

## ❌ Actual Result (Buggy Build)
- **Line Item Total Column**: `$00.00` ❌
- **Cart Subtotal Row**: `$42.45` 🟢

---

## 📸 Evidence (Cart Table Extraction)

```
Item                  Quantity   Price    Total    Total
Combination Pliers    3          $14.15   $00.00
                                 Total    $42.45
```

---

## 🧪 Pinned Automated Test
- Spec File: `tests/ui/defects_pinned.spec.ts`
- Test Name: `TC-FIN-001 [PIN BUG-UI-002]: Cart line item price must equal Unit Price x Quantity ($42.45)`
