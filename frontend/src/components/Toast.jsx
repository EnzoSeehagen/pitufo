import PixelCat from "./PixelCat.jsx";

export default function ToastStack({ toasts, onDismiss }) {
  if (!toasts?.length) return null;

  return (
    <div className="toast-stack" aria-live="polite">
      {toasts.map((toast) => (
        <button
          key={toast.id}
          type="button"
          className={`toast toast--${toast.type} ${toast.cat ? "toast--with-cat" : ""}`}
          onClick={() => onDismiss(toast.id)}
        >
          {toast.cat ? (
            <span className="toast__cat" aria-hidden>
              <PixelCat variant={toast.cat} licking size={44} />
              <span className="toast__cat-name">
                {toast.cat === "black" ? "Sage" : "Ahri"}
              </span>
            </span>
          ) : null}
          <span className="toast__text">{toast.text}</span>
        </button>
      ))}
    </div>
  );
}
