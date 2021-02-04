import React, {Fragment} from 'react'
import Axios from 'axios';

export default function Delete_Compagnies({id_compagnies}) {
    const deleteAd = async(id_compagnies) => {
        if (window.confirm('Delete this ad?')) {
            try {
                /*Création d'une requête appelant la route login */
                let res = await Axios({
                    method: "POST",
                    url: "http://localhost:3000/deleteCompagnies",
                    headers: {
                        "token": localStorage.getItem('token')
                    },
                    /* Envoie des données dans la requête*/
                    data: {
                        id_compagnies: id_compagnies
                    }
                })

            } catch (e) {
                console.log(e);
            }
        }
    }
    return (
        <Fragment>
            <button className="btn" onClick={() => deleteAd(id_compagnies)}>
                <span className="btnDelete">
                    <i className="far fa-trash-alt"></i>
                </span>
            </button>
        </Fragment>
    )
}
