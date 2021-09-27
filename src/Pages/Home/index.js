import SmartList from "../../Components/SmartList"
import { Redirect } from 'react-router-dom'

export default function Home ({autentic}){

    if(!autentic){
        return <Redirect to='/'/>
    }

    return(
        <div>
            <h1> Smart Learn List</h1>
            <SmartList />
        </div>
    )
}