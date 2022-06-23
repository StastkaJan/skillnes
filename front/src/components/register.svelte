<script>
  import NameInput from './micro/nameInput.svelte'
  import EmailInput from './micro/emailInput.svelte'
  import PasswordInput from './micro/passwordInput.svelte'

  let name = '',
    email = '',
    password = ''

  function register() {
    console.log(name, email, password)
  }
</script>

<form method="POST" on:submit|preventDefault={register}>
  <NameInput bind:name />
  <EmailInput bind:email />
  <PasswordInput bind:password />
  <button type="submit">Registrovat</button>
</form>
