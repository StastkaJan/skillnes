<script>
  import { navigating } from '$app/stores'
  import Header from '$comp/header.svelte'
  import Footer from '$comp/footer.svelte'
  import Notification from '$comp/notification.svelte'
  import Popup from '$comp/popup.svelte'
  import Login from '$comp/login.svelte'
  import Register from '$comp/register.svelte'
  import Loader from '$comp/loader.svelte'

  let notifText = 'Text',
    notifType = 'success',
    notifVisible = false

  let title = 'Title',
    visible = false

  // @ts-ignore
  function showPopup(event) {
    title = event.detail.tit
    visible = true
  }

  // @ts-ignore
  function showNotification(event) {
    notifText = event.detail.notifText
    notifType = event.detail.notifType
    notifVisible = true

    if (notifType === 'success') visible = false
  }
</script>

<svelte:head>
  <title>Skillnes</title>
</svelte:head>

<Header on:navButton={showPopup} on:outLogged={showNotification} />

<Notification text={notifText} type={notifType} bind:visible={notifVisible} />

{#if $navigating}
  <Loader />
{/if}

<slot />

<Popup {title} bind:visible>
  {#if title === 'Přihlášení'}
    <Login on:logged={showNotification} />
  {:else}
    <Register on:registered={showNotification} />
  {/if}
</Popup>

<Footer />
