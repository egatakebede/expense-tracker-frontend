const API_URL = "http://localhost:9080"; // Base URL for backend

// POST request
async function post(endpoint, data, token) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { "Authorization": `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

// GET request
async function get(endpoint, token) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      ...(token && { "Authorization": `Bearer ${token}` }),
    },
  });
  return res.json();
}

// PUT request
async function put(endpoint, data, token) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token && { "Authorization": `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

// DELETE request
async function del(endpoint, token) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "DELETE",
    headers: {
      ...(token && { "Authorization": `Bearer ${token}` }),
    },
  });
  return res.json();
}