const charMap = {
  // Uppercase Alphabet
  A: '∀',
  B: 'ꓭ',
  C: 'Ͻ',
  D: 'ᗡ',
  E: 'Ǝ',
  F: 'ᖵ',
  G: '⅁',
  H: 'H',
  I: 'I',
  J: 'ᒋ',
  K: 'ꓘ',
  L: '⅂',
  M: 'W',
  N: 'N',
  O: 'O',
  P: 'Ԁ',
  Q: 'Ꝺ',
  R: 'ꓤ',
  S: 'S',
  T: 'ꓕ',
  U: 'Ո',
  V: 'Ʌ',
  W: 'M',
  X: 'X',
  Y: '⅄',
  Z: 'Z',

  // Lowercase Alphabet
  a: 'ɐ',
  b: 'q',
  c: 'ɔ',
  d: 'p',
  e: 'ǝ',
  f: 'ⅎ',
  g: 'ƃ',
  h: 'ɥ',
  i: 'ᴉ',
  j: 'ɾ',
  k: 'ʞ',
  l: 'ʅ',
  m: 'ɯ',
  n: 'u',
  o: 'o',
  p: 'd',
  q: 'b',
  r: 'ɹ',
  s: 's',
  t: 'ʇ',
  u: 'n',
  v: 'ʌ',
  w: 'ʍ',
  x: 'x',
  y: 'ʎ',
  z: 'z',

  // Numbers
  0: '0',
  1: '⇂',
  2: 'ᄅ',
  3: 'Ɛ',
  4: 'h',
  5: '5',
  6: '9',
  7: 'ㄥ',
  8: '8',
  9: '6',

  // Special characters
  _: '‾',
  '(': ')',
  ')': '(',
  '[': ']',
  ']': '[',
  '{': '}',
  '}': '{',
  '<': '>',
  '>': '<',
  '.': '˙',
  ',': "'",
  "'": ',',
  '"': ',,',
  '`': ',',
  '∴': '∵',
  '&': '⅋',
  '?': '¿',
  '!': '¡'
};

/**
 * Inverts a single phrase of text
 * @param {string} phrase - Input phrase to invert
 * @returns {string} Inverted phrase
 */
const invertPhrase = phrase => {
  let output = '';
  [...phrase].reverse().forEach(char => {
    output += charMap[char] || char;
  });
  return output;
};
exports.invertPhrase = invertPhrase;

/**
 * Recursively inverts all leaf-level text nodes in the input JSON tree
 * Does NOT mutate the input
 * @param {any} node - Any node in a JSON object
 * @returns {any} A new node with all leaf-level texts inverted
 */
const invertObjectNode = node => {
  // ARRAY
  if (Array.isArray(node)) {
    return node.map(n => invertObjectNode(n));
  }

  // OBJECT
  if (typeof node === 'object') {
    return Object.fromEntries(
      // Invert each [key, value] pair
      Object.entries(node).map(([key, value]) => [key, invertObjectNode(value)])
    );
  }

  // STRING
  if (typeof node === 'string') {
    return invertPhrase(node);
  }

  // Return everything else unchanged
  return node;
};
exports.invertObjectNode = invertObjectNode;
