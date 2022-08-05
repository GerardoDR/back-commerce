async function updateCart(id) {
  let headersList = {
    "Accept": "*/*",
    "User-Agent": "frontend-user-requested",
    "Content-Type": "application/json"
  }
       
  let bodyContent = JSON.stringify({idProduct: id});
  
  let response = await fetch(`${window.location.origin}/cart`, { 
    method: "PUT",
    body: bodyContent,
    headers: headersList
  });
}