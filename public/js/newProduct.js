async function postData(e) {
  const product = {
    name: e[0].value,
    price: e[1].value,
    description: e[2].value
  };

  let headersList = {
    "Accept": "*/*",
    "User-Agent": "frontend-user-requested",
    "Content-Type": "application/json"
  }

  let bodyContent = JSON.stringify({
    ...product
  });

  let response = await fetch(`${window.location.origin}/products`, {
    method: "POST",
    body: bodyContent,
    headers: headersList
  }).finally(location.reload());

  return false;
}