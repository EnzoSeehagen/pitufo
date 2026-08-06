const API_BASE = "";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail = data.detail;
    const message = Array.isArray(detail)
      ? detail.map((item) => item.msg || JSON.stringify(item)).join("; ")
      : detail || "Erro na requisição";
    throw new Error(message);
  }
  return data;
}

export function createGame(mode, practice = false) {
  return request("/api/game/new", {
    method: "POST",
    body: JSON.stringify({ mode, practice }),
  });
}

export function submitGuess(gameId, word) {
  return request(`/api/game/${gameId}/guess`, {
    method: "POST",
    body: JSON.stringify({ word }),
  });
}
