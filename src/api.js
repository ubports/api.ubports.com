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

const express  = require("express");
const Database = require("./database")
const ApiV1    = require("./apiv1");
const Spaces   = require("./spaces");

// Apis
const Changelog = require("./changelog")
const Devices = require("./devices")
const Stats = require("./stats")
const Builds = require("./builds")

// Example Api
//const Example = require("./example")

class Api {
  constructor() {
    const database = new Database();
    const spaces  = new Spaces();

    // Register schemas
    database.registerSchemas(Devices.schemas);
    database.registerSchemas(Builds.schemas);
    database.registerSchemas(Changelog.schemas);
    database.registerSchemas(Stats.schemas);

    this._router = express.Router();
    const apiv1 = new ApiV1()

    // Init Apis
    const changelogApiv1 = new Changelog.ApiV1(apiv1, database);
    const devicesApiv1 = new Devices.ApiV1(apiv1, database, spaces);
    const statsApiv1 = new Stats.ApiV1(apiv1, database);
    const buildsApiv1 = new Builds.ApiV1(apiv1, database);

    // Example api
    //const exampleApiv1 = new Example.ApiV1(apiv1, database);

    // Register Api versions
    this._router.use('/v1/', apiv1.router);
    return;
  }

  get router() {
    return this._router;
  }
}

module.exports = Api;
