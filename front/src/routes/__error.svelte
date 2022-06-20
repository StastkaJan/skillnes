<script context="module">
  export function load({ error, status }) {
    return {
      props: {
        message: error.message,
        status
      }
    }
  }
</script>

<script>
  import ErrorScreen from '../screens/errors/e.svelte' // your own Error screen component
  import NotFoundScreen from '../screens/errors/e404.svelte' // your own 404 screen component

  export let message, status
</script>

{#if status == 404}
  <NotFoundScreen />
{:else}
  <ErrorScreen {message} {status} />
{/if}
