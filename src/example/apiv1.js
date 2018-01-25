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

/*
  This is an example api

  to enable this please uncomment the two lines in api.js

*/


class ApiV1 {
  constructor(api, database) {
    // Set this to a const so we can use it in callbacks later
    const parentThis = this;

    // Set database
    this.database = database;

    // Get the http router, this is used to set api endpoints
    this._router = api.register("example");

  // Example ovveride root url of api
  // This will allow you to use /api/v1/example/ to display
  // What you want insted of "Apis available"
  //  this._router = api.register("example", true);
  //  this._router.get("/", (req, res, next) => {
  //    res.send("hello world")
  //  })

    // Set api endpoint /hello and handle requests
    this._router.get("/hello", (req, res, next) => {
      // Send "world" back to user
      res.send("world")
    });

    // Set api endpoint /hello/:world, the ":world" part is an params we can use
    this._router.get("/hello/:text", (req, res, next) => {
      // Send the param "text" back to the user
      res.send(req.params.text);
    });

    // Other http method options
    //this._router.post(..)
    //this._router.put(..)
    //this._router.delete(..)

    //this._router.router gets native express router if needed
  }

  // Allows other to use this router to set endpoints
  get router() {
    return this._router;
  }

}

module.exports = ApiV1;
