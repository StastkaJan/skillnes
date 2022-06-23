<script>
  import EmailInput from './micro/emailInput.svelte'
  import PasswordInput from './micro/passwordInput.svelte'

  let email = '',
    password = ''

  function login() {
    console.log(email, password)
  }
</script>

<form method="POST" on:submit|preventDefault={login}>
  <EmailInput bind:email validation={false} />
  <PasswordInput bind:password validation={false} />
  <button type="submit">Přihlásit</button>
</form>
