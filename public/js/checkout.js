async function checkout(id, userId) {
  if (!id === userId) {
    return false;
  }

  let headersList = {
    "Accept": "*/*",
    "User-Agent": "frontend-user-requested",
    "Content-Type": "application/json"
  }

  let bodyContent = JSON.stringify({ id });
  let wrapper = document.querySelector('#cartWrapper')
  wrapper.innerHTML =
    `<h1>GRACIAS POR SU SOLICITUD!</h1>
    <P>ESTAMOS PROCESANDO SUS DATOS</P>
    <a href="/products">No se pierda nuestras ofertas!</a>
    `
  await fetch(`${window.location.origin}/cart/checkout`, {
    method: "POST",
    body: bodyContent,
    headers: headersList
  })
    .catch(error => {
      console.log(error)
      location.reload()
      wrapper.prepend(document.createTextNode("HUBO UN ERROR PARA TU SOLICITUD!"))
    })
    .finally(() => location.replace(`${window.location.origin}/products`))

}