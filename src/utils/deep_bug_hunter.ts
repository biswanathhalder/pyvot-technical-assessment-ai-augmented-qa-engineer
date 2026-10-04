import axios from 'axios';

const BUGGY_API = 'https://api-with-bugs.practicesoftwaretesting.com';
const CLEAN_API = 'https://api.practicesoftwaretesting.com';

async function runDeepAudit() {
  console.log('🔍 DEEP BUG HUNTING SESSION STARTED...\n');

  // Test 1: Search Endpoint Filtering & Sorting
  console.log('--- 1. Testing Search & Sorting ---');
  const buggySearch = await axios.get(`${BUGGY_API}/products/search?q=Hammer&sort=price,desc`).then(r => r.data).catch(e => e.response?.data);
  const cleanSearch = await axios.get(`${CLEAN_API}/products/search?q=Hammer&sort=price,desc`).then(r => r.data).catch(e => e.response?.data);

  console.log('Buggy Search count:', buggySearch?.data?.length || buggySearch?.length);
  console.log('Clean Search count:', cleanSearch?.data?.length || cleanSearch?.length);

  // Test 2: Category Tree Endpoint
  console.log('\n--- 2. Testing Category Endpoint ---');
  const buggyCat = await axios.get(`${BUGGY_API}/categories`).then(r => r.data).catch(e => e.response?.data);
  const cleanCat = await axios.get(`${CLEAN_API}/categories`).then(r => r.data).catch(e => e.response?.data);
  console.log('Buggy Categories:', JSON.stringify(buggyCat).slice(0, 300));
  console.log('Clean Categories:', JSON.stringify(cleanCat).slice(0, 300));

  // Test 3: Carts Creation & Item Math
  console.log('\n--- 3. Testing Cart Creation & Financial Calculations ---');
  try {
    const buggyCartRes = await axios.post(`${BUGGY_API}/carts`, {});
    const cartId = buggyCartRes.data.id;
    console.log(`Created Buggy Cart ID: ${cartId}`);

    // Add Product ID 1 (Combination Pliers @ $14.15) with qty 3
    await axios.post(`${BUGGY_API}/carts/${cartId}`, {
      product_id: 1,
      quantity: 3
    });

    const getCartRes = await axios.get(`${BUGGY_API}/carts/${cartId}`);
    console.log('[BUGGY CART RESPONSE]:', JSON.stringify(getCartRes.data, null, 2));

    // Calculate expected math: 14.15 * 3 = 42.45
    // Let's check what the API returned!
  } catch (err: any) {
    console.error('Cart API error:', err.response?.data || err.message);
  }

  // Test 4: Checkout & Order Creation Math
  console.log('\n--- 4. Testing User Registration & Login ---');
  try {
    const testEmail = `testuser_${Date.now()}@example.com`;
    const regPayload = {
      first_name: 'Jane',
      last_name: 'Doe',
      address: '123 Main St',
      city: 'Metropolis',
      state: 'NY',
      country: 'USA',
      postcode: '10001',
      phone: '5551234567',
      dob: '1990-01-01',
      email: testEmail,
      password: 'SuperPassword123!'
    };

    const buggyReg = await axios.post(`${BUGGY_API}/users/register`, regPayload);
    console.log('[BUGGY REGISTRATION]: Status', buggyReg.status, buggyReg.data);

    // Login
    const buggyLogin = await axios.post(`${BUGGY_API}/users/login`, {
      email: testEmail,
      password: 'SuperPassword123!'
    });
    console.log('[BUGGY LOGIN]: Status', buggyLogin.status, 'Token acquired:', !!buggyLogin.data.access_token);

  } catch (err: any) {
    console.error('Auth API error:', err.response?.data || err.message);
  }
}

runDeepAudit();
