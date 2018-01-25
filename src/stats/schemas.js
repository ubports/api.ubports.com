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

// devices and contrys are splitted

const instanceSchema = new Schema({
  _id: String,
  sessions: [{ type: Schema.Types.ObjectId, ref: "Session" }],
  date: Date,
  last_seen: Date,
  last_channel: String,
  last_build: Number,
  device: String
})

const sessionSchema = new Schema({
  _id: String,
  date: Date,
  last_seen: Date,
  channel: String,
  build: Number,
  instance: { type: String, ref: "Instance" }
})

const contrySchema = new Schema({
  _id: Number,
  name: String,
  code: String
})

instanceSchema.pre("save", (next) => {
  if (!this.date)
    this.date = new Date();
  next();
})

sessionSchema.pre("save", (next) => {
  if (!this.date)
    this.date = new Date();
  next();
})


module.exports = [
  {name: "instance", schema: instanceSchema},
  {name: "session", schema: sessionSchema},
  {name: "county", schema: contrySchema},
];
