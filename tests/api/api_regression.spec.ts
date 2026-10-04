import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const API_URL = process.env.API_URL || 'https://api-with-bugs.practicesoftwaretesting.com';

test.describe('📡 REST API Regression & Defect Suite', () => {

  test('API-PASS-001: GET /products returns HTTP 200 with product catalog array', async ({ request }) => {
    const response = await request.get(`${API_URL}/products`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    const items = body.data || body;
    expect(items.length).toBeGreaterThan(0);
  });

  test('API-PASS-002: POST /users/register creates user and POST /users/login returns JWT access_token', async ({ request }) => {
    const uniqueEmail = `api_test_${Date.now()}@example.com`;
    
    // Register
    const regRes = await request.post(`${API_URL}/users/register`, {
      data: {
        first_name: 'Api',
        last_name: 'Tester',
        address: '100 API St',
        city: 'Tech',
        state: 'CA',
        country: 'USA',
        postcode: '90001',
        phone: '1234567890',
        dob: '1990-01-01',
        email: uniqueEmail,
        password: 'Password123!'
      }
    });
    expect(regRes.status()).toBe(201);

    // Login
    const loginRes = await request.post(`${API_URL}/users/login`, {
      data: {
        email: uniqueEmail,
        password: 'Password123!'
      }
    });
    expect(loginRes.status()).toBe(200);
    const loginData = await loginRes.json();
    expect(typeof loginData.access_token).toBe('string');
    expect(loginData.access_token.length).toBeGreaterThan(10);
  });

  test('API-PIN-001 [PIN BUG-API-001]: POST /carts endpoint must return 201 Created with new cart ID', async ({ request }) => {
    const response = await request.post(`${API_URL}/carts`, {
      data: {}
    });

    // Strict Assertion: Oracle returns 201 Created with cart ID. Buggy API returns 404 Not Found
    expect(response.status()).toBe(201);
    
    const body = await response.json();
    expect(typeof body.id).toBe('string');
  });

  test('API-PIN-002 [PIN BUG-API-002]: GET /products schema contract must use ULID string IDs and boolean offer flags', async ({ request }) => {
    const response = await request.get(`${API_URL}/products`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    const firstProduct = (body.data || body)[0];

    // Strict Assertion: Oracle uses ULID strings (e.g. "01M417..."). Buggy API returns integer 1
    expect(typeof firstProduct.id).toBe('string');
    expect(typeof firstProduct.is_location_offer).toBe('boolean');
  });

});
