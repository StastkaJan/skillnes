<script>
  export let title = 'Default text'
</script>

<div>
  <slot />
  <h2>{title}</h2>
</div>

<style>
  div {
    justify-self: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 50px;
    min-width: 250px;
    max-width: 300px;
    height: 100%;
    border-radius: 20px;
    box-shadow: 0 0 20px 0 #ddd;
  }
  h2 {
    margin-bottom: 0;
  }
</style>
