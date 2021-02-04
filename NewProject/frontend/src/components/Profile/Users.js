import React, {Fragment, useState, useEffect} from 'react'
import Axios from 'axios';
import Img from '../../style/img/anonyme.png'
import Admin from './rank/Admin'
import Recruiter from './rank/Recruiter/Recruiter'

export default function Users({isLogged, setisLogged}) {
    // Création d'un Hook
    const [Resultat,
        setResultat] = useState([]);

    const getInfo = async() => {
        try {

            let res = await Axios({
                method: "POST",
                url: "http://localhost:3000/UsersInfo",
                headers: {
                    "token": localStorage.getItem('token')
                },
                data: {
                    id_peoples: localStorage.getItem('id')
                }

            })
            if (Resultat.length === 0) {
                console.log('res.dat[0]')
                console.log(res.data)
                return setResultat(Object.values(res.data))
            }
        } catch (e) {
            console.log(e);
            setResultat(["Veuillez vous identifier"])
            /* Variable false à renvoyer vers le store Redux*/
            setisLogged(false)
        }
    };
    useEffect(() => {
        getInfo();
    }, [])

    const checkRank = (id_people, droits, checkcompagnies) => {
        switch (droits) {
            case 1:
                break;
            case 2:
                return <Recruiter id_people={id_people} checkcompagnies={checkcompagnies}/>
            case 3:
                return <Admin id_people={id_people}/>
        }
    }
    function checkDroit(droit) {
        switch (droit) {
            case 1:
                return "Users"

            case 2:
                return "Recruiter"
            case 3:
                return "Admin"
        }
    }
    const InfoUser = () => {

        if (isLogged) {
            return (
                <Fragment>
                    <div className="container">
                        <div className="row">
                            <div className="col s12 m12 l3 xl3 margin-top">
                                <div className="auth-inner">
                                    <div className="form-group text-center">
                                        <img src={Img} width="150px"/>
                                        <h1>Profile</h1>
                                    </div>
                                    <div className="form-group">
                                        {Resultat.map((users, key) => (

                                            <div key={key}>
                                                <p>{users.email}</p>
                                                <p>{users.name} {users.firstname}</p>
                                                <p>{users.compagnies}</p>
                                                <p>{checkDroit(users.droit)}</p>
                                                <p>{users.num}</p>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>
                            <div className="col s12 m6 l9 xl9 margin-top ">
                                <div className="container">
                                        {Resultat.map((users, key) => (

                                            <div key={key}>
                                                {checkRank(users.id_people, users.droit, users.checkcompagnies)}
                                            </div>
                                        ))}

                                </div>

                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        }
        return (
            <Fragment>
                <div className="container mx-auto align-items-center margin-top">
                    <div className="auth-inner">
                        <div className="d-flex justify-content-center h-100">
                            <p>Veuillez vous connecter pour voir vos informations</p>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
    return InfoUser()
}