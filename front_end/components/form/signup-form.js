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

export default function SignInForm(props) {
    const classes = formStyle();
    return (
        <div>
            <div className="fullPage">
                <div className="fullPage__container">
                    <form className="form" onSubmit={props.handleSubmit}>
                        <h2 className="form__title">Rejoingnez Annalise French lessons!</h2>
                        <div className="form__container">
                            <TextField id="username" label="nom" onChange={props.handleChange} className={classes.input} />
                            <TextField id="email" label="email" onChange={props.handleChange} className={classes.input} />
                            <TextField id="password" type="password" label="password" onChange={props.handleChange} className={classes.input} />
                        </div>
                        <Button className={classes.btnPrimary} type="submit">
                            {props.loading && <CircularProgress size={24} className={classes.loader} />}
                            s'enregistrer
                        </Button>
                        <p className="form__info">
                            Vous avez déja un compte?
                            <Link href="/signin">
                                <a>Connectez vous</a>
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
