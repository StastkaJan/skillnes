<script>
  let timestamp = new Date().getFullYear()
</script>

<footer>
  <div>
    <h2>Napište nám!</h2>
    <p>
      Budeme rádi za jakýkoliv názor a uděláme maximum<br />pro Váš příjemný prožitek z používání
      aplikace.
    </p>
    <textarea placeholder="Nefunguje mi..." />
    <button>Odeslat</button>
  </div>
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
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  textarea {
    padding: 0.8em;
    width: 50%;
    min-width: 300px;
    max-width: 400px;
    height: 150px;
    border-radius: 10px;
    resize: none;
  }
  button {
    margin: 10px;
  }
  p {
    margin-top: 20px;
    text-align: center;
  }
  div > p {
    margin-top: 0;
  }
</style>
