import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Posts from './pages/Posts'
import SignUp from './pages/SignUp'
import CheckCode from './pages/CheckCode'
import SignIn from './pages/SignIn'
import Servers from './pages/Servers'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={SignIn} />
                <Route path="/check" component={CheckCode} />
                <Route path="/signup" component={SignUp} />
                <Route path="/server" component={Servers} />
                <Route path="/messages" component={Posts} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes