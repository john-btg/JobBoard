import React, {useState, useEffect, Fragment} from 'react'
import Axios from 'axios';
import Apply from './Apply'

export default function Learn({id}) {
    const [Res_id,
        setRes_id] = useState([]);

    //Créer une fonction asynchrone qui
    const getInfo_id = async() => {
        let res = await Axios({
            method: "POST",
            url: "http://localhost:3000/ad_info",
            data: {
                id_ad: id
            }
        })
        console.log(res.data);
        if (Res_id.length !== 0) {
            setRes_id([])
        }

        return setRes_id(res.data)
    }
    useEffect(() => {
        getInfo_id();
    }, [id])
    function replacePostroph(description) {

        var result = description.replace(/&&&/g, "'")
        console.log(result);
        return result
    }
    return (
        <Fragment>

            {Res_id.map((user, key) => (
                <div key={key} className="auth-inner">
                    <div >
                        <div className="row">
                            <div className="col">
                                <h3>{user.name_ad}</h3>
                            </div>
                            <div className="col">
                                <Apply id_ad={user.id_ad} name={user.name_ad} id_creator={user.Creator}/>
                            </div>
                        </div>
                        <h4>{user.descr}</h4>
                        <hr/>
                        <h6>{user.duration_job}</h6>
                    </div>
                    <hr/>
                    <p>{replacePostroph(user.descr_all)}</p>
                    
                </div>

            ))}
        </Fragment>
    )
}