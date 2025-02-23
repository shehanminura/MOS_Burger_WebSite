function updateDateTime() {
    const now = new Date();

    const date = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    document.getElementById('dateDisplay').textContent = date;
    document.getElementById('timeDisplay').textContent = time;
}

setInterval(updateDateTime, 1000);


function loadCustomerIds() {
    fetch("http://localhost:8080/customer/getAllId", {
        method: "GET",
        redirect: "follow"
    })
        .then(response => response.json())
        .then(result => {
            console.log(result);

            let customerList = document.getElementById("customerList");
            customerList.innerHTML = "";
            result.forEach(id => {
                let listItem = document.createElement("li");
                listItem.classList.add("dropdown-item");
                listItem.textContent = `Customer ID: ${id}`;


                listItem.onclick = function () {
                    console.log("Selected Customer ID:", id);
                    document.getElementById("customerDropdown").textContent = `Selected: ${id}`;

                    fetch(`http://localhost:8080/customer/search-by-id/${id}`, {
                        method: "GET",
                        redirect: "follow"
                    })
                        .then(response => response.json())
                        .then(customer => {
                            console.log("Customer Details:", customer);
                            document.getElementById("viewCustomerId").value = customer.id;
                            document.getElementById("viewName").value = customer.name;
                            document.getElementById("viewPhoneNum").value = customer.phoneNumber;
                        })
                        .catch(error => console.error("Error fetching customer details:", error));
                };

                customerList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error fetching customer IDs:", error));
}
document.addEventListener("DOMContentLoaded", loadCustomerIds);


function searchbtn() {
    let id = document.getElementById("search-input").value;

    fetch(`http://localhost:8080/customer/search-by-id/${id}`)
        .then(response => { return response.json();
        })
        .then(result => {
            document.getElementById("viewCustomerId").value = result.id || "";
            document.getElementById("viewName").value = result.name || "";
            document.getElementById("viewPhoneNum").value = result.phoneNumber || "";
        })
        .catch(error => alert(error.message || "An error occurred!"));
}
