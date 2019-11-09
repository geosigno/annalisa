import React from 'react';
import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, CircularProgress } from '@material-ui/core';

import './form.scss';

export const formStyle = makeStyles({
    input: {
        marginBottom: 16
    },
    btnPrimary: {
        display: 'inline',
        width: 'auto',
        background: 'linear-gradient(45deg, #f2709c 30%, #ff9472 90%)',
        borderRadius: 32,
        color: 'white',
        height: 48,
        padding: '0 64px'
    },
    loader: {
        position: 'absolute',
        color: 'white',
        left: -32
    }
});

const SignInForm = (props) => {
    const { handleSubmit, handleChange, loading } = props;
    const classes = formStyle();
    return (
        <div>
            <div className="fullPage">
                <div className="fullPage__container">
                    <form className="form" onSubmit={handleSubmit}>
                        <h2 className="form__title">Rejoingnez Annalise French lessons!</h2>
                        <div className="form__container">
                            <TextField id="username" label="nom" onChange={handleChange} className={classes.input} />
                            <TextField id="email" label="email" onChange={handleChange} className={classes.input} />
                            <TextField id="password" type="password" label="password" onChange={handleChange} className={classes.input} />
                        </div>
                        <Button className={classes.btnPrimary} type="submit">
                            {loading && <CircularProgress size={24} className={classes.loader} />}
                            s&apos;enregistrer
                        </Button>
                        <p className="form__info">
                            Vous avez déja un compte?
                            <Link href="/signin">
                                <a>Connectez vous</a>
                            </Link>
                        </p>
                    </form>
                    <Link href="/">
                        <a className="form__back">Retourner à la page d'accueil</a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;
