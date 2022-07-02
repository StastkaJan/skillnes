<script>
  import { createEventDispatcher } from 'svelte'
  import { session } from '$app/stores'
  import { goto } from '$app/navigation'

  let user = $session.user
  $: user = $session.user

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
      res = await res.json()

      dispatch('outLogged', {
        notifText: res.text,
        notifType: res.result
      })

      $session.user = {}

      goto('/')
    } catch (err) {
      console.log(err)
    }
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
