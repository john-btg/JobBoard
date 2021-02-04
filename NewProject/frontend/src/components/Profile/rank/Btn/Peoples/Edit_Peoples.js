import React, {useState} from 'react'
import Axios from 'axios';
import Modal from 'react-modal'

export default function Edit_peoples({id_peoples}) {
    const [nom,
        setNom] = useState('');
    const [prenom,
        setPrenom] = useState('');
    const [droit,
        setDroit] = useState('');
    const [email,
        setEmail] = useState('');

    const [mdp,
        setMdp] = useState('');
    const [num,
        setNum] = useState('')

    const [Res_id,
        setRes_id] = useState([]);

    const recupPeople = async() => {

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
        setRes_id(result.id_people)
        setNom(result.name)
        setPrenom(result.firstname)
        setDroit(result.droit)
        setEmail(result.email)
        setNum(result.num)
        setMdp(result.mdp)
    }
    const modifyPeople = async() => {

        Axios({
            method: "POST",
            url: "http://localhost:3000/modifyPeople",

            data: {
                id:Res_id,
                nom:nom,
                prenom:prenom,
                droit:droit,
                email:email,
                num:num,
                mdp:mdp
            }
        }).then(setModalIsOpen(false),window.location.reload(false))
    }
console.log('+'+Res_id)
    const [modalIsOpen,
        setModalIsOpen] = useState(false)

    function handleClick() {
        setModalIsOpen(true)
        recupPeople()
    }

    return (
        <div>

            <button onClick={() => handleClick()}>Edit</button>
            <Modal isOpen={modalIsOpen} className="auth-inner">
                <form>
                    <label htmlFor="name ">Name :
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={nom}
                        onChange={event => setNom(event.target.value)}></input>

                    <label htmlFor="firstname">Firstname :
                    </label>
                    <input
                        id="firstname"
                        type="text"
                        value={prenom}
                        onChange={event => setPrenom(event.target.value)}></input>

                    <label htmlFor="salaire">Rank :
                    </label>
                    <input
                        id="salaire"
                        type="text"
                        value={droit}
                        onChange={event => setDroit(event.target.value)}></input>

                    <label htmlFor="email">Email :</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}></input>

                    <label htmlFor="password">Password :
                    </label>
                    <input
                        id="password"
                        type="text"
                        value={mdp}
                        onChange={event => setMdp(event.target.value)}></input>
                    <label htmlFor="mum">Num :
                    </label>
                    <input
                        id="num"
                        type="text"
                        value={num}
                        onChange={event => setNum(event.target.value)}></input>

                    <div className="modal-footer">
                        <button type="button" onClick={()=>setModalIsOpen(false)}>Annuler</button>
                        <button
                            type="button"
                            onClick={event => modifyPeople()}
                            className="btn btn-primary"
                            data-dismiss="modal">Modify</button>
                    </div>
                </form>

            </Modal>

        </div>

    )
}