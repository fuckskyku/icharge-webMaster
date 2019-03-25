# newlife-webmaster

##  项目介绍
### 一、项目定位：
	「新活充电」致力于解决：

（一）为新能源车主指引一个合适的充电桩位置（当前闲置没有其他车停在这个车位上、位置最近、价格最优的）；

（二）为桩站免费建立门闸，阻挡非充电车辆随意进入；

（三）给桩站提供管理后台，让他们查看电费和资金的情况。

用户需要先注册成为《爱充电》会员，充值买电后才能使用爱充电平台接好的充电桩站的服务 。
### 二、项目类型：
    给桩站提供管理后台，让他们查看电费和资金的情况；为桩站免费建立门闸，阻挡非充电车辆随意进入。
### 三、主要负责：
    本人在「新活充电」项目中主要负责：
####    1、前端页面的搭建：
			 
####    2、动画效果：
			通过使用animate动画库实现。
            动画实现需先导入动画库：npm install animate.css -S;
            再以<transition-group enter-active-class="animated fadeInUp" leave-active-class="animated fadeOut">
            </transition-group>这组标签将需要设置动画的部分包起来，在enter-active-class中写入想添加的进入动画效果名称，leave-active-class中写入退出动画效果名称。
####    3、功能实现：
			页面之间的切换，点击进入查看详情。后续继续完善。
####    4、实现与后台数据的交互：
			可从后台获取数据，并完整渲染到页面上。
            获取数据通过axios实现：
            最后通过{{source}}的或者<img :src=source.src>的方式渲染在页面上。
			***************************
			在vue1.x的时候，vue的官方推荐HTTP请求工具是vue-resource，
			但是在vue2.0的时候将推荐工具改成了axios。
			使用方式都差不多，但需要注意的是：接口返回的res并不直接是返回的数据，
			而是经过axios本身处理过的json对象。真正的数据在res.data里。
			***************************
####	5、登录模块是使用vuex来实现的:
			*************************
			vue提供了一个数据管理工具vuex，有点类似于angular中factory和service，可以进行数据上的通信。
			比如存储一些公共变量或者是不同组件间的数据处理等。
			*************************
			在远程仓库中，我们首先初始化了一个用户的列表数组，
			然后在登录的组件中，通过this.$store.state获取远程仓库里面的token，
			
			然后通过修改location的href属性，跳转到oneball的首页。
			注册板块就是在表单中通过v-model绑定双向数据，然后在点击提交注册的时候，
			通过commit调用远程仓库中mutations中的方法，将注册页面中表单的数据，传递过去。
			然后在mutations中使用对应的方法。将接收到的数据添加到用户列表的数组中。
			最后再次修改location的href属性，跳转到登录页面进行登录。
## 技术应用：
######  Vue.js：
			渐进式JavaScript框架；
######	Vue-cli：
			交互式项目脚手架，构建在webpack之上；
			npm install --global vue-cli
			vue init webpack xxx
######  Router：
			嵌套的路由/视图映射，模块化，基于组件的路由器配置，包含路由参数、查询、通配符；
			npm install vue-router
######	vuex:  
			是一个专为 Vue.js 应用程序开发的状态管理模式；
			npm install vuex --save
######	vue-cookies:  
			主要是用于用于处理浏览器cookie;由于vue自己不带,所以需要自己安装依赖；
			npm install vue-cookies --save
######	vuex-persistedstate:  
			vuex可以进行全局的状态管理，但刷新后刷新后数据会消失，结合本地存储做到数据持久化
			npm install vuex-persistedstate --save
			main.js中挂载Vue.prototype.$store = store;
######  Element-ui：
			网站快速成型工具，使用前端框架封装的代码；
			npm i element-ui -S
######	less/sass：
		1.sass
		npm install node-sass --save-dev
		npm install sass-loader --save-dev
		webpack.base.config.js中loaders里面加
		{
			test: /\.scss$/,
			loaders: ["style", "css", "sass"]
       	},
		<style lang="scss" scoped="" type="text/css"></style>
		2.less
		npm install less less-loader --save-dev
		
		
######	animate.css：
			预设css3动画库；
			npm install animate.css --save
######	babel-polyfill：
			将ES6代码转为ES5代码，从而可以在现有环境执行；
			在webpack.base.conf.js文件中
			1.引入babel-polyfill=>require("babel-polyfill") 
			2. 
			entry: {
				app: './src/main.js'
			},
			改为>>
			entry: {
				app: ['babel-polyfill', './src/main.js']
			},
			npm install --save babel-polyfill
			npm install --save-dev babel-polyfill
######  axios：
			基于promise的HTTP库，可以用在浏览器和node.js中，可执行创建http请求，支持Promise API；可实现拦截请求和响应，转换请求数据和响应数据，取消请求，自动转换 JSON 数据。
			npm install --save axios 
	
## 运行项目


### 克隆整个项目到本地
git clone 

### 切换到项目所在文件夹
cd newlife-webMaster

### 安装依赖
npm install ...

### 打开浏览器，输入localhost:8080即可访问
npm run dev
