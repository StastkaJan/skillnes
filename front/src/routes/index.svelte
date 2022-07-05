<script>
  let search = ''

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
    </div>
    <div>
      <img
        src="https://trirama.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.png"
        alt="cover"
      />
    </div>
  </section>
  <section>
    <h2>3 Kocky</h2>
  </section>
  <section>
    <h2>O službě</h2>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam harum quam saepe, quod fugit
      nemo recusandae itaque ratione distinctio necessitatibus veniam ipsam tenetur, id ullam
      dolores autem facere explicabo dolore.
    </p>
  </section>
  <section>
    <h2>Jak to funguje?</h2>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam harum quam saepe, quod fugit
      nemo recusandae itaque ratione distinctio necessitatibus veniam ipsam tenetur, id ullam
      dolores autem facere explicabo dolore.
    </p>
  </section>
  <section>
    <h2>Učitelé měsíce</h2>
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
  }
  h2 {
    width: 100%;
    text-align: center;
  }
</style>
