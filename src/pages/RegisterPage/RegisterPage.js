import React, {useContext, useState} from "react";
import FirebaseContext from "../../components/FireBaseContext";
import ErrorMessage from "../../components/ErrorMessage";
import {withRouter} from "react-router-dom";
import {DASHBOARD} from "../../constants/roures";

import './RegisterPage.css';

const RegisterPage = ({history}) => {
    const firebase = useContext(FirebaseContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const handleRegistration = async e => {
        e.preventDefault();
        
        if (!name) {
            setErrorMessage('Fill all fields, please');
            return;
        }

        try {
            await firebase.register(name, email, password);
            history.push(DASHBOARD);
        } catch (e) {
            setErrorMessage(e.message);
        }
    };

    return (
        <div className="jumbotron text-center register-page">
            <form className="d-flex flex-column col-md-5 col-sm-8 mx-auto form-group"
                  onSubmit={handleRegistration}>
                <label>
                    Name:
                    <input className="form-control"
                           type="text"
                           value={name}
                           onChange={e => setName(e.target.value)}/>
                </label>
                <label>
                    Email:
                    <input className="form-control"
                           type="text"
                           value={email}
                           onChange={e => setEmail(e.target.value)}/>
                </label>
                <label>
                    Password:
                    <input className="form-control"
                           type="password"
                           value={password}
                           onChange={e => setPassword(e.target.value)}/>
                </label>
                <input className="btn btn-outline-success col-4 mx-auto mt-3" type="submit"/>
            </form>
            {errorMessage ? <ErrorMessage message={errorMessage}/> : null}
        </div>
    )
};

export default withRouter(RegisterPage);