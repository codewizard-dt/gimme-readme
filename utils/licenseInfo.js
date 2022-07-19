/**
 * fuzzy is a string search package that allows better result filtering
 */
const fuzzy = require('fuzzy')

/**
 * A list of the most common choices for open source licenses
 */
const choices = [
  {
    name: 'GNU Affero General Public License v3.0',
    value: 'GNU AGPL v3',
    color: 'blue',
    link: 'https://www.gnu.org/licenses/agpl-3.0',
  },
  {
    name: 'Apache License 2.0',
    value: 'Apache 2.0',
    color: 'yellowgreen',
    link: 'http://www.apache.org/licenses/LICENSE-2.0',
  },
  {
    name: 'BSD 2 - Clause "Simplified" License',
    value: 'BSD 2-Clause',
    color: 'orange',
    link: 'https://opensource.org/licenses/BSD-2-Clause',
  },
  {
    name: 'BSD 3 - Clause "New" or "Revised" License',
    value: 'BSD 3-Clause',
    color: 'orange',
    link: 'https://opensource.org/licenses/BSD-3-Clause',
  },
  {
    name: 'Boost Software License 1.0',
    value: 'BOOST',
    color: 'yellow',
    link: 'https://www.boost.org/LICENSE_1_0.txt',
  },
  {
    name: 'Creative Commons Zero v1.0 Universal',
    value: 'CC0 v1',
    color: 'lightgrey',
    link: 'http://creativecommons.org/publicdomain/zero/1.0/',
  },
  {
    name: 'Eclipse Public License 2.0',
    value: 'EPL v2',
    color: 'red',
    link: 'https://opensource.org/licenses/EPL-2.0',
  },
  {
    name: 'GNU General Public License v2.0',
    value: 'GNU GPL v2',
    color: 'blue',
    link: 'https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html',
  },
  {
    name: 'GNU General Public License v3.0',
    value: 'GNU GPL v3',
    color: 'blue',
    link: 'https://www.gnu.org/licenses/gpl-3.0',
  },
  {
    name: 'GNU Lesser General Public License v3',
    value: 'GNU LGPL v3',
    color: 'blue',
    link: 'https://www.gnu.org/licenses/lgpl-3.0',
  },
  {
    name: 'MIT License',
    value: 'MIT',
    color: 'yellow',
    link: 'https://opensource.org/licenses/MIT',
  },
  {
    name: 'Mozilla Public License 2.0',
    value: 'MPL 2.0',
    color: 'brightgreen',
    link: 'https://opensource.org/licenses/MPL-2.0',
  },
  {
    name: 'Unlicense',
    value: 'Unlicense',
    color: 'blue',
    link: 'http://unlicense.org',
  },
]

/**
 * Constructs a URL for the given license
 * @param {object} license an item from the list of licenses above
 * @returns a url for a license badge
 */
const getBadgeUrl = (license) => {
  let { value, color } = license
  value = value.replace(/ /g, '_').replace(/-/g, '--')
  return `https://img.shields.io/badge/license-${value}-${color}`
}
/**
 * Retrieves the correct license data based on user input
 * @param {string} licenseValue the value stored by Inquirer
 * @returns a license object from the list above
 */
function retrieve(licenseValue) {
  return choices.find(license => licenseValue === license.value)
}

/**
 * Creates an appropriately formatted string to render a link for the license
 * @param {object} userData all data from Inquirer
 * @returns a markdown string with a link to the license information
 */
function renderLink(userData) {
  const license = retrieve(userData.license)
  if (!license) return ''
  return `[${license.name}](${license.link})`
}
/**
 * Creates an appropriately formatted string to render a badge for the license
 * @param {object} userData all the data from Inquirer
 * @returns a markdown string with an image badge linked to the license info URL
 */
function renderBadge(userData) {
  const license = retrieve(userData.license)
  if (!license) return ''
  return `[![License: ${license.value}](${getBadgeUrl(license)})](${license.link})\n`
}

/**
 * Searches the list of licenses for ones matching user input
 * @param {*} answer 
 * @param {*} input the current input string used to search the list of licenses
 * @returns a Promise that resolves with a filtered list of licenses
 */
function search(answer, input = '') {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const results = fuzzy
          .filter(input, choices, { extract: (license) => license.name })
          .map((el) => el.original)

        resolve(results)
      } catch (error) {
        console.error(error)
      }
    }, 250)
  })
}

module.exports = {
  choices, search, retrieve, renderLink, renderBadge
}