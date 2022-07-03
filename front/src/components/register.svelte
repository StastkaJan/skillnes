<script>
  import { createEventDispatcher } from 'svelte/internal'
  import NameInput from './micro/nameInput.svelte'
  import EmailInput from './micro/emailInput.svelte'
  import PasswordInput from './micro/passwordInput.svelte'

  const dispatch = createEventDispatcher()

  let name = '',
    email = '',
    password = '',
    error = ''

  $: (name || email || password) && (error = '')

  async function register() {
    if (name === '' || email === '' || password === '') {
      error = 'Vyplňte pole formuláře'
      return
    }

    try {
      let res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json'
        },
        body: JSON.stringify({ email, name, password })
      })
      let resJson = await res.json()

      if (resJson.result === 'error') {
        error = resJson.text
      } else if (resJson.result === 'success') {
        dispatch('registered', {
          notifText: resJson.text,
          notifType: resJson.result
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
</script>

<form on:submit|preventDefault={register}>
  <NameInput bind:name />
  <EmailInput bind:email />
  <PasswordInput bind:password />
  {#if error != ''}
    <p class="error">{error}</p>
  {/if}
  <button type="submit">Registrovat</button>
</form>
