const Express = require("express")
//import Products from "./products.js";
const mysql = require('mysql');
const jwt = require('jsonwebtoken')
const auth = require('./auth.js');
const cors = require('cors');
const nodemailer = require('nodemailer');

const connection = mysql.createConnection({host: 'localhost', user: 'root', password: '', database: "joji_board"});

connection.connect();

const app = Express();
const port = 3000;

// GET, Put, Post, Delete

app.use(Express.json({extended: false}))
app.use(cors())

app.get("/hello", auth, (req, res) => {
    res.json({msg: "secured"})
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const mdp = req.body.mdp;
    connection.query(`SELECT * FROM people WHERE email="${email}" AND mdp="${mdp}"`, function (err, rows, fields) {
        if (rows.length == 0) {

            return res
                .status(400)
                .json({msg: "invalid credential"})
        }
        let payload = {
            users: {
                id: rows[0].id_people,
                firstname: rows[0].firstname
            }
        }
        let id = rows[0].id_people;
        jwt.sign(payload, "hello", {
            expiresIn: 60 *60
        }, (err, token) => {
            if (err) 
                throw err;
            
            res.json({token, id});

        })
    })
});

app.post('/UsersInfo', auth, (req, res) => {

    const id = req.body.id_peoples;
    connection.query(`SELECT * FROM people WHERE id_people="${id}"`, function (err, rows, fields) {
        if (rows.length == 0) {

            return res
                .status(400)
                .json({msg: "invalid credential"})
        }
        connection
            .query(`SELECT name FROM compagnies WHERE Creator="${id}"`, function (errr, rowsr, fieldsr) {
                console.log('rows' + rowsr);
                if (rowsr.length == 0) {
                    let payload = {
                        users: {
                            id_people: rows[0].id_people,
                            droit: rows[0].droit,
                            firstname: rows[0].firstname,
                            name: rows[0].name,
                            email: rows[0].email,
                            num: rows[0].num,
                            mdp: rows[0].mdp,
                            checkcompagnies: false
    
                        }
                    }
                    return  res.json(payload);
                    
                }
                let payload = {
                    users: {
                        id_people: rows[0].id_people,
                        droit: rows[0].droit,
                        firstname: rows[0].firstname,
                        name: rows[0].name,
                        email: rows[0].email,
                        num: rows[0].num,
                        compagnies: rowsr[0].name,
                        mdp: rows[0].mdp,
                        checkcompagnies: true

                    }
                }
                return res.json(payload);
            })

    })
});

/* Return BDD ad Recruiter */
app.post('/adTableRecruiter', (req, res) => {
    try {
        const id = req.body.id_people;
        connection.query(`SELECT droit FROM people WHERE id_people ="${id}"`, function (err, rows, fields) {
            if (rows.length == 0) {

                return res
                    .status(400)
                    .json({msg: "invalid credential"})
            }
            // Si le Rank de l'utilisateur est différent, un message d'erreur est renvoyé
            if (rows[0].droit !== 2) {
                return res
                    .status(400)
                    .json({msg: "invalid rank"})
            }

            // let payload = { users: {     id_people: rows[0].id_people,     droit:
            // rows[0].droit,     firstname: rows[0].firstname,     name: rows[0].name,
            // email: rows[0].email,     num: rows[0].num } }

        })
        connection.query(`SELECT * FROM ad WHERE id_recruteur="${id}"`, function (errt, rowst, fieldst) {

            if (rowst.length == 0) {
                return res
                    .status(400)
                    .json({msg: "impossible to get ads"})

            }
            res.json(rowst);

        })
    } catch (e) {
        res.json(e);
    }
})

/* Return BDD ad */
app.post('/adTable', auth, (req, res) => {
    const id = req.body.id_caller;
    connection.query(`SELECT droit FROM people WHERE id_people ="${id}"`, function (err, rows, fields) {
        if (rows.length == 0) {

            return res
                .status(400)
                .json({msg: "invalid credential"})
        }
        // Si le Rank de l'utilisateur est différent, un message d'erreur est renvoyé
        if (rows[0].droit !== 3) {
            return res
                .status(400)
                .json({msg: "invalid rank"})
        }

        // let payload = { users: {     id_people: rows[0].id_people,     droit:
        // rows[0].droit,     firstname: rows[0].firstname,     name: rows[0].name,
        // email: rows[0].email,     num: rows[0].num } }

    })

    connection.query('SELECT * FROM ad', function (errt, rowst, fieldst) {
        if (rowst.length == 0) {
            return res
                .status(400)
                .json({msg: "impossible to get ads"})

        }
        res.json(rowst);

    })
})

/* Return BDD people */
app.post('/peopleTable', auth, (req, res) => {
    const id = req.body.id_caller;
    connection.query(`SELECT droit FROM people WHERE id_people ="${id}"`, function (err, rows, fields) {
        if (rows.length == 0) {

            return res
                .status(400)
                .json({msg: "invalid credential"})
        }
        // Si le Rank de l'utilisateur est différent, un message d'erreur est renvoyé
        if (rows[0].droit !== 3) {
            return res
                .status(400)
                .json({msg: "invalid rank"})
        }

        // let payload = { users: {     id_people: rows[0].id_people,     droit:
        // rows[0].droit,     firstname: rows[0].firstname,     name: rows[0].name,
        // email: rows[0].email,     num: rows[0].num } }

    })

    connection.query('SELECT * FROM people', function (errt, rowst, fieldst) {
        if (rowst.length == 0) {
            return res
                .status(400)
                .json({msg: "impossible to get ads"})

        }
        res.json(rowst);

    })
})

/* Return BDD compagnies */
app.post('/compagniesTable', auth, (req, res) => {
    const id = req.body.id_caller;
    connection.query(`SELECT droit FROM people WHERE id_people ="${id}"`, function (err, rows, fields) {
        if (rows.length == 0) {

            return res
                .status(400)
                .json({msg: "invalid credential"})
        }
        // Si le Rank de l'utilisateur est différent, un message d'erreur est renvoyé
        if (rows[0].droit !== 3) {
            return res
                .status(400)
                .json({msg: "invalid rank"})
        }

        // let payload = { users: {     id_people: rows[0].id_people,     droit:
        // rows[0].droit,     firstname: rows[0].firstname,     name: rows[0].name,
        // email: rows[0].email,     num: rows[0].num } }

    })

    connection.query('SELECT * FROM compagnies', function (errt, rowst, fieldst) {
        if (rowst.length == 0) {
            return res
                .status(400)
                .json({msg: "impossible to get ads"})

        }
        res.json(rowst);

    })
})
//Récupération des informations des offre de poste
app.get("/ad", (req, res) => {
    connection
        .query("SELECT * FROM ad",
        function (err, rows) {
            res.send(rows)
        })
})
//Récupération des info quand l'offre de poste est sélectionné (Show more...)
app.post("/ad_info", (req, res) => {
    const id = req.body.id_ad;
    console.log(id);
    connection.query(`SELECT * FROM ad WHERE id_ad="${id}" `, function (err, rows, fields) {
        console.log(rows);
        res.send(rows)
    })
})
//Récupération des info quand l'offre de poste est sélectionné (Show more...)
app.post("/Compagnies_info", (req, res) => {
    const id = req.body.id_compagnies;
    console.log(id);
    connection.query(`SELECT * FROM compagnies WHERE id_compagnies="${id}" `, function (err, rows, fields) {
        console.log(rows);
        res.send(rows)
    })
})

//Récupération des infos du createur de l'annonce
app.post("/mail_creator", (req, res) => {
    const name = req.body.id_creator;
    connection.query(`SELECT * FROM people WHERE id_people="${name}"`, function (err, rows) {
        res.send(rows)
    });
})

// Ajout des informations d'un utilisateur qui postule dans la table info_ad
// Envoi d'un mail au recruteur de cette annonce
app.post("/send", (req, res) => {
    connection
        .query(`INSERT INTO info_ad (id_info_ad, email_sent, ad, compagny_ad, people_interrested) VALUES (NULL, '${req.body.email}', '${req.body.id_ad}', '${req.body.id_creator}', '${req.body.nom + ' ' + req.body.prenom}')`, function (err, rows) {
            res.send('Requete executé')

        });

    //Se connecte au serveur Gmail avec authentification
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jojiboard@gmail.com',
            pass: 's9,JPN74'
        }
    });

    //Remplis le corp du mail et envoi au recruteur
    var mailOptions = {
        to: 'johnbatagne@gmail.com',
        subject: 'Nouvel utilisateur intéressé par votre annonce',
        html: '<h1>Bonjour,</h1> <p>' + req.body.prenom + ' ' + req.body.nom + ' a postulé pour le job ' + req.body.ad + ',</p><p>Voici ses motivations : ' + req.body.motivation + '</p><p> Vous pouvez prendre contact grace à son adresse mail : ' + req.body.email + '</p>'
    };
    //gestion des erreurs
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent');
        }
    });

})

//Ajout d'une annonce par le recruteur
app.post("/sendAd", (req, res) => {
    try
    {

        connection
            .query(`SELECT id_compagnies FROM compagnies WHERE Creator='${req.body.id_people}'`, function (errt, rowst, fieldst) {
                if (rowst.length == 0) {
                    return res
                        .status(400)
                        .json({msg: "impossible to get ads"})

                }
                var namesCompagny = rowst[0].id_compagnies;
                connection.query(`INSERT INTO ad (id_recruteur, name_ad, compagny, descr, descr_all, salaire, duration_job) VALUES ('${req.body.id_people}','${req.body.nomAd}','${namesCompagny}', '${req.body.descr}','${req.body.longDescr}', '${req.body.salaire}','${req.body.duration}')`);
                return res
                    .status(200)
                    .json({msg: 'Added'})
            })
    } catch (e) {
        return res
            .status(421)
            .json({msg: e})
    }
});

/* Update ad */
app.post("/modifyAd", (req, res) => {
    console.log(req.body);
    try
    {
        connection
            .query(`UPDATE ad SET name_ad='${req.body.nomAd}',descr='${req.body.descr}',descr_all='${req.body.longDescr}',salaire='${req.body.salaire}',duration_job='${req.body.duration}' WHERE id_ad=${req.body.id_ad}`, function (err, rows, fields) {
                console.log('Updated')
            })
        //res.json({msg: 'Updated'})
    } catch (e) {
        console.log(e);
        return res
            .status(421)
            .json({msg: e})
    }
})

/* Update Compagnies */
app.post("/modifyCompagnies", (req, res) => {
    console.log(req.body);
    try
    {
        connection
            .query(`UPDATE compagnies SET name='${req.body.name}',locality='${req.body.locality}', Creator='${req.body.creator}' WHERE id_compagnies=${req.body.id_compagnies}`, function (err, rows, fields) {
                console.log('Updated')
            })
        //res.json({msg: 'Updated'})
    } catch (e) {
        console.log(e);
        return res
            .status(421)
            .json({msg: e})
    }
})
/* Delete Ad */
app.post('/deleteAds', (req, res) => {
    connection
        .query(`DELETE FROM ad WHERE id_ad=${req.body.id_ad}`, function (err, rows, fields) {
            console.log('DELETE' + req.body.id_ad)
        })

})
/* Delete Compagnies */
app.post('/deleteCompagnies', (req, res) => {
    console.log(req.body)
    connection
        .query(`DELETE FROM compagnies WHERE id_compagnies=${req.body.id_compagnies}`, function (err, rows, fields) {
            console.log('DELETE' + req.body.id_compagnies)
        })

})
//Création d'un user avec test si email deja enregistré
app.post("/createUser", (req, res) => {
    console.log(req.body)
    let email = req.body.email;
    console.log(email)
    connection.query(`SELECT * FROM people WHERE email='${email}'`, function (err, rows, fields) {

        if (rows.length > 0) {
            res
                .status(401)
                .json({msg: "addresse deja enregistré"})

        } else {
            connection.query(`INSERT INTO
                    people (droit, firstname, name, email, mdp, num)
                    VALUES (
                            ${req.body.access},
                            '${req.body.nom}',
                            '${req.body.prenom}',
                            '${req.body.email}',
                            '${req.body.mdp}',
                            ${req.body.num}
                    )`)
        }
    })

})


/*ADD Compagny */
app.post(("/add_compagny"),(req,res)=>{
    console.log(req.body)
    connection.query(`INSERT INTO compagnies (name, locality, Creator) VALUES ('${req.body.nomCompagny}', '${req.body.locality}',${req.body.id_creator})`)
})


app.listen(port, () => {});