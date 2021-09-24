import Register from '../Pages/Register'
import Login from '../Pages/Login'
import Home from '../Pages/Home'
import { Switch, Route } from 'react-router-dom' 

export default function Routes(){

    return (

        <>
        <Switch>
            <Route exact path='/'>
                <Login />
            </Route>
            <Route path='/register'>
                <Register />
            </Route>
            <Route path='/home'>
                <Home />
            </Route>
        </Switch>
        </>

    )
}