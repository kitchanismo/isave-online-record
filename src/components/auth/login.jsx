import React, { useState } from 'react'
import Joi from 'joi-browser'
import { cap } from '../../services/utilsService'
import { toast } from 'react-toastify'
import withAuth from '../hoc/withAuth'
import Form from '../common/form'
import Logo from '../common/logo'

const Login = ({ auth, ...props }) => {
  const [user, setUser] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({})

  const schema = {
    username: Joi.string()
      .required()
      .label('Username'),
    password: Joi.string()
      .required()
      .label('Password')
  }

  const handleSubmit = async (e, data) => {
    try {
      await auth.login(data)
      toast.success(`Welcome, ${cap(data.username)}`)
      props.history.replace('/')
    } catch ({ response }) {
      if (response && response.status === 401) {
        toast.error(response.data.status.errors)
      }
    }
  }

  const navigateSignUp = () => {
    props.history.replace('/sign-up')
  }

  return (
    <React.Fragment>
      <div className="row mt-5 border border-secondary">
        <div className="col-8 p-0">
          <Logo />
        </div>
        <div className="col-4 p-3">
          <h1>Login</h1>
          <Form
            data={{ data: user, setData: setUser }}
            errors={{ errors, setErrors }}
            onSubmit={handleSubmit}
            schema={schema}
          >
            {({ renderInput, renderButton }) => {
              return (
                <React.Fragment>
                  {renderInput('username', 'Username')}
                  {renderInput('password', 'Password', 'password')}
                  {renderButton('Login', null, 'Logging in...', true)}
                  <p className="mt-3 text-center">or</p>
                </React.Fragment>
              )
            }}
          </Form>
          <button
            onClick={navigateSignUp}
            className="btn btn-secondary btn-block"
            name="createAccount"
          >
            Create Account
          </button>
        </div>
      </div>
      <style jsx="">{`
        .row {
          border-radius: 7px;
          background-color: white;
        }
        .col-8 {
          border-radius: 7px;
        }
      `}</style>
    </React.Fragment>
  )
}

export default withAuth(Login)
