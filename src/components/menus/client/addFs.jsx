import React, { useState, useContext, useEffect } from 'react'
import Form from '../../common/form'
import { toast } from 'react-toastify'
import Joi from 'joi-browser'
import { formatDate, joiLettersOnly } from '../../../services/utilsService'
import auth from '../../../services/authService'
import { getPromos } from '../../../services/userService'

import { ClientContext } from '../../../context'

const AddClient = props => {
  const { onAddClient, status } = useContext(ClientContext)
  const [promos, setPromos] = useState([])

  useEffect(() => {
    getPromos().then(promos => {
      setPromos(promos)
    })
  }, [])

  const [client, setClient] = useState({
    firstname: '',
    lastname: '',
    middlename: '',
    address: '',
    contact: '',
    birthdate: '',
    promo: '',
    dateInsured: formatDate(Date.now()),
    expiredDate: '',
    codeNo: '',
    userInsured: '',
    gender: '',
    mode: '',
    civil: '',
    forApproval: true
  })

  const [selectedPromo, setSelectedPromo] = useState(null)
  const [selectedGender, setSelectedGender] = useState(null)
  const [selectedMode, setSelectedMode] = useState(null)
  const [selectedCivil, setSelectedCivil] = useState(null)
  const [errors, setErrors] = useState({})

  const codeNoValidation = () => {
    return client.forApproval
      ? Joi.optional()
      : Joi.string()
          //.regex(/^(\d+-?)+\d+$/)
          .regex(/^[a-zA-Z0-9-]+$/)
          .error(errors => {
            errors.forEach(err => {
              switch (err.type) {
                case 'string.regex.base':
                  err.message =
                    '"Policy Number" must only have a number and letter with hyphen'
                  break
                case 'string.min':
                  err.message =
                    '"Policy Number" must be equal to 15 characters long'
                  break
                case 'string.max':
                  err.message =
                    '"Policy Number" must be equal to 15 characters long'
                  break
                default:
                  break
              }
            })
            return errors
          })
          .min(15)
          .max(15)
          .label('Policy Number')
  }

  const schema = {
    firstname: joiLettersOnly('Firstname'),
    middlename: joiLettersOnly('Middlename'),
    lastname: joiLettersOnly('Lastname'),
    codeNo: codeNoValidation(),
    contact: Joi.optional(),
    address: Joi.optional(),
    expiredDate: Joi.optional(),
    birthdate: Joi.string()
      .required()
      .label('Birthdate'),
    dateInsured: Joi.string()
      .required()
      .label('Date Insured'),
    forApproval: Joi.optional(),
    userInsured: Joi.optional(),
    gender: Joi.string()
      .required()
      .label('Gender'),
    mode: Joi.string()
      .required()
      .label('Mode of Payment'),
    civil: Joi.string()
      .required()
      .label('Civil Status'),
    promo: Joi.string()
      .required()
      .label('Promo Officer')
  }

  const handleChangeGender = gender => setSelectedGender(gender)

  const handleChangeCivil = civil => setSelectedCivil(civil)

  const handleChangePromo = promo => setSelectedPromo(promo)

  const handleChangeMode = mode => {
    setSelectedMode(mode)
  }

  const getExpiredDate = (date, mode) => {
    const dateInsured = new Date(date)

    const expiredDate = new Date(dateInsured)

    expiredDate.setMonth(dateInsured.getMonth() + getAddedMonth(mode))

    return formatDate(expiredDate)
  }

  const handleSubmit = async (e, client) => {
    if (!client.forApproval && client.codeNo === '') {
      setErrors({ codeNo: `"Policy Number" is not allowed to be empty` })
      return
    }
    const expiredDate = getExpiredDate(client.dateInsured, client.mode)

    const _client = {
      ...client,
      promo: selectedPromo.id,
      dateInsured: new Date(client.dateInsured).toISOString(),
      expiredDate: new Date(expiredDate).toISOString(),
      userInsured: auth.getCurrentUser().id
    }

    try {
      await onAddClient(_client)
      toast.success('Saved')
      setClient({
        firstname: '',
        lastname: '',
        middlename: '',
        address: '',
        contact: '',
        dateInsured: '',
        birthdate: '',
        codeNo: '',
        userInsured: '',
        promo: '',
        gender: '',
        mode: '',
        civil: '',
        forApproval: true
      })
      setSelectedGender(null)
      setSelectedMode(null)
      setSelectedCivil(null)
      setSelectedPromo(null)
    } catch (error) {
      console.log(error)
    }
  }

  const genders = [
    {
      id: 1,
      label: 'Male',
      value: 'male'
    },
    {
      id: 2,
      label: 'Female',
      value: 'female'
    }
  ]
  const civils = [
    {
      id: 1,
      value: 'single',
      label: 'Single'
    },
    {
      id: 2,
      value: 'divorced',
      label: 'Divorced'
    },
    {
      id: 3,
      value: 'widowed',
      label: 'Widowed'
    }
  ]
  const modes = [
    {
      id: 1,
      value: 'monthly',
      label: 'Monthly'
    },
    {
      id: 2,
      value: 'quarterly',
      label: 'Quarterly'
    },
    {
      id: 3,
      value: 'semi',
      label: 'Semi-Annually'
    },
    {
      id: 4,
      value: 'annually',
      label: 'Annually'
    }
  ]

  const getAddedMonth = mode => {
    switch (mode) {
      case 'monthly':
        return 1
      case 'quarterly':
        return 3
      case 'semi':
        return 6
      case 'annually':
        return 12
      default:
        return 0
    }
  }

  const handleDateInsured = date => {
    setClient({
      ...client,
      dateInsured: formatDate(date)
    })
  }

  const handleBirthdate = date => {
    setClient({
      ...client,
      birthdate: formatDate(date)
    })
  }

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h2">Future Savings</h1>
      </div>
      <Form
        data={{ data: client, setData: setClient }}
        errors={{ errors, setErrors }}
        onSubmit={handleSubmit}
        schema={schema}
      >
        {({
          renderInput,
          renderSelect,
          renderTextArea,
          renderDatePicker,
          renderButton,
          renderCheckbox
        }) => {
          return (
            <div className="row">
              <div className="col-6">
                {renderInput('firstname', 'Firstname')}
                {renderInput('middlename', 'Middlename')}
                {renderInput('lastname', 'Lastname')}
                {renderSelect(
                  'gender',
                  'Gender',
                  selectedGender,
                  handleChangeGender,
                  genders
                )}
                {renderSelect(
                  'civil',
                  'Civil Status',
                  selectedCivil,
                  handleChangeCivil,
                  civils
                )}
                {renderDatePicker('birthdate', 'Birthdate', {
                  onChange: handleBirthdate
                })}
                {renderInput('contact', 'Contact')}
                {renderTextArea('address', 'Address')}
              </div>

              <div className="col-6">
                {renderDatePicker('dateInsured', 'Date Insured', {
                  onChange: handleDateInsured
                })}

                {renderSelect(
                  'mode',
                  'Mode of Payment',
                  selectedMode,
                  handleChangeMode,
                  modes
                )}
                {renderSelect(
                  'promo',
                  'Promo Officer',
                  selectedPromo,
                  handleChangePromo,
                  promos
                )}
                {!client.forApproval && renderInput('codeNo', 'Policy No')}

                {renderCheckbox('forApproval', 'For Approval', {
                  onChange: e =>
                    setClient({
                      ...client,
                      codeNo: '',
                      forApproval: e.target.checked
                    })
                })}

                {renderButton('Save', null, 'Saving...', true)}
                <button
                  onClick={e => {
                    e.preventDefault()
                    props.history.replace('/dashboard')
                  }}
                  className="btn btn-grad-secondary btn-block"
                  name="back"
                >
                  Back
                </button>
              </div>
            </div>
          )
        }}
      </Form>
    </React.Fragment>
  )
}

export default AddClient
