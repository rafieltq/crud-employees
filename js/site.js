const uri = 'https://localhost:5001/api/Persona';
let todos = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data =>{ _displayItems(data)
            console.log(data)
        })
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    const addNameTextbox = document.getElementById('add-name');
    const addLastNameTextbox = document.getElementById('add-lastName');
    const addPhoneNumberTextbox = document.getElementById('add-Phone');
    const addDirectionTextbox = document.getElementById('add-direction');
    const addEmailTextbox = document.getElementById('add-email');
    const addCommentTextbox = document.getElementById('add-comment');

    const item = {
        nombre: addNameTextbox.value.trim(),
        apellido: addLastNameTextbox.value.trim(),
        telefono: addPhoneNumberTextbox.value.trim(),
        correo: addEmailTextbox.value,
        direccion: addDirectionTextbox.value,
        comentario: addCommentTextbox.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.text())
        .then(console.log('Vamos a crear'))
        .then(() => {
            getItems();
            addNameTextbox.value = '';
            addLastNameTextbox.value = '';
            addPhoneNumberTextbox.value = '';
            addDirectionTextbox.value = '';
            addEmailTextbox.value = '';
            addCommentTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Id: id
        })
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = todos.find(item => item.id === id);

    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-name').value = item.nombre;
    document.getElementById('edit-lastName').value = item.apellido;
    document.getElementById('edit-phone').value = item.telefono;
    document.getElementById('edit-direction').value = item.direccion;
    document.getElementById('edit-email').value = item.correo;
    document.getElementById('edit-comment').value = item.comentario;
    
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        nombre: document.getElementById('edit-name').value,
        apellido: document.getElementById('edit-lastName').value,
        telefono:document.getElementById('edit-phone').value,
        direccion:document.getElementById('edit-direction').value,
        correo: document.getElementById('edit-email').value,
        comentario:document.getElementById('edit-comment').value
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'empleado en total' : 'empleados en total';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('empleados');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);
        editButton.style="background:none; border-style:none; color:blue;"
        

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);
        deleteButton.style="background:none; border-style:none; color:red;"

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let Id = document.createTextNode(item.id);
        td1.appendChild(Id);

        let td2 = tr.insertCell(1);
        let NameTextNode = document.createTextNode(item.nombre);
        td2.appendChild(NameTextNode);

        let td3 = tr.insertCell(2);
        let LastNameTextNode = document.createTextNode(item.apellido);
        td3.appendChild(LastNameTextNode);

        let td4 = tr.insertCell(3);
        let PhoneNumber = document.createTextNode(item.telefono);
        td4.appendChild(PhoneNumber);

        let td5 = tr.insertCell(4);
        let Direction = document.createTextNode(item.direccion);
        td5.appendChild(Direction);

        let td6 = tr.insertCell(5);
        let Email = document.createTextNode(item.correo);
        td6.appendChild(Email);

        let td7 = tr.insertCell(6);
        let Comment = document.createTextNode(item.comentario);
        td7.appendChild(Comment);

        let td8 = tr.insertCell(7);
        td8.appendChild(editButton);
        td8.appendChild(deleteButton);
    });

    todos = data;
}