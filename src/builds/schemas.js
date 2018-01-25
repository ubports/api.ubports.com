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

const buildSchema = new Schema({
  date: Date,
  channel: String,
  version: Number
})

buildSchema.pre("save", (next) => {
  if (!this.date)
    this.date = new Date();
  next();
})


module.exports = [
  {name: "build", schema: buildSchema}
];
