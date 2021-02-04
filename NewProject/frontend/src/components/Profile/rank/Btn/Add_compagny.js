import React, {useState, Fragment} from 'react'
import Axios from 'axios';
import Modal from 'react-modal'

export default function Add_compagny({id_people}) {
    const [nomCompagny,
        setnomCompagny] = useState('');
    const [localisation,
        setLocalisation] = useState('');

    const modifyAd = async() => {

        Axios({
            method: "POST",
            url: "http://localhost:3000/add_compagny",
            data: {
                id_creator: id_people,
                nomCompagny: nomCompagny,
                locality: localisation
            }
        }).then(window.location.reload(false))
    }    
    const [modalIsOpen,
        setModalIsOpen] = useState(false)

    function handleClick() {
        setModalIsOpen(true)
    }

    return (
        <Fragment>
            <button  onClick={() => handleClick()}
                type="button"
                className="btn btn-primary">
                Add Compagnies
            </button>
            
            <Modal isOpen={modalIsOpen} className="auth-inner">
           
                            <form>
                                <label htmlFor="namead ">Nom de votre entreprise:</label>
                                <input
                                    id="namead"
                                    type="text"
                                    onChange={event => setnomCompagny(event.target.value)}></input>

                                <label htmlFor="descr">Localisation :
                                </label>
                                <input
                                    id="descr"
                                    type="email"
                                    onChange={event => setLocalisation(event.target.value)}></input>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={()=>setModalIsOpen(false)} >Cancel</button>
                                    <button
                                        type="button"
                                        onClick={event => modifyAd()}
                                        className="btn btn-primary"
                                        data-dismiss="modal">Add this enterprise</button>
                                </div>
                            </form>
            </Modal>
        </Fragment>
    )
}