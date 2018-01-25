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

const aws = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const config = require('../../config.json').spaces;

class Spaces {
  constructor() {
    const s3 = new aws.S3({
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
      endpoint: new aws.Endpoint(config.endpoint)
    });

    function fileFilter (req, file, cb){
      var type = file.mimetype;
      var typeArray = type.split("/");
      // TODO: let the apis deside this!
      if (typeArray[0] == "image") {
        cb(null, true);
      }else {
        cb(null, false);
      }
    }

    // TODO: make this unike to each api
    this._upload = multer({
      storage: multerS3({
        s3: s3,
        bucket: 'ubp-testing',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        cacheControl: 'max-age=31536000',
        metadata: function (req, file, cb) {
          cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
          cb(null, Date.now().toString()+path.extname(file.originalname))
        }
      }),
      fileFilter: fileFilter
    });
  }

  get upload() {
    return this._upload;
  }
}

module.exports = Spaces;
