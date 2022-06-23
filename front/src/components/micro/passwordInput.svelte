<script>
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
    password = e.target.value

    if (!validation) return

    if (password.length < 8) {
      error = 'Heslo musí mít alespoň 8 znaků'
    } else if (!password.match(/\d/)) {
      error = 'Heslo musí obsahovat číslici'
    } else if (!password.match(/[a-z]/)) {
      error = 'Heslo musí obsahovat malé písmeno'
    } else if (!password.match(/[A-Z]/)) {
      error = 'Heslo musí obsahovat velké písmeno'
    } else if (password.match(/\s/)) {
      error = 'Heslo nesmí obsahovat mezeru'
    } else {
      error = ''
    }
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
