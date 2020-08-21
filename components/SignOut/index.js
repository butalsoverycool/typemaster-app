import React from 'react';

import { withFirebase } from '../Firebase';

import { ButtonStandard } from '../Elements';

const SignOutButton = ({ firebase, ...props }) => (
    <a className="landing-btn" onClick={() => firebase.doSignOut({ ...props })}>
        Logga ut
    </a>
);

export default withFirebase(SignOutButton);
