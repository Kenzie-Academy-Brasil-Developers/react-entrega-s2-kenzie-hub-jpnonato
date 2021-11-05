import './styleLogin.css'
import { TextField, Button } from '@material-ui/core'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import { useHistory,Redirect } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import * as yup from 'yup'

export default function FormLogin({autentic, setAutentic}){


    const[error,setError] = useState('')

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
        axios.post('https://kenziehub.herokuapp.com/sessions', data)
        .then((response) => {
            const{token, user} = response.data

            localStorage.setItem('@Doit:token', JSON.stringify(token))
            localStorage.setItem('@Doit:user', JSON.stringify(user.techs))
            localStorage.setItem('@Doit:id', JSON.stringify(user.id))

            setAutentic(true)

            return history.push('/home')
        })
        .catch((err) => setError(err.message)) 
        
        console.log(typeof error)
    }

    return(
        <form onSubmit={handleSubmit(handleForm)}>
            <div className='input'>
                <TextField 
                    label='E-mail'
                    placeholder='seu e-mail'
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
                    placeholder='sua senha'
                    type='password'
                    margin='normal'
                    variant='filled'
                    color='primary'
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    fullWidth
                />          
            </div>
            <div className='buttons'>
                <button  type='submit'>
                    Logar
                </button>
                <Button size="large" variant='contained' color='warning' onClick={() => linkTo('/')}>
                    Voltar
                </Button>
                <p style={{color: 'red'}}>{ error === 'Request failed with status code 401' || error === 'Request failed with status code 400' ? 'E-mail e/ou senha inválidos*' : '' }</p>
            </div>
        </form>
    )
}