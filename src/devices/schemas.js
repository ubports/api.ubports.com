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
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    device: {
      type: String,
      required: true,
      unique: true
    },
    date: Date,
    community: Boolean,
    name: {
      type: String,
      required: true
    },
    priority: {
      type: Number,
      required: false
    },
    status: {
      type: Number,
      required: false
    },
    whatIsWorking: {
      type: Array,
      required: false
    },
    about: {
      type: String,
      required: true
    },
    maintainer: {
      type: String,
      required: true
    },
    progress: Number,
    comment: String,
    build: {
      enable: Boolean,
      stable: Boolean
    },
    image: String,
    install: {
      installable: {
        type: Boolean,
        required: true
      },
      multirom: Boolean,
      install_settings: {
        bootstrap: Boolean,
        fastboot: Boolean,
        method: String
      },
      images: Array,
      buttons: {
        bootloaded: String,
        recovery: String
      },
      system_server: {
        blacklist: Array,
        selected: String
      }
    }
});
deviceSchema.plugin(uniqueValidator);

const usersSchema = new Schema({
    date: Date,
    name: {
      type: String,
      required: true
    },
    API: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    ubuntu_id: {
      type: String,
      required: true
    },
    is_member: {
      type: Boolean,
      required: true
    }
  });

const installReportSchema = new Schema({
    date: Date,
    device: {
      type: String,
      required: true
    },
    channel: {
      type: String,
      required: true
    },
    geo: {
      type: String,
      required: false
    },
    error: {
      type: Boolean,
      required: true
    },
    errorMessage: {
      type: String,
      required: false
    }
  });

  deviceSchema.pre("save", (next) => {
    if (!this.date)
      this.date = new Date();
    next();
  })
  usersSchema.pre("save", (next) => {
    if (!this.date)
      this.date = new Date();
    next();
  })
  installReportSchema.pre("save", (next) => {
    if (!this.date)
      this.date = new Date();
    next();
  })


module.exports = [
  {name: "devices", schema: deviceSchema},
  {name: "users", schema: usersSchema},
  {name: "installReport", schema: installReportSchema}
]
