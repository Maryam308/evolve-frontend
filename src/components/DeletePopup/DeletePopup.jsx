import "./DeletePopup.css";

function DeletePopup({ onConfirm, onCancel }) {
  return (
    <div className="delete-popup-overlay">
      <div className="delete-popup-container">
        <h2 className="delete-popup-title">Delete Entry?</h2>
        <p className="delete-popup-message">
          Are you sure you want to delete this entry? This action cannot be
          undone.
        </p>
        <div className="delete-popup-actions">
          <button onClick={onCancel} className="delete-popup-cancel-btn">
            No
          </button>
          <button onClick={onConfirm} className="delete-popup-confirm-btn">
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePopup;
