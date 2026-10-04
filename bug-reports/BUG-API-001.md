# 🐛 Defect Report: BUG-API-001

**Title**: REST API `POST /carts` Endpoint Returns HTTP 404 Not Found Instead of Creating Cart Session  
**Bug ID**: `BUG-API-001`  
**Environment**: Buggy REST API (`https://api-with-bugs.practicesoftwaretesting.com`)  
**Reproduction Rate**: 100% (Always)  
**Severity**: `S1 - CRITICAL` (Complete feature failure for API-driven cart sessions)  
**Priority**: `P1 - HIGH` (Blocks API checkout integrations)

---

## 📝 Description
When issuing an HTTP `POST` request to the `/carts` endpoint to initialize a new shopping cart session, the API returns `HTTP 404 Not Found` with response payload `{ "message": "Resource not found" }`. On the clean reference oracle, the endpoint returns `HTTP 201 Created` with a new cart ULID.

---

## 🔄 Steps to Reproduce
1. Send an HTTP `POST` request to `https://api-with-bugs.practicesoftwaretesting.com/carts` with header `Content-Type: application/json` and empty JSON body `{}`.
2. Inspect response HTTP status code and response payload.

---

## 🎯 Expected Result (Oracle Reference)
- **Status Code**: `HTTP 201 Created`
- **Response Payload**:
  ```json
  {
    "id": "01m41a241mkq93020743yyzw7a"
  }
  ```

---

## ❌ Actual Result (Buggy Build)
- **Status Code**: `HTTP 404 Not Found`
- **Response Payload**:
  ```json
  {
    "message": "Resource not found"
  }
  ```

---

## 📸 Evidence & Network Log

```http
POST /carts HTTP/1.1
Host: api-with-bugs.practicesoftwaretesting.com
Content-Type: application/json

HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "message": "Resource not found"
}
```

---

## 🧪 Pinned Automated Test
- Spec File: `tests/api/api_regression.spec.ts`
- Test Name: `API-PIN-001 [PIN BUG-API-001]: POST /carts endpoint must return 201 Created with new cart ID`
