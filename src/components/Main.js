import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LoginForm from './LoginForm'
import Dashboard from './Dashboard'

const Main = () => (
  <main>
    <Switch>
      <Route path='https://steenstn.github.io/bjj' component={LoginForm}/>
      <Route path='/bjj' component={LoginForm}/>
      <Route exact path='/' component={LoginForm}/>
      <Route path='https://steenstn.github.io/bjj/dashboard' component={Dashboard}/>
      <Route path='/dashboard' component={Dashboard}/>
    </Switch>
  </main>
)

export default Main
