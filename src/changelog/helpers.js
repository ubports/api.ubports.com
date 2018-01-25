/*
 * Copyright (C) 2018 Marius Gripsgard <marius@ubports.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const beautify = changes => {
  var authors = []
  var changesByAuthors = {}
  changes.forEach(change => {
    console.log(change)
    if (!authors.includes(change.author))
      authors.push(change.author);
    if (!changesByAuthors[change.author])
      changesByAuthors[change.author] = "";
    changesByAuthors[change.author] += ("* " + change.text + "\n")
  })
  console.log(authors)
  console.log(changesByAuthors);
  var output = "";
  authors.forEach(author => {
    output += ("[ " + author + " ]\n\n")
    output += (changesByAuthors[author] + "\n")
  })
  return output
}

module.exports = {
  beautify: beautify
};
