<script>
  import { siteVal } from '$val/validate'

  export let site = '',
    validation = true

  let error = ''

  // @ts-ignore
  function handleInput(e) {
    site = e.target?.value

    if (!validation) return

    error = siteVal(site)
  }
</script>

<div>
  <label for="site">Adresa stránky</label>
  <input
    class:error={error.length > 0}
    type="text"
    name="site"
    on:input={handleInput}
    value={site}
  />
  {#if error.length > 0}
    <small>{error}</small>
  {/if}
</div>
