// apiService.js
export async function fetchWorldTree() {
  const response = await fetch('/api/v1/world-tree.search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // Add any required body parameters
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch world tree');
  }
  
  return response.json();
}