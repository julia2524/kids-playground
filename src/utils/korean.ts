export const getKoreanSubjectParticle = (word: string): string => {
  const trimmed = word.trim();

  if (!trimmed) return "는";

  const lastChar = trimmed.charCodeAt(trimmed.length - 1);

  // 한글 완성형 음절인지 확인
  if (lastChar < 0xac00 || lastChar > 0xd7a3) {
    return "는";
  }

  // 종성이 있으면 '은', 없으면 '는'
  const hasFinalConsonant = (lastChar - 0xac00) % 28 !== 0;

  return hasFinalConsonant ? "은" : "는";
};
