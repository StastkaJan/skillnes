<script>
  export let text = 'Registrace proběhla úspěšně',
    type = 'success',
    visible = false

  $: visible &&
    setTimeout(() => {
      visible = false
    }, 5000)
</script>

{#if visible}
  <div class={type}>
    <p>{text}</p>
  </div>
{/if}

<style>
  div {
    position: fixed;
    top: 82px;
    right: 0;
    left: 0;
    color: #fff;
    z-index: 1000;
  }
  p {
    text-align: center;
    font-size: 1.2em;
  }
  .success {
    background: green;
  }
  .error {
    background: red;
  }
</style>
