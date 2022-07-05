<svelte:head>
  <title>Přehled škol | Skillnes</title>
</svelte:head>

<main>
  <section>
    <div>
      <h1>Přehled předmětů<span>Najdi předmět, který ti moc nejde</span></h1>

      <input type="search" placeholder="Matematika" />
    </div>
    <div>
      <img
        src="https://trirama.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.png"
        alt="cover"
      />
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
