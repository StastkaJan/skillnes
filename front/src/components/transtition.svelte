<script>
  import { fade, fly } from 'svelte/transition'

  export let url = ''
</script>

{#key url}
  <div in:fade={{ duration: 500 }} out:fade={{ duration: 100 }}>
    <slot />
  </div>
{/key}
