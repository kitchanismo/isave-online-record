import React from 'react'
import _ from 'lodash'
import { formatDate } from '../../services/utilsService'

class TablePrint extends React.Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item)

    return _.get(item, column.path)
  }

  render() {
    return (
      <React.Fragment>
        <div className="d-flex justify-content-center mt-5 pt-5">
          <div className="m-0 p-0">
            <h2>COCOLIFE</h2>
            <h4>
              Report: &nbsp; {this.props.title ? this.props.title : ''} | Date
              Printed: &nbsp;{formatDate(Date.now())} | Count: &nbsp;{' '}
              {this.props.data.length}
            </h4>

            <table className="table ">
              <thead className="thead-light">
                <tr>
                  {this.props.columns.map((column, i) => (
                    <th className="tcell pr-2" key={i}>
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {this.props.data.map(item => (
                  <tr key={item.id}>
                    {this.props.columns.map((column, i) => (
                      <td className="data-cell text-left pr-2" key={i}>
                        {this.renderCell(item, column)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <style jsx="">{`
          .thead-light,
          .tcell {
            color: white;
            background: black !important;
            border-color: black !important;
          }
          .tcell {
            font-size: 20px !important;
          }
          .data-cell {
            font-size: 18px !important;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default TablePrint
