import React, {Fragment} from 'react'
import Axios from 'axios';

export default function Delete_ads({id_ad}) {
    const deleteAd = async(id_ad) => {
        if (window.confirm('Delete this ad?')) {
            try {
                /*Création d'une requête appelant la route login */
                let res = await Axios({
                    method: "POST",
                    url: "http://localhost:3000/deleteAds",
                    headers: {
                        "token": localStorage.getItem('token')
                    },
                    /* Envoie des données dans la requête*/
                    data: {
                        id_ad: id_ad
                    }
                })

            } catch (e) {
                console.log(e);
            }
        }
    }
    return (
        <Fragment>
            <button className="btn" onClick={() => deleteAd(id_ad)}>
                <span className="btnDelete">
                    <i className="far fa-trash-alt"></i>
                </span>
            </button>
        </Fragment>
    )
}
