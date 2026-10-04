import axios from 'axios';

const BUGGY_API = 'https://api-with-bugs.practicesoftwaretesting.com';
const CLEAN_API = 'https://api.practicesoftwaretesting.com';

async function compareEndpoints(endpoint: string) {
  console.log(`\n========================================`);
  console.log(`Probing Endpoint: ${endpoint}`);
  console.log(`========================================`);

  try {
    const [buggyRes, cleanRes] = await Promise.all([
      axios.get(`${BUGGY_API}${endpoint}`).catch(err => err.response || { status: err.code, data: err.message }),
      axios.get(`${CLEAN_API}${endpoint}`).catch(err => err.response || { status: err.code, data: err.message })
    ]);

    console.log(`[BUGGY] Status: ${buggyRes.status}`);
    console.log(`[CLEAN] Status: ${cleanRes.status}`);

    return { buggy: buggyRes.data, clean: cleanRes.data };
  } catch (error) {
    console.error(`Error comparing ${endpoint}:`, error);
  }
}

async function runExploration() {
  console.log('🚀 Starting Exploratory API Comparison...');

  // 1. Products list
  const products = await compareEndpoints('/products');
  if (products?.buggy && products?.clean) {
    console.log('\n--- Comparing First Product Data ---');
    console.log('[BUGGY Product 0]:', JSON.stringify(products.buggy.data?.[0] || products.buggy[0], null, 2));
    console.log('[CLEAN Product 0]:', JSON.stringify(products.clean.data?.[0] || products.clean[0], null, 2));
  }

  // 2. Search endpoint
  await compareEndpoints('/products/search?q=Pliers');
  await compareEndpoints('/products/search?q=Hammer');

  // 3. Brands & Categories
  await compareEndpoints('/brands');
  await compareEndpoints('/categories');

  // 4. Product details by ID
  await compareEndpoints('/products/01J7Y10W3Z6B24N'); // replace with actual product ID after checking products
}

runExploration();
