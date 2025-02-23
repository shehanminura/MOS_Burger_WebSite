function addItem() {

    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const qty = parseInt(document.getElementById("qty").value, 10);
    const price = parseInt(document.getElementById("price").value, 10);
    const discount = parseInt(document.getElementById("discount").value, 10);
    const Category = document.querySelector('.btn-group-toggle .active input').value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "name": name,
        "date": date,
        "category": Category,
        "qty": qty,
        "price": price,
        "discount": discount
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://localhost:8080/item/add", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            alert("Item added Successfully")
            document.getElementById("name").value = "";
            document.getElementById("date").value = "";
            document.getElementById("qty").value = "";
            document.getElementById("price").value = "";
            document.getElementById("discount").value = "";
        
            console.log(result)
        })
        .catch((error) => {
            alert("Item added Successfully")
            console.error(error)
        });

}

function getAll() {
    fetch("http://localhost:8080/item/getAll", {
        method: "GET",
        redirect: "follow"
    })
        .then(response => response.json()) // Parse JSON instead of text
        .then(result => {
            console.log(result);

            let table = document.getElementById("tbl");

            let body = `<thead style="position: sticky; top: 0; z-index: 1;">
                <tr style="background-color: rgb(255, 191, 42);">
                    <th scope="col">Item-ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Expire Date</th>
                    <th scope="col">Category</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Discount</th>
                    <th scope="col-3"></th>
                </tr>
            </thead>
            <tbody class="table-group-divider">`;

            result.forEach(item => {
                body += `
                <tr style="background-color: #ffd32a;">
                    <th scope="row">${item.id}</th>
                    <td>${item.name}</td>
                    <td>${item.date}</td>
                    <td>${item.category}</td>
                    <td>${item.qty}</td>
                    <td>${item.price}.00</td>
                    <td>${item.discount}%</td>
                    <td><button type="button" class="btn btn-danger w-100" onclick="deleteItem('${item.id}')" >Delete</button></td>
                </tr>`;
            });

            table.innerHTML = body;

        })
        .catch(error => console.error("Error fetching items:", error));
}

function deleteItem(id) {
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };
    fetch(`http://localhost:8080/item/deleteById/${id}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result)
            alert("Delete Item Successfully")
            getAll();
        })
        .catch((error) => console.error(error));

}
