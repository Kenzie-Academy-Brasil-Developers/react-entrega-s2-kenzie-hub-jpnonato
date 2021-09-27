import FormLogin from "../../Components/FormLogin";
import { Redirect } from 'react-router-dom'
import './Login.css'


export default function Login ({autentic, setAutentic}){

        if(autentic){
            return <Redirect to='/'/>
        }

    return(
        <> 
        <div> 
            <h1>Login</h1>    
        </div>
        <FormLogin autentic={autentic} setAutentic={setAutentic} />
        </>
    )
}