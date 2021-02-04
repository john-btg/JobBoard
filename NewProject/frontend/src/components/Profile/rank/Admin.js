import React, {useState, useEffect, Fragment} from 'react'
import Axios from 'axios';
import Edit_ads from './Btn/Ads/Edit_ads';
import Delete_ads from './Btn/Ads/Delete_ads';
import Delete_Peoples from './Btn/Peoples/Delete_Peoples';
import Edit_Peoples from './Btn/Peoples/Edit_Peoples';
import Delete_Compagnies from './Btn/Compagnies/Delete_Compagnies';
import Edit_Compagnies from './Btn/Compagnies/Edit_Compagnies';

export default function Admin({id_people}) {
    const [adsTable,
        setadsTable] = useState([])
    const get_ads = async(id_caller) => {
        try {
            /*Création d'une requête appelant la route login */
            let res = await Axios({
                method: "POST",
                url: "http://localhost:3000/adTable",
                headers: {
                    "token": localStorage.getItem('token')
                },
                /* Envoie des données dans la requête*/
                data: {
                    id_caller: id_caller
                }
            })
            setadsTable(res.data);
        } catch (e) {
            setadsTable([]);
        }
    }
    const [peoplesTable,
        setpeoplesTable] = useState([])

    const get_peoples = async(id_caller) => {
        try {
            /*Création d'une requête appelant la route login */
            let res = await Axios({
                method: "POST",
                url: "http://localhost:3000/peopleTable",
                headers: {
                    "token": localStorage.getItem('token')
                },
                /* Envoie des données dans la requête*/
                data: {
                    id_caller: id_caller
                }
            })
            setpeoplesTable(res.data);
        } catch (e) {
            setpeoplesTable([]);
        }
    }
    const [compagniesTable,
        setcompagniesTable] = useState([])

    const get_compagnies = async(id_caller) => {
        try {
            /*Création d'une requête appelant la route login */
            let res = await Axios({
                method: "POST",
                url: "http://localhost:3000/compagniesTable",
                headers: {
                    "token": localStorage.getItem('token')
                },
                /* Envoie des données dans la requête*/
                data: {
                    id_caller: id_caller
                }
            })
            setcompagniesTable(res.data);
        } catch (e) {
            setcompagniesTable([]);
        }
    }

    const PrintAds = () => {
        return (
            <Fragment>
                    <div className="row auth-inner">
                        <h1>Ads</h1>
                        <table className="table responsive-table table-hover">
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
                                        <td className="truncate">{ad.descr_all}</td>
                                        <td>{ad.salaire}</td>
                                        <td>{ad.duration_job}</td>
                                        <td>
                                            <Edit_ads id_ad={ad.id_ad}/>
                                            <Delete_ads id_ad={ad.id_ad}/>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
            </Fragment>
        )
    }
    function EditPeople(id) {
        alert(id)
    }
    function DeletePeople(id) {
        alert(id)

    }
    const PrintPeoples = () => {
        return (
            <Fragment>
                <div className="auth-inner  ">
                    <div className="form-group">
                        <h1>Peoples</h1>
                    </div>
                    <div className="row">
                        <table className="table responsive-table table-hover">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Rank</th>
                                    <th>First Name</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mdp</th>
                                    <th>Num</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {peoplesTable.map((peoples, key) => (
                                    <tr key={key}>
                                        <td>{peoples.id_people}</td>
                                        <td>{peoples.droit}</td>
                                        <td>{peoples.firstname}</td>
                                        <td>{peoples.name}</td>
                                        <td>{peoples.email}</td>
                                        <td>{peoples.mdp}</td>
                                        <td>{peoples.num}</td>
                                        <td>
                                            <Edit_Peoples id_peoples={peoples.id_people}/>
                                            <Delete_Peoples id_peoples={peoples.id_people}/>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </Fragment>
        )
    }
    const PrintCompagnies = () => {
        return (
            <Fragment>
                <div className="auth-inner">
                    <div className="form-group">
                        <h1>Compagnies</h1>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <table className="table responsive-table table-hover">

                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Locality</th>
                                        <th>Creator</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {compagniesTable.map((compagnies, key) => (
                                        <tr key={key}>
                                            <td>{compagnies.id_compagnies}</td>
                                            <td>{compagnies.name}</td>
                                            <td>{compagnies.locality}</td>
                                            <td>{compagnies.Creator}</td>
                                            <td>
                                                <Edit_Compagnies id_compagnies={compagnies.id_compagnies}/>
                                                <Delete_Compagnies id_compagnies={compagnies.id_compagnies}/>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </Fragment>
        )
    }
    useEffect(() => {
        get_ads(id_people);
        get_peoples(id_people);
        get_compagnies(id_people);
        returnAll();
    }, [])
    const returnAll = () => {
        return (
            <Fragment>
                <PrintAds/>
                <PrintPeoples/>
                <PrintCompagnies/>
            </Fragment>
        )
    }
    return (returnAll());
}