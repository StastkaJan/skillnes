<script>
  import NameInput from './micro/nameInput.svelte'
  import EmailInput from './micro/emailInput.svelte'
  import PasswordInput from './micro/passwordInput.svelte'

  let name = '',
    email = '',
    password = ''

  async function register() {
    console.log(name, email, password)
    try {
      const submit = await fetch('/api/register')
      console.log(submit)
      const data = await submit.json()
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }
</script>

<form method="POST" on:submit|preventDefault={register}>
  <NameInput bind:name />
  <EmailInput bind:email />
  <PasswordInput bind:password />
  <button type="submit">Registrovat</button>
</form>
