// TODO: Include packages needed for this application
const fs = require('fs')
const inquirer = require('inquirer')
const autocompletePrompt = require('inquirer-autocomplete-prompt')
const generateMarkdown = require('./utils/generateMarkdown.js')
const sections = require('./utils/sections.js')

/**
 * Registers the `autocomplete` type of Inquirer prompt
 */
inquirer.registerPrompt('autocomplete', inquirerPrompt)

/**
 * Generates markdown from section templates and writes the file
 * @param {string} fileName path to the file
 * @param {object} answers all the user input data from Inquirer
 */
function writeToFile(fileName, answers) {
  let template = generateMarkdown(answers)
  fs.writeFileSync(fileName, '')
  fs.appendFileSync(fileName, template)
}

/**
 * Runs the app
 */
function init() {
  /** Ask user for filename (default: README.md) */
  let filenameInput = { name: 'filename', type: 'input', message: 'Enter a filename to be generated *WARNING: This will overwrite the file*', default: 'README.md' }
  /** Retreives the questions from the sections list */
  let allQuestions = sections.list.flatMap(section => section.questions)
  /** 
   * Prompts the user according to the sections defined and writes the file
   */
  inquirer.prompt([filenameInput, ...allQuestions])
    .then((answers) => {
      writeToFile(answers.filename, answers)
    }).catch(err => console.log(err))

}

// Function call to initialize app
init();
