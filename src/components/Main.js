import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LoginForm from './LoginForm'
import Dashboard from './Dashboard'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={LoginForm}/>
      <Route path='/dashboard' component={Dashboard}/>
    </Switch>
  </main>
)

export default Main