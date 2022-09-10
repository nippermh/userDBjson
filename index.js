document.addEventListener('DOMContentLoaded', function() {
  
  console.log('dom content loaded');
  const URL = "http://localhost:3000/user";
  const tbody = document.querySelector('#tbody')
  const form = document.querySelector('#addDataForm');
  let allUsers = []


//READ
fetch('http://localhost:3000/user')
    .then(res => res.json() )
    .then(data => data.forEach(function(data) {
     tbody.append(renderUsers(data));
    }))
//RENDER
const renderUsers = ({id, profile, name, email, status, role}) => {
  let tr = document.createElement("tr");
  tr.innerHTML = ` 
    <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                    <img src="${profile}" class="h-10 w-10 rounded-full" alt="">
                </div>
                <div class="ml-4">
                    <div class="text-sm font-medium font-gray-900">
                        ${name}
                    </div>
                    <div class="text-sm text-gray-500">
                        ${email}
                    </div>
                </div>
            </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                ${status}
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="text-sm text-gray-500">${role}</span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <button id="editUser" data-id=${id} data-action="edit" class="edit-button shadow-soft-xl text-sm bg-gray-100 stroke-1 text-gray-500 font-bold py-2 px-4 rounded">Edit</button>
            <button id="deleteUser" data-id=${id} data-action="delete" class="delete-button shadow-soft-xl text-sm bg-gray-100 stroke-1 text-gray-500 font-bold py-2 px-4 rounded">Delete</button>
        </td>
    `;
  return tr; 
  }

//Create
form.addEventListener("submit", function (event) {
    event.preventDefault();
//    console.log('Form Submitted!');
//    console.log(namesValue.value);
const namesValue = document.getElementById('namesValue');
const emailValue = document.getElementById('emailValue');
const profileValue = document.getElementById('profileValue');
const statusValue = document.getElementById('statusValue');
const roleValue = document.getElementById('roleValue');

   fetch(URL, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: namesValue.value,
        email: emailValue.value,
        profile:profileValue.value,
        status: statusValue.value,
        role: roleValue.value
      }),
   
    })
      .then(res => res.json())
      .then(data => {
        const dataArr = [];
        dataArr.push(data);
        renderUsers(dataArr);
      })
})
//EDIT

tbody.addEventListener('click', (event) => {
  
//mh
  if(event.target.dataset.action === 'edit') {
    console.log(event.target.dataset.id)
 //start
/* let name = parent.querySelector('namesValue').textContent;
 let email = parent.querySelector('emailValue').textContent;
 let profile = parent.querySelector('profileValue').textContent;
 let status = parent.querySelector('statusValue').textContent;
 let role = parent.querySelector('roleValue').textContent;

 namesValue.value = name;
 emailValue.value = email;
 profileValue.value = profile;
 statusValue.value = status;
 roleValue.value = role;

} */
//end
 } 
//end mh


 if(event.target.dataset.action === 'delete') {
    console.log('delete clicked'); 

    fetch(`${URL}/${event.target.dataset.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then( response => response.json())
  
  
    }
  });

});

