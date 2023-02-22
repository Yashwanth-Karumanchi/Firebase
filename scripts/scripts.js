import {app} from './firebaseConfig.js'
import {getDatabase, set, ref, child, update, remove, get} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js'

const db = getDatabase(app)
const submit = document.getElementById("submit")
const display = document.getElementById("read")
var name, rollno, dob, gender, mail

function read(){
    name = document.getElementById("name").value
    rollno = document.getElementById("rollno").value
    dob = document.getElementById("date").value
    gender = document.querySelector('input[name="gender"]:checked').value
    mail = document.getElementById("mail").value
}

async function store(){
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
}

async function disp(){
    var tb = document.getElementById("displaytb")
    tb.innerHTML='<tr><th>Name</th><th>Rollno</th><th>DOB</th><th>Gender</th><th>Mail</th></tr>'
    let snapshot = await get(child(ref(db), "Students"))
    if(snapshot.exists()){
        var arr = Object.values(snapshot.val())
        arr.forEach((ele)=>{
            tb.innerHTML +='<tr><td>'+ele.Name+'</td><td>'+ele.Rollno+'</td><td>'+ele.DOB+'</td><td>'+ele.Gender+'</td><td>'+ele.Mail+'</td></tr>'
        })
    }
    else alert("Database empty")
}


submit.addEventListener("click", store)
display.addEventListener('click', disp)