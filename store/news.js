
export const state = () => ({

  newsDetail: {}

})
export const mutations = {

  SET_NEWS_DETAIL(state, detail) {
    state.newsDetail = detail
  }
}
export const actions = {

  async getNewsDetail ({commit}, para) {
    console.log(para)
    const data = await this.$axios.$get('/api/news/'+para.slug)
    commit('SET_NEWS_DETAIL', data)
  },

}
