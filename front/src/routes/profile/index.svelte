<script context="module">
  import { nameVal } from '$val/validate.js'
  /** @type {import('./__types/index').Load} */
  export async function load({ session, fetch }) {
    try {
      let res = await fetch(`/api/${session.user.email}`)
      res = await res.json()
      return {
        props: {
          user: res.user
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

  export let user = {}

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
      res = await res.json()

      if (res.result === 'error') {
        error = res.text
      } else if (res.result === 'success') {
        dispatch('logged', {
          notifText: res.text,
          notifType: res.result
        })
        $session.user = { email }
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
