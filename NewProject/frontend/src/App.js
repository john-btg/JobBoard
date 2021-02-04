import React, {Fragment, useState} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";import './App.css';
import Navbar from './components/Navbar/Navbar'
import Users from './components/Profile/Users'
import Login from "./components/Log/Login_component";
import SignUp from "./components/Log/Signup_component";
import Home from './components/Home/Home'

function App() {
    
    function getLoggedStorage()
    {
        if(localStorage.getItem('IsLogged'))
        {
            var result = Boolean(localStorage.getItem('IsLogged'))
            return result;
        }
        else
        {
            return false;
        }
    }
    
    const [isLogged, setisLogged] = useState(getLoggedStorage());

    
    

    return (

        <Router>
            <Fragment>

                <Navbar isLogged={isLogged} setisLogged={setisLogged}/>

                    <Switch>
                        <Route exact path='/' component={Home}>
                        </Route>
                        <Route path="/Log-in">
                            <Login isLogged={isLogged} setisLogged={setisLogged} />
                        </Route>
                        <Route path="/Log-up" component={SignUp}/>

                        <Route path="/Users">
                            <Users isLogged={isLogged} setisLogged={setisLogged}/>
                        </Route>
                    </Switch>
            </Fragment>
        </Router>
    );
}
export default App;
