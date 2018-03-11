## 1.插件或第三方库
    1)学会使用vue-router开发单页应用
    2)学会使用axios/vue-resource与后端进行数据交互
    3)学会使用vuex管理应用组件状态
    4)学会使用better-scroll/vue-scroller实现页面滑动效果
    5)学会使用mint-ui组件库构建界面
    6)学会使用vue-lazy实现图片惰加载
    7)学会使用mockjs模拟后台数据接口
## 2.样式/布局/效果相关
    1)学会使用stylus编写模块化的CSS
    2)学会使用Vue.js的过渡编写酷炫的交互动画
    3)学会制作并使用图标字体
    4)学会解决移动端1px边框问题
    5)学会移动端经典的css sticky footer布局
    6)学会flex弹性布局
## 3.main.js文件中配置router路由器
    main.js文件中配置router路由器，所有的route路由组件默认的会有两个属性
    $route 取当前路由组件路径参数
    :class='{on:$route.path===('/msite')}'
    $router 路由导航/切换路由
    1)this.$router.push(path): 相当于点击路由链接(可以返回到当前路由界面)
    2)this.$router.replace(path): 用新路由替换当前路由(不可以返回到当前路由界面)
    3)this.$router.back(): 请求(返回)上一个记录路由
    4)this.$router.go(-1): 请求(返回)上一个记录路由
    5)this.$router.go(1): 请求下一个记录路由
    @click = goto('/msite')
    methods:{
      goto(){
        this.$router.replace(path)
      }
    }
## 4.import@import与link区别
    import 是引入的模块js代码
    @import 引入的是stylus的css代码
    CSS的link和import方式的区别？
      本质上，这两种方式都是为了加载CSS文件，但还是存在着细微的差别。
      差别1：老祖宗的差别。link属于XHTML标签，而@import完全是CSS提供的一种方式。
      link标签除了可以加载CSS外，还可以定义RSS，定义rel连接属性等，@import就只能加载CSS了。
      差别2：加载顺序的差别。当一个页面被加载的时候（就是被浏览者浏览的时候），link引用的CSS会同时被加载，而@import引用的CSS 会等到页面全部被下载完再被加载。所以有时候浏览@import加载CSS的页面时开始会没有样式（就是闪烁），网速慢的时候还挺明显。
      差别3：兼容性的差别。由于@import是CSS2.1提出的所以老的浏览器不支持，@import只有在IE5以上的才能识别，而link标签无此问题。
      差别4：使用dom控制样式时的差别。当使用javascript控制dom去改变样式的时候，只能使用link标签，因为@import不是dom可以控制的。
## 5.组件间通信:
    消息订阅与发布(PubSubJS库)
	  1)订阅消息
	    PubSub.subscribe('msg', function(msg, data){})
	    发布消息
	    PubSub.publish('msg', data)
	    注意
	    优点: 此方式可实现任意关系组件间通信(数据)

	  2)事件的2个重要操作(总结)
	    1)绑定事件监听 (订阅消息)
	    目标: 标签元素  <button>
	    事件名(类型): click/focus
	    回调函数: function(event){}

	  3)触发事件 (发布消息)
	    DOM事件: 用户在浏览器上对应的界面上做对应的操作
	    自定义: 编码手动触发

    组件间通信: slot
	  1)理解
	    此方式用于父组件向子组件传递`标签数据`
	  2)子组件: Child.vue
	  <template>
	  	<div>
	  		<slot name="search">不确定的标签结构1</slot>
	  		<div>{{title 表达式字符串 确定的标签结构}}</div>
	  		<slot name="login">不确定的标签结构2</slot>
	  	</div>
	  </template>
      props:{
        //定义父组件传入给子组件的数据类型
        title:String
      }

	  3). 父组件: Parent.vue
	  <child title='要传的数据字符串'>
	  	<div slot="search">对应的标签结构</div>
	  	<div slot="login">对应的标签结构</div>
	  </child>

    组件间通信1: props
	  1). 使用组件标签时
	  	<my-component name='tom' :age='3' :set-name='setName'></my-component>
	  2). 定义MyComponent时
	    1)在组件内声明所有的props
	    2)方式一: 只指定名称
	    props: ['name', 'age', 'setName']
	  3).方式二: 指定名称和类型
	  	props: {
	  	  name: String,
	  	  age: Number,
	  	  setNmae: Function
	  	}
	  4).方式三: 指定名称/类型/必要性/默认值
	  	props: {
	  	   name: {type: String, required: true, default:xxx},
	  	}
	  5). 注意
	    1)	此方式用于父组件向子组件传递数据
	    2)	所有标签属性都会成为组件对象的属性, 模板页面可以直接引用
	    3)问题:
	    a.如果需要向非子后代传递数据必须多层逐层传递
	    b.兄弟组件间也不能直接props通信, 必须借助父组件才可以

    组件间通信: vue自定义事件
	  1). 绑定事件监听
	    // 方式一: 通过v-on绑定
	    @delete_todo="deleteTodo"
	    // 方式二: 通过$on()
	    this.$refs.xxx.$on('delete_todo', function (todo) {
	    this.deleteTodo(todo)
	  })

	  2). 触发事件
	    // 触发事件(只能在父组件中接收)
	    this.$emit(eventName, data)

	  3). 注意:
	    1)此方式只用于子组件向父组件发送消息(数据)
	    2)问题: 隔代组件或兄弟组件间通信此种方式不合适

## 实现思路
     一.底部导航
        :class={on:$route.path==='/msite'} @click='goto('/msite')'
        methods:{
            goto(path){
              this.$router.replace(path)
            }
          }
     二.头部实现思路
        使用slot组件通信方式通过父组件向子组件传递数据
        抽取子组件
        <slot name="search">//通过slot来占位
        <span class="header_title">
           <span class="header_title_text ellipsis">{{title}}</span> //通过表达式字符串来传递参数数据
        </span>
        <slot name="login">
        props：{
          title:String
        }
        父组件
        <HeaderTop title="昌平区北七家宏福科技园">
              <span class="header_search" slot="search">
                    <i class="iconfont icon-sousuo"></i>
              </span>
              <span class="header_login" slot="login">
                    <span class="header_login_text">登录|注册</span>
              </span>
        </HeaderTop>
     三.登录注册页面
        短信登录或密码登录
        定义登录方式，默认为true
         :class={on:loginWay} @click='setLoginWay(true)'//短信登录
         :class={on:!loginWay} @click='setLoginWay(false)'//密码登录
          data():{
            return:
              loginWay:true
          }
          methdos:{
            setKoginWay(loginWay){
              this.loginWay = loginWay
            }
          }
          返回前一级目录
          @click='$router.push.back'
## 请求参数
          一个是问号? query
          ### 请求URL：
          	http://localhost:3000/shops
          ### 示例：
            [http://localhost:3000/shops?latitude=40.10038&longitude=116.36867]

          一个是冒号:  param
          ### 请求URL：
          	http://localhost:3000/position/:geohash
          ### 示例：
            [http://localhost:3000/position/40.10038,116.36867]
## 前后台交互的ajax
        封装的ajax
        返回的是一个Promise对象，有两个参数(resolve, reject)
        axios 是一个基于 Promise 的 HTTP 客户端，专门为浏览器和 node.js 服务
        promise使用的axios发送请求
              // 发送get请求
              promise = axios.get(url)
            } else {
              // 发送post请求
              promise = axios.post(url, data)
            }
        如果请求成功调用promise.then(response => {
                          resolve(response.data)
                        })
        如果请求失败调用.catch(error => {
                        reject(error)
                        })
        接口文档
        根据接口写ajax请求参数与后台交互模块
          /**
           * 获取地址信息(根据经纬度串)
           */
          export const reqAddress = geohash => ajax('/api/position/' + geohash)

          /**
           * 获取msite页面食品分类列表
           */
          export const reqFoodTypes = () => ajax('/api/index_category')

          /**
           * 获取msite商铺列表(根据经纬度)
           */
          export const reqShops = ({latitude, longitude}) => ajax('/api/shops', {latitude, longitude})
##Vuex的管理状态
        1.state
          保存状态数据的state对象
          export default {
            latitude: 40.10038, // 纬度
            longitude: 116.36867, // 经度
            address: {},  // 地址信息
            foodTypes: [], //食物分类列表
            shops: [], // 商家列表
          }
        2.通过mounted:{
          this.$store.dispatch('getAddress')//通过dispatch发送请求调用action
        }
        3.action
           包含多个事件回调函数的对象
           通过执行: commit()来触发mutation的调用, 间接更新state
           组件中: $store.dispatch('action名称')
          async getAddress({commit, state}) {
            const geohash = state.latitude + ',' + state.longitude
            const result = await reqAddress(geohash)
            commit(RECEIVE_ADDRESS, {address: result.data})
          }
        4.mutation
          1)包含多个直接更新state的方法(回调函数)的对象
          2)谁来触发: action中的commit('mutation名称')
          3)只能包含同步的代码, 不能写异步代码
           [RECEIVE_ADDRESS](state, {address}) {
              state.address = address
            }
        5.定义store对象
          //配置的属性名是固定的
          import Vue from 'vue'
          import Vuex from 'vuex'
          import state from './state'
          import mutations from './mutation'
          import getters from './getters'
          import actions from './actions'
          Vue.use(Vuex)
          export default new Vuex.Store({
            state,
            mutations,
            getters,
            actions
          })
        6.注册store
          //每个组件都拥有$store的属性
          import Vue from 'vue'
          import router from './router'
          import App from './App'
          import store from './store'
          new Vue({
            el: '#app',
            render:h => h(App),
            router,
            store
          })
        7.根据经纬度获取位置详情

## Vuex中mapState的使用方法
       computed:{
          // ...mapState(['address']) 可以是一个函数
          也可以是一个对象
            ...mapGetter({evenOrOdd: 'evenOrOdd2'})

          address(){
              return this.$store.state.address
           }
         }
       }

##es6拼串
 <div class="star" :class="`star-${size}`">
##mock

