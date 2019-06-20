
export const state = () => ({

  propertyDetail: {}

})
export const mutations = {

  SET_PROPERTY_DETAIL(state, detail) {
    state.propertyDetail = detail
  }
}
export const actions = {

  async getPropertyDetail ({commit}, para) {
    console.log(para)
    const data = await this.$axios.$get('/api/property/'+para.slug)
    commit('SET_PROPERTY_DETAIL', data)
  },

}
