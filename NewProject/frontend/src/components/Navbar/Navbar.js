import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import Img from '../../style/img/logo.png'

export default function Navbar({isLogged, setisLogged}) {
    /* Déconnexion en nettoyant le local Storage et en mettant le store.IsLogged à false */
    const logout = () => {
        if (window.confirm('Logout?')) {
            alert('Vous êtes maintenant deconnecté');
            localStorage.clear();
            /* Variable false à renvoyer vers le store Redux*/
            const Trueing = {
                type: 'AUTH',
                IsLog: false
            }
            /* Renvoie de la variable vers le store Redux (Variable globale)*/
            setisLogged(false)
        }
    }

    /* Si l'utilisateur est Logged on return le contenu de cette fonction*/
    function Logged() {
        return (
            <Fragment>
                <li className="nav-item">
                    <Link className="nav-link" to={"/"}>HOME</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={"/Users"}>PROFILE</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={"/"} onClick={() => logout()}>LOG OUT</Link>
                </li>
            </Fragment>
        )
    }
    /* Si l'utilisateur n'est pas Logged on return le contenu de cette fonction*/
    function Notlogged() {
        return (
            <Fragment>
                <li className="nav-item">
                    <Link className="nav-link" to={"/"}>HOME</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={"/Log-up"}>SIGN UP</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={"/Log-in"}>LOG IN</Link>
                </li>
            </Fragment>
        )
    }

    /* Verification function in order to print or not logged or sign in*/
    function LogInOut() {
        /* Recuperate the value of store.IsLogged*/
        /* If IsLogged = true we print Logged, if not we print NotLogged*/

        if (isLogged) {
            return Logged();
        }

        return Notlogged();
    }

    return (
        <Fragment>

            <nav className="grey">
                <div className="nav-wrapper">
                    <img src={Img}  width='50px' className="brand-logo"></img>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger">
                        <i className="material-icons">menu</i>
                    </a>
                    <ul className="right hide-on-med-and-down">
                        {LogInOut()}
                    </ul>

                </div>
            </nav>
            <div className="sidenav" id="mobile-demo">
                {LogInOut()}
            </div>
        </Fragment>
    )

}