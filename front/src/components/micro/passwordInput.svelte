<script>
  import { passwordVal } from '../../validate/validate'
  import show_off from '$icons/show_off.svg'
  import show_on from '$icons/show_on.svg'

  export let password = '',
    validation = true

  let type = 'password',
    icon = show_off,
    error = ''

  function changeVisibility() {
    if (type === 'password') {
      type = 'text'
      icon = show_on
    } else {
      type = 'password'
      icon = show_off
    }
  }

  // @ts-ignore
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
    <img src={icon} alt="show password" on:click={changeVisibility} />
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
    width: unset;
  }
</style>
