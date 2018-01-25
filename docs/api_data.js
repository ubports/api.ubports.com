define({ "api": [
  {
    "type": "post",
    "url": "/devices/community",
    "title": "Create new community device",
    "version": "1.0.0",
    "name": "CreateCommunityDevice",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "group": "CommunityDevice",
    "description": "<p>Create new community device</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Status",
            "description": "<p>Returns http status</p>"
          }
        ]
      }
    },
    "filename": "src/devices/apiv1.js",
    "groupTitle": "CommunityDevice"
  },
  {
    "type": "delete",
    "url": "/devices/community/:device",
    "title": "Delete community device",
    "version": "1.0.0",
    "name": "DeleteCommunityDevice",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "group": "CommunityDevice",
    "description": "<p>Edit info about community device</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Status",
            "description": "<p>Http Status</p>"
          }
        ]
      }
    },
    "filename": "src/devices/apiv1.js",
    "groupTitle": "CommunityDevice"
  },
  {
    "type": "put",
    "url": "/devices/community/:device",
    "title": "Edit community device",
    "version": "1.0.0",
    "name": "EditCommunityDevice",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "group": "CommunityDevice",
    "description": "<p>Edit info about community device</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Status",
            "description": "<p>Http Status</p>"
          }
        ]
      }
    },
    "filename": "src/devices/apiv1.js",
    "groupTitle": "CommunityDevice"
  },
  {
    "type": "get",
    "url": "/devices/community/:device",
    "title": "Get community device",
    "version": "1.0.0",
    "name": "GetCommunityDevice",
    "permission": [
      {
        "name": "none"
      }
    ],
    "group": "CommunityDevice",
    "description": "<p>Get info about one community device</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Devices",
            "description": "<p>Returns device object</p>"
          }
        ]
      }
    },
    "filename": "src/devices/apiv1.js",
    "groupTitle": "CommunityDevice"
  },
  {
    "type": "get",
    "url": "/devices/community",
    "title": "Get all community devices",
    "version": "1.0.0",
    "name": "GetCommunityDevices",
    "permission": [
      {
        "name": "none"
      }
    ],
    "group": "CommunityDevice",
    "description": "<p>Get all UBports community devices</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Devices",
            "description": "<p>Returns array of devices</p>"
          }
        ]
      }
    },
    "filename": "src/devices/apiv1.js",
    "groupTitle": "CommunityDevice"
  },
  {
    "type": "put",
    "url": "/devices/community/image/:device",
    "title": "Set/Edit community device image",
    "version": "1.0.0",
    "name": "SetImageCommunityDevice",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "group": "CommunityDevice",
    "description": "<p>Edit info about community device</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Status",
            "description": "<p>Http Status</p>"
          }
        ]
      }
    },
    "filename": "src/devices/apiv1.js",
    "groupTitle": "CommunityDevice"
  },
  {
    "type": "post",
    "url": "/devices",
    "title": "Create new core device",
    "version": "1.0.0",
    "name": "CreateDevice",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "group": "Device",
    "description": "<p>Create new core device</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Status",
            "description": "<p>Returns http status</p>"
          }
        ]
      }
    },
    "filename": "src/devices/apiv1.js",
    "groupTitle": "Device"
  },
  {
    "type": "delete",
    "url": "/devices/:device",
    "title": "Delete core device",
    "version": "1.0.0",
    "name": "DeleteDevice",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "group": "Device",
    "description": "<p>Edit info about core device</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Status",
            "description": "<p>Http Status</p>"
          }
        ]
      }
    },
    "filename": "src/devices/apiv1.js",
    "groupTitle": "Device"
  },
  {
    "type": "put",
    "url": "/devices/:device",
    "title": "Edit core device",
    "version": "1.0.0",
    "name": "EditDevice",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "group": "Device",
    "description": "<p>Edit info about core device</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Status",
            "description": "<p>Http Status</p>"
          }
        ]
      }
    },
    "filename": "src/devices/apiv1.js",
    "groupTitle": "Device"
  },
  {
    "type": "get",
    "url": "/devices/:device",
    "title": "Get device",
    "version": "1.0.0",
    "name": "GetDevice",
    "permission": [
      {
        "name": "none"
      }
    ],
    "group": "Device",
    "description": "<p>Get info about one device</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Devices",
            "description": "<p>Returns device object</p>"
          }
        ]
      }
    },
    "filename": "src/devices/apiv1.js",
    "groupTitle": "Device"
  },
  {
    "type": "get",
    "url": "/devices",
    "title": "Get all core devices",
    "version": "1.0.0",
    "name": "GetDevices",
    "permission": [
      {
        "name": "none"
      }
    ],
    "group": "Device",
    "description": "<p>Get all UBports code devices</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Devices",
            "description": "<p>Returns array of devices</p>"
          }
        ]
      }
    },
    "filename": "src/devices/apiv1.js",
    "groupTitle": "Device"
  },
  {
    "type": "put",
    "url": "/devices/image/:device",
    "title": "Set/Edit device image",
    "version": "1.0.0",
    "name": "SetImageDevice",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "group": "Device",
    "description": "<p>Edit image for core device</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Status",
            "description": "<p>Http Status</p>"
          }
        ]
      }
    },
    "filename": "src/devices/apiv1.js",
    "groupTitle": "Device"
  }
] });
