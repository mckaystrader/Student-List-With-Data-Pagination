/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

const linkList = document.getElementsByClassName('link-list')[0];
const studentDataList = document.getElementsByClassName('student-list')[0];
const itemsPerPage = 9;

let filteredData = data;

function showPage(list ,page){

   /*Create two variables to store the start index and the end index of the list items to be displayed on the given page*/
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;

   /*Select the UL element with a class of student-list and assign its value to a variable. Use the innerHTML property set the HTML content of the student-list 
   variable you just created to an empty string. This will remove any students that might have previously been displayed.*/
   studentDataList.innerHTML = '';
   let studentData = '';

      if(list.length === 0){
         studentData += `<p class="no-results">No Results Found</p>`;
      } else {

         /*Loop over the list parameter.*/

      for (let i = 0; i < list.length; i++){

         if (i >= startIndex && i < endIndex){
            studentData += `
            <li class="student-item cf">

               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>    
                  <span class="email">${list[i].email}</span>
               </div>
            
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            
            </li>`;

         }
    
      }
  
   }

  studentDataList.insertAdjacentHTML("beforeend", studentData);

}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list){
   let currentPage = Math.ceil(list.length/9);
   linkList.innerHTML = '';

for(let i = 1; i <= currentPage; i++){
linkList.insertAdjacentHTML('beforeend',
   `<li>
      <button type="button">${i}</button>
   </li>`);
 }

   const mainButton = document.querySelector('button');
   mainButton.setAttribute("class","active");
   linkList.addEventListener('click',(e) =>{
      if(e.target.tagName === 'BUTTON'){
         const removeButton = document.querySelector('.active');
         removeButton.className = '';
         const addButton = e.target;
         addButton.className = 'active';
         const display = addButton.textContent;
         showPage(list,display);
      } 
    });
}   

/*Add a Search Component*/

 function searchBar() {
   const header = document.querySelector('.header');
   HTMLForSearchBar = `
   <label for="search" class="student-search">
            <span>Search by name</span>
            <input id="search" placeholder="Search by name...">
            <button type="button" class="submit"><img src="img/icn-search.svg" alt="Search icon"></button>
          </label>`;
   header.insertAdjacentHTML("beforeend", HTMLForSearchBar);
}

// Call functions

showPage(data,1);
addPagination(data);
searchBar();

/* Add Functionality to the Search Component */
const searchField = document.getElementById('search');
const searchButton = document.querySelector('button.submit');

searchField.addEventListener('keyup', () => {
   let searchText = searchField.value.toUpperCase();
   searchButton.onclick = () => {
      searchField.value = '';
   }

   const filteredList = data.filter(student => {
      return (
         student.name.first.toUpperCase().includes(searchText) ||
         student.name.last.toUpperCase().includes(searchText)
      );
   });
   filteredData = filteredList;
   currentPage = 1
   showPage(filteredData, currentPage);
   addPagination(filteredData);
   
});