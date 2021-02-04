import React, {Fragment, useState} from 'react'
import {Link, useHistory} from "react-router-dom";
import Axios from 'axios';
import Img from '../../style/img/logo.png'

export default function Login_component({setisLogged, isLogged}) {

    let history = useHistory();

    /* Création d'une function requête Asynchrone recevant l'email et le mdp entré */
    const authentification = async(email, mdp) => {
        try {
            /*Création d'une requête appelant la route login */
            let res = await Axios({
                method: "POST", url: "http://localhost:3000/login",

                /* Envoie des données dans la requête*/
                data: {
                    email: email,
                    mdp: mdp
                }
            })
            /* Enregistrement du token et de l'email dans le local Storage*/
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('id', res.data.id);
            localStorage.setItem('IsLogged', true);

            setisLogged(true)

            
            history.push('/Users');

        } catch (e) {
            /* Alerte de l'erreur */
            alert(e);
            setisLogged(false)
        }
    }

    // Handle de l'input email
    const [Email,
        setEmail] = useState('');
    // Handle de l'input Mdp
    const [Mdp,
        setMdp] = useState('');

    // Handle au click sur le bouton Login
    const handleSubmit = () => {
        // Authentification avec comme paramètre Email et Mdp
        authentification(Email, Mdp)

    }

    const ifConnect = () => {
        if(isLogged) return connected()
        return notconnected();
    }
    const connected = () => {
        history.push('Users');
        return <Fragment>
            <p>
                Users Already connected
            </p>
        </Fragment>
    }
    const notconnected = () => {
        return (
            <Fragment>
                <div className="container margin-top">
                    <div className=" auth-inner">
                        <div className="form-group text-center">
                            <img src={Img} width='100px' className="text-center" alt=""></img>
                        </div>
                        <h3>Log In</h3>

                        <div className="form-group">
                            <label>Email address</label>
                            {/* Email Input */}
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                id="email"
                                name="email"
                                onChange={event => setEmail(event.target.value)}/>
                        </div>
                        {/* Password Input */}
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                id="mdp"
                                name="mdp"
                                onChange={event => setMdp(event.target.value)}/>
                        </div>
                        <div className="form-group">
                            {/* Bouton de login*/}
                            <button
                                onClick={() => handleSubmit()}
                                value="Login"
                                className="btn  btn-primary btn-block">Login</button>
                        </div>
                        <div className="d-flex justify-content-center links">
                            Don't have an account?<Link to={"/sign-up"}>Sign Up</Link>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

    /* Return du component */
    return ifConnect()

}
/**/
