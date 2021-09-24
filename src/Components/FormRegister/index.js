import './style.css'
import { TextField, Button } from '@material-ui/core'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import { useHistory, Link } from 'react-router-dom'
import * as yup from 'yup'

export default function FormRegister(){

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
          confirm_password: yup.string()
          .required("Você deve confirmar sua senha!")
          .oneOf([yup.ref("password")], "Senha não confere com a senha criada acima!"),
      })

    const { 
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({resolver: yupResolver(schema)})

    const handleForm = (data) => {
        console.log(data)
    }

    return(
        <form onSubmit={handleSubmit(handleForm)}>
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
            <div className='input'>
                <TextField 
                    label='Confirmar sua senha'
                    margin='normal'
                    variant='filled'
                    color='primary'
                    {...register('confirm_password')}
                    error={!!errors.confirm_password}
                    helperText={errors.confirm_password?.message}
                    fullWidth
                />          
            </div>
            <div>
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