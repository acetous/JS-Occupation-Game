/* global Worker */
define(["util/Ajax"], function (Ajax) {

  "use strict";

  var WORKER_DIR = "worker/";
  var DROPPED_WORKER_DIR = "droppedworker/";

  /**
   * Pass a workername (a js file on the server) or a local file.
   *
   * @param file0 {String | File}
   * @param file1 {String | File}
   * @param isDropped {Boolean}
   */
  var WorkerDisposer = function(file0, file1, isDropped) {
    this.file0 = file0;
    this.file1 = file1;
    this.isDropped = isDropped;
  };

  /**
   * @returns {[String]}
   */
  WorkerDisposer.prototype.getNames = function() {
    return [getName(this.file0), getName(this.file1)];
  };

  /**
   * @returns {[Worker]}
   */
  WorkerDisposer.prototype.createWorkers = function() {
    function LocalWorker(name) {
      var worker = new window[name]();

      this.postMessage = function(params) {
        return worker.onmessage({data: params});
      }
    }
    return [
      new LocalWorker("Bot1"),
      new LocalWorker("Bot2")
    ];
  };

  /** @private */
  WorkerDisposer.prototype.createWorker = function(file) {
    //if (!isLocalFile(file)) {
    Ajax.getWorkerFile(file, false);
    //}
    /*
    var objectURL = window.URL.createObjectURL(file);
    var worker = new Worker(objectURL);
    window.URL.revokeObjectURL(objectURL);
    */
    var worker = window[file.replace(".js", "")];
    if (typeof worker == 'function') {
      return worker();
    } else {
      throw "Could not load worker";
    }
  };

  var getName = function(file) {
    if (isLocalFile(file)) {
      return file.name;
    } else {
      return file;
    }
  };

  var isLocalFile = function(file) {
    return typeof file !== 'string';
  };

  return WorkerDisposer;
});