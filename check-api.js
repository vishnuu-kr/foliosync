async function check() {
  console.log("Checking API/Dashboard...");
  try {
    const response = await fetch('http://localhost:3000/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        github: 'torvalds',
        twitter: 'torvalds_test' 
      })
    });
    const data = await response.json();
    console.log("Status:", response.status);
    console.log("Response Body:", JSON.stringify(data, null, 2));
    
    if (response.ok) {
       console.log("✅ Success! Portfolio generated for:", data.user?.username);
    } else {
       console.log("❌ Failed:", data.error);
    }
  } catch (e) {
    console.log("❌ Connection failed. Check if server is on port 3000.");
    console.error(e);
  }
}

check();
