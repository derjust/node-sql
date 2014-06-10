'use strict';

var util = require('util');
var assert = require('assert');

var Mssql = function() {
  this.output = [];
  this.params = [];
};

var Mysql = require(__dirname + '/mysql');

util.inherits(Mssql, Mysql);

Mssql.prototype._myClass = Mssql;

Mssql.prototype._quoteCharacter = '';

Mssql.prototype._arrayAggFunctionName = 'GROUP_CONCAT';

Mssql.prototype._getParameterPlaceholder = function(index, value) {
  return '@param' + index;
};
/*
Mssql.prototype._getParameterValue = function(value) {
  if (Buffer.isBuffer(value)) {
    value = 'x' + this._getParameterValue(value.toString('hex'));
  } else {
    value = Mysql.prototype._getParameterValue.call(this, value);
  }
  return value;
};
*/
Mssql.prototype.visitReturning = function() {
  throw new Error('MSSQL does not allow returning clause.');
};

Mssql.prototype.visitForShare = function() {
  throw new Error('MSSQL does not allow FOR SHARE clause.');
};
/*
Mssql.prototype.visitCreate = function(create) {
  var result = Mssql.super_.prototype.visitCreate.call(this, create);
  var engine = this._queryNode.table._initialConfig.engine;
  var charset = this._queryNode.table._initialConfig.charset;

  if ( !! engine) {
    result.push('ENGINE=' + engine);
  }

  if ( !! charset) {
    result.push('DEFAULT CHARSET=' + charset);
  }

  return result;
};
*/
Mssql.prototype.visitRenameColumn = function(renameColumn) {
  throw new Error('MSSQL does not allow returning clause.');
};
/*
Mssql.prototype.visitInsert = function(insert) {
  var result = Mysql.prototype.visitInsert.call(this, insert);
  if (result[2] === 'DEFAULT VALUES') {
    result[2] = '() VALUES ()';
  }
  return result;
};*/

Mssql.prototype.visitIndexes = function(node) {
  throw new Error('MSSQL does not allow returning clause.');
};

module.exports = Mssql;
