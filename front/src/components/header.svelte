<header>
  <a href="/">
    <img src="../favicon.svg" alt="page icon" />
    Skillnes
  </a>

  <nav>
    <a href="/">Domů</a>
    <a href="teachers">Učitelé</a>
    <a href="schools">Školy</a>
    <button>Login</button>
  </nav>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    font-size: 1.2rem;
  }
  header > a {
    display: flex;
    align-items: center;
  }
  img {
    margin-right: 10px;
    height: 32px;
  }
  nav > * {
    margin: 0 5px;
    padding: 5px 10px;
  }
  nav > button {
    margin: 0 10px;
    border-radius: 5px;
  }
</style>
