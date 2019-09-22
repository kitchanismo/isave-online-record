import React, { useState } from 'react'
import Form from '../../common/form'
import { toast } from 'react-toastify'
import Joi from 'joi-browser'
import { formatDate } from '../../../services/utilsService'
import auth from '../../../services/authService'
import { addClient } from '../../../services/clientService'

const AddClient = () => {
  const [client, setClient] = useState({
    firstname: '',
    lastname: '',
    middlename: '',
    address: '',
    contact: '',
    dateInsured: '',
    codeNo: '',
    userInsured: '',
    gender: '',
    mode: '',
    civil: '',
    forApproval: true
  })

  const [selectedGender, setSelectedGender] = useState(null)
  const [selectedMode, setSelectedMode] = useState(null)
  const [selectedCivil, setSelectedCivil] = useState(null)
  const [errors, setErrors] = useState({})

  const schema = {
    firstname: Joi.string()
      .required()
      .label('Firstname'),
    middlename: Joi.string()
      .required()
      .label('Middlename'),
    lastname: Joi.string()
      .required()
      .label('Lastname'),
    codeNo: Joi.optional(),
    contact: Joi.optional(),
    address: Joi.optional(),
    dateInsured: Joi.string()
      .required()
      .label('Data Insured'),
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
      .label('Civil Status')
  }

  const handleChangeGender = gender => setSelectedGender(gender)

  const handleChangeCivil = civil => setSelectedCivil(civil)

  const handleChangeMode = mode => setSelectedMode(mode)

  const handleSubmit = async (e, client) => {
    const _client = {
      ...client,
      dateInsured: new Date(client.dateInsured).toISOString(),
      userInsured: auth.getCurrentUser().id
    }

    try {
      await addClient(_client)
      toast.success('Saved')
      setClient({
        firstname: '',
        lastname: '',
        middlename: '',
        address: '',
        contact: '',
        dateInsured: '',
        codeNo: '',
        userInsured: '',
        gender: '',
        mode: '',
        civil: '',
        forApproval: true
      })
      setSelectedGender(null)
      setSelectedMode(null)
      setSelectedCivil(null)
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
      value: 'quaterly',
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

  const handleDateChange = date =>
    setClient({ ...client, dateInsured: formatDate(date) })

  return (
    <main
      role="main"
      className="dashboard col-md-9 ml-sm-auto col-lg-10 pt-3 px-4 bg-light border border-secondary"
    >
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
                {renderInput('contact', 'Contact')}
                {renderTextArea('address', 'Address')}
              </div>

              <div className="col-6">
                {renderDatePicker('dateInsured', 'Date Insured', {
                  onChange: handleDateChange
                })}
                {renderSelect(
                  'mode',
                  'Mode of Payment',
                  selectedMode,
                  handleChangeMode,
                  modes
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
              </div>
            </div>
          )
        }}
      </Form>
    </main>
  )
}

export default AddClient
