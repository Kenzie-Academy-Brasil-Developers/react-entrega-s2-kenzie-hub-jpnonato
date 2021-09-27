import { Button } from "@material-ui/core"
import { useHistory, Redirect } from 'react-router-dom'
import './Begin.css'


export default function Begin ({autentic}){

    const history = useHistory()

    const linkTo = (path) => history.push(path)

    if(autentic){
        return <Redirect to='/'/>
    }

    return(
        <div> 
            <div>
              <h1> welcome to Smart Learn List</h1> 
            </div>
            <div className="begin_buttons">
                <Button size="large" variant='contained' color='primary' onClick={() => linkTo('/register')}>
                    Fazer o registro
                </Button>
                <Button className='login_begin' size="large" variant='contained' color='primary' onClick={() => linkTo('/login')}>
                    Fazer login
                </Button>  
            </div>
        </div>
    )
}