<script>
  export let active = ''

  // @ts-ignore
  function handleInput(e) {
    active = e.target.checked ? 'T' : 'F'
  }
</script>

<div>
  <input type="checkbox" name="active" on:input={handleInput} checked={active === 'T'} />
  <label for="active">Zviditelnit stránku</label>
</div>
