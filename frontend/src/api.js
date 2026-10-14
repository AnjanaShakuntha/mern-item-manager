const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function getItems() {
  const response = await fetch(`${API_URL}/items`);
  if (!response.ok) throw new Error("Could not load items");
  return response.json();
}

export async function createItem(item) {
  const response = await fetch(`${API_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Could not create item");
  return data;
}

export async function updateItem(id, item) {
  const response = await fetch(`${API_URL}/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Could not update item");
  return data;
}

export async function deleteItem(id) {
  const response = await fetch(`${API_URL}/items/${id}`, { method: "DELETE" });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Could not delete item");
  return data;
}
