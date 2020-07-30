import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import CheckSMS from './pages/CheckSMS'
import Posts from './pages/Posts'
import SignIn from './pages/SignIn'
import CheckCode from './pages/CheckCode'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/check" component={CheckSMS} />
                <Route path="/code" component={CheckCode} />
                <Route path="/messages" component={Posts} />
                <Route path="/signin" component={SignIn} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes