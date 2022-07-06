<script>
  import { bioVal } from '$val/validate'

  export let bio = '',
    validation = true

  let error = ''

  // @ts-ignore
  function handleInput(e) {
    bio = e.target?.value

    if (!validation) return

    error = bioVal(bio)
  }
</script>

<div>
  <label for="bio">Text o Vás</label>
  <textarea class:error={error.length > 0} name="bio" on:input={handleInput} value={bio} />
  {#if error.length > 0}
    <small>{error}</small>
  {/if}
</div>
