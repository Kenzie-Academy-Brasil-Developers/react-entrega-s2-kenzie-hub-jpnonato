import './style.css'
import { TextField, Button } from '@material-ui/core'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import { useHistory,Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import * as yup from 'yup'

export default function FormLogin(){


    const[error,setError] = useState((x) => {
        return typeof x === 'string' ? 'E-mail ou Senha inválidos' : ''
    })

    const history = useHistory()

    const linkTo = (path) => history.push(path)

    const schema = yup.object().shape({
        email: yup.string().required(''),
        password: yup
          .string()
          .required(''),
        
        })

    const { 
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({resolver: yupResolver(schema)})

    const handleForm = (data) => {
        axios.post('https://kenziehub.herokuapp.com/sessions')
        .then((response) => console.log(response)).catch((err) => setError(err.message))
        // history.push(`/home/${data.name}`)
    }

    return(
        <form onSubmit={handleSubmit(handleForm)}>
            <div className='input'>
                <TextField 
                    label='E-mail'
                    margin='normal'
                    variant='filled'
                    color='primary'
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    fullWidth
                />          
            </div>
            <div className='input'>
                <TextField 
                    label='Senha'
                    margin='normal'
                    variant='filled'
                    color='primary'
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    fullWidth
                />          
            </div>
            <div>
                <Button size="large" type='submit' variant='contained' color='primary'>
                    Login
                </Button>
                <Button size="large" variant='contained' color='primary' onClick={() => linkTo('/register')}>
                    Fazer o registro
                </Button>
                <p>{ error === 'Request failed with status code 400' ? 'E-mail e/ou senha inválidos*' : '' }</p>
                <p> {error} </p>
            </div>
        </form>
    )
}