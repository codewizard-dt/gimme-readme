const sections = require('./sections.js')

/**
 * Converts section header text into the required format for an anchor tag in markdown format
 * @param {string} str section header text
 * @returns formatted string for use as an anchor tag
 */
function convertNameToAnchor(str) {
  return str.toLowerCase().replace(/ /g, '-')
}

/**
 * Transforms inquirer data into a complete markdown document (as a string)
 * @param {object} data user data from inquirer prompts
 * @returns a string that can be written to a file
 */
function generateMarkdown(data) {
  /**
   * Loops through the list of sections and renders each template
   */
  const sectionInfo = sections.list.map((section) => {
    if (section.template) return section.template(data)
    else throw new Error(section.name + ' template not found. Define a template function of type `(answerData) => string`')
  })

  /**
   * Loops through the list of sections and adds an anchor link for each section header
   */
  const tableOfContents = `# Table of Contents\n${sections.list.slice(1).map(({ name }) => `- [${name}](#${convertNameToAnchor(name)})`).join('\n')}`

  /**
   * Inserts the Table of Contents after the General Info section
   */
  sectionInfo.splice(1, 0, tableOfContents)

  /**
   * Joins the section templates and inserts new lines between them
   */
  return sectionInfo.join(`\n`)
}

module.exports = generateMarkdown;

