<script>
  export let name = 'Jméno',
    src =
      'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
</script>

<a href="/teachers">
  <img {src} alt="profil" />
  <h3>{name}</h3>
</a>

<style>
  a {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 150px;
  }
  img {
    border-radius: 50%;
    transition: 0.3s;
    aspect-ratio: 1/1;
  }
  a:hover img {
    transform: scale(1.05);
  }
</style>
