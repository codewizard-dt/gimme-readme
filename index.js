// TODO: Include packages needed for this application
const fs = require('fs')
const inquirer = require('inquirer')
const inquirerPrompt = require('inquirer-autocomplete-prompt')
const licenses = require('./utils/licenseInfo.js')
const generateMarkdown = require('./utils/generateMarkdown.js')
const sections = require('./utils/sections.js')

inquirer.registerPrompt('autocomplete', inquirerPrompt)

// TODO: Create an array of questions for user input
/**
 * Description
 * Table of Contents
 * Installation
 * Usage
 * License
 * Contributing
 * Tests
 * Questions
 * 
 * input, number, confirm, list, rawlist, expand, checkbox, password, editor
 */

// TODO: Create a function to write README file
function writeToFile(fileName, answers) {
  let template = generateMarkdown(answers)
  fs.writeFileSync(fileName, '')
  fs.appendFileSync(fileName, template)
}

// TODO: Create a function to initialize app
function init() {
  let filenameInput = { name: 'filename', type: 'input', message: 'Enter a filename to be generated *WARNING: This will overwrite the file*', default: 'README.md' }
  let allQuestions = sections.list.flatMap(section => section.questions)
  inquirer.prompt([filenameInput, ...allQuestions])
    .then((answers) => {
      console.log(answers)
      writeToFile(answers.filename, answers)
    }).catch(err => console.log(err))

}


// Function call to initialize app
init();
