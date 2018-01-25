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

const express = require("express");

class ApiV1 {
  constructor(api, database) {
    const parentThis = this;
    this.database = database;
    this._router = api.register("stats");

    this._router.get("/", (req, res, next) => {
      res.send("Stats")
    })
  }

  get router() {
    return this._router;
  }
  newData(data) {
    this.database.schemas.instance.findOneAndUpdate({
      _id: data.instanceId
    }, {
      last_seen: new Date(),
      last_channel: data.channel,
      last_build: data.build,
      device: data.device
    }, {
      new: true,
      upsert: true
    }, (err, doc) => {
        if (err){
          console.log(err);
          return;
        }
        console.log(doc)
        this.database.schemas.session.findOneAndUpdate({
          _id: data.sessionId
        }, {
          last_seen: doc.last_seen,
          channel: date.channel,
          build: date.build,
          instance: doc._id
        }, {
          new: true,
          upsert: true
        }, (err, doc1) => {
          console.log(err, doc1)
        });
    });
  }
}

module.exports = ApiV1;
