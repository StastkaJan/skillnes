<script>
  import { SvelteComponent } from 'svelte/internal'
  import { passwordVal } from '../../validate/validate'

  export let password = '',
    validation = true

  let type = 'password',
    icon = 'show_off',
    error = ''

  function changeVisibility() {
    if (type === 'password') {
      type = 'text'
      icon = 'show_on'
    } else {
      type = 'password'
      icon = 'show_off'
    }
  }

  function handleInput(e) {
    password = e.target?.value

    if (!validation) return

    error = passwordVal(password)
  }
</script>

<div>
  <label for="pasword">Heslo</label>
  <div>
    <input class:error={error.length > 0} {type} name="password" on:input={handleInput} />
    <img src="icons/{icon}.svg" alt="show password" on:click={changeVisibility} />
  </div>
  {#if error.length > 0}
    <small>{error}</small>
  {/if}
</div>

<style>
  div div {
    position: relative;
    width: 100%;
  }
  img {
    position: absolute;
    right: 10px;
    top: 15%;
    height: 70%;
  }
</style>
