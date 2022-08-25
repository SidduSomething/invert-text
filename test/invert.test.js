const { invertPhrase, invertObjectNode } = require('../src/invert');

/**
 * Recursively performs `Object.freeze` on the entire object
 * Useful to prevent unexpected mutations on the object
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 */
function deepFreeze(object) {
  // Retrieve the property names defined on object
  const propNames = Object.getOwnPropertyNames(object);

  // Freeze properties before freezing self
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
}

describe('invertPhrase utility', () => {
  test('invertPhrase utility inverts all test phrases correctly', () => {
    const phrases = [
      'the quick brown fox jumps over the lazy dog.',
      'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.',
      '9876543210',
      'Random %^&* Characters !@#$ in ()_+,./- between',
      '(parentheses) [brackets] {braces}'
    ];
    const expected = [
      '.ƃop ʎzɐʅ ǝɥʇ ɹǝʌo sdɯnɾ xoⅎ uʍoɹq ʞɔᴉnb ǝɥʇ',
      '.⅁Oᗡ ⅄Z∀⅂ ƎHꓕ ꓤƎɅO SԀWՈᒋ XOᖵ NMOꓤꓭ ꓘϽIՈꝹ ƎHꓕ',
      '0⇂ᄅƐh59ㄥ86',
      'uǝǝʍʇǝq -/.,+_() uᴉ $#@! sɹǝʇɔɐɹɐɥϽ *&^% ɯopuɐꓤ',
      '{sǝɔɐɹq} [sʇǝʞɔɐɹq] (sǝsǝɥʇuǝɹɐd)'
    ];

    const inverted = phrases.map(p => invertPhrase(p));
    expect(inverted).toEqual(expected);
  });
});

describe('invertObjectNode utility', () => {
  test('invertObjectNode inverts all leaf-level texts without mutating the input', () => {
    // Using deepFreeze to test for mutations
    const input = deepFreeze({
      a: [false, 120],
      b: {
        c: ['the', 'quick', 'brown'],
        d: {
          e: ['fox', 'jumps'],
          f: 'over'
        }
      },
      g: [['the', 'lazy'], { h: 'dog' }]
    });

    expect(invertObjectNode(input)).toEqual({
      a: [false, 120], // Should be unchanged
      b: {
        c: ['ǝɥʇ', 'ʞɔᴉnb', 'uʍoɹq'],
        d: {
          e: ['xoⅎ', 'sdɯnɾ'],
          f: 'ɹǝʌo'
        }
      },
      g: [['ǝɥʇ', 'ʎzɐʅ'], { h: 'ƃop' }]
    });
  });
});
