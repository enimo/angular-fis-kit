/**
 * Simple AMD Loader
 *
 * @create: 2014.11.3
 * @update: 2014.11.6
 * @author: enimo <enimong@gmail.com>
 * @refer: define, require, AMD Draft
 * @formatter&jslint: fecs xx.js --check 
 */


(function(win, doc){

  var require, define;

  var _module_map = {},
      _factory_map = {};

  var head = doc.getElementsByTagName('head')[0];
   
  if (typeof define !== 'undefined') {
      //If a define is already in play via another AMD loader,
      //do not overwrite.
      if (typeof _define_ !== 'undefined') {
          return;
      } else {
          win['_define_'] = define;
          win['_require_']= require;
      } 
  } else {
      win['define'] = define;
      win['require'] = require;
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
  function require(deps, callback, errback) {
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


  function getHashMap(key) {
    // same as php realpath()
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


  /*
  依赖关系映射表数据结构：
  {
    ‘mod/a’: { 
      ‘deps’: [‘mod/c’, ‘mod/d’]
    }
  }
  */
  function handlerDepends(id, callback) {

  }

  
  /*
  合并以及MD5编译后映射表数据结构：
  {
    ‘mod/a’: {
      ‘pkg’: ’/static/j/pkg_md5.js’,
      ‘src’: ’/static/j/a_md5.js’
    },
    ‘mod/b’:{
      ‘src’: ’/static/j/b_md5.js’
    }
  }
  */
  function loadResource(id, callback) {

  }

  /*
    兼容同步调用方法
    e.g.:
      var mod = require("mod");
  */
  require['sync'] = function (id) {
    //第一次调用define函数后,require 会被修改为真正执行的函数
    throw new Error("No module definition");
  }


  function regPlugin(id) {

  }

  define.amd = {};

})(window, document);
