import {reactive, ref} from 'vue'

export const store =reactive( {

  state: {

    isDrawerOpen : true,

    userInfo: {
      token: '',
    },

  },


  actions: {
    // 设置新的token
    setToken(store) {
      const token = localStorage.getItem('token');
      if (token) {
        store.state.userInfo.token = token;
      }
    },

    LogOut(){
      //退出操作
    }
  }

})
