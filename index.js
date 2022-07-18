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
const questions = [
  {
    name: 'project.name',
    message: 'What is the name of your project?',
    type: 'input',
    default: 'My New Project'
  },
  {
    name: 'project.description',
    message: 'Enter a description for your project:',
    type: 'input',
    default: 'Project description'
  },
  {
    name: 'installation',
    message: 'Describe how to install your project:',
    type: 'input',
    default: 'npm i myProject'
  },
  {
    name: 'usage',
    message: 'Describe how to use your project:',
    type: 'input',
    default: 'run `node index.js`'
  },
  {
    name: 'license',
    message: 'Pick a license for your project',
    type: 'autocomplete',
    source: licenses.search
  },
  {
    name: 'tests',
    message: 'Enter information about the tests your proejct has undergone:',
    type: 'input',
    default: 'none'
  },
  {
    name: 'questions.github',
    message: `What is your Github username?`,
    type: 'input',
    default: 'your name'
  },
  {
    name: 'questions.name',
    message: 'If a user has questions, who should they contact? (name)',
    type: 'input',
    default: 'your name'
  },
  {
    name: 'contact.email',
    message: 'If a user has questions, who should they contact? (email)',
    type: 'input',
    default: 'you@email.com'
  },
  {
    name: 'contact.affiliation',
    message: 'Enter any affiliation this contact has with a parent organization:',
    type: 'input',
    default: 'your company'
  },

]
// TODO: Create a function to write README file
function writeToFile(fileName, answers) {
  let template = generateMarkdown(answers)
  fs.writeFileSync(fileName, '')
  fs.appendFileSync(fileName, template)
}

// TODO: Create a function to initialize app
function init() {
  let allQuestions = sections.list.flatMap(section => section.questions)
  inquirer.prompt(allQuestions)
    .then((answers) => {
      console.log(answers)
      writeToFile('README_NEW.md', answers)
    }).catch(err => console.log(err))
}


// Function call to initialize app
init();
