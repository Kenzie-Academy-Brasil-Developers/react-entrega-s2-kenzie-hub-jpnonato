import { Button } from '@material-ui/core'
import { useState } from 'react'
import axios from 'axios'
import './style.css'


export default function Card({title, status, te, delet}){


    return(
        <>
         <ul class='card'>
            <li>{title}</li>
            <li>{status}</li>
            <Button onClick={() => delet(te)}>Retirar</Button>
         </ul>
        </>
    )
}