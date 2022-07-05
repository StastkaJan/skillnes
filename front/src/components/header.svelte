<script>
  import { createEventDispatcher } from 'svelte'
  import { session } from '$app/stores'
  import { goto } from '$app/navigation'
  import Logo from '$icons/logo.svelte'

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
    <Logo scrolled={y} />
    Skillnes
  </a>

  <nav>
    <a href="/" sveltekit:prefetch>Domů</a>
    <a href="/teachers" sveltekit:prefetch>Učitelé</a>
    <a href="/schools" sveltekit:prefetch>Školy</a>
    <a href="/subjects" sveltekit:prefetch>Předměty</a>
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
      <a href="/profile" sveltekit:prefetch>Profil</a>
      <button on:click={logout}>Odhlásit</button>
    {/if}
  </nav>
</header>

<style>
  header {
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    font-size: 1.2em;
    z-index: 100;
  }
  header.scrolled {
    position: fixed;
    background: linear-gradient(120deg, #5f1f69 5%, #341de1 65%, #00d5ff 110%);
  }
  header * {
    color: #fff;
  }
  header > a {
    display: flex;
    align-items: center;
    font-size: 1.5em;
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
  button {
    background: #fff3;
  }
</style>
