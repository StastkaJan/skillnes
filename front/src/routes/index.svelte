<script>
  import IconCube from '$comp/micro/iconCube.svelte'
  import QuickProfile from '$comp/micro/quickProfile.svelte'
  import Phone from '$icons/phone.svelte'
  import Community from '$icons/community.svelte'
  import Internet from '$icons/internet.svelte'
  import placeholder from '$img/placeholder.png'

  let search = ''

  // @ts-ignore
  function searchText(e) {
    if (e.key === 'Enter') {
      console.log(search)
    }
  }
</script>

<svelte:head>
  <title>Skillnes</title>
</svelte:head>

<main>
  <section>
    <div>
      <h1>Skillnes<span>Moderní způsob vzdělávání</span></h1>

      <input
        type="search"
        placeholder="Univerzita Karlova"
        bind:value={search}
        on:keypress={searchText}
      />
      <span>
        <a href="/subjects">Matematika</a> |
        <a href="/subjects">Čeština</a> |
        <a href="/subjects">Právo</a>
      </span>
    </div>
    <div>
      <img src={placeholder} alt="cover" />
    </div>
  </section>
  <section class="cubes">
    <IconCube title={'Jsme propojení'}>
      <Internet />
    </IconCube>
    <IconCube title={'Jsme komunita'}>
      <Community />
    </IconCube>
    <IconCube title={'Umíme volat'}>
      <Phone />
    </IconCube>
  </section>
  <section class="info">
    <div>
      <img src={placeholder} alt="cover" />
    </div>
    <div>
      <h2>O službě</h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam harum quam saepe, quod
        fugit nemo recusandae itaque ratione distinctio necessitatibus veniam ipsam tenetur, id
        ullam dolores autem facere explicabo dolore.
      </p>
    </div>
    <div>
      <h2>Jak to funguje?</h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam harum quam saepe, quod
        fugit nemo recusandae itaque ratione distinctio necessitatibus veniam ipsam tenetur, id
        ullam dolores autem facere explicabo dolore.
      </p>
    </div>
    <div>
      <img src={placeholder} alt="cover" />
    </div>
  </section>
  <section class="profiles">
    <h2>Učitelé měsíce</h2>
    <div>
      <QuickProfile />
      <QuickProfile />
      <QuickProfile />
    </div>
  </section>
</main>

<style>
  section:first-of-type::before {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, #5f1f69 5%, #341de1 65%, #00d5ff 110%);
    clip-path: polygon(0 0, 100% 0, 100% 70%, 0 100%);
    content: '';
    z-index: -1;
  }
  section:first-of-type {
    position: relative;
  }
  h1,
  span,
  span > a {
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
  section:first-of-type div {
    max-width: 500px;
  }
  section.info div {
    max-width: 400px;
  }
  img {
    border-radius: 20px;
  }
  h2 {
    width: 100%;
    text-align: center;
  }
  section.profiles > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 50px;
  }
</style>
