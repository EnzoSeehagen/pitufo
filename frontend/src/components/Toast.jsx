export default function ToastStack({ toasts, onDismiss }) {
  if (!toasts?.length) return null;

  return (
    <div className="toast-stack" aria-live="polite">
      {toasts.map((toast) => (
        <button
          key={toast.id}
          type="button"
          className={`toast toast--${toast.type}`}
          onClick={() => onDismiss(toast.id)}
        >
          {toast.text}
        </button>
      ))}
    </div>
  );
}
