import { createStore } from 'vuex'
import { fetchAllApi, fetchDetailInfo } from '../api/index.js'

export default createStore({
  state: {
    movieList: [],
    movieInfo: {}
  },
  actions: {
    // 전체 데이터 호출
    fetchMovieList({commit}){
      fetchAllApi()
      .then(res => {
        // commit 으로 결과 전송
        commit('MOVIE_LIST_INIT', res.data)
      })
      .catch(err => console.log(err))
    },
    // 상세 데이터 호출
    fetchMovieInfo({commit}, _id){
      fetchDetailInfo(_id)
      .then(res => {
        commit('MOVIE_INFO', res.data)
      })
      .catch(err => console.log(err))
    }
  },
  mutations: {
    // actions 에서 전송받은 데이터 저장
    MOVIE_LIST_INIT(state, payload){
      state.movieList = payload;
    },
    MOVIE_INFO(state, payload){
      state.movieInfo = payload;
    }
  },
  getters: {
    // 전체 데이터 출력 및 참조
    getMovieList(state){
      return state.movieList
    },
    getMovieInfo(state){
      return state.movieInfo
    }
  }
});