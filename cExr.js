let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const saveBtn = document.getElementById("save-btn")
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage){
  myLeads = leadsFromLocalStorage
  render(myLeads)
}

saveBtn.addEventListener("click",function(){
  chrome.tabs.query({active:true , currentWindow:true}, function(tabs) {
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
  })  
})

function render(leads) {
   let listItem = ""
   for(let i=0; i < leads.length; i++){
     listItem += `<li>
                     <a href='${leads[i]}'target = '_blank'> ${leads[i]} 
                     </a>
                   </li>`  //using string template
    // const li = document.createElement("li")
    // li.textContent = myLeads[i]
    // ulEl.append(li)
    }  
    ulEl.innerHTML = listItem
}

deleteBtn.addEventListener("dblclick",function () {
   localStorage.clear()
   myLeads = []
   render(myLeads)
})

inputBtn.addEventListener("click",function () {
    myLeads.push(inputEl.value)
    inputEl.value = ''
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
    //console.log(localStorage.getItem("myLeads"))
})

