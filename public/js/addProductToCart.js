async function updateCart(id) {
  let headersList = {
    "Accept": "*/*",
    "User-Agent": "frontend-user-requested",
    "Content-Type": "application/json"
  }
       
  let bodyContent = JSON.stringify({idProduct: id});
  const putURL= `${window.location.origin}/cart`
  let response = await fetch(putURL, { 
    method: "PUT",
    body: bodyContent,
    headers: headersList
  });
}