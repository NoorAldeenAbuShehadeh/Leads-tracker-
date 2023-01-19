const inputEl = document.getElementById('input-el')
const inputBtn = document.getElementById('input-btn')
const tabBtn = document.getElementById('tab-btn')
const deleteBtn = document.getElementById('delete-btn')
const ulEl = document.getElementById('ul-el')
const checkEl = document.getElementById('check-el')
let myLeads = []
const leadsFromLocalStorage = localStorage.getItem("myLeads")
if(leadsFromLocalStorage){
    myLeads = JSON.parse(leadsFromLocalStorage)
    render(myLeads)
}
function render(leads){
    let ul=""
    for(let i = 0 ; i < leads.length ; i++ ){
        ul += `<li>
        <input type='checkbox' class='select'>
        <a target='_blank' href='${leads[i]}'>
        ${leads[i]}
        </a>
        </li>`
    }
    ulEl.innerHTML = ul
}

inputBtn.addEventListener("click",function(){
    if(inputEl.value != "" && !checkIfAlreadyExsist(myLeads,inputEl.value)){
        myLeads.push(inputEl.value)
        inputEl.value=""
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    }else{
        if(checkIfAlreadyExsist(myLeads,inputEl.value)) alert("this input already exsist")
        else alert("please fill the box first")
    }
    inputEl.value=""
})

tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        if(!checkIfAlreadyExsist(myLeads,tabs[0].url)){
            myLeads.push(tabs[0].url)
            localStorage.setItem("myLeads", JSON.stringify(myLeads) )
            render(myLeads)
        }
        else{
            alert("this tab already exsist")
        }
    })
})

deleteBtn.addEventListener("dblclick" , function(){
    if(myLeads.length>0){
        let inputs = document.querySelectorAll('.select');
        let newleads = []   
        for (let i = 0; i < inputs.length; i++) {   
            if(!inputs[i].checked){
                newleads.push(myLeads[i])
            }
        }
        myLeads = newleads
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
        checkEl.checked=false
    }
})

checkEl.addEventListener('change', function(event){
    if(event.target.checked){
        selectAll(true)
    } else{
        selectAll(false)
    }
});

function selectAll(stateSelect) {  
    let chekboxEl = document.querySelectorAll('.select')
    for (let i = 0; i < chekboxEl.length; i++) {   
        chekboxEl[i].checked = stateSelect;   
    }   
}  

function checkIfAlreadyExsist(leads,inputLead){
    if(leads.length === 0)return false
    for(let i=0; i<leads.length; i++){
        if(leads[i] === inputLead) return true
    }
    return false
}