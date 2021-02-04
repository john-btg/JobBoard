import React, {Fragment, useState} from 'react'
import Axios from 'axios';
import Modal from 'react-modal'

export default function Edit_Compagnies({id_compagnies}) {

    const [Id_compagnies, setid_compagnies] = useState('')
    const [nameCompagnies, setnameCompagnies] = useState('')
    const [localityCompagnies, setlocalityCompagnies] = useState('')
    const [CreatorCompagnies, setCreatorCompagnies] = useState('')
    const recupAd = async() => {

        let res = await Axios({
            method: "POST",
            url: "http://localhost:3000/Compagnies_info",
            data: {
                id_compagnies: id_compagnies
            }
        })
        let result = res.data[0]
        setid_compagnies(result.id_compagnies)
        setnameCompagnies(result.name)
        setlocalityCompagnies(result.locality)
        setCreatorCompagnies(result.Creator)
    }

    const modifyAd = async() => {

        Axios({
            method: "POST",
            url: "http://localhost:3000/modifyCompagnies",
            data: {
                id_compagnies: Id_compagnies,
                name: nameCompagnies,
                locality: localityCompagnies,
                creator: CreatorCompagnies
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
                    <label htmlFor="name">Name of compagnies:</label>
                    <input
                        id="name"
                        type="text"
                        value={nameCompagnies}
                        onChange={event => setnameCompagnies(event.target.value)}></input>

                    <label htmlFor="descr">Locality :</label>
                    <input
                        id="locality"
                        type="text"
                        value={localityCompagnies}
                        onChange={event => setlocalityCompagnies(event.target.value)}></input>


                    <label htmlFor="Creator">Creator :</label>
                    <input
                        id="Creator"
                        type="text"
                        value={CreatorCompagnies}
                        onChange={event => setCreatorCompagnies(event.target.value)}></input>
                    <div className="modal-footer">
                        <button onClick={() => setmodalIsOpen(false)}>Close</button>
                        <button
                            type="button"
                            onClick={event => modifyAd()}
                            className="btn btn-primary"
                            data-dismiss="modal">Modify this compagnies</button>
                    </div>
                </form>
            </Modal>

        </Fragment>
    )
}
