<script context="module">
  /** @type {import('./__types/index').Load} */
  export async function load({ session }) {
    if (!session?.user) {
      return {
        status: 302,
        redirect: '/'
      }
    }
    return {
      props: {
        user: session.user
      }
    }
  }
</script>

<script>
  export let user = {}

  console.log(user)
</script>

<h1>Profile</h1>
