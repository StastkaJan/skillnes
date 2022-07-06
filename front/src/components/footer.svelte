<script>
  import Notification from '$comp/notification.svelte'

  let timestamp = new Date().getFullYear(),
    email = '',
    text = '',
    error = '',
    notifText = '',
    notifType = '',
    showNotif = false

  $: (email || text) && (error = '')

  async function sendReport() {
    if (email === '' || text === '') {
      error = 'Vyplňte pole formuláře'
      return
    }

    try {
      let res = await fetch(`/api/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json'
        },
        body: JSON.stringify({ email, text })
      })
      let resJson = await res.json()
      if (resJson.result === 'error') {
        error = resJson.text
      } else if (resJson.result === 'success') {
        notifText = resJson.text
        notifType = resJson.result
        showNotif = true
        email = ''
        text = ''
      }
    } catch (err) {
      console.log(err)
    }
  }
</script>

<Notification text={notifText} type={notifType} bind:visible={showNotif} />

<footer>
  <form on:submit|preventDefault={sendReport}>
    <h2>Napište nám!</h2>
    <p>
      Budeme rádi za jakýkoliv názor a uděláme maximum<br />pro Váš příjemný prožitek z používání
      aplikace.
    </p>
    <input name="email" placeholder="email@gmail.com" bind:value={email} />
    <textarea placeholder="Nefunguje mi..." bind:value={text} />
    {#if error != ''}
      <p class="error">{error}</p>
    {/if}
    <button>Odeslat</button>
  </form>
  <p>Skillnes &copy;{timestamp} | By Jan Šťástka</p>
</footer>

<style>
  footer {
    padding: 10px;
    width: 100%;
    background: linear-gradient(120deg, #5f1f69 5%, #341de1 65%, #00d5ff 110%);
  }
  h2,
  p {
    color: #fff;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  textarea {
    width: 50%;
  }
  input {
    max-width: 400px;
  }
  button {
    margin: 10px;
  }
  p {
    margin-top: 20px;
    text-align: center;
  }
  form > p {
    margin-top: 0;
  }
</style>
