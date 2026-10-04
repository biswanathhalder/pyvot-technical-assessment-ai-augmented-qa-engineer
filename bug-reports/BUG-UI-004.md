# 🐛 Defect Report: BUG-UI-004

**Title**: Top Navigation Header Copy Typo: Link Labeled `"Contakt"` Instead of `"Contact"`  
**Bug ID**: `BUG-UI-004`  
**Environment**: Buggy Web UI (Global Top Navigation Bar, `data-test="nav-contact"`)  
**Reproduction Rate**: 100% (Always)  
**Severity**: `S4 - LOW` (Cosmetic text typo)  
**Priority**: `P2 - HIGH` (High customer visibility on primary navigation bar)

---

## 📝 Description
The main top navigation bar contains a typographical error in the label for the Contact page link. The element `a[data-test="nav-contact"]` displays text `"Contakt"` with a `'k'` instead of `"Contact"`.

---

## 🔄 Steps to Reproduce
1. Open home page `https://with-bugs.practicesoftwaretesting.com/#/`.
2. Inspect the top header navigation menu links (between Categories and Sign In).
3. Read text of link `[data-test="nav-contact"]`.

---

## 🎯 Expected Result (Oracle Reference)
- Text label: `"Contact"`

---

## ❌ Actual Result (Buggy Build)
- Text label: `"Contakt"`

---

## 🧪 Pinned Automated Test
- Spec File: `tests/ui/defects_pinned.spec.ts`
- Test Name: `TC-UI-001 [PIN BUG-UI-004]: Top navigation link label must be spelled "Contact"`
