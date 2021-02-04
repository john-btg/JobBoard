import React, {useState, useEffect, Fragment} from 'react'
import Axios from 'axios';
import Add_ad from './Add_ad'
import Delete_ads from '../Btn/Ads/Delete_ads'
import Add_compagny from'../Btn/Add_compagny'
import Edit_ads from '../Btn/Ads/Edit_ads'
export default function Recruiter({id_people, checkcompagnies}) {
    const [adsTable,
        setadsTable] = useState(null)
    const get_ads = async(id_people) => {
        try {
            /*Création d'une requête appelant la route login */
            let res = await Axios({
                method: "POST",
                url: "http://localhost:3000/adTableRecruiter",
                headers: {
                    "token": localStorage.getItem('token')
                },
                /* Envoie des données dans la requête*/
                data: {
                    id_people: id_people
                }
            })
            console.log('ici');
            setadsTable(res.data);
        } catch (e) {
            setadsTable(null);

        }
    }

    useEffect(() => {
        console.log(id_people)
        get_ads(id_people)
    }, [])

    
    function CheckTable() {
        if(checkcompagnies)
        {
        if (adsTable != null) {
            return (
                <Fragment>
                    <Add_ad id_people={id_people}/>

                    <table className="table table-hover responsive-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Compagny</th>
                                <th>Little Description</th>
                                <th>Big Description</th>
                                <th>Salary</th>
                                <th>Duration</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adsTable.map((ad, key) => (
                                <tr key={key}>
                                    <td>{ad.id_ad}</td>
                                    <td>{ad.name}</td>
                                    <td>{ad.compagny}</td>
                                    <td>{ad.descr}</td>
                                    <td>{ad.descr_all}</td>
                                    <td>{ad.salaire}</td>
                                    <td>{ad.duration_job}</td>
                                    <td>
                                        <Edit_ads id_ad={ad.id_ad} get_ads={get_ads}/>
                                        <Delete_ads id_ad={ad.id_ad}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Fragment>
            )
        }
        return (
            <Fragment>
                <p>You don't have publish any Ad</p>
                <Add_ad id_people={id_people}/>
            </Fragment>
        )
        }
        else
        {
            return (<Fragment>
                <Add_compagny id_people={id_people}/>
            </Fragment>)
        }
    }
    return (
        <Fragment>
            <div className="auth-inner">
                <div className="form-group">

                    {< CheckTable />}

                </div>

            </div>
        </Fragment>
    )
}
