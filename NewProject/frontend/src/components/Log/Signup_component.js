import {Link} from "react-router-dom";
import React, {useState} from 'react'
import Axios from 'axios';
import {useHistory} from "react-router-dom";

export default function Signup_component() {
    let history = useHistory();

    const [Lastname,
        setLastName] = useState("");
    const [firstName,
        setFirstname] = useState("");

    const [email,
        setEmail] = useState('');
    const [num,
        setNum] = useState('');
    const [mdp,
        setMdp] = useState('');

    const [reMdp,
        setReMdp] = useState('')

    const [access,
        setAccess] = useState(1)

    const createUser = async() => {

        if (mdp === reMdp && mdp !== "") {
            try
            {

                await Axios({
                        method: "POST",
                        url: "http://localhost:3000/createUser",
                        data: {
                            nom: Lastname,
                            prenom: firstName,
                            email: email,
                            num: num,
                            mdp: mdp,
                            access: access
                        }
                    }).then(

                    alert("Bienvenue sur JoJi_Board Mr." + firstName + " " + Lastname + ".\nVous etes maintenant inscrit"),
                    history.push('/')
                    )
                } catch (e) {
                    alert(e.response.data.msg);
                }

            } else {
                alert("Mot de passe différent de la confirmation !")
            }

        }

        return (
            <div className="container margin-top">
                <div className="auth-inner">
                    <form>
                        <h3>Sign Up</h3>

                        <div className="form-group">
                            <label>First name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="First name"
                                onChange={e => setFirstname(e.target.value)}
                                required/>
                        </div>

                        <div className="form-group">
                            <label>Last name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Last name"
                                onChange={e => setLastName(e.target.value)}
                                required/>
                        </div>
                        <div className="form-group">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                onChange={e => setEmail(e.target.value)}
                                required/>
                        </div>
                        <div className="form-group">
                            <label>Num</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Num"
                                title="10 digits only allowed"
                                maxLength="10"
                                minLength="10"
                                pattern="[0-9]{10}"
                                onChange={e => setNum(e.target.value)}
                                required/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                onChange={e => setMdp(e.target.value)}
                                required/>
                        </div>
                        <div className="form-group">
                            <label>Confirm password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm password"
                                onChange={e => setReMdp(e.target.value)}
                                required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="who">Qui êtes-vous ?</label>
                            <div className="form-group">
                                <select id="who" onChange={e => setAccess(parseInt(e.target.value))} name="who">
                                    <option value="1">User</option>
                                    <option value="2">Recruiter</option>
                                </select>
                            </div>
                        </div>
                        <button
                            className="btn btn-primary btn-block"
                            onClick={() => createUser()}>Sign Up</button>
                        <p className="forgot-password text-right">
                            Already registered
                            <Link to={"/sign-in"}>Sign In</Link>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
