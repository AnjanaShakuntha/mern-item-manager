import React, { useEffect, useState } from "react";
import { getItems, createItem, updateItem, deleteItem } from "./api.js";

const emptyForm = { name: "", price: "", category: "" };

export default function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadItems() {
    try {
      setItems(await getItems());
    } catch (error) {
      setMessage(`${error.message}. Check that the backend is running.`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    try {
      const payload = { name: form.name.trim(), price: Number(form.price), category: form.category.trim() };
      if (editingId) {
        await updateItem(editingId, payload);
        setMessage("Item updated!");
      } else {
        await createItem(payload);
        setMessage("Item added!");
      }
      setForm(emptyForm);
      setEditingId(null);
      await loadItems();
    } catch (error) {
      setMessage(error.message);
    }
  }

  function startEdit(item) {
    setForm({ name: item.name, price: String(item.price), category: item.category || "" });
    setEditingId(item._id);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this item?")) return;
    try {
      await deleteItem(id);
      if (editingId === id) {
        setEditingId(null);
        setForm(emptyForm);
      }
      setMessage("Item deleted!");
      await loadItems();
    } catch (error) {
      setMessage(error.message);
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  return (
    <main className="container">
      <header>
        <p className="eyebrow">MERN PRACTICE PROJECT</p>
        <h1>Item Manager</h1>
        <p className="subtitle">Add, view, edit and delete items.</p>
      </header>

      <section className="panel">
        <h2>{editingId ? "Edit item" : "Add a new item"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Item name
            <input name="name" value={form.name} onChange={handleChange}
              placeholder="e.g. Keyboard" required />
          </label>
          <label>
            Price
            <input name="price" type="number" min="0" step="0.01"
              value={form.price} onChange={handleChange}
              placeholder="e.g. 2500" required />
          </label>
          <label>
            Category
            <input name="category" value={form.category} onChange={handleChange}
              placeholder="e.g. Electronics" required />
          </label>
          <div className="actions">
            <button type="submit">{editingId ? "Save changes" : "Add item"}</button>
            {editingId && <button type="button" className="secondary" onClick={cancelEdit}>Cancel</button>}
          </div>
        </form>
        {message && <p className="message" role="status">{message}</p>}
      </section>

      <section className="panel">
        <div className="list-heading">
          <h2>Items</h2>
          <span className="count">{items.length} total</span>
        </div>
        {loading ? <p>Loading items...</p> : items.length === 0 ? (
          <p className="empty">No items yet. Add your first item above.</p>
        ) : (
          <div className="item-list">
            {items.map((item) => (
              <article className="item" key={item._id}>
                <div>
                  <h3>{item.name}</h3>
                  <p>Price: <strong>{Number(item.price).toLocaleString()}</strong></p>
                  <p>Category: <strong>{item.category}</strong></p>
                </div>
                <div className="item-actions">
                  <button className="secondary" onClick={() => startEdit(item)}>Edit</button>
                  <button className="danger" onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      <footer>Practice the CRUD flow before your lab test.</footer>
    </main>
  );
}
