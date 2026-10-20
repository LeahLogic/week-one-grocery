
function List({ items, onToggle, onDelete }) {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">✳</span>
        <h3>Your list is looking a little empty.</h3>
        <p>Add something delicious to get started!</p>
      </div>
    );
  }

  return (
    <div className="grocery-list">
      <div className="list-heading">
        <span>YOUR ITEMS</span>
        <span>{items.length} TOTAL</span>
      </div>

      {items.map((item) => (
        <div
          className={`grocery-item ${item.completed ? 'completed' : ''}`}
          key={item.id}
        >
          <label className="item-details">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => onToggle(item.id)}
            />

            <span className="custom-checkbox" aria-hidden="true">
              {item.completed ? '✓' : ''}
            </span>

            <span className="item-text">
              <span className="item-name">{item.name}</span>
              <span className="item-category">{item.category}</span>
            </span>
          </label>

          <button
            type="button"
            className="delete-button"
            onClick={() => onDelete(item.id)}
            aria-label={`Remove ${item.name}`}
            title="Remove item"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export default List;
