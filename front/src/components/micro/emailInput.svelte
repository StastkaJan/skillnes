<script>
  import { emailVal } from '../../validate/validate'

  export let email = '',
    validation = true

  let error = ''

  function handleInput(e) {
    email = e.target?.value

    if (!validation) return

    error = emailVal(email)
  }
</script>

<div>
  <label for="email">Email</label>
  <input class:error={error.length > 0} type="text" name="email" on:input={handleInput} />
  {#if error.length > 0}
    <small>{error}</small>
  {/if}
</div>
