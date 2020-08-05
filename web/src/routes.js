import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Posts from './pages/Posts'
import SignUp from './pages/SignUp'
import CheckCode from './pages/CheckCode'
import SignIn from './pages/SignIn'
import Servers from './pages/Servers'
import ResetPass from './pages/ResetPass'
import CheckReset from './pages/CheckReset'
import NewPass from './pages/NewPass'


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={SignIn} />
                <Route path="/check" component={CheckCode} />
                <Route path="/signup" component={SignUp} />
                <Route path="/server" component={Servers} />
                <Route path="/messages" component={Posts} />
                <Route path="/reset" component={ResetPass} />
                <Route path="/checkreset" component={CheckReset} />
                <Route path="/newpass" component={NewPass} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes