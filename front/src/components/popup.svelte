<script>
  import { fade } from 'svelte/transition'

  export let title = 'Title',
    visible = false
</script>

{#if visible}
  <div class="outer" on:click|self={() => (visible = !visible)} transition:fade={{ duration: 100 }}>
    <div>
      <h2>{title}</h2>
      <slot />
    </div>
  </div>
{/if}

<style>
  div.outer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #0007;
    z-index: 200;
  }
  div > div {
    padding: 50px;
    min-width: 200px;
    background: #fff;
    border-radius: 50px;
  }
  h2 {
    font-size: 2rem;
    text-align: center;
  }
</style>
