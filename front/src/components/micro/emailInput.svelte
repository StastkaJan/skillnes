<script>
  export let email = '',
    validation = true

  let error = ''

  function handleInput() {
    if (!validation) return

    if (!email.match(/\S+@\S+\.\S{2,3}/)) {
      error = 'Špatný formát emailu'
    } else {
      error = ''
    }
  }
</script>

<div>
  <label for="email">Email</label>
  <input
    class:error={error.length > 0}
    type="text"
    name="email"
    on:input={handleInput}
    bind:value={email}
  />
  {#if error.length > 0}
    <small>{error}</small>
  {/if}
</div>
