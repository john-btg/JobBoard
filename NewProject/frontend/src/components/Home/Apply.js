import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import Modal from 'react-modal'

export default function Apply({id_ad,name,id_creator}) {
    //Créer un etat avec un tableau vide
    const [Res_Creator,
        setRes_Creator] = useState([]);
    //Créer une fonction asynchrone qui va récupérer le nom du créateur de l'annonc
    const getId_creator = async() => {

        let res = await Axios({
            method: "POST",
            url: "http://localhost:3000/mail_creator",
            data: {
                id_creator: id_creator
            }

        })
        //si l'etat est vide va le remplir sinon, le vide
        if (Res_Creator.length === 0) {
            return setRes_Creator(res.data)
        }
        setRes_Creator([])
    }
    useEffect(() => {

        getId_creator()
    }, [])
    //Créer des états pour chaque champs du formulaire
    const [Name,
        setName] = useState('');
    const [FirstName,
        setFirstName] = useState('');
    const [Email,
        setEmail] = useState('');
    const [Motivation,
        setMotivation] = useState('');
    //Créer une fonction asynchrone qui va envoyé un email au recruteur

    const sendMail = async() => {

        await Axios({
            method: "POST",
            url: "http://localhost:3000/send",
            data: {
                id_ad: id_ad,
                ad: name,
                nom: Name,
                prenom: FirstName,
                email: Email,
                motivation: Motivation,
                recruteur: Res_Creator[0].email,
                id_creator: id_creator
            }
        }).then(alert("Mail envoyé"), setModalIsOpen(false))
    }
    const recupPeople = async(id_peoples) => {

        let res = await Axios({
            method: "POST",
            url: "http://localhost:3000/UsersInfo",
            headers: {
                "token": localStorage.getItem('token')
            },
            data: {
                id_peoples: id_peoples
            }
        })
        let result = res.data.users
        setName(result.name)
        setFirstName(result.firstname)
        setEmail(result.email)
    }
    const [modalIsOpen,
        setModalIsOpen] = useState(false)

        
    function handleClick() {
        setModalIsOpen(true)
        if(localStorage.getItem('id'))
        {
            recupPeople(localStorage.getItem('id'));
        }
        
    }

    // Style de la page(bootstrap) avec un pop-up qui va s'afficher au clique du
    // bouton dans ce formulaire ajout d'un bouton pour envoyé un mail au recruteur
    return (
        <div>

            <button onClick={() => handleClick()} className="btn btn-primary apply">Apply</button>
            <Modal isOpen={modalIsOpen} className="auth-inner">

                <form>
                    <label htmlFor="name ">Name :</label>
                    <input type="text" value={Name} onChange={event => setName(event.target.value)}></input>

                    <label htmlFor="firstname">Firstname :</label>
                    <input type="text" value={FirstName} onChange={event => setFirstName(event.target.value)}></input>

                    <label htmlFor="email">Email : Email :</label>
                    <input type="email" value={Email} onChange={event => setEmail(event.target.value)}></input>

                    <label>Motivation :</label>
                    <textarea className="materialize-textarea" onChange={event => setMotivation(event.target.value)}></textarea>

                    <div className="modal-footer">
                        <button type="button" onClick={() => setModalIsOpen(false)}>Annuler</button>
                        <button
                            type="button"
                            onClick={event => sendMail()}
                            className="btn btn-primary"
                            data-dismiss="modal">Modify</button>
                    </div>
                </form>
            </Modal>
        </div>

    )

}