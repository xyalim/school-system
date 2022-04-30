import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { login, getUserInfo } from '@/api/api'
import { Message } from 'element-ui'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    userInfo: null,
    role: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  }

}

const actions = {

  /**
   * @description 用户登录
   */
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return login({
      user_number: username,
      password: password
    }).then((response, reject) => {
      const { data, return_msg } = response
      console.log(response)
      if (return_msg === 'OK') {
        commit('SET_TOKEN', data['x-token'])
        setToken(data['x-token'])

        Message({
          message: '登录成功',
          type: 'success',
          duration: 5 * 1000
        })
        return response
      } else {
        reject(response)
      }
    })
  },

  /**
   * @description 获取用户信息
   */
  async getUserInfo({ commit }) {
    const { return_msg, data } = await getUserInfo()
      .catch((err) => {
        console.log(err)
        Message({ type: 'error', message: err })
        commit('SET_USERINFO', null)
        return null
      })

    if (return_msg === 'OK') {
      commit('SET_USERINFO', data)
      return data
    } else {
      commit('SET_USERINFO', null)
    }
  },

  // user logout
  logout({ commit }) {
    removeToken() // must remove  token  first
    resetRouter()
    commit('RESET_STATE')
    Message({
      message: '退出成功',
      type: 'success',
      duration: 5 * 1000
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

