# 🧪 Formal Test-Case Design Document (ISTQB Compliant)

**Project**: Toolshop QA Take-Home Assessment  
**Coverage**: 10 Designed High-Value Test Cases (UI + API)  
**Techniques Applied**: Equivalence Partitioning (EP), Boundary Value Analysis (BVA), Decision Table (DT), State Transition (ST).

---

## Summary of Designed Test Cases

| Test Case ID | Feature Area | Primary Technique | Target Type | Expected Status |
| :--- | :--- | :--- | :---: | :---: |
| `TC-REG-001` | User Registration Form Constraints | Equivalence Partitioning | UI | 🟢 PASS |
| `TC-REG-002` | User Authentication Token Flow | State Transition | API + UI | 🟢 PASS |
| `TC-CAT-001` | Product Catalog Search Filtering | Equivalence Partitioning | UI + API | 🟢 PASS |
| `TC-BVA-001` | Product Quantity Input Boundary ($0$) | Boundary Value Analysis | UI | 🔴 FAIL (Pins Defect BUG-UI-003) |
| `TC-BVA-002` | Quantity Boundary ($1, \text{Max}$) | Boundary Value Analysis | UI | 🟢 PASS |
| `TC-FIN-001` | Cart Line Item Subtotal Math | Decision Table / Financial | UI | 🔴 FAIL (Pins Defect BUG-UI-002) |
| `TC-FIN-002` | Cart Grand Total & Tax Math | Financial Math Derivation | UI | 🟢 PASS |
| `TC-API-001` | Cart Creation REST Endpoint | State Transition | API | 🔴 FAIL (Pins Defect BUG-API-001) |
| `TC-API-002` | Product Schema Contract & Types | Data Schema Validation | API | 🔴 FAIL (Pins Defect BUG-API-002) |
| `TC-UI-001`  | Navigation Link Labels & Copy | Static Specification Check | UI | 🔴 FAIL (Pins Defect BUG-UI-004) |

---

## Detailed Test Case Specifications

### 1. `TC-REG-001`: User Registration Field Validations
- **Technique**: Equivalence Partitioning (EP)
- **Objective**: Verify registration form rejects invalid email format and under-length password ($<10$ chars).
- **Preconditions**: User is on registration page (`/#/auth/register`).
- **Test Steps**:
  1. Fill First Name: `"John"`, Last Name: `"Doe"`.
  2. Fill Email: `"invalid-email-string"`.
  3. Fill Password: `"Pass12"` ($6$ characters).
  4. Click `[data-test="register-submit"]`.
- **Expected Result**: System prevents submission and displays field validation messages: `"E-mail format is invalid."` and `"Password must be minimal 10 characters long."`.
- **Rationale**: EP partitions email into `[Valid Format, Invalid Format]` and password into `[Len < 10, Len >= 10]`.

---

### 2. `TC-REG-002`: User Registration & Authentication Token State
- **Technique**: State Transition (ST)
- **Objective**: Verify new user state moves cleanly from Unauthenticated $\rightarrow$ Registered $\rightarrow$ Authenticated (JWT token returned).
- **Preconditions**: Clean state, no active session.
- **Test Steps**:
  1. Send `POST /users/register` with valid unique user payload.
  2. Send `POST /users/login` with created credentials.
- **Expected Result**: Registration returns `201 Created` with created user ID. Login returns `200 OK` with non-empty `access_token` string.
- **Rationale**: Validates valid state transition cycle across backend identity engine.

---

### 3. `TC-CAT-001`: Catalog Product Search by Keyword
- **Technique**: Equivalence Partitioning (EP)
- **Objective**: Verify search filter returns matching items for valid keyword query `"Pliers"`.
- **Preconditions**: Product catalog loaded.
- **Test Steps**:
  1. Enter `"Pliers"` into search input `[data-test="search-query"]`.
  2. Click search submit `[data-test="search-submit"]`.
- **Expected Result**: Product grid updates to display only items containing `"Pliers"` in title/description (4 items returned).

---

### 4. `TC-BVA-001`: Quantity Input Boundary Value ($0$) `[PINNING BUG-UI-003]`
- **Technique**: Boundary Value Analysis (BVA)
- **Objective**: Validate quantity input handles boundary value $0$ correctly.
- **Preconditions**: User is on Product Detail Page (`/#/product/1`).
- **Test Steps**:
  1. Enter `0` into quantity input `[data-test="quantity"]`.
  2. Click `[data-test="add-to-cart"]`.
- **Expected Result**: System MUST reject addition with validation error or keep cart count at $0$.
- **Actual Result (Target Build)**: Cart badge increments to `1` and adds item with 0 quantity. (Fails as expected, pinning bug).

---

### 5. `TC-BVA-002`: Quantity Input Valid Boundary ($1$)
- **Technique**: Boundary Value Analysis (BVA)
- **Objective**: Validate quantity input accepts valid minimum boundary value $1$.
- **Preconditions**: User is on Product Detail Page (`/#/product/1`).
- **Test Steps**:
  1. Enter `1` into quantity input `[data-test="quantity"]`.
  2. Click `[data-test="add-to-cart"]`.
- **Expected Result**: Cart badge updates to `1` and toast confirmation appears.

---

### 6. `TC-FIN-001`: Cart Line Item Price Derivation `[PINNING BUG-UI-002]`
- **Technique**: Decision Table / Financial Math Calculation
- **Objective**: Verify line item total is calculated as $Unit Price \times Quantity$.
- **Preconditions**: Product 1 ($14.15) added with Quantity $3$.
- **Test Steps**:
  1. Navigate to Cart Checkout (`/#/checkout`).
  2. Read Line Item Total cell `[data-test="line-price"]`.
- **Expected Result**: Line item total cell MUST equal `$42.45` ($14.15 \times 3$).
- **Actual Result (Target Build)**: Line item total cell displays `$00.00`. (Fails as expected, pinning bug).

---

### 7. `TC-FIN-002`: Cart Overall Subtotal Math
- **Technique**: Financial Math Verification
- **Objective**: Verify overall cart subtotal accurately aggregates item values.
- **Preconditions**: Product 1 ($14.15) added with Quantity $3$.
- **Test Steps**:
  1. Navigate to Cart Checkout (`/#/checkout`).
  2. Read Cart Total row `[data-test="cart-subtotal"]` or table summary.
- **Expected Result**: Cart Total equals `$42.45`.

---

### 8. `TC-API-001`: REST API Cart Session Creation (`POST /carts`) `[PINNING BUG-API-001]`
- **Technique**: State Transition (ST)
- **Objective**: Verify REST API endpoint `POST /carts` initializes a valid session cart object.
- **Preconditions**: Clean API endpoint state.
- **Test Steps**:
  1. Issue HTTP `POST` to `https://api-with-bugs.practicesoftwaretesting.com/carts`.
- **Expected Result**: HTTP `201 Created` with JSON payload containing generated cart ULID `id`.
- **Actual Result (Target Build)**: HTTP `404 Not Found` with `{ message: 'Resource not found' }`. (Fails as expected, pinning bug).

---

### 9. `TC-API-002`: REST API Product Object Schema Contract `[PINNING BUG-API-002]`
- **Technique**: Data Schema Validation
- **Objective**: Verify `/products` API contract matches oracle standard data types.
- **Preconditions**: GET `/products`.
- **Test Steps**:
  1. Issue HTTP `GET` to `/products`.
  2. Validate `id` type (string ULID) and `is_location_offer` type (boolean).
- **Expected Result**: `id` is a string (e.g. `"01M417XE..."`), `is_location_offer` is boolean `false`.
- **Actual Result (Target Build)**: `id` is integer `1`, `is_location_offer` is integer `0`. (Fails as expected, pinning bug).

---

### 10. `TC-UI-001`: Top Navigation Header Copy Correctness `[PINNING BUG-UI-004]`
- **Technique**: Static Specification Verification
- **Objective**: Verify header navigation labels are spelled correctly according to specification.
- **Preconditions**: Homepage loaded.
- **Test Steps**:
  1. Locate contact link element `[data-test="nav-contact"]`.
  2. Inspect text content.
- **Expected Result**: Element text MUST equal `"Contact"`.
- **Actual Result (Target Build)**: Element text equals `"Contakt"`. (Fails as expected, pinning bug).
