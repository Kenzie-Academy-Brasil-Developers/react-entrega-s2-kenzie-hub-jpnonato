import { TextField,Button, Alert } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import {useHistory} from 'react-router-dom'
import Card from '../Card'
import * as yup from 'yup'
import  axios  from 'axios'
import './styles.css'


export default function SmartList({setAutentic}) {

    const techs = JSON.parse(localStorage.getItem('@Doit:user'))
    const i = JSON.parse(localStorage.getItem('@Doit:id'))

    const [error, setError] = useState('')
    const [token] = useState(JSON.parse(localStorage.getItem('@Doit:token')) || '')
    const [dat, setDat] = useState([])
    const [tec, setTec] = useState(techs) 

    const history = useHistory()

    const linkTo = (path) => history.push(path)

    const { 
        register,
        handleSubmit,
    } = useForm()

    const handleForm = (data) => {
       setDat(data)
    }

    useEffect(()=> {
        axios.get(`https://kenziehub.herokuapp.com/users/${i}`)
        .then((response) => setTec(response.data.techs))
        },[tec])



     const handleClick = () => {
        axios.post('https://kenziehub.herokuapp.com/users/techs', dat, {
                  headers : {Authorization: `Bearer ${token}`}})
           .then((response) => {
               setTec([...tec, dat]);
               toast.success('Tecnologia adicionada!')
            })
           .catch((e) => console.log(e)) 
     }

     useEffect(()=> {
         handleClick()
     },[dat])


     const delet = (tech_id) =>{
        const idd = {
            id: tech_id
        }

        axios.delete(`https://kenziehub.herokuapp.com/users/techs/${tech_id}`,  {
            headers : {Authorization: `Bearer ${token}`}})
           .then((_) => toast.error('Tecnologia deletada!')).catch((e) => console.log(e))

        const item = tec.find((e) => e.id === tech_id)
        setTec(tec.filter((e) => e !== item))

        console.log(tec)
            
    }

    const returnToBegin = () => {
        setAutentic(false)
        localStorage.clear();
        history.push('/');
    } 
     
       
    return(
        <form onSubmit={handleSubmit(handleForm)}>
            <div>

            </div>
            <div className='input'>
                <TextField 
                    label='Tecnologia'
                    margin='normal'
                    variant='filled'
                    color='primary'
                    {...register('title')}
                />          
                <TextField 
                    label='status'
                    margin='normal'
                    variant='filled'
                    color='primary'
                    {...register('status')}
                />          
                <section>
                    <Button onClick={handleClick} size="large" type='submit' variant='contained' color='primary'>
                        Cadastrar
                    </Button>
                    <Button size="large" variant='contained' color='warning' onClick={returnToBegin}>
                    Sair
                    </Button>
                </section>    
            </div>
            <div className='list_cards'>
                {
                 tec.map((elt) => <Card title={elt.title} status={elt.status} te={elt.id} delet={delet} /> )
                }
            </div>
        </form>
    )
}
