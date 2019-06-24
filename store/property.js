
export const state = () => ({

  propertyDetail: {}

})
export const mutations = {

  SET_PROPERTY_DETAIL(state, detail) {
    detail.data.comments = detail.comments
    state.propertyDetail = detail.data
  }
}
export const actions = {

  async getPropertyDetail ({commit}, para) {
    console.log(para)
    const data = await this.$axios.$get(`/api/property/${para.slug}?userId=${para.userId}`)
    commit('SET_PROPERTY_DETAIL', data)
  },

}
