  
import FormRegister from "../../Components/FormRegister";
import { Redirect } from "react-router-dom";
export default function Register ({autentic}){

    if(autentic){
        return <Redirect to='/'/>
    }

    return(
        <>
         <FormRegister />
        </>
    )
}