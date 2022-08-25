#!/usr/bin/env node

const fs = require('fs');
const { Command } = require('commander');
const { version } = require('./package.json');
const { invertPhrase, invertObjectNode } = require('./src/invert');

const program = new Command();
const args = program
  .option('-p, --phrases [phrases...]', 'specify input words/phrases to be inverted')
  .option('-i, --file-input <path-to-file>', 'path to the source JSON file')
  .option('-o, --file-output <path-to-file>', 'path for the output JSON file with inverted texts')
  .version(version, '-v, --version', 'output the current version')
  .parse(process.argv)
  .opts();

const hasPhraseInput = args.phrases && args.phrases.length;
const hasFileInput = !!args.fileInput;

// Invert any phrases
if (hasPhraseInput) {
  args.phrases.forEach(p => console.log('\x1b[35m%s\x1b[0m', invertPhrase(p))); // Log in Magenta
}

// Invert any file
const displayError = error => {
  console.error('\x1b[31m%s\x1b[0m', `⚠️  ${error}`); // Log in Red
  program.help({ error: true }); // Display help instructions
};
if (hasFileInput) {
  if (!args.fileOutput) {
    displayError('Please specify a path for the output JSON file');
    process.exit(1);
  }

  // Check if the input file is readable.
  fs.access(args.fileInput, fs.constants.R_OK, accessError => {
    // If the file doesn't exist (or) no READ access
    if (accessError) {
      displayError(`Cannot read the file "${args.fileInput}"`);
      process.exit(1);
    }

    // Read the file
    fs.readFile(args.fileInput, (readError, data) => {
      if (readError) {
        displayError(`Unexpected error when reading the file "${args.fileInput}"`);
        process.exit(1);
      }

      // Try parsing the JSON
      try {
        const inputObj = JSON.parse(data);
        const outputObj = invertObjectNode(inputObj);
        const outputJSON = JSON.stringify(outputObj, null, 2);

        // Write to file
        fs.writeFile(args.fileOutput, outputJSON, writeError => {
          if (writeError) {
            displayError(`Error when writing output to the file "${args.fileOutput}". Please check the path and ensure that you have WRITE access to the output location.`);
            process.exit(1);
          }
          console.log('\x1b[32m%s\x1b[0m', `✅ Generated the inverted output file at "${args.fileOutput}"`); // Log in Green
        });
      } catch (error) {
        displayError(`Invalid JSON encountered in the file "${args.fileInput}"`);
        process.exit(1);
      }
    });
  });
}

// Display help instructions in case of bad inputs
if (!hasPhraseInput && !hasFileInput) {
  program.help({ error: true });
}
