<script>
  import { createEventDispatcher } from 'svelte'
  import { session } from '$app/stores'
  import { goto } from '$app/navigation'

  let user = $session.user
  $: user = $session.user

  let y = 0

  const dispatch = createEventDispatcher()

  function navButton(tit = 'Default') {
    dispatch('navButton', {
      tit
    })
  }

  async function logout() {
    try {
      let res = await fetch('/api/logout', {
        method: 'DELETE'
      })
      let resJson = await res.json()

      dispatch('outLogged', {
        notifText: resJson.text,
        notifType: resJson.result
      })

      $session.user = {}

      goto('/')
    } catch (err) {
      console.log(err)
    }
  }
</script>

<svelte:window bind:scrollY={y} />

<header class:scrolled={y > 500}>
  <a href="/">
    <img src="../favicon.svg" alt="page icon" />
    Skillnes
  </a>

  <nav>
    <a href="/">Domů</a>
    <a href="/teachers">Učitelé</a>
    <a href="/schools">Školy</a>
    {#if !user?.email}
      <button
        on:click={() => {
          navButton('Přihlášení')
        }}
      >
        Přihlásit
      </button>
      <button
        on:click={() => {
          navButton('Registrace')
        }}
      >
        Registrovat
      </button>
    {:else}
      <a href="/profile">Profil</a>
      <button on:click={logout}>Odhlásit</button>
    {/if}
  </nav>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    font-size: 1.2em;
    z-index: 100;
  }
  header.scrolled {
    position: fixed;
    top: 0;
    width: 100%;
    background: #fff;
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
