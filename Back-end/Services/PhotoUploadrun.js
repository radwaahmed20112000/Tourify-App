var assert = require('assert');
const express = require('express');

const { readFile } = require('fs/promises');
const { uploadPhotosToAzure } = require('./PhotoUpload');
const app = express();

uploadPhotosToAzure("photos");

module.exports = app ;