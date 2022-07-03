export const nameVal = (name = '') => {
  if (name.length < 3) {
    return 'Jméno je příliš krátké'
  }

  return ''
}

export const emailVal = (email = '') => {
  if (!email.match(/^\S+?@\S+?\.\S{2,3}$/)) {
    return 'Špatný formát emailu'
  }

  return ''
}

export const passwordVal = (password = '') => {
  if (password.length < 8) {
    return 'Heslo musí mít alespoň 8 znaků'
  } else if (!password.match(/\d/)) {
    return 'Heslo musí obsahovat číslici'
  } else if (!password.match(/[a-z]/)) {
    return 'Heslo musí obsahovat malé písmeno'
  } else if (!password.match(/[A-Z]/)) {
    return 'Heslo musí obsahovat velké písmeno'
  } else if (password.match(/\s/)) {
    return 'Heslo nesmí obsahovat mezeru'
  }

  return ''
}
