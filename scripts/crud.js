import {app} from './firebaseConfig.js'
import {getDatabase, set, ref, child, update, remove, get} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js'
import {add} from './disp.js'

const db = getDatabase(app)
const submit = document.getElementById("submit")
const change = document.getElementById("update")
const del = document.getElementById("delete")
const r = document.getElementById("read")
var name, rollno, dob, gender, mail

//Read values to perform crud operations
function read(){
    name = document.getElementById("name").value
    rollno = document.getElementById("rollno").value
    dob = document.getElementById("date").value
    gender = document.querySelector('input[name="gender"]:checked').value
    mail = document.getElementById("mail").value

    document.getElementById("name").value=document.getElementById("rollno").value=document.getElementById("date").value=document.querySelector('input[name="gender"]:checked').value=document.getElementById("mail").value=""
}

r.addEventListener("click", () => {
    window.open("./display.html")
})

//Insert into database operation
submit.addEventListener("click", async () => {
    read()
    let flag = 0
    let snapshot = await get(child(ref(db), "Students"))
    if(snapshot.exists()){
        var arr = Object.values(snapshot.val())
        for(let i = 0; i < arr.length; i++){
            if(arr[i].Rollno == rollno){
                alert("Roll.No cannot be repeated")
                flag = 1
            }
        }
        if(flag == 0){
            set(ref(db, "Students/"+rollno), {Name: name, Rollno: rollno, DOB: dob, Gender: gender, Mail: mail})
        }
    }
    else set(ref(db, "Students/"+rollno), {Name: name, Rollno: rollno, DOB: dob, Gender: gender, Mail: mail})
    alert("Entry has been inserted for roll no: "+rollno)
    add()
})


//Update an entry operation
change.addEventListener('click', async () => {
    let rno = prompt("Enter rollno to update:")
    let field = prompt("Enter field name to update:\nAvailable fields: name, mail:")
    if(field.toLowerCase() == 'name'){
        let change = prompt("Enter new name:")
        update(ref(db, "Students/"+rno), {Name: change})
        alert("Name changed for "+rno)
    }
    else if(field.toLocaleLowerCase() == 'mail'){
        let change = prompt("Enter new mail id:")
        update(ref(db, "Students/"+rno), {Mail: change})
        alert("Mail changed for "+rno)
    }
    else alert("Enter valid fields")
})

//Delete an entry operation
del.addEventListener('click', async () => {
    let rno = prompt("Enter rollno to delete:")
    let snapshot = await get(child(ref(db), "Students/"+rno))
    if(snapshot.exists()){
        remove(ref(db, "Students/"+rno))
        alert("Deleted entry "+rno)
    }
    else alert("No entry with rollno: "+rno+" is found")
})