export default function ({ route, $axios, redirect }) {
  // If the user is authenticated redirect to home page
  $axios.post(`/api/property/check/${route.params.id}`)
    .then(res => {})
    .catch(err => {
      return redirect('/')
    })
}
