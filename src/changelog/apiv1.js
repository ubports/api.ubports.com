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
const helpers = require("./helpers")

class ChangelogApiV1 {
  constructor(api, database) {
    const parentThis = this;
    this.database = database;
    this._router = api.register("changelog");


    this._router.get("/json/:channel/:version/:toVersion?", (req, res, next) => {
      parentThis.getChangelog(req.params.channel, req.params.version,
                              req.params.toVersion, r=>res.send(r));
    });

    this._router.get("/:channel/:version/:toVersion?", (req, res, next) => {
      parentThis.getChangelog(req.params.channel, req.params.version,
                              req.params.toVersion, r=>res.send(helpers.beautify(r)));
    });

    this._router.post("/:version/:author/:text/:issue", (req, res, next) => {
      parentThis.newChangelog(req.params.version, req.params.author,
                              req.params.text, req.params.issue, err => {
        if (err)
          res.sendStatus(400).send("Bad Request")
        else
          res.send("OK");
      })
    })
  }

  get router() {
    return this._router;
  }

  newChangelog(version, author, text, issue, callback){
    var newChange = this.database.schemas.changelog({
      text: text,
      author: author,
      issue: issue
    });

    console.log(newChange)
    newChange.save((err) => {
      console.log(err)
      callback(err)
    })
  }

  getChangelog(channel, version, toVersion, callback){
    version = parseInt(version);
    toVersion = parseInt(toVersion);
    console.log(typeof version)
    if (typeof version !== "number"){
      callback("500 Server error");
      return false;
    }
    if (typeof toVersion !== "number")
      toVersion = version;
    console.log({$gt: version, $$lt: toVersion})

    this.database.schemas.builds.find({
      "channel": channel,
      "version": {$gt: version-1, $lt: toVersion+1}
    }, builds => {
      this.database.schemas.changelog.find({
        "version": {$gt: version-1, $lt: toVersion+1}
      }, (err, change) => {
        if (err){
          callback("500 Server error");
          return
        }
        callback(change);
      })
    })
  }
}

module.exports = ChangelogApiV1;
