import './style.css'
import { TextField, Button } from '@material-ui/core'
import {useForm } from 'react-hook-form'
import {yupResolver } from '@hookform/resolvers/yup'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import * as yup from 'yup'
import { object, string } from 'yup/lib/locale'

export default function FormRegister({autentic}){

    const [error, setError] = useState() 

    const history = useHistory()

    const linkTo = (path) => history.push(path)


    const schema = yup.object().shape({
        name: yup.string().required("Campo obrigatório*"),
        email: yup.string().email("Email inválido*").required("Campo obrigatório*"),
        password: yup
          .string()
          .min(8, "Mínimo de 8 dígitos*")
          .matches(
            /^((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Senha deve conter ao menos uma letra maiúscula, uma minúscula, um número e um caracter especial!")
          .required("Campo obrigatório*"),
         
    })

    const { 
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({resolver: yupResolver(schema)})

    const handleForm = (data) => {
        axios.post('https://kenziehub.herokuapp.com/users', data)
        .then((_) =>  history.push('/login') )
    }

    return(
        <form className='register_form' onSubmit={handleSubmit(handleForm)}>
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
                    label='Nome'
                    margin='normal'
                    variant='filled'
                    color='primary'
                    {...register('name')}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    fullWidth
                />          
            </div>
            <div className='input'>
                <TextField 
                    label='Senha'
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
            <div className='input'>
                <TextField 
                    label='Bio'
                    margin='normal'
                    variant='filled'
                    color='primary'
                    {...register('bio')}
                    error={!!errors.bio}
                    helperText={errors.bio?.message}
                    fullWidth
                />          
            </div>
            <div className='input'>
                <TextField 
                    label='Contato'
                    margin='normal'
                    variant='filled'
                    color='primary'
                    {...register('contact')}
                    error={!!errors.contact}
                    helperText={errors.contact?.message}
                    fullWidth
                />          
            </div>
            <div className='input'>
                <TextField 
                    label='Módulo do curso'
                    margin='normal'
                    variant='filled'
                    color='primary'
                    {...register('course_module')}
                    error={!!errors.course_module}
                    helperText={errors.course_module?.message}
                    fullWidth
                />          
            </div>
            <div className="buttons">
                <Button size="large" type='submit' variant='contained' color='primary'>
                    Cadastrar
                </Button>
                <Button size="large" variant='contained' color='warning' onClick={() => linkTo('/')}>
                  Voltar
                </Button>
            </div>
        </form>
    )
}



