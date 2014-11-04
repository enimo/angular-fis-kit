/**
 * Simple AMD Loader
 *
 * @create: 2014.11.3
 * @update: 2014.11.4
 * @author: luoqin
 * @refer: define, require, AMD Draft
 */

var require, define;

(function(win, doc){

  var _module_map = {},
      _factory_map = {};

  var head = document.getElementsByTagName('head')[0];
   
  if (typeof define !== 'undefined') {
        //If a define is already in play via another AMD loader,
        //do not overwrite.
        return;
  } 

  function hasProp(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }


  /**
   * require function implement
   *
   * @param {Array} dependencies 依赖模块
   * @param {factory} callback 回调函数
   * @access public
   * @return void
  **/
  function require(deps, callback) {
    //第一次调用define函数后,require 会被修改为真正执行的函数
    throw new Error("No module definition");
  }
  

  /**
   * Define function implement
   *
   * @param {String} id 模块名
   * @param {Array} dependencies 依赖模块
   * @param {factory} factory 模块函数
   * @access public
   * @return void
  **/
  function  define(argument) {
     // body...
  }



  function load(url, callback) {

  }

  function getHashMap(key) {
    // HACK: 统一线上环境添加的方法
    // 参考: http://phpjs.org/functions/realpath/
    var realpath = function(path) {
        var arr = [];

        if (path.indexOf('://') !== -1) {
            return path;
        }

        arr = path.split('/');
        path = [];

        for (var k = 0, len = arr.length; k < len; k++) {
            if (arr[k] == '.') {
                continue;
            }
            if (arr[k] == '..') {
                if (path.length >= 2) {
                    path.pop();
                }
            } else {
                if (!path.length || (arr[k] !== '')) {
                    path.push(arr[k]);
                }
            }
        }

        path = path.join('/');

        return path.indexOf('/') === 0 ? path : '/' + path;
    };

    key = realpath(key);

    if (typeof _MD5_HASHMAP !== 'undefined') {
        var url = _MD5_HASHMAP[key];
        if (url) {
            return url;
        }
    }
    return key;
  };

  function requireSync(id) {
    //第一次调用define函数后,require 会被修改为真正执行的函数
    throw new Error("No module definition");
  }


  function regPlugin(id) {

  }


})(window, document);