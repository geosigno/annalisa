import React from 'react';
import Link from 'next/link';

import { TextField, Button } from '@material-ui/core';

import './form.scss';
import { formStyle } from './signup-form';

export default function SignInForm(props) {
    const classes = formStyle();
    return (
        <div>
            <div className="fullPage">
                <div className="fullPage__container">
                    <form className="form" onSubmit={props.handleSubmit}>
                        <h2 className="form__title">Content de vous revoir!</h2>
                        <div className="form__container">
                            {/* <a href='http://localhost:1337/connect/facebook/'>Connect with Facebook</a> */}
                            <TextField id="identifier" label="identifier" onChange={props.handleChange} className={classes.input} />
                            <TextField id="password" type="password" label="password" onChange={props.handleChange} className={classes.input} />
                        </div>
                        <Button className={classes.btnPrimary} type="submit">
                            se connecter
                        </Button>
                        <p className="form__info">
                            Vous n'avez pas encore de compte?
                            <Link href="/signup">
                                <a>Enregistrez vous</a>
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
