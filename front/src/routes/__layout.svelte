<script>
  import Header from '../components/header.svelte'
  import Footer from '../components/footer.svelte'
  import Notification from '../components/notification.svelte'
  import Popup from '../components/popup.svelte'
  import Login from '../components/login.svelte'
  import Register from '../components/register.svelte'

  let notifText = 'Text',
    notifType = 'success',
    notifVisible = false

  let title = 'Title',
    visible = false

  function showPopup(event) {
    title = event.detail.tit
    visible = true
  }

  function showNotification(event) {
    notifText = event.detail.notifText
    notifType = event.detail.notifType
    notifVisible = true

    if (notifType === 'success') visible = false
  }
</script>

<Header on:navButton={showPopup} on:outLogged={showNotification} />

<Notification text={notifText} type={notifType} bind:visible={notifVisible} />

<main>
  <slot />
</main>

<Popup {title} bind:visible>
  {#if title === 'Přihlášení'}
    <Login on:logged={showNotification} />
  {:else}
    <Register on:registered={showNotification} />
  {/if}
</Popup>

<Footer />
