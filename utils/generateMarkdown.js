import { getLicenseBadgeUrl, licenseChoices } from './licenseInfo.js'

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  if (!license) return ''
  return `[![License: ${license.value}](${getLicenseBadgeUrl(license)})](${license.link})`
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  if (!license) return ''
  return `[${license.name}](${license.link})`
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if (!license) return ''
  return `## License\n${renderLicenseLink(license)}\nThis project is provisioned under the ${license.name} license.`
}

// TODO: Create a function to generate markdown for README
export function generateMarkdown(data) {
  const license = licenseChoices.find(lic => data.license === lic.value)
  return `# ${data.project.name}\n${renderLicenseSection(license)}
`;
}

// module.exports = generateMarkdown;

