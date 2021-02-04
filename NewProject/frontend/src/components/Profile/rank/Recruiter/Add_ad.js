import React, {Fragment, useState} from 'react'
import $ from 'jquery'
import Axios from 'axios';
import Modal from 'react-modal'
export default function Add_ad({id_people}) {

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

    const sendAd = async() => {
        try {
            let res = await Axios({
                method: "POST",
                url: "http://localhost:3000/sendAd",
                data: {
                    id_people: id_people,
                    nomAd: nomAd,
                    // nomCompagny: nomCompagny,
                    descr: descr,
                    longDescr: longDescr,
                    salaire: salaire,
                    duration: duration
                }
            })
            $("#exampleModal .close").click()
            console.log(res);
            alert("Annonce crée")
        } catch (e) {
            alert(e + ". Erreur, l'annonce n'a pas pu être crée..");
        }
    }
    function handleSubmit() {
        sendAd()

    }
    const [modalIsOpen,
        setmodalIsOpen] = useState(false)
    function handleClick() {
        setmodalIsOpen(true)
    }
    return (
        <Fragment>
            <button onClick={() => handleClick()} type="button" className="btn btn-primary">
                Add Article
            </button>

            <Modal isOpen={modalIsOpen} className="auth-inner">

                <form
                    onSubmit={(e) => {/** * Prevent submit from reloading the page */
                    e.preventDefault();
                    e.stopPropagation();
                    handleSubmit();
                }}>
                    <label>Name of this ads</label>
                    <input type="text" onChange={event => setnomAd(event.target.value)} required></input>

                    <label>
                        Quick description</label>
                    <input type="text" onChange={event => setDescr(event.target.value)} required></input>
                    <label>
                        Description</label>
                    <textarea //passage a la ligne fait dans le css
                        className="materialize-textarea" onChange={event => setLongDescr(event.target.value.replace(/'/g, '&&&'))} required></textarea>
                    <label>
                        Salary</label>
                    <input type="text" onChange={event => setSalaire(event.target.value)} required></input>
                    <label>
                        Duration</label>
                    <input type="text" onChange={event => setDuration(event.target.value)} required></input>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setmodalIsOpen(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Add this ads</button>
                    </div>
                </form>
            </Modal>
        </Fragment>
    )
}