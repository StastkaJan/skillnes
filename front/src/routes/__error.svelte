<script context="module">
  /** @type {import('@sveltejs/kit').Load} */
  export function load({ error, status }) {
    return {
      props: {
        message: error?.message,
        status
      }
    }
  }
</script>

<script>
  export let message = '',
    status = 0
</script>

<svelte:head>
  <title>Error | Skillnes</title>
</svelte:head>

{#if status == 404}
  <h1>Not found</h1>
{:else}
  <h1>General error</h1>
  <p>{message}</p>
{/if}
