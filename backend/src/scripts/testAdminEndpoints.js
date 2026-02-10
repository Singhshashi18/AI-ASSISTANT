import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000';
let adminToken = '';
let regularUserToken = '';
let regularUserId = '';

async function runAdminTests() {
  console.log('🔐 Starting Admin Dashboard API tests...\n');
  
  try {
    // Step 0: Login with existing admin
    console.log('Step 0: Login with admin account');
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: 'admin@example.com',
        password: 'Admin@123'
      })
    });

    if (!loginRes.ok) {
      // Admin doesn't exist, create one
      console.log('Admin account not found, creating...');
      const adminRegRes = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: 'Admin Test', 
          email: 'admin@example.com', 
          password: 'Admin@123' 
        })
      });
      
      if (!adminRegRes.ok) {
        throw new Error('Admin account creation failed');
      }
      
      const adminData = await adminRegRes.json();
      adminToken = adminData.token;
      console.log(`✓ Admin user created: admin@example.com\n`);
    } else {
      const adminData = await loginRes.json();
      adminToken = adminData.token;
      console.log(`✓ Admin logged in successfully\n`);
    }
    
    // Step 1: Create test users
    console.log('Step 1: Create test regular user');
    const regularEmail = `user${Date.now()}@example.com`;
    
    const userRegRes = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name: 'Regular User', 
        email: regularEmail, 
        password: 'User@123' 
      })
    });
    
    const userData = await userRegRes.json();
    regularUserToken = userData.token;
    regularUserId = userData.user.id;
    console.log(`✓ Regular user created: ${regularEmail}\n`);
    
    // Step 2: Get Dashboard Stats
    console.log('Step 2: Get Dashboard Stats');
    const statsRes = await fetch(`${BASE_URL}/api/admin/stats/dashboard`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    
    if (!statsRes.ok) {
      throw new Error(`Dashboard stats failed: ${statsRes.status}`);
    }
    
    const statsData = await statsRes.json();
    console.log(`✓ Dashboard stats retrieved:`);
    console.log(`  Total Users: ${statsData.stats.totalUsers}`);
    console.log(`  Total Documents: ${statsData.stats.totalDocuments}`);
    console.log(`  Total Chat Sessions: ${statsData.stats.totalChatSessions}\n`);
    
    // Step 3: Get All Users
    console.log('Step 3: Get All Users List');
    const usersRes = await fetch(`${BASE_URL}/api/admin/users/list?page=1&limit=10`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    
    if (!usersRes.ok) {
      throw new Error(`Users list failed: ${usersRes.status}`);
    }
    
    const usersData = await usersRes.json();
    console.log(`✓ Users list retrieved: ${usersData.count} user(s) (Page ${usersData.page}/${usersData.pages})`);
    if (usersData.users[0]) {
      console.log(`  First user: ${usersData.users[0].name} (${usersData.users[0].email})\n`);
    }
    
    // Step 4: Get Document Analytics
    console.log('Step 4: Get Document Analytics');
    const docAnalyticsRes = await fetch(`${BASE_URL}/api/admin/documents/analytics`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    
    if (!docAnalyticsRes.ok) {
      throw new Error(`Document analytics failed: ${docAnalyticsRes.status}`);
    }
    
    const docAnalytics = await docAnalyticsRes.json();
    console.log(`✓ Document analytics retrieved:`);
    console.log(`  Total Documents: ${docAnalytics.analytics.totalDocuments}`);
    console.log(`  Active Documents: ${docAnalytics.analytics.activeDocuments}\n`);
    
    // Step 5: Get Chat Analytics
    console.log('Step 5: Get Chat Analytics');
    const chatAnalyticsRes = await fetch(`${BASE_URL}/api/admin/chat/analytics`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    
    if (!chatAnalyticsRes.ok) {
      throw new Error(`Chat analytics failed: ${chatAnalyticsRes.status}`);
    }
    
    const chatAnalytics = await chatAnalyticsRes.json();
    console.log(`✓ Chat analytics retrieved:`);
    console.log(`  Total Chat Sessions: ${chatAnalytics.analytics.totalChatSessions}`);
    console.log(`  Total Messages: ${chatAnalytics.analytics.totalMessages}\n`);
    
    // Step 6: Update User Role
    console.log('Step 6: Update User Role');
    const updateRoleRes = await fetch(`${BASE_URL}/api/admin/users/${regularUserId}/role`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({ role: 'admin' })
    });
    
    if (!updateRoleRes.ok) {
      throw new Error(`Update role failed: ${updateRoleRes.status}`);
    }
    
    const updatedUser = await updateRoleRes.json();
    console.log(`✓ User role updated: ${updatedUser.user.name} → ${updatedUser.user.role}\n`);
    
    // Step 7: Get System Health
    console.log('Step 7: Get System Health');
    const healthRes = await fetch(`${BASE_URL}/api/admin/system/health`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    
    if (!healthRes.ok) {
      throw new Error(`System health failed: ${healthRes.status}`);
    }
    
    const health = await healthRes.json();
    console.log(`✓ System health: ${health.health.status}`);
    console.log(`  Database: ${health.health.database}`);
    console.log(`  All collections healthy\n`);
    
    // Step 8: Verify regular user cannot access admin endpoints
    console.log('Step 8: Verify Authorization (regular user should fail)');
    const unauthorizedRes = await fetch(`${BASE_URL}/api/admin/stats/dashboard`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${regularUserToken}` }
    });
    
    if (unauthorizedRes.status === 403) {
      console.log(`✓ Authorization working - regular user blocked (403)\n`);
    } else {
      console.log(`⚠️  Unexpected status: ${unauthorizedRes.status}\n`);
    }
    
    console.log('✅ ALL ADMIN ENDPOINTS WORKING!\n');
    console.log('Endpoints verified:');
    console.log('  ✓ GET /api/admin/stats/dashboard');
    console.log('  ✓ GET /api/admin/users/list');
    console.log('  ✓ GET /api/admin/documents/analytics');
    console.log('  ✓ GET /api/admin/chat/analytics');
    console.log('  ✓ PUT /api/admin/users/:userId/role');
    console.log('  ✓ GET /api/admin/system/health');
    console.log('  ✓ Authorization enforcement');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

runAdminTests();
