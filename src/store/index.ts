import { createStore } from 'vuex'
import autos from './autos';

export interface State {
  post: {
    id: number;
    title: string;
    body: string;
  }
}

export default createStore({
  state: {
    post: {
      id: 101,
      title: "Global post",
      body: "global post body"
    }
  },
  getters: {
    getPost(state) {
      return {...state.post, title: "Global Post Getter"}
    }
  },
  mutations: {
    changePost(state, payload) {
      state.post.id = payload.id
    }
  },
  actions: {
    setId({state, commit}, id) {
      console.log("action works " + id);
      commit("changePost", {id: id});
    }
  },
  // Для доп стэйтов
  modules: {
    auto: autos
  }
})
