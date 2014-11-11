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

  var head = doc.getElementsByTagName('head')[0],
      _module_map = {};
   
  if (typeof _define_ !== 'undefined') {
      return;
  } else {
      win['_define_'] = define;
      win['_require_'] = require;
  } 
  
  /* 
  //防止污染用户后加载的AMD/CMD加载器，统一先使用: _define_, _require_
  if (typeof define !== 'undefined') {
      //If a define is already in play via another AMD loader,
      //do not overwrite.
      if (typeof _define_ !== 'undefined') {
          return;
      } else {
          win['_define_'] = define;
          win['_require_'] = require;
      } 
  } else {
      //此处如果在最前面加载，还是会污染requirejs的定义，考虑使用私有函数名
      win['define'] = define;
      win['require'] = require;
  }
  */


  /**
   * require function implement
   *
   * @param {Array} deps 依赖模块
   * @param {factory} callback 回调函数
   * @access public
   * @return void
  **/
  require = function (deps, callback, errback) {
      if (typeof deps === 'string') {
          deps = [deps];
      }
      //Hack：兼容require的CMD模式
      if (deps.length === 1 && arguments.length === 1) {
          return require['sync'](deps.join(''));
      }

      var depsLen = deps.length,
          loadCount = depsLen,
          url;
      if (depsLen) {
          for(var i = 0; i < depsLen; i++) {
              url = getHashMap(deps[i]);
              loadResource(url, modLoaded);
          }
      } else {
          allModsLoaded();
      }

      function modLoaded() {
          if (! --loadCount) {
              allModsLoaded();
          }
      }

      function allModsLoaded() {
          var exports = [];
          for (var index = 0; index < depsLen; index++) {
              exports.push(require['sync'](deps[index]));
          }
          callback && callback.apply(undefined, exports);
          exports = null;
      }

      //第一次调用define函数后,require 会被修改为真正执行的函数
      //throw new Error("No module definition");
      //errback && errback("No module definition");
  }


  /**
   * Define function implement
   *
   * @param {String} id 模块名
   * @param {Array} deps 依赖模块
   * @param {factory} factory 模块函数
   * @access public
   * @return void
  **/
  define = function (id, deps, factory) {
      var mod = {};

      mod['id'] = id;
      mod['factory'] = factory;
      mod['deps'] = deps;

      _module_map[id] = mod;

      /*require(deps, function(){
          _factory_map[id] = factory;
      });*/
  }

  /*
    兼容同步调用方法
    e.g.:
      var mod = require.sync("mod");
  */
  require['sync'] = function (id) {

      var module, 
          exports, 
          deps,
          args = [];

      if (!hasProp(_module_map, id)) {
          throw new Error('Required unknown module "' + id + '"');
      }

      module = _module_map[id];
      if (hasProp(module, "exports")) {
          return module.exports;
      }

      module['exports'] = exports = {};
      deps =  module.deps;

      for(var depsLen =deps.length, i = 0; i < depsLen; i++) {
          dep = deps[i];
          args.push(dep === "module" ? module : (dep === "exports" ? exports : require['sync'](dep)));
      }

      var ret = module.factory.apply(undefined, args);
      if (ret !== undefined && ret !== exports) {
          module.exports = ret;
      }

      return module.exports;
  }

  //工具方法
  function hasProp(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  //生成realpath，并得到md5后的url路径
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
  function loadResource(url, callback) {

  }


  // under implement
  function regPlugin(id) {

  }


  define.amd = {};

})(window, document);
