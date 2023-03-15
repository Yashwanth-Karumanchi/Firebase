import {app} from './firebaseConfig.js'
import {getDatabase, ref, child, get} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js'

const db = getDatabase(app)

//Displaying results on a seperate page
window.addEventListener('load', async ()=>{
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
})

export async function add(){
    var tb = document.getElementById("displaytb")
    let snapshot = await get(child(ref(db), "Students"))
    if(snapshot.exists()){
        var arr = Object.values(snapshot.val())
        arr.forEach((ele)=>{
            tb.innerHTML +='<tr><td>'+ele.Name+'</td><td>'+ele.Rollno+'</td><td>'+ele.DOB+'</td><td>'+ele.Gender+'</td><td>'+ele.Mail+'</td></tr>'
        })
    }
    else alert("Database empty")
}