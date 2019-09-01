import React, { useState } from 'react'
import Chart from 'react-apexcharts'
import Form from '../common/form'
import Joi from 'joi-browser'

const Agent = () => {
  const [optionsSales, setOptionsSales] = useState({
    theme: {
      palette: 'palette6'
    },
    chart: {
      id: 'basic-bar'
    },
    xaxis: {
      categories: [2011, 2012, 2014, 2015, 2016, 2017, 2018, 2019]
    },
    title: {
      text: 'Total Sales',
      align: 'center',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '20px',
        color: '#263238'
      }
    },
    grid: {
      show: true,
      borderColor: 'black',
      strokeDashArray: 1,
      position: 'back',
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      },
      row: {
        colors: undefined,
        opacity: 0.5
      },
      column: {
        colors: undefined,
        opacity: 0.5
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    }
  })

  const [optionsGPA, setOptionsGPA] = useState({
    theme: {
      palette: 'palette6'
    },
    chart: {
      id: 'basic-bar'
    },
    xaxis: {
      categories: [2011, 2012, 2014, 2015, 2016, 2017, 2018, 2019]
    },
    title: {
      text: 'Total GPA',
      align: 'center',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '20px',
        color: '#263238'
      }
    },
    grid: {
      show: true,
      borderColor: 'black',
      strokeDashArray: 1,
      position: 'back',
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      },
      row: {
        colors: undefined,
        opacity: 0.5
      },
      column: {
        colors: undefined,
        opacity: 0.5
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    }
  })

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

  const [optionsFSF, setOptionsFSF] = useState({
    theme: {
      palette: 'palette6'
    },
    chart: {
      id: 'basic-bar'
    },
    xaxis: {
      categories: [2011, 2012, 2014, 2015, 2016, 2017, 2018, 2019]
    },
    title: {
      text: 'Total FSF',
      align: 'center',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '20px',
        color: '#263238'
      }
    },
    grid: {
      show: true,
      borderColor: 'black',
      strokeDashArray: 1,
      position: 'back',
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      },
      row: {
        colors: undefined,
        opacity: 0.5
      },
      column: {
        colors: undefined,
        opacity: 0.5
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    }
  })

  const [series, setSeries] = useState([
    {
      name: 'series-1',
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    }
  ])

  const handleSubmit = async (e, data) => {}

  return (
    <React.Fragment>
      <main
        role="main"
        className="dashboard col-md-9 ml-sm-auto col-lg-10 pt-3 px-4 bg-light border border-secondary"
      >
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h2">Agent</h1>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="mb-5">
              <Chart
                type="bar"
                options={optionsSales}
                series={series}
                width="400"
              />
            </div>
            <div className="">
              <Chart
                type="bar"
                options={optionsGPA}
                series={series}
                width="400"
              />
            </div>
            <div className="">
              <Chart
                type="bar"
                options={optionsFSF}
                series={series}
                width="400"
              />
            </div>
          </div>
          <div className="col-6">
            <Form
              data={{ data: user, setData: setUser }}
              errors={{ errors, setErrors }}
              onSubmit={handleSubmit}
              schema={schema}
            >
              {({ renderInput }) => {
                return (
                  <React.Fragment>
                    <div className="col-12 pt-0 p-2 pr-5 ">
                      {renderInput('firstname', 'Firstname')}
                      {renderInput('middlename', 'Middlename')}
                      {renderInput('lastname', 'Lastname')}
                      <button className="btn btn-primary btn-block" name="back">
                        Add Client
                      </button>
                      <div className="logo mt-4 border border-secondary" />
                    </div>
                  </React.Fragment>
                )
              }}
            </Form>
          </div>
        </div>

        <style jsx="">{`
          .dashboard {
            border-radius: 0px 7px 0 0;
          }
          .col-6 {
            padding: 0;
          }
          .logo {
            width: auto;
            height: 480px;
            border-radius: 7px;
          }
        `}</style>
      </main>
    </React.Fragment>
  )
}

export default Agent
