import React, {useState, useEffect} from 'react'
import Joi from 'joi-browser'
import Form from '../../common/form'
import Table from '../../common/table'
import {getTop} from './../../../services/clientService'
import {sortBy, toElipse} from '../../../services/utilsService'
import PostInsentiveModal from '../../common/postInsentiveModal'
import {storeInsentive} from './../../../services/insentiveService'
import {toast} from 'react-toastify'

const NewSPIF = props => {
	const now = new Date(Date.now())

	const [top, setTop] = useState([])

	const [count, setCount] = useState(0)

	const [insentive, setInsentive] = useState({
		year: now.getFullYear(),
		month: now.getMonth(),
		position: ''
	})

	const [selectedUser, setSelectedUser] = useState({
		profile: {firsname: '', lastname: '', middlename: ''}
	})

	const [selectedYear, setSelectedYear] = useState({
		id: 0,
		label: now.getFullYear(),
		value: now.getFullYear()
	})
	const [selectedPosition, setSelectedPosition] = useState(null)

	const months = [
		{id: 1, label: 'January', value: 0},
		{id: 2, label: 'February', value: 1},
		{id: 3, label: 'March', value: 2},
		{id: 4, label: 'April', value: 3},
		{id: 5, label: 'May', value: 4},
		{id: 6, label: 'June', value: 5},
		{id: 7, label: 'July', value: 6},
		{id: 8, label: 'August', value: 7},
		{id: 9, label: 'September', value: 8},
		{id: 10, label: 'October', value: 9},
		{id: 11, label: 'November', value: 10},
		{id: 12, label: 'December', value: 11}
	]

	const getCurrentMonthLabel = () => {
		return months.filter(month => month.value === now.getMonth())[0].label
	}

	const [selectedMonth, setSelectedMonth] = useState({
		id: 0,
		label: getCurrentMonthLabel(),
		value: now.getMonth()
	})

	const [errors, setErrors] = useState({})

	const schema = {
		position: Joi.string()
			.required()
			.label('Position'),
		month: Joi.number()
			.required()
			.label('Month'),
		year: Joi.number()
			.required()
			.label('Year')
	}

	const handleSubmit = async (e, data) => {
		setTop(await getTop(data))
	}

	const handleChangePosition = position => setSelectedPosition(position)

	const handleChangeYear = year => setSelectedYear(year)

	const handleChangeMonth = month => setSelectedMonth(month)
	const positions = [
		{
			id: 1,
			label: 'Sales Officer',
			value: 'sales'
		},
		{
			id: 2,
			label: 'Promo Officer',
			value: 'promo'
		},
		{
			id: 3,
			label: 'Branch Manager',
			value: 'manager'
		}
	]

	const years = [
		{
			id: 1,
			label: '2017',
			value: '2017'
		},
		{
			id: 2,
			label: '2018',
			value: '2018'
		},
		{
			id: 3,
			label: '2019',
			value: '2019'
		},
		{
			id: 4,
			label: '2020',
			value: '2020'
		}
	]

	const columns = [
		{
			path: 'user.profile.lastname',
			label: 'Employee Name',
			content: ({user}) => {
				return toElipse(
					`${user.profile.lastname}, ${user.profile.middlename} ${user.profile.firstname}`,
					25
				)
			}
		},
		{
			path: 'user.profile.branch.name',
			label: 'Branch'
		},
		{
			path: 'user.profile.codeNo',
			label: 'Licence Code'
		},
		{
			path: 'count',
			label: 'Client Count Insured'
		},
		{
			path: 'count',
			label: 'Actions',
			content: top => (
				<button
					onClick={() => {
						setModal(!modal)
						setSelectedUser(top.user)
						setCount(top.count)
					}}
					className='btn btn-sm btn-outline-primary ml-1'
				>
					POST
				</button>
			)
		}
	]

	const [sortColumn, setSortColumn] = useState({path: 'name', order: 'asc'})

	const handleSort = sortColumn => {
		setSortColumn(sortColumn)
		setTop(sortBy(top, sortColumn))
	}

	const [modal, setModal] = useState(false)

	const toggle = (e, prize) => {
		setModal(!modal)
		if (!prize) return

		const insentive = {
			user_id: selectedUser.id,
			prize,
			month: selectedMonth ? selectedMonth.label : null,
			year: selectedYear ? selectedYear.value : null,
			count
		}

		storeInsentive(insentive)
			.then(data => toast.info('Insentive Posted'))
			.catch(data => toast.error(data.response.data.message))
	}

	const renderModal = client => {
		return (
			<PostInsentiveModal
				profile={selectedUser.profile}
				title='Infomatech'
				modal={modal}
				toggle={toggle}
				primary={{type: 'primary', label: 'CONFIRM'}}
			/>
		)
	}

	return (
		<React.Fragment>
			{renderModal()}
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
				<span>
					<h1 className='h2'>Sales Performance Insentive Funds</h1>
					<h5 className='text-secondary'>Add New Insentive</h5>
				</span>
				<button
					onClick={() => props.history.replace('/spif')}
					className='btn btn-sm btn-grad-secondary ml-1'
				>
					Back
				</button>
			</div>
			<Form
				data={{data: insentive, setData: setInsentive}}
				errors={{errors, setErrors}}
				onSubmit={handleSubmit}
				schema={schema}
			>
				{({renderInput, renderSelect, renderButton}) => {
					return (
						<React.Fragment>
							<div className='row'>
								<div className='col-3'>
									{renderSelect(
										'year',
										'Year',
										selectedYear,
										handleChangeYear,
										years
									)}
								</div>
								<div className='col-3'>
									{renderSelect(
										'month',
										'Month',
										selectedMonth,
										handleChangeMonth,
										months
									)}
								</div>
								<div className='col-3'>
									{renderSelect(
										'position',
										'Position',
										selectedPosition,
										handleChangePosition,
										positions
									)}
								</div>
								<div className='col-3 pt-3'>
									{renderButton(
										'Generate Top Employee',
										null,
										'Generating...',
										true
									)}
								</div>
							</div>

							<Table
								columns={columns}
								data={top}
								sortColumn={sortColumn}
								onSort={handleSort}
							/>
						</React.Fragment>
					)
				}}
			</Form>
			<style jsx=''>{`
				.fa-plus {
					margin-top: 0 !important;
				}
			`}</style>
		</React.Fragment>
	)
}

export default NewSPIF
