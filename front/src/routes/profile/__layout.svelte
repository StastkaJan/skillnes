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
      props: {}
    }
  }
</script>

<nav>
  <a href="/profile">Základní údaje</a>
</nav>
<slot />

<style>
  :global(main) {
    display: flex;
  }
  nav {
    padding: 80px 50px;
    min-width: 300px;
  }
</style>
