<script>
  import { nameVal } from '../../validate/validate'

  export let name = '',
    validation = true

  let error = ''

  // @ts-ignore
  function handleInput(e) {
    name = e.target?.value

    if (!validation) return

    error = nameVal(name)
  }
</script>

<div>
  <label for="name">Jméno</label>
  <input
    class:error={error.length > 0}
    type="text"
    name="name"
    on:input={handleInput}
    value={name}
  />
  {#if error.length > 0}
    <small>{error}</small>
  {/if}
</div>
