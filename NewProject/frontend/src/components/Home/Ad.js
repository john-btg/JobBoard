import React, {Fragment, useEffect, useState} from 'react'
import Axios from 'axios';
import Learn from './Learn';
export default function Ad() {
    const [Resultat,
        setResultat] = useState([]);

    const getInfo = async() => {
        let res = await Axios({method: "GET", url: "http://localhost:3000/ad"})
        setResultat(res.data)
    }

    const [id,
        setId] = useState(0);

    useEffect(() => {
        getInfo()
        rightThings()
    }, [id])

    const rightThings = () => {
        setId(id)
    }
    return (
        <Fragment>
            <div className="container  margin-top">
                <div className="row">
                    <ul id="listAds" name="listAds" className="col s12 m3 l3 xl3">

                        {Resultat.map((announce, key) => (
                            <div>
                                <li
                                    key={key}
                                    onClick={() => setId(announce.id_ad)}
                                    className="auth-inner adsStyle liList margin-very-little-top">
                                    <h5>{announce.name_ad}</h5>
                                    <p>{announce.locality}</p>
                                    <p>{announce.name}</p>
                                    <hr/>
                                    <h6>{announce.descr}</h6>
                                </li>
                                <li
                                    key={key}
                                    onClick={() => setId(announce.id_ad)}
                                    className="auth-inner adsStyle liList margin-very-little-top">
                                    <h5>{announce.name_ad}</h5>
                                    <p>{announce.locality}</p>
                                    <p>{announce.name}</p>
                                    <hr/>
                                    <h6>{announce.descr}</h6>
                                </li>
                            </div>

                        ))}

                    </ul>
                    <div className="col s12 m9 l3 xl3 category ">
                        <Learn id={id} />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}