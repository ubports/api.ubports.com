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

function handleError(res, err) {
    res.send(err, 500);
}

function handleCallback(res) {
  return function (err) {
    if (err) return handleError(res, err);
    res.sendStatus(200);
  }
}

class ApiV1 {
  constructor(api, database, spaces) {
    const parentThis = this;
    this.database = database;
    this._router = api.register("devices", true);

    /**
     * @api {get} /devices Get all core devices
     * @apiVersion 1.0.0
     * @apiName GetDevices
     * @apiPermission none
     * @apiGroup Device
     *
     * @apiDescription Get all UBports code devices
     *
     * @apiSuccess {Array} Devices   Returns array of devices
     */
    this._router.get("/", (req, res, next) => {
      database.schemas.devices.find({"community": false}, (err, devices) => {
        if (err) return handleError(res, err);
        res.send(devices);
      });
    });

    /**
     * @api {post} /devices Create new core device
     * @apiVersion 1.0.0
     * @apiName CreateDevice
     * @apiPermission Admin
     * @apiGroup Device
     *
     * @apiDescription Create new core device
     *
     * @apiSuccess {Number} Status Returns http status
     */
    this._router.post('/', function(req, res, next) {
        if (!req.body) res.sendStatus(400);
        req.body.community = false;
        new database.schemas.devices(req.body).save(handleCallback(res));
    });

    /**
     * @api {get} /devices/:device Get device
     * @apiVersion 1.0.0
     * @apiName GetDevice
     * @apiPermission none
     * @apiGroup Device
     *
     * @apiDescription Get info about one device
     *
     * @apiSuccess {Object} Devices   Returns device object
     */
    this._router.get("/:device", (req, res, next) => {
      database.schemas.devices.findOne({"device": req.params.device, "community": false}, (err, device) => {
        if (err) return handleError(res, err);
        if (!device) return res.sendStatus(404);
        res.send(device);
      });
    });

    /**
     * @api {put} /devices/:device Edit core device
     * @apiVersion 1.0.0
     * @apiName EditDevice
     * @apiPermission Admin
     * @apiGroup Device
     *
     * @apiDescription Edit info about core device
     *
     * @apiSuccess {Number} Status  Http Status
     */
    this._router.put('/:device', function(req, res, next) {
        if (!req.body) return res.sendStatus(400);
        req.body.community = false;
        database.schemas.devices.update({"device": req.params.device, "community": false}, req.body, handleCallback(res));
    });

    /**
     * @api {put} /devices/image/:device Set/Edit device image
     * @apiVersion 1.0.0
     * @apiName SetImageDevice
     * @apiPermission Admin
     * @apiGroup Device
     *
     * @apiDescription Edit image for core device
     *
     * @apiSuccess {Number} Status  Http Status
     */
    this._router.put('/image/:device', [spaces.upload.array("image", 1), function(req, res, next) {
        if (!req.files[0]) return res.sendStatus(400);
        var file = req.files[0];
        database.schemas.devices.update({"device": req.params.device, "community": false}, {image: file.location}, () => {
          res.send({
            mimetype: file.mimetype,
            size: file.size,
            location: file.location
          });
        });
    }]);

    /**
     * @api {delete} /devices/:device Delete core device
     * @apiVersion 1.0.0
     * @apiName DeleteDevice
     * @apiPermission Admin
     * @apiGroup Device
     *
     * @apiDescription Edit info about core device
     *
     * @apiSuccess {Number} Status  Http Status
     */
    this._router.delete('/:device', function(req, res, next) {
        database.schemas.devices.remove({"device": req.params.device, "community": false}, handleCallback(res));
    });

    // community devices, keep this separate from core devices
    /**
     * @api {get} /devices/community Get all community devices
     * @apiVersion 1.0.0
     * @apiName GetCommunityDevices
     * @apiPermission none
     * @apiGroup CommunityDevice
     *
     * @apiDescription Get all UBports community devices
     *
     * @apiSuccess {Array} Devices   Returns array of devices
     */
    this._router.get("/community", (req, res, next) => {
      database.schemas.devices.find({"community": true}, (err, devices) => {
        if (err) return handleError(res, err);
        res.send(devices);
      });
    });

    /**
     * @api {post} /devices/community Create new community device
     * @apiVersion 1.0.0
     * @apiName CreateCommunityDevice
     * @apiPermission Admin
     * @apiGroup CommunityDevice
     *
     * @apiDescription Create new community device
     *
     * @apiSuccess {Number} Status Returns http status
     */
    this._router.post('/community', function(req, res, next) {
        if (!req.body) res.sendStatus(400);
        req.body.community = true;
        new database.schemas.devices(req.body).save(handleCallback(res));
    });

    /**
     * @api {get} /devices/community/:device Get community device
     * @apiVersion 1.0.0
     * @apiName GetCommunityDevice
     * @apiPermission none
     * @apiGroup CommunityDevice
     *
     * @apiDescription Get info about one community device
     *
     * @apiSuccess {Object} Devices   Returns device object
     */
    this._router.get("/community/:device", (req, res, next) => {
      database.schemas.devices.findOne({"device": req.params.device, "community": true}, (err, device) => {
        if (err) return handleError(res, err);
        if (!device) return res.sendStatus(404);
        res.send(device);
      });
    });

    /**
     * @api {put} /devices/community/:device Edit community device
     * @apiVersion 1.0.0
     * @apiName EditCommunityDevice
     * @apiPermission Admin
     * @apiGroup CommunityDevice
     *
     * @apiDescription Edit info about community device
     *
     * @apiSuccess {Number} Status  Http Status
     */
    this._router.put('/community/:device', function(req, res, next) {
        if (!req.body) return res.sendStatus(400);
        // NO bad, not allow to change community setting
        req.body.community = true;
        database.schemas.devices.update({"device": req.params.device, "community": true}, req.body, handleCallback(res));
    });

    /**
     * @api {put} /devices/community/image/:device Set/Edit community device image
     * @apiVersion 1.0.0
     * @apiName SetImageCommunityDevice
     * @apiPermission Admin
     * @apiGroup CommunityDevice
     *
     * @apiDescription Edit info about community device
     *
     * @apiSuccess {Number} Status  Http Status
     */
    this._router.put('/community/image/:device', [spaces.upload.array("image", 1), function(req, res, next) {
        if (!req.files[0]) return res.sendStatus(400);
        var file = req.files[0];
        database.schemas.devices.update({"device": req.params.device, "community": true}, {image: file.location}, () => {
          res.send({
            mimetype: file.mimetype,
            size: file.size,
            location: file.location
          });
        });
    }]);

    /**
     * @api {delete} /devices/community/:device Delete community device
     * @apiVersion 1.0.0
     * @apiName DeleteCommunityDevice
     * @apiPermission Admin
     * @apiGroup CommunityDevice
     *
     * @apiDescription Edit info about community device
     *
     * @apiSuccess {Number} Status  Http Status
     */
    this._router.delete('/community/:device', function(req, res, next) {
        database.schemas.devices.remove({"device": req.params.device, "community": true}, handleCallback(res));
    });
  }

  get router() {
    return this._router;
  }

}

module.exports = ApiV1;
