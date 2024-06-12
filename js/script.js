var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var inputsContainer = [];

var closeBtn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".box-info");

if (localStorage.getItem("BookMark") !== null) {
	inputsContainer = JSON.parse(localStorage.getItem("BookMark"));
	displayInputs();
}

function addInputs() {
	if (siteName.value == "" || siteURL.value == "") {
		boxModal.classList.remove("d-none");
		return;
	}
	if (validateURL(siteURL.value) == false) {
		boxModal.classList.remove("d-none");
		return
	}
	if (validateName(siteName.value) == false) {
		boxModal.classList.remove("d-none");
		return;
	}
	
	var inputs = {
			inputName: siteName.value,
			inputURL: addHTTP(siteURL.value),
		};

	inputsContainer.push(inputs);
	localStorage.setItem("BookMark", JSON.stringify(inputsContainer));
	displayInputs();
	clearInputs();
}

function displayInputs() {
	var cartona = ``;
	for (var i = 0; i < inputsContainer.length; i++) {
		cartona += `		<tr class="text-capitalize">
							<td>
								${i + 1}
							</td>
							<td>${inputsContainer[i].inputName}</td>
							<td>
								
								<a target="_blank" href="${inputsContainer[i].inputURL}" class="btn btn-visit">
								<i class="fa-solid fa-eye pe-2"></i>
								visit
								</a>
							</td>
							<td>
								<button onclick="deleteInputs(${i})" class="btn btn-delete">
								<i class="fa-solid fa-trash-can pe-2"></i>
								Delete
							</button>
							</td>
						</tr>
        
        `;
	}
	document.getElementById("tableContent").innerHTML = cartona;
}

function clearInputs() {
	siteName.value = null;
	siteURL.value = null;
}

function deleteInputs(index) {
	inputsContainer.splice(index, 1);
	displayInputs();
	localStorage.setItem("BookMark", JSON.stringify(inputsContainer));
}

function addHTTP(value) {
	if (value) {
		return "https://www." + value;
	}
	return value;
}

function validateName(nameValue) {
	var regexName = /^\w{3,}(\s+\w+)*$/;
		return regexName.test(nameValue)
}

function validateURL(urlValue) {
	var regexURL = /^((http|https):\/\/)?[^\s]+\.com$/;
		return regexURL.test(urlValue);
}

function checkName() {
	if ((validateName(siteName.value) == true)) {
		siteName.classList.add("is-valid");
		siteName.classList.remove("is-invalid");
		siteName.nextElementSibling.classList.add("d-none");
	} else {
		siteName.classList.remove("is-valid");
		siteName.classList.add("is-invalid");
		siteName.nextElementSibling.classList.remove("d-none");
	}
}

function checKUrl() {
	if ((validateURL(siteURL.value)==true))
	{
		siteURL.classList.add("is-valid");
		siteURL.classList.remove("is-invalid");
		siteURL.nextElementSibling.classList.add("d-none");

	} else {
		siteURL.classList.remove("is-valid");
		siteURL.classList.add("is-invalid");
		siteURL.nextElementSibling.classList.remove("d-none");
	}
}




function closeModal() {
	boxModal.classList.add("d-none");
}


closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
	if (e.key == "Escape") {
		closeModal();
	}
});

document.addEventListener("click", function (e) {
	if (e.target.classList.contains("box-info")) {
		closeModal();
	}
});
