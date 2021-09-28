import Register from '../Pages/Register'
import Login from '../Pages/Login'
import Home from '../Pages/Home'
import Begin from '../Pages/Begin'
import { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom' 


export default function Routes(){

    const[autentic, setAutentic] = useState(false)

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('@Doit:token'))

        if(token){
            return setAutentic(true)
        } 
    }, [autentic])

    return (

        <>
        <Switch>
            <Route exact path='/'>
                <Begin autentic={autentic} />
            </Route>
            <Route path='/login'>
                <Login 
                autentic={autentic} 
                setAutentic={setAutentic}
                />
            </Route>
            <Route path='/register'>
                <Register autentic={autentic} />
            </Route>
            <Route path='/home'>
                <Home autentic={autentic} setAutentic={setAutentic} />
            </Route>
        </Switch>
        </>

    )
}