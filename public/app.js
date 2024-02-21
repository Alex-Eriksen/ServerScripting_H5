document.getElementById("create-submit").addEventListener("click", function() {
	// Create a new XMLHttpRequest object
	const xhr = new XMLHttpRequest();

	// Set the request method and URL
	xhr.open("POST", "http://localhost:3000/api/contact", true);

	// Set the request headers
	xhr.setRequestHeader("Content-Type", "application/json");

	const firstName = document.getElementById("create-first-name").value;
	const lastName = document.getElementById("create-last-name").value;
	const email = document.getElementById("create-email").value;
	const phone = document.getElementById("create-phone").value;

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
		if (xhr.status === 200)
		{
			// Request was successful
			console.log(xhr.responseText);
		}
		else
		{
			// Request failed
			console.error("Request failed. Status:", xhr.status);
		}
	};

	// Send the request
	xhr.send(requestBody);
});
