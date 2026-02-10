import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:5000';

// Helper: Create a test PDF file with content
async function createTestPDF() {
  const testDir = path.join(process.cwd(), 'src', 'uploads');
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }
  
  // Create a simple text file that simulates PDF content
  const testFile = path.join(testDir, 'test-document.txt');
  const content = `
    ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING
    
    Artificial Intelligence (AI) is the simulation of human intelligence processes by computer systems.
    These processes include learning, reasoning, and self-correction.
    
    Machine Learning is a subset of AI that enables systems to learn from data and improve performance
    without being explicitly programmed. It uses algorithms to discover patterns in data.
    
    Deep Learning uses neural networks with multiple layers to process data and extract features.
    Large Language Models like GPT, Gemini, and others can understand and generate human language.
    
    Natural Language Processing (NLP) is a field of AI focused on human-computer interaction through language.
    It enables machines to understand, interpret, and generate meaningful text and speech.
    
    These technologies power modern applications including:
    - Virtual assistants (Alexa, Siri, Google Assistant)
    - Recommendation systems (Netflix, YouTube)
    - Autonomous vehicles
    - Medical diagnosis tools
    - Language translation services
  `;
  
  fs.writeFileSync(testFile, content);
  return testFile;
}

async function runTests() {
  console.log('🧪 Starting E2E endpoint tests...\n');
  
  try {
    // Step 1: Register/Login
    console.log('Step 1: Register/Login');
    const email = `etest${Date.now()}@example.com`;
    const registerRes = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'E2ETest', email, password: 'Test@123' })
    });
    
    if (!registerRes.ok) {
      throw new Error(`Register failed: ${registerRes.status}`);
    }
    
    const registerData = await registerRes.json();
    const token = registerData.token;
    console.log(`✓ Registered & got token: ${token.slice(0, 20)}...\n`);
    
    // Step 2: Upload Document
    console.log('Step 2: Upload Document');
    const docPath = await createTestPDF();
    const form = new FormData();
    form.append('file', fs.createReadStream(docPath));
    form.append('title', 'AI & ML Fundamentals');
    form.append('description', 'Test document about AI and Machine Learning');
    
    const uploadRes = await fetch(`${BASE_URL}/api/documents/upload`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, ...form.getHeaders() },
      body: form
    });
    
    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      throw new Error(`Upload failed: ${uploadRes.status} - ${errText}`);
    }
    
    const uploadData = await uploadRes.json();
    const documentId = uploadData.document?.id;
    console.log(`✓ Document uploaded: ${documentId}`);
    console.log(`  Chunks created: ${uploadData.document?.chunksCount}\n`);
    
    // Step 3: Wait for embeddings (small delay)
    console.log('Step 3: Waiting for embeddings to generate...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(`✓ Embeddings should be ready\n`);
    
    // Step 4: Test Search Query
    console.log('Step 4: Test Search Query');
    const searchRes = await fetch(`${BASE_URL}/api/search/query`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ query: 'What is machine learning?', limit: 3 })
    });
    
    if (!searchRes.ok) {
      const errText = await searchRes.text();
      throw new Error(`Search failed: ${searchRes.status} - ${errText}`);
    }
    
    const searchData = await searchRes.json();
    console.log(`✓ Search returned ${searchData.chunks?.length || 0} chunks`);
    if (searchData.chunks?.[0]) {
      console.log(`  First result: ${searchData.chunks[0].content?.slice(0, 60)}...\n`);
    }
    
    // Step 5: Test Ask Endpoint (RAG)
    console.log('Step 5: Test Ask Endpoint (RAG)');
    const askRes = await fetch(`${BASE_URL}/api/search/ask`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ question: 'What is machine learning and how does it work?' })
    });
    
    if (!askRes.ok) {
      const errText = await askRes.text();
      throw new Error(`Ask failed: ${askRes.status} - ${errText}`);
    }
    
    const askData = await askRes.json();
    console.log(`✓ Ask returned answer (RAG)`);
    console.log(`  Answer: ${(askData.answer || 'N/A').slice(0, 100)}...\n`);
    
    // Step 6: Test Chat Session
    console.log('Step 6: Test Chat Session');
    const sessionRes = await fetch(`${BASE_URL}/api/chat/sessions`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title: 'AI Discussion' })
    });
    
    if (!sessionRes.ok) {
      throw new Error(`Create session failed: ${sessionRes.status}`);
    }
    
    const sessionData = await sessionRes.json();
    const sessionId = sessionData.session?.id;
    console.log(`✓ Chat session created: ${sessionId}\n`);
    
    // Step 7: Send Chat Message
    console.log('Step 7: Send Chat Message');
    const messageRes = await fetch(`${BASE_URL}/api/chat/send`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ sessionId, message: 'Tell me about deep learning' })
    });
    
    if (!messageRes.ok) {
      const errText = await messageRes.text();
      throw new Error(`Send message failed: ${messageRes.status} - ${errText}`);
    }
    
    const messageData = await messageRes.json();
    console.log(`✓ Message sent and replied`);
    console.log(`  Reply: ${(messageData.assistantMessage || 'N/A').slice(0, 100)}...\n`);
    
    // Step 8: Get Chat History
    console.log('Step 8: Get Chat History');
    const historyRes = await fetch(`${BASE_URL}/api/chat/history/${sessionId}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!historyRes.ok) {
      throw new Error(`Get history failed: ${historyRes.status}`);
    }
    
    const historyData = await historyRes.json();
    console.log(`✓ Chat history retrieved: ${historyData.messages?.length || 0} messages\n`);
    
    console.log('✅ ALL ENDPOINTS WORKING!\n');
    console.log('Summary:');
    console.log('  ✓ Auth (register/login)');
    console.log('  ✓ Document Upload');
    console.log('  ✓ Search Query');
    console.log('  ✓ Ask (RAG)');
    console.log('  ✓ Chat Session Creation');
    console.log('  ✓ Chat Messages');
    console.log('  ✓ Chat History');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

runTests();
