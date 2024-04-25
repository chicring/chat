import {reactive, ref} from 'vue'

export const store =reactive( {

  state: {

    isDrawerOpen : true,

    user: {
      token: '',
      info: {}
    },

  },


  actions: {
    // 设置新的token
    setToken(store) {
      const token = localStorage.getItem('token');
      if (token) {
        store.state.user.token = token;
      }
    },

    // 设置用户信息
    setUserInfo(store) {
      const userInfo = localStorage.getItem('user');
      if (userInfo) {
        store.state.user.info = JSON.parse(userInfo);
      }
      console.log(store.state.user.info)
    },

    LogOut(store){
      //退出操作
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      store.state.user.token = '';
      store.state.user.info = {};
    }
  }

})
