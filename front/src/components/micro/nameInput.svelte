<script>
  export let name = '',
    validation = true

  let error = ''

  function handleInput() {
    if (!validation) return

    if (name.length < 3) {
      error = 'Jméno je příliš krátké'
    } else {
      error = ''
    }
  }
</script>

<div>
  <label for="name">Jméno</label>
  <input
    class:error={error.length > 0}
    type="text"
    name="name"
    on:input={handleInput}
    bind:value={name}
  />
  {#if error.length > 0}
    <small>{error}</small>
  {/if}
</div>
