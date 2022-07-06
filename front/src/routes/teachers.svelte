<script context="module">
  /** @type {import('./__types/teachers').Load} */
  export async function load({ fetch }) {
    try {
      let res = await fetch(`/api/teachers`)
      let resJson = await res.json()
      return {
        props: {
          teachers: resJson.teachers
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
  export let teachers = [
    {
      name: '',
      bio: ''
    }
  ]

  $: console.log(teachers)
</script>

<svelte:head>
  <title>Přehled učitelů | Skillnes</title>
</svelte:head>

<main>
  <section>
    <div>
      <h1>Přehled učitelů<span>Najdi parťáka, který ti pomůže</span></h1>

      <input type="search" placeholder="Amanda Melounová" />
    </div>
    <div>
      <img
        src="https://trirama.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.png"
        alt="cover"
      />
    </div>
  </section>
  <section>
    {#each teachers as teacher}
      <p>name: {teacher.name}</p>
      <p>bio: {teacher.bio}</p>
    {:else}
      <p>Nikdo nenalezen</p>
    {/each}
  </section>
</main>

<style>
  section:first-of-type::before {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, #5f1f69 5%, #341de1 65%, #00d5ff 110%);
    content: '';
    z-index: -1;
  }
  section:first-of-type {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }
  h1,
  span {
    color: #fff;
  }
  h1 span {
    display: block;
    font-size: 0.5em;
  }
  input {
    padding: 0.7em;
    max-width: 300px;
  }
  div {
    max-width: 40%;
  }
  img {
    border-radius: 20px;
    height: 300px;
  }
</style>
