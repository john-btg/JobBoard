import React from 'react'

export default function Modal() {
    return (
            <div
                className="modal fade test"
                id="exampleModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{props.name}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label>Nom :
                                    <input type="text" onChange={event => setnom(event.target.value)}></input>
                                </label>
                                <label>Prénom :
                                    <input type="text" onChange={event => setprenom(event.target.value)}></input>
                                </label>
                                <label>
                                    Email :
                                    <input type="email" onChange={event => setemail(event.target.value)}></input>
                                </label>
                                <label>
                                    Motivation :
                                    <textarea className="materialize-textarea" onChange={event => setmotivation(event.target.value)}></textarea>
                                </label>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => sendMail()}
                                        data-dismiss="modal">Envoyer au recruteur</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        </div>
    )
}
