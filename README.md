## invert-text

A simple tool to generate inverted/upside-down/australiaized/upended/upturned text.
Generates inverted text using Unicode characters.

A better mechanism for testing Localization (L10N) compared to translations of a different language, for two reasons:
  * It's easy to quickly generate a JSON with inverted texts. (You don't need a paid translation API).
  * When testing l10n on the interface, it's easy to identify if the right word/phrase is being translated (_just need to rotate your head enough_ 🙃 ).

### Examples
| Original | Inverted |
|----------|----------|
|the quick brown fox jumps over the lazy dog.|.ƃop ʎzɐʅ ǝɥʇ ɹǝʌo sdɯnɾ xoⅎ uʍoɹq ʞɔᴉnb ǝɥʇ|
|THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.|.⅁Oᗡ ⅄Z∀⅂ ƎHꓕ ꓤƎɅO SԀWՈᒋ XOᖵ NMOꓤꓭ ꓘϽIՈꝹ ƎHꓕ|
|9876543210|0⇂ᄅƐh59ㄥ86|
|Random %^&* Characters !@#$ in ()+,./-_ between|uǝǝʍʇǝq _-/.,+() uᴉ $#@! sɹǝʇɔɐɹɐɥϽ *&^% ɯopuɐꓤ|
|(parentheses) [brackets] {braces}|{sǝɔɐɹq} [sʇǝʞɔɐɹq] (sǝsǝɥʇuǝɹɐd)|


### Installation
  * Install `Node.js` and `npm`
  * Install the `invert-text` CLI globally using `npm i -g invert-text`
    + Or, run it directly using `npx`


### Usage
#### Invert a JSON file
To invert all leaf-level text phrases in a given JSON file, use the `invert-text` command as below:
```console
foo@bar:~$ invert-text -i path/to/input.json -o path/to/output.json

✅ Generated the inverted output file at "path/to/output.json"
```

#### Invert phrase(s)
To invert single/multiple text phrases, use the `invert-text` command as below:
```console
foo@bar:~$ invert-text -p this that "and something else"

sᴉɥʇ
ʇɐɥʇ
ǝsʅǝ ƃuᴉɥʇǝɯos puɐ
```


### ⚠️&nbsp; Limitations
  * Works mainly with __AlphaNumeric__ characters. Most other characters are returned without any inversion.
  * Depending on the __font__ used, some of the inverted characters can look odd/incorrect when inverted.
