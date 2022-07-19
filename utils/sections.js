const licenses = require('./licenseInfo.js')

/** Returns a given section from the list */
const get = (sectionName) => list.find(section => section.name.toLowerCase() === sectionName.toLowerCase())

/**
 * Creates a new question object 
 * @param {string} name data key for the question
 * @param {string} type type of prompt
 * @param {string} message message displayed to user
 * @param {object} otherOptions all other options for the given question
 * @returns an object ready for injection into the `inquirer.prompt` command
 */
const newQuestion = (name, type, message, otherOptions = {}) => {
  return { name, type, message, when: true, ...otherOptions }
}

/**
 * Generates a string for use as a data key
 * @param {string} str a section name
 * @returns a lowercase, all-alphabetic string
 */
const getBasicKey = (str) => str.toLowerCase().replace(/[^a-z]/g, '')
/**
 * Creates a generic section object with boilerplate questions and template
 * @param {string} sectionName properly capitalized section name
 * @param {string} defaultMarkdown default information for a section
 * @returns a section object
 */
const basicSection = (sectionName, defaultMarkdown) => {
  const dataKey = getBasicKey(sectionName)
  return {
    name: `${sectionName}`,
    template: (data) => `# ${sectionName}\n${data[dataKey]}\n`,
    questions: [
      newQuestion(`contains.${dataKey}`, 'confirm', `Include a(n) '${sectionName}' section?`),
      newQuestion(`method.${dataKey}`, 'list', 'How would you like to provide your `markdown`?', {
        choices: [
          { name: 'Open a Text Editor (recommended)', value: 'editor' },
          { name: 'Inline input', value: 'input' },
        ],
        default: 'input',
        when: (answers) => answers.contains[dataKey] === true
      }),
      newQuestion(dataKey, 'input', `Enter your "${sectionName}" information in markdown format`, {
        default: defaultMarkdown,
        when: (answers) => answers.method[dataKey] === 'input'
      }),
      newQuestion(dataKey, 'editor', `Enter your "${sectionName}" information in markdown format`, {
        default: defaultMarkdown,
        when: (answers) => answers.method[dataKey] === 'editor'
      }),
    ],
  }
}
/**
 * Creates a section object with custom questions and template
 * @param {string} sectionName properly capitalized section name
 * @param {object} questions an array of questions for use in the `inquirer.prompt` command
 * @param {function} template a function that receives inquirer user input and returns a string
 * @returns a section object
 */
const customSection = (sectionName, questions, template) => {
  return {
    name: `${sectionName}`,
    template,
    questions
  }
}

/**
 * List of sections which contain questions for user input and templates for rendering markdown
 */
const list = [
  customSection('General Info', [
    newQuestion('projectName', 'input', 'Project title:', { default: 'My New Project' }),
    newQuestion('descriptionHeader', 'input', 'Description section header:', { default: 'Description' }),
    newQuestion(`method.description`, 'list', 'Description section input method:', {
      choices: [
        { name: 'Simple inline input', value: 'input' },
        { name: 'Open a Text Editor', value: 'editor' }
      ],
      default: 'input',
    }),
    newQuestion('description', 'input', 'Describe your project:', {
      when: (answers) => answers.method.description === 'input',
      default: `It's the best out there`
    }),
    newQuestion('description', 'editor', 'Describe your project:', {
      when: (answers) => answers.method.description === 'editor',
      default: `It's the best out there`
    }),
  ], (userData) => {
    return `# ${userData.projectName}\n${licenses.renderBadge(userData)}\n## ${userData.descriptionHeader}\n${userData.description}\n`
  },),
  basicSection('Installation', 'InstALL me DAddy!'),
  basicSection('Usage', 'Use me DAddy!'),
  customSection('License', [
    newQuestion('license', 'autocomplete', 'License to be used for this project:', {
      default: 'MIT',
      source: licenses.search
    })
  ], (userData) => {
    return `# License\nThis project is provisioned under the ${licenses.renderLink(userData)}\n`
  }),
  basicSection('Contributing', 'ContriBUTe, DAddy!'),
  basicSection('Tests', 'Test me DAddy!'),
  customSection('Questions', [
    newQuestion('github', 'input', 'Your Github username', { default: 'my-github-name' }),
    newQuestion('email', 'input', 'Your email', { default: 'me@email.com' })
  ], (userData) => {
    let template = `# Questions\n`
    template += `If you have any questions, please direct them to my [Github](https://github.com/${userData.github}) or [email](mailto:${userData.email})`
    return template
  }),
]

module.exports = { get, list }