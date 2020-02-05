import React from 'react';
import Typography from '@material-ui/core/Typography';

import Job from './Job'

export default function Jobs({jobs}) {
    return(
        <div className='jobs'>
            <Typography variant ="h5" component="h1">
                Entery level Software jobs By Srinivas.1
            </Typography>
            {
                jobs.map(
                    job => <Job job = {job} />

                )
            }

        </div>

    )
}