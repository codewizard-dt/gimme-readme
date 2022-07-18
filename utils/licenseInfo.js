export const licenseChoices = [
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
    link: 'https://www.gnu.org/licenses/lgpl-3.0',
  },
  {
    name: 'Mozilla Public License 2.0',
    value: 'MPL 2.0',
    color: 'brightgreen',
    link: 'https://www.gnu.org/licenses/lgpl-3.0',
  },
  {
    name: 'The Unlicense',
    value: 'Unlicense  ',
    color: 'blue',
    link: 'http://unlicense.org',
  },
]

export const getLicenseBadgeUrl = ({ value, color }) => {
  value = value.replace(/ /g, '_').replace(/-/g, '--')
  return `https://img.shields.io/badge/license-${value}-${color}`
}
