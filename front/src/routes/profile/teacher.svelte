<script context="module">
  /** @type {import('./__types/teacher').Load} */
  export async function load({ session, fetch }) {
    try {
      let res = await fetch(`/api/profile/teacher-${session.user.email}`)
      let resJson = await res.json()
      return {
        props: {
          teacher: resJson.teacher
        }
      }
    } catch (err) {
      console.log(err)
      return {
        status: 500
      }
    }
  }
</script>

<script>
  import { session } from '$app/stores'
  import ActiveCheckbox from '$comp/micro/activeCheckbox.svelte'
  import SiteInput from '$comp/micro/siteInput.svelte'
  import BioTextarea from '$comp/micro/bioTextarea.svelte'
  import Notification from '$comp/notification.svelte'

  export let teacher = {
    site: '',
    active: '',
    bio: ''
  }

  let { site, active, bio } = teacher,
    error = '',
    notifText = '',
    notifType = '',
    showNotif = false

  $: (site || active || bio) && (error = '')

  async function saveDetails() {
    try {
      let res = await fetch(`/api/profile/teacher-${$session.user.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json'
        },
        body: JSON.stringify({ site, active, bio })
      })
      let resJson = await res.json()
      if (resJson.result === 'error') {
        error = resJson.text
      } else if (resJson.result === 'success') {
        notifText = resJson.text
        notifType = resJson.result
        showNotif = true
      }
    } catch (err) {
      console.log(err)
    }
  }
</script>

<svelte:head>
  <title>Profil učitele | Profil | Skillnes</title>
</svelte:head>

<Notification text={notifText} type={notifType} bind:visible={showNotif} />

<div class="container">
  <h1>Profil učitele</h1>

  <form on:submit|preventDefault={saveDetails}>
    <ActiveCheckbox bind:active />
    <SiteInput bind:site />
    <BioTextarea bind:bio />
    {#if error != ''}
      <p class="error">{error}</p>
    {/if}
    <button type="submit">Uložit</button>
  </form>
</div>

<style>
  div.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 5vw 5vw;
  }
</style>
