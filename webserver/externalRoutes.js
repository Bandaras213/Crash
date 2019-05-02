const fetch = require("node-fetch");
module.exports = (function() {
    'use strict';
    var files = require('express').Router();
  
  fetch("https://feather-guan.glitch.me/webserver/view/about.html", {
    method: "GET",
  })
    .then(fetch1 => fetch1.text())
    .then(async fetch1 => {

    files.get('/', function (req, res) {
         res.send(fetch1);
    });
  });

    return files;
})();