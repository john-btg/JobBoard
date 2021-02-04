import React, {Fragment, useState} from 'react'
import Axios from 'axios';
import Modal from 'react-modal'

export default function Edit_ads({id_ad}) {
    const [nomAd,
        setnomAd] = useState('');
    const [descr,
        setDescr] = useState('');
    const [longDescr,
        setLongDescr] = useState('');
    const [salaire,
        setSalaire] = useState('');
    const [duration,
        setDuration] = useState('');

    const [Res_id,
        setRes_id] = useState([]);

    const recupAd = async() => {

        let res = await Axios({
            method: "POST",
            url: "http://localhost:3000/ad_info",
            data: {
                id_ad: id_ad
            }
        })
        setRes_id(res.data[0])
        let result = res.data[0]
        setnomAd(result.name_ad)
        setDescr(result.descr)
        setLongDescr(result.descr_all)
        setSalaire(result.salaire)
        setDuration(result.duration_job)
    }

    const modifyAd = async() => {

        Axios({
            method: "POST",
            url: "http://localhost:3000/modifyAd",
            data: {
                id_ad: Res_id.id_ad,
                nomAd: nomAd,
                descr: descr,
                longDescr: longDescr,
                salaire: salaire,
                duration: duration
            }
        }).then(setmodalIsOpen(false), window.location.reload(false))
    }
    const [modalIsOpen,
        setmodalIsOpen] = useState(false)
    function handleClick() {
        setmodalIsOpen(true)
        recupAd();
    }
    return (

        <Fragment>
            <button className="btn" onClick={() => handleClick()}>
                <span className="btnEdit">
                    <i className="fas fa-pencil-alt"></i>
                </span>
            </button>
            <Modal isOpen={modalIsOpen} className="auth-inner">
                <form>
                    <label htmlFor="namead ">Nom de l'annonce:</label>
                    <input
                        id="namead"
                        type="text"
                        value={nomAd}
                        onChange={event => setnomAd(event.target.value)}></input>

                    <label htmlFor="descr">Description rapide</label>
                    <input
                        id="descr"
                        type="email"
                        value={descr}
                        onChange={event => setDescr(event.target.value)}></input>

                    <label htmlFor="descrAll">Description Complete :</label>
                    {/* passage a la ligne fait dans le css */}
                    <textarea
                        className="materialize-textarea"
                        id="descrAll"
                        value={longDescr}
                        onChange={event => setLongDescr(event.target.value.replace(/'/g, '&'))}></textarea>

                    <label htmlFor="salaire">Salaire :</label>
                    <input
                        id="salaire"
                        type="text"
                        value={salaire}
                        onChange={event => setSalaire(event.target.value)}></input>

                    <label htmlFor="duree">Durée du job :</label>
                    <input
                        id="duree"
                        type="text"
                        value={duration}
                        onChange={event => setDuration(event.target.value)}></input>

                    <div className="modal-footer">
                        <button onClick={() => setmodalIsOpen(false)}>Close</button>
                        <button
                            type="button"
                            onClick={event => modifyAd()}
                            className="btn btn-primary"
                            data-dismiss="modal">Modifié cette annonce</button>
                    </div>
                </form>
            </Modal>

        </Fragment>
    )
}
