<script>
  import { session } from '$app/stores'
  import { createEventDispatcher } from 'svelte/internal'
  import EmailInput from './micro/emailInput.svelte'
  import PasswordInput from './micro/passwordInput.svelte'

  const dispatch = createEventDispatcher()

  let email = '',
    password = '',
    error = ''

  $: (email || password) && (error = '')

  async function login() {
    if (email === '' || password === '') {
      error = 'Vyplňte pole formuláře'
      return
    }

    try {
      let res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json'
        },
        body: JSON.stringify({ email, password })
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

<form on:submit|preventDefault={login}>
  <EmailInput bind:email validation={false} />
  <PasswordInput bind:password validation={false} />
  {#if error != ''}
    <p class="error">{error}</p>
  {/if}
  <button type="submit">Přihlásit</button>
</form>
