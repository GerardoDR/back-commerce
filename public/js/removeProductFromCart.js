async function removeFromCart(id) {

  let headersList = {
    "Accept": "*/*",
    "User-Agent": "frontend-user-requested",
    "Content-Type": "application/json"
  }

  let bodyContent = JSON.stringify({ idProduct: id });
  const deleteURL = `${window.location.origin}/cart`
  let response = await fetch(deleteURL, {
    method: "DELETE",
    body: bodyContent,
    headers: headersList
  })
    .catch(error => {
      console.log(error)
    })
    .finally(() => location.reload())
}
