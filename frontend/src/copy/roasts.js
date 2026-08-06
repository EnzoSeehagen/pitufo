export const INVALID_WORDS = [
  "Ô imbecil, isso nem é palavra.",
  "Burro demais — essa não existe.",
  "Acéfalo detectado: palavra inválida.",
  "Sério? Até o corretor ficou ofendido.",
  "Não, seu jumento. Tenta de novo.",
  "Que chute patético. Fora da lista.",
];

export const WRONG_GUESSES = [
  "Errou, imbecil. Continua tentando.",
  "Quase… na sua cabeça. Na vida real, não.",
  "Burro com orgulho, hein?",
  "Acéfalo nível expert. Próxima!",
  "Seu cérebro pediu férias. Errou.",
  "Isso foi constrangedor. De novo.",
];

export const LAST_CHANCE_ROASTS = [
  "Última chance, imbecil.",
  "Última tentativa, seu burro.",
  "Tá na reta final, acéfalo.",
  "Uma vida, uma chance. Não estraga.",
];

export const INCOMPLETE = [
  "Faltam letras, gênio.",
  "Palavra incompleta, imbecil.",
  "Termina de digitar, burro.",
];

export const WIN = [
  "Ok… até um relógio quebrado acerta.",
  "Mandou bem. Não se acostume.",
  "Acertou! Seu cérebro voltou do intervalo.",
];

export const LOSE = [
  "Perdeu. Surpresa zero.",
  "Fim. O dicionário chora por você.",
  "Game over, acéfalo.",
];

export function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export function formatHintRoast(hints) {
  if (!hints?.length) return pick(LAST_CHANCE_ROASTS);
  const roast = pick(LAST_CHANCE_ROASTS);
  if (hints.length === 1) {
    return `${roast} Dica de caridade: a palavra ${hints[0]}.`;
  }
  const lines = hints.map((h, i) => `#${i + 1} ${h}`).join(" · ");
  return `${roast} Dicas (porque você precisa): ${lines}`;
}
