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
    this._router = api.register("builds");

    this._router.get("/:channel", (req, res, next) => {
      database.schemas.build.find({ channel: req.params.channel }, (err, builds) => {
        if (err)
          res.sendStatus(500);
        else
          if (builds.length !== 0)
            res.send(builds);
          else
            res.sendStatus(404);
      });
    });

    this._router.get("/:channel/latest", (req, res, next) => {

    });

    this._router.post("/:channel/:version/:apiKey", this._router.apiKeyMatch, (req, res, next) => {
      if (!req.params.channel || !req.params.version)
      new database.schemas.build({
        channel: String,
        version: 1
      })
    });
  }

  get router() {
    return this._router;
  }

  getBuilds(channel) {

  }

}

module.exports = ApiV1;
