<script context="module">
  /** @type {import('./__types/index').Load} */
  export async function load({ session, fetch }) {
    try {
      let res = await fetch(`/api/${session.user.email}`)
      let resJson = await res.json()
      return {
        props: {
          user: resJson.user
        }
      }
    } catch (err) {
      console.log(err)
      return {
        status: 500
      }
    }
  }
</script>

<script>
  import { createEventDispatcher } from 'svelte'
  import { session } from '$app/stores'
  import EmailInput from '$comp/micro/emailInput.svelte'
  import NameInput from '$comp/micro/nameInput.svelte'
  import PasswordInput from '$comp/micro/passwordInput.svelte'

  export let user = {
    name: '',
    email: ''
  }

  const dispatch = createEventDispatcher()

  let { name, email } = user,
    password = '',
    error = ''

  $: (email || password) && (error = '')

  console.log(user)

  async function saveDetails() {
    try {
      let res = await fetch(`/api/${user.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      })
      let resJson = await res.json()

      if (resJson.result === 'error') {
        error = resJson.text
      } else if (resJson.result === 'success') {
        dispatch('logged', {
          notifText: resJson.text,
          notifType: resJson.result
        })
        $session.user.email = email
      }
    } catch (err) {
      console.log(err)
    }
  }
</script>

<div>
  <h1>Profil</h1>

  <form on:submit|preventDefault={saveDetails}>
    <NameInput bind:name />
    <EmailInput bind:email />
    <PasswordInput bind:password />
    {#if error != ''}
      <p class="error">{error}</p>
    {/if}
    <button type="submit">Uložit</button>
  </form>
</div>
