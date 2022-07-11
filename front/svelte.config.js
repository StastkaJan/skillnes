import adapter from '@sveltejs/adapter-auto'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $comp: 'src/components',
      $db: 'src/db',
      $routes: 'src/routes',
      $store: 'src/store',
      $val: 'src/validate',
      $icons: 'src/icons',
      $img: 'src/img'
    },
    csp: {
      directives: {
        'script-src': ['self']
      }
    },
    version: {
      name: Date.now().toString(),
      pollInterval: 0
    }
  }
}

export default config
