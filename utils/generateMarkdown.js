const sections = require('./sections.js')
const { getLicenseBadgeUrl, licenseChoices } = require('./licenseInfo.js')

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
// function renderLicenseBadge(license) {
//   if (!license) return ''
//   return `[![License: ${license.value}](${getLicenseBadgeUrl(license)})](${license.link})`
// }

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
// function renderLicenseLink(license) {
//   if (!license) return ''
//   return `[${license.name}](${license.link})`
// }

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
// function renderLicenseSection(license) {
//   if (!license) return ''
//   return `## License\n${renderLicenseLink(license)}\nThis project is provisioned under the ${license.name} license.`
// }

function convertNameToAnchor(str) {
  return str.toLowerCase().replace(/ /g, '-')
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  const sectionInfo = sections.list.map((section) => {
    if (section.template) return section.template(data)
    else throw new Error(section.name + ' template not found. Define a template function of type `(answerData) => string`')
  })

  const tableOfContents = `# Table of Contents\n${sections.list.slice(1).map(({ name }) => `- [${name}](#${convertNameToAnchor(name)})`).join('\n')}`

  sectionInfo.splice(1, 0, tableOfContents)

  return sectionInfo.join(`\n`)
}

module.exports = generateMarkdown;

