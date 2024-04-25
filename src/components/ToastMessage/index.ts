import { createApp } from 'vue'
import ToastMessage from './ToastMessage.vue'
import vuetify from '@/plugins/vuetify'

const toastMessage  = (options:{})  => {
  // 创建元素节点
  const rootNode = document.createElement("div")
  // 在body标签内部插入此元素
  document.body.appendChild(rootNode)
  // 创建应用实例（第一个参数是根组件。第二个参数可选，它是要传递给根组件的 props，就是<v-snackbar :props="options" />）
  const app = createApp(ToastMessage, {
    ...options,
    hide() {
      // 卸载已挂载的应用实例
      app.unmount();
      // 删除rootNode节点
      document.body.removeChild(rootNode)
    }
  })
  //新创建的app中没有引用vuetify时会报错提示vuetify没有实例
  //可以参考 https://github.com/vuetifyjs/vuetify/discussions/16026
  app.use(vuetify)
  // 将应用实例挂载到创建的 DOM 元素上
  return app.mount(rootNode)
}

// 注册插件app.use()会自动执行install函数
toastMessage.install = (app:any) => {
  // 注册全局属性，类似于 Vue2 的 Vue.prototype
  app.config.globalProperties.$toastMessage = (options:any) => toastMessage(options).show()
}
// 定义show方法用于直接调用
toastMessage.show = (options:any) => toastMessage(options).show()

export default toastMessage
