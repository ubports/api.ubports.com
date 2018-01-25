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

const apiToHtmlUrl = api => {
  // return just api for now
  return api;

  var apiLink = api;
  if (api.startsWith("/"))
    apiLink = api.slice(1);
  return "<a href='"+apiLink+"'>"+api+"</a>"
}

const formatApisList = apiList => {
  var output = "<h3>-- Apis available --</h3><hr>"
  apiList.forEach(api => {
    output += "- " + apiToHtmlUrl(api) + "<br />"
  })
  return output;
}

class ApiRouter {
  constructor(router, overrideRoot) {
    var parentThis = this;
    this._router = router;
    this._apiList = [];

    if (overrideRoot)
      return;

    this._router.get("/", function(req, res) {
        res.send(formatApisList(parentThis.apiList));
    });
  }

  apiKeyMatch(req, res, next) {
    if (req.params.apiKey === "b")
      next()
    else
      res.sendCode(401)
  }

  get(apiPoint, callback) {
    this._apiList.push("get "+apiPoint);
    this._router.get(apiPoint, callback);
  }
  post(apiPoint, callback) {
    this._apiList.push("post "+apiPoint);
    this._router.post(apiPoint, callback);
  }
  put(apiPoint, callback) {
    this._apiList.push("put "+apiPoint);
    this._router.put(apiPoint, callback);
  }
  delete(apiPoint, callback) {
    this._apiList.push("delete "+apiPoint);
    this._router.delete(apiPoint, callback);
  }

  get router() {
    return this._router;
  }

  get apiList(){
    return this._apiList;
  }
}


class ApiV1 {
  constructor() {
    var parentThis = this;
    this._router = express.Router();
    this._apiList = [];

    this._router.get("/", function(req, res) {
        res.send(formatApisList(parentThis.apiList));
    });
    return;
  }

  register(apiPoint, overrideRoot) {
    const router = express.Router();
    this._apiList.push("/"+apiPoint);
    this._router.use("/"+apiPoint, router);
    return new ApiRouter(router, overrideRoot);
  }

  get router() {
    return this._router;
  }

  get apiList(){
    return this._apiList;
  }

}

module.exports = ApiV1;
