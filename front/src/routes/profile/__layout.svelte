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

<main>
  <nav>
    <a href="/profile" sveltekit:prefetch>Základní údaje</a>
    <a href="/profile" sveltekit:prefetch>Základní údaje</a>
    <a href="/profile" sveltekit:prefetch>Základní údaje</a>
    <a href="/profile" sveltekit:prefetch>Základní údaje</a>
  </nav>
  <slot />
</main>

<style>
  nav {
    position: relative;
    display: flex;
    padding: 10vw 5vw 5vw;
    min-width: 300px;
  }
  nav::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 82px;
    background: linear-gradient(120deg, #5f1f69 5%, #341de1 65%, #00d5ff 110%);
    content: '';
    z-index: -1;
  }
  nav > a {
    padding: 5px 10px;
  }
</style>
