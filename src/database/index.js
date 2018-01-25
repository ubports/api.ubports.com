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
const config = require('../../config.json').database;

class Database {
  constructor() {
    mongoose.connect(config.uri);
    this._db = mongoose.connection;
    this._db.on('error', (err) => {
      console.error('connection error:', err)
    });
    this._db.once('open', function() {
      console.log("Database is ready to rock!");
    });

    this._schemas = {};
  }

  registerSchema(name, schema) {
    this._schemas[name] = this._db.model(name, schema);
  }

  registerSchemas(schemas) {
    for (var i = 0; i < schemas.length; i++) {
      this._schemas[schemas[i].name] = this._db.model(schemas[i].name, schemas[i].schema);
    }
  }

  get schemas() {
    return this._schemas;
  }
}

module.exports = Database;
