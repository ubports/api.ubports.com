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

const deviceAliasSchema = new Schema({
  device: {
    type: String,
    required: true,
    unique: true
  },
  aliasFor: { type: String, ref: "devices" , required: true}
});

const deviceSchema = new Schema({
    device: { // Device codename, this needs to unique
      type: String,
      required: true,
      unique: true
    },
    alias: Array, // Alternative device codenames
    date: Date, // Internal create date
    modify: { // See when and who modifyed it last
      date: Date,
      user: String
    },
    community: Boolean, // Is the device a community device
    name: { // Human-readable device name
      type: String,
      required: true
    },
    priority: { // priority is set to be able to list devices in a logical order
      type: Number,
      required: false
    },
    specs: { // Device specs
      formFactor: String, // phone, tablet, etc.
      screenSize: String, // screen size in inches
      screenResolution: String, // screen resolution in pixels
      cameraResolution: { // camera resolution
        front: String, // front camera resolution in mp
        back: String // front camera resolution in mp
      },
      cpu: String, // cpu type
      ram: String, // ram size
      storage: String, // storage size
      sdCardSlot: Boolean, // does the device support sd cards
      supportedNetworks: {
        gsm: Boolean, // does the device support GSM
        cdma: Boolean // does the device support CDMA
      }
    },
    whatIsWorking: { // Current status of the device
      display: Boolean,
      touch: Boolean,
      haptics: Boolean,
      usb: Boolean,
      bluetooth: Boolean,
      celluar: {
        voice: Boolean,
        sms: Boolean,
        data: Boolean
      },
      camera: {
        front: Boolean,
        back: Boolean
      },
      rotation: Boolean,
      wifi: Boolean,
      gps: Boolean,
      audio: {
          input: Boolean,
          output: Boolean
      },
      stable: Number // 1 bad, 2 somewhat good, 3 good, 4 no issues
    },
    about: { // Markdown about the device text
      type: String,
      required: true
    },
    maintainer: { // Who is maintaning this, can be more than one
      type: Array,
      required: true
    },
    comment: String, // Optinal comment, this is used in specal cases (example with special install instructions)
    build: { //
      enable: Boolean, // Can it be built
      stable: Boolean // Is it built for the stable channel
    },
    image: String, // Device pictue
    video: String, // Device video
    deviceLogo: String, // Device logo
    install: {  // Install info
      installable: { // Can it be installed (have system-image server)
        type: Boolean,
        required: true
      },
      multirom: Boolean, // Does it support multirom
      installSettings: { // Installation infomation
        bootstrap: Boolean, // Device support fastboot boot
        fastboot: Boolean, // Device supports fastboot
        download: Boolean, // Samsung download mode
        method: String, // Method to install with, currently only supports system-image
        oemUnlockable: Boolean, // Can the bootloader be unlocked
        special: String
      },
      images: Array, // Device images (recovery.img and boot.img)
      /*
      [
        type: "logo",
        url: "http://logo.png",
        checksum: "dsdsds"
      ]
      */
      buttons: { // Buttons needed to get to the different states
        bootloader: {
          button: String,
          instruction: String
        },
        recovery: {
          button: String,
          instruction: String
        },
        download: {
          button: String,
          instruction: String
        }
      },
      systemServer: {
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
    ubuntuId: {
      type: String,
      required: true
    },
    isMember: {
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

  deviceAliasSchema.pre("save", (next) => {
    if (!this.date)
      this.date = new Date();
    next();
  })
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
  {name: "deviceAlias", schema: deviceAliasSchema},
  {name: "devices", schema: deviceSchema},
  {name: "users", schema: usersSchema},
  {name: "installReport", schema: installReportSchema}
]
