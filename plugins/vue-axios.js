export default function ({ $axios, store }) {
 $axios.onRequest((config) => {
   config.headers.common['access-token'] = store.state.auth ? store.state.auth.accessToken : ''
 })
}
