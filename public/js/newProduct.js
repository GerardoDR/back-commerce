async function postData() {
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "frontend-user-requested",
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify({
         "name": "productoDesdeFront"
       });
       
       let response = await fetch(`${window.location.origin}/products`, { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       

}