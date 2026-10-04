# 🐛 Defect Report: BUG-API-002

**Title**: REST API `/products` Data Schema & Primitive Types Mismatch (Integer ID & Numeric Flags)  
**Bug ID**: `BUG-API-002`  
**Environment**: Buggy REST API (`https://api-with-bugs.practicesoftwaretesting.com/products`)  
**Reproduction Rate**: 100% (Always)  
**Severity**: `S3 - MEDIUM` (Data type schema contract violation breaks typed SDKs)  
**Priority**: `P3 - MEDIUM` (Technical debt / API contract alignment)

---

## 📝 Description
The REST API endpoint `/products` returns product data objects with primitive field types that violate the API schema contract defined by the clean reference oracle:
1. `id`: Returns integer `1` instead of ULID string `"01M417XEGE9XSQDB52K5CFM51S"`.
2. `is_location_offer`: Returns integer `0` instead of boolean `false`.
3. `is_rental`: Returns integer `0` instead of boolean `false`.
4. `is_eco_friendly`: Returns boolean `true` for Combination Pliers vs `false` on oracle.

---

## 🔄 Steps to Reproduce
1. Issue HTTP `GET` request to `https://api-with-bugs.practicesoftwaretesting.com/products`.
2. Inspect data types of `id`, `is_location_offer`, and `is_rental` in response array.

---

## 🎯 Expected Result (Oracle Reference)
```json
{
  "id": "01M417XEGE9XSQDB52K5CFM51S",
  "name": "Combination Pliers",
  "price": 14.15,
  "is_location_offer": false,
  "is_rental": false,
  "is_eco_friendly": false
}
```

---

## ❌ Actual Result (Buggy Build)
```json
{
  "id": 1,
  "name": "Combination Pliers",
  "price": 14.15,
  "is_location_offer": 0,
  "is_rental": 0,
  "is_eco_friendly": true
}
```

---

## 🧪 Pinned Automated Test
- Spec File: `tests/api/api_regression.spec.ts`
- Test Name: `API-PIN-002 [PIN BUG-API-002]: GET /products schema contract must use ULID string IDs and boolean offer flags`
