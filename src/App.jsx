
import { useState, useEffect } from 'react';
import groceryImage from './grocery.jpg';
import List from './List';
import './App.css';

const starterItems = [
  { id: 1, name: 'Milk', category: 'Dairy', completed: false },
  { id: 2, name: 'Avocado', category: 'Produce', completed: false },
  { id: 3, name: 'Bread', category: 'Bakery', completed: false },
  { id: 4, name: 'Eggs', category: 'Dairy', completed: false },
  { id: 5, name: 'Apples', category: 'Produce', completed: false },
];

function App() {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('grocery-items');
      return saved ? JSON.parse(saved) : starterItems;
    } catch {
      return starterItems;
    }
  });

  const [newItem, setNewItem] = useState('');
  const [category, setCategory] = useState('Produce');

  useEffect(() => {
    localStorage.setItem('grocery-items', JSON.stringify(items));
  }, [items]);

  const addItem = (event) => {
    event.preventDefault();

    const name = newItem.trim();
    if (!name) return;

    setItems((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        name,
        category,
        completed: false,
      },
    ]);

    setNewItem('');
  };

  const toggleItem = (id) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const completedCount = items.filter((item) => item.completed).length;
  const progress = items.length
    ? Math.round((completedCount / items.length) * 100)
    : 0;

  return (
    <main className="app">
      <header className="site-header">
        <div className="brand">
          <span className="brand-icon">✳</span>
          <span>the grocery edit.</span>
        </div>
        <span className="header-label">YOUR EVERYDAY ESSENTIALS</span>
      </header>

      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">A LITTLE MORE ORGANIZED</span>
          <h1>
            Your grocery list,
            <br />
            <em>beautifully simple.</em>
          </h1>
          <p>
            Less forgetting, more enjoying. Keep everything you need
            in one lovely little place.
          </p>
          <a className="hero-link" href="#shopping-list">
            Make your list <span aria-hidden="true">↗</span>
          </a>
        </div>
        <img src={groceryImage} alt="Fresh vegetables at the market" />
      </section>

      <section className="workspace" id="shopping-list">
        <div className="section-heading">
          <div>
            <span className="eyebrow">PLAN YOUR NEXT SHOP</span>
            <h2>My shopping list<span className="accent-dot">.</span></h2>
          </div>
          <span className="item-total">{items.length} items</span>
        </div>

        <div className="workspace-grid">
          <div className="list-panel">
            <div className="progress-heading">
              <div>
                <span className="small-label">YOUR PROGRESS</span>
                <h3>You're getting there!</h3>
              </div>
              <strong>{progress}%</strong>
            </div>

            <div
              className="progress-track"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label="Shopping progress"
            >
              <div style={{ width: `${progress}%` }} />
            </div>

            <p className="progress-caption">
              {completedCount} of {items.length} items checked off
            </p>

            <List
              items={items}
              onToggle={toggleItem}
              onDelete={deleteItem}
            />
          </div>

          <aside className="add-panel">
            <span className="eyebrow">SOMETHING MISSING?</span>
            <h3>Add to your list</h3>
            <p>Keep your essentials all in one place.</p>

            <form onSubmit={addItem}>
              <label htmlFor="item-name">ITEM NAME</label>
              <input
                id="item-name"
                type="text"
                placeholder="e.g. Fresh strawberries"
                value={newItem}
                onChange={(event) => setNewItem(event.target.value)}
                maxLength={80}
                required
              />

              <label htmlFor="category">CATEGORY</label>
              <select
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option>Produce</option>
                <option>Dairy</option>
                <option>Bakery</option>
                <option>Meat & Seafood</option>
                <option>Pantry</option>
                <option>Frozen</option>
                <option>Other</option>
              </select>

              <button type="submit" className="add-button">
                + Add item
              </button>
            </form>

            <div className="aside-note">
              <span>✳</span>
              <p>Good food starts with a good list.</p>
            </div>
          </aside>
        </div>
      </section>

      <footer className="site-footer">
        <span>the grocery edit.</span>
        <span>Made with care, for everyday living.</span>
      </footer>
    </main>
  );
}

export default App;

