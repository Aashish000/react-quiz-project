


import React from 'react';
import { selectUser } from "../redux/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './MyAccount.css'
// My account page
function MyAccount(props) {


    const user = useSelector(selectUser);
    const navigate = useNavigate();

    // create new quiz
    const createQuiz = (e) => {

        console.log("create quiz");

        fetch("http://localhost:8000/createQuiz", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                uid: user.uid
            })
        })
        .then(res => res.json())
        .then(quiz => {
            
            //Jump to a unique quiz page
            let s = quiz._id
            s = "/myquiz/"+s;
            navigate(s);
        
        })
        .catch(err =>{
                
            console.log(err)
        
        });
    }


    return (

        <div class="dashboard">
            <div>
            <h3>My Account Page</h3>
            <br/>
            </div>
            <h4>USER ID：{user.uid}</h4>
            <div>
                <h5><br/>Press the button below to start quiz.</h5>
            </div>
            <button onClick={(e) => createQuiz(e)} type="button" id="registerBtn"  className='buttons btn-primary btn myacbtn'>
                Start Quiz
            </button>
        </div>

    )
}

export default MyAccount;