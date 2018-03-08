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
