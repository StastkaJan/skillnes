<script>
  import { assets } from '$app/paths'

  import Popup from './popup.svelte'
  import Login from './login.svelte'
  import Register from './register.svelte'

  let title = 'Title',
    visible = false

  $: console.log(assets)

  function navButton(tit = 'Default') {
    title = tit
    visible = !visible
  }
</script>

<header>
  <a href="/">
    <img src="../favicon.svg" alt="page icon" />
    Skillnes
  </a>

  <nav>
    <a href="/">Domů</a>
    <a href="/teachers">Učitelé</a>
    <a href="/schools">Školy</a>
    <button
      on:click={() => {
        navButton('Přihlášení')
      }}
    >
      Přihlášení
    </button>
    <button
      on:click={() => {
        navButton('Registrace')
      }}
    >
      Registrace
    </button>
  </nav>
</header>

<Popup {title} bind:visible>
  {#if title === 'Přihlášení'}
    <Login />
  {:else}
    <Register />
  {/if}
</Popup>

<style>
  header {
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: #fff;
    font-size: 1.2em;
    z-index: 100;
  }
  header > a {
    display: flex;
    align-items: center;
    font-size: 1.5em;
  }
  img {
    margin-right: 10px;
    height: 40px;
  }
  nav > * {
    margin: 0 5px;
  }
  nav > a {
    padding: 5px 10px;
  }
  nav > a:hover {
    border-color: inherit;
  }
</style>
