/*
	Hummer fis configure
	@2014.10.24
	@enimo
*/

fis.config.set('project.include', 'app/**');//目前均失效，或放在merge{}配置中
// app/以外的其他目录修改时，也会进行watch, 也许有编译，但不会cp到to的目录下，也无大碍

fis.config.merge({

	project : { 
		//include : 'app/**' //只有命中include的文件才被视为源码，其他文件则忽略。
	},

	roadmap : {
		//ext : {
		//	less : 'css'
		//},
		domain : {
			'/css/**.css' : 'http://css.bdstatic.com',
			'**.js' : 'http://js.bdstatic.com',
			'image' : ['http://img.bdstatic.com'],
		},
		
		path : [
			{
				reg : /^\/(.*)\/(.*\.js)$/i, // also: '**.js'
				release : '/static/j/$2' // also: '/static/js$&' 或者简化src/下的目录结构
			},
			/*
			{
				reg : '**.css',
				//useSprite: true, //是否开启合图，在后面单独配置
				release : '/static/c$&'
			},
			*/
			{
				reg : /^\/(.*)\/(.*\.css)$/i, // also: '**.css'
				release : '/static/c/$2' // also: '/static/c$&' 或者简化src/下的目录结构
			},
			{
				reg : /^\/(.*)\/(.*\.(?:png|gif))/i, //: /\/img\/(.*\.(?:png|gif))/i, => $1
				release : '/static/i/$2'
			},
			{
				reg : /test_define\.js/i,
				isMod : true //是否增加define(...)
			}
		]
	},
	//end roadmap

	//注：使用打包，需先进行插件安装 npm install -g fis-postpackager-simple，看文末
	pack : {
		//打包所有的demo.js, script.js文件, 将内容输出为static/js/pkg.js文件
        'js/pkg.js' : ['**/main.js', /\/script\.js$/i],
        //打包所有的css文件,将内容输出为static/css/pkg.css文件
        'css/pkg.css' : '**.css'
	},
	//end pack

	deploy : {

		'rd-test-tpl' : {
			receiver : 'http://enimo.baidu.com/receiver.php',
			from : '/',
			to : '/home/enimo/public_html/template',
			include : /\.tpl$/i,
			replace : {
				from: 'test.hummer.baidu.com',
				to : 'hummer.baidu.com'
			}
		},

		//fis release --md5 --optimize --pack --domain --dest rd-test-static
		//--md5 --optimize --pack -->可省略为--> -omp
		'rd-test-static' : {
			receiver : 'http://enimo.baidu.com/receiver.php',
			from : '/static', 
			to : '/home/enimo/public_html/template',
			include : /\.js$/i,
			exclude : /\/components\//i,
			replace : {
				from: 'test.hummer.baidu.com',
				to : 'hummer.baidu.com'
			}
		},

		//--optimize //命令对js、css、html、htm文件进行压缩
		//fis release --md5 --optimize --dest local
		'local-dev-tpl' : {
			exclude : /\.(js|css|png|gif|jpg|jpeg)$/i,
			to : './dist_tmp'
		},

		'local-dev-static' : {
			//from : 'app/', //from 内的值与url无关
			include : /\.(js|css|png|gif|jpg|jpeg)$/i,
			to : './dist_tmp/app'
		},

		//fis release --md5 --optimize --pack --domain --dest local-build
		'local-build' : {
			to : './dist'
		}
	}
	//end deploy

});

//配置压缩后最大单行字节数以及css保留换行，规避smarty解析异常
fis.config.set('settings.optimizer.uglify-js.output.max_line_len', 500);
fis.config.set('settings.optimizer.clean-css.keepBreaks', true);


//是否开启图片合并功能
/*
fis.config.set('roadmap.path', [{
    reg: '**.css',
    useSprite: true
}]);
fis.config.set('settings.spriter.csssprites.margin', 20);
*/

//设置md5与文件的连字符,默认值：'_'
//fis.config.set('project.md5Connector ', '.');


//项目源码文件过滤,只有命中include的文件才被视为源码，其他文件则忽略。
//fis.config.set('project.include', 'app/**');//或放在merge{}配置中


// 取消下面的注释开启simple插件，注意需要先进行插件安装 npm install -g fis-postpackager-simple
// fis.config.set('modules.postpackager', 'simple');

//通过pack设置干预自动合并结果，将公用资源合并成一个文件，更加利于页面间的共用

// 取消下面的注释开启pack人工干预
/*
fis.config.set('pack', {
        //指定打包方式
        'js/libs.js': [
	        '/lib/mod.js',
	        '/modules/underscore/**.js',
	        '/modules/backbone/**.js',
	        '/modules/jquery/**.js',
	        '/modules/vendor/**.js',
	        '/modules/common/**.js'
	    ]
});
*/

// 取消下面的注释可以开启simple对零散资源的自动合并
// fis.config.set('settings.postpackager.simple.autoCombine', true);

/*
//fis release 运行时 有报错，暂忽略
fis.config.init({
    project : {
        charset : 'utf8',
        md5Length : 8
    }
});
*/



// ===== CMD =====
// cd ./
// fis server start --root ./dist_tmp/app
// fis release --watch --live --md5 --dest local-dev

// cd ./
// npm start # start the server
// npm run dev # dev and debug
// npm stop #stop server


