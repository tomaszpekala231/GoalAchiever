class Goal{
    constructor(title){
        this.title = title;
    }
}

class UI{
    // add goal to table
    addGoalToTable(goal){
        // current date
        const d = new Date();

         let day = d.getDate(),
              month = d.getMonth(),
              year = d.getFullYear(),
              hour = d.getHours(),
              minute = d.getMinutes(),
              second = d.getSeconds();

              if(day < 10){
                  day = '0' + day;
              }

              if(hour < 10){
                month = '0' + month;
              }

              if(hour < 10){
                hour = '0' + hour;
              }

              if(minute < 10){
                minute = '0' + minute;
              }

              if(second < 10){
                second = '0' + second;
              }

       
       const fullDate = `${day}/${month}/${year} ${hour}:${minute}:${second}`;

       const tbody = document.querySelector('#tbody');

       // Create tr element
       const row = document.createElement('tr');
       row.className = 'goal-item'
       
       // First big letter
       goal = goal.charAt(0).toUpperCase() + goal.slice(1);
       row.innerHTML = `
            <tr>
                <td class="nameGoal"><b>${goal}</b></td>
                <td>${fullDate}</td>
                <td><a href="#" class="btn btn-danger delete">Delete</a></td>
            </tr>
       `;

       tbody.appendChild(row);
    }
    // Remove goal
    deleteGoal(element){
        const goal = element.parentElement.parentElement;
        goal.remove();
        
    }
    //show message
    showAlert(msg, className){
        const div = document.createElement('div');
        // add class
        div.className = className;
        div.textContent = msg;

        const card = document.querySelector('.card');
        const heading = document.querySelector('.heading');

        card.insertBefore(div, heading);
         //clear alert
         setTimeout(() =>{
            this.clearAlert();
        },2000)
    }
    //clear alert function
    clearAlert(){
        const currentAlert = document.querySelector('.alert');
        if(currentAlert){
            currentAlert.remove();
        }  
    }

    // clear fields
    clearFields(){
        const input = document.querySelector('#inputGoal');
        inputGoal.value = ''; 
    }
}

  // Local Storage Class
  class Store {
    static getGoals() {
        let goals;
        if(localStorage.getItem('goals') === null) {
            goals = [];
        } else {
            goals = JSON.parse(localStorage.getItem('goals'));
        }
    
        return goals;
      }
    
      static displayGoals(){
        const goals = Store.getGoals();

        goals.forEach(function(goal){
            const ui = new UI;

            // Add book to UI
            ui.addGoalToTable(goal);
        });
      }
      static addGoal(goal){
        const goals = Store.getGoals();

        goals.push(goal);

        localStorage.setItem('goals', JSON.stringify(goals));
      }
      

      static removeGoal(goalItem) {
        const goals = Store.getGoals();
    
        goals.forEach(function(goal, index){
            goal = goal.charAt(0).toUpperCase() + goal.slice(1);
            
            if(goalItem.firstElementChild.textContent == goal){
                goals.splice(index, 1);  
                console.log(goalItem.firstElementChild.textContent);
            }   
               
         });
        localStorage.setItem('goals', JSON.stringify(goals));
      }
  }

// Event listener for add goal
document.querySelector("#goal-form").addEventListener('submit', (e) =>{
    e.preventDefault();
    
    const inputGoal = document.querySelector('#inputGoal').value;
    //Init class Goal
     const goal = new Goal(inputGoal);
    // Init class UI
     const ui = new UI();
    

    if(inputGoal === ''){
        ui.showAlert('Please fill in the field!', 'alert alert-danger')
    }else{
        // Add goal
        ui.addGoalToTable(inputGoal);
        Store.addGoal(inputGoal);
        // clear field
        ui.clearFields();
        // show message
        ui.showAlert('You add your goal successuly!', 'alert alert-success')
        
    }
    
});

// Event Listener for delete
document.querySelector('#goals').addEventListener("click", (e) =>{
    e.preventDefault();
    // Init class UI
    const ui = new UI();

    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            ui.deleteGoal(e.target);
            Store.removeGoal(e.target.parentElement.parentElement);
            // console.log(e.target.parentElement.parentElement);
        }
    }
        
});

// Event listener for search
document.querySelector('#filter').addEventListener('keyup', (e)=>{
    e.preventDefault();

    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.goal-item').forEach(function(goal){
        
        const item = goal.firstElementChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            goal.classList.remove('toggleShowHide');
        }else{
            goal.classList.add('toggleShowHide');
        }
    })
    
     // Init class UI
     const ui = new UI();


});

// DOM load Event
document.addEventListener('DOMContentLoaded', Store.displayGoals)

