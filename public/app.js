document.body.onload = async function ()
{
	await getContacts();
}

async function post()
{
	console.log("POST Called");
	// Create a new XMLHttpRequest object
	const xhr = new XMLHttpRequest();

	// Set the request method and URL
	xhr.open("POST", "http://localhost:3000/api/contact", true);

	// Set the request headers
	xhr.setRequestHeader("Content-Type", "application/json");

	const firstName = await document.getElementById("firstName").value;
	const lastName = await document.getElementById("lastName").value;
	const email = await document.getElementById("email").value;
	const phone = await document.getElementById("phoneNumber").value;

	// Set the request body
	const requestBody = JSON.stringify({
		_id: "",
		firstName: firstName,
		lastName: lastName,
		email: email,
		phone: phone
	});

	// Set the onload callback function
	xhr.onload = function ()
	{
		if (xhr.status === 201)
		{
			// Request was successful
			var data = JSON.parse(xhr.responseText);
			var template = `
			<td hidden>${data._id}</td>
			<td>${data.firstName}</td>
			<td>${data.lastName}</td>
			<td>${data.email}</td>
			<td>${data.phone}</td>
			<td>
				<button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#confirmDeleteModal" onclick="populateDeleteModal('${data._id}')">
					<i class="fas fa-trash"></i> Delete
				</button>
				<button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editModal" onclick="populateEditModal('${data._id}', '${data.firstName}', '${data.lastName}', '${data.email}', '${data.phone}')">
					<i class="fas fa-edit"></i> Edit
				</button>
			</td>`;

			var tbody = document.getElementById("contact-container");
			var newRow = document.createElement("tr");
			newRow.setAttribute("data-id", data._id);
			newRow.innerHTML = template;
			tbody.appendChild(newRow);
		}
		else
		{
			// Request failed
			console.error("Request failed. Status:", xhr.status);
		}
	};

	// Send the request
	xhr.send(requestBody);
}

function get()
{
	
}

async function update()
{
	const editId = await document.getElementById("editId").value;
	const editFirstName = await document.getElementById("editFirstName").value;
	const editLastName = await document.getElementById("editLastName").value;
	const editEmail = await document.getElementById("editEmail").value;
	const editPhoneNumber = await document.getElementById("editPhoneNumber").value;

	const xhr = new XMLHttpRequest();
	xhr.open("PUT", `http://localhost:3000/api/contact/${editId}`, true);
	xhr.setRequestHeader("Content-Type", "application/json");

	const requestBody = JSON.stringify({
		_id: "",
		firstName: editFirstName,
		lastName: editLastName,
		email: editEmail,
		phone: editPhoneNumber
	});
	

	xhr.onload = function ()
	{
		if (xhr.status === 200)
		{
			console.log("Updated contact successfully.");
		}
		else
		{
			console.error("Request failed. Status:", xhr.status);
		}
	};

	xhr.send(requestBody);
}

async function remove()
{
	const deleteId = await document.getElementById("deleteId").value;

	const xhr = new XMLHttpRequest();
	xhr.open("DELETE", `http://localhost:3000/api/contact/${deleteId}`, true);
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.onload = function () {
		if (xhr.status === 200) {
			console.log("Deleted contact successfully.");
			// Remove the row with the corresponding ID
			const row = document.querySelector(`tr[data-id="${deleteId}"]`);
			if (row) {
				row.remove();
			}
		} else {
			console.error("Request failed. Status:", xhr.status);
		}
	};

	xhr.send();
}

async function populateDeleteModal(id)
{
	document.getElementById("deleteId").value = id;
}

async function populateEditModal(id, firstName, lastName, email, phone)
{
	document.getElementById("editId").value = id;
	document.getElementById("editFirstName").value = firstName;
	document.getElementById("editLastName").value = lastName;
	document.getElementById("editEmail").value = email;
	document.getElementById("editPhoneNumber").value = phone;
}

async function getContacts() {
	try
	{
		const response = await fetch("http://localhost:3000/api/contact");
		const contacts = await response.json();
		contacts.forEach(contact => {
			const { _id, firstName, lastName, email, phone } = contact;
			const tbody = document.getElementById("contact-container");
			const newRow = document.createElement("tr");
			newRow.setAttribute("data-id", _id);
			newRow.innerHTML = `
				<td hidden>${_id}</td>
				<td>${firstName}</td>
				<td>${lastName}</td>
				<td>${email}</td>
				<td>${phone}</td>
				<td>
					<button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#confirmDeleteModal" onclick="populateDeleteModal('${_id}')">
						<i class="fas fa-trash"></i> Delete
					</button>
					<button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editModal" onclick="populateEditModal('${_id}', '${firstName}', '${lastName}', '${email}', '${phone}')">
						<i class="fas fa-edit"></i> Edit
					</button>
				</td>
			`;
			tbody.appendChild(newRow);
		});
	}
	catch (error)
	{
		console.error("Error fetching contacts:", error);
	}
}
