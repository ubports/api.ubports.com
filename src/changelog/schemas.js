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


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const changelogSchema = new Schema({
  date: Date,
  text: String,
  author: String,
  issue: String,
  repo: String,
})

changelogSchema.pre("save", (next) => {
  if (!this.date)
    this.date = new Date();
  next();
})


module.exports = [
  {name: "changelog", schema: changelogSchema}
];
