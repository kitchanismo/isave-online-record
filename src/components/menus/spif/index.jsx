import React, {useState, useEffect} from 'react'
import Table from '../../common/table'
import {toElipse, sortBy} from '../../../services/utilsService'
import {
	getInsentives,
	deleteInsentive
} from '../../../services/insentiveService'

const SPIF = props => {
	const [insentives, setInsentives] = useState([])

	useEffect(() => {
		getInsentives().then(data => setInsentives(data))
	}, [])

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
			path: 'user.position',
			label: 'Position'
		},
		{
			path: 'user.profile.codeNo',
			label: 'Licence Code'
		},
		{
			path: 'count',
			label: 'Count Insured'
		},

		{
			path: 'prize',
			label: 'Prize Reward'
		},
		{
			path: 'month',
			label: 'Month/Year',
			content: insentive => `${insentive.month}, ${insentive.year}`
		},
		{
			path: 'count',
			label: 'Actions',
			content: insentive => (
				<button
					onClick={async () => {
						await deleteInsentive(insentive.id)
						const insentives = await getInsentives()
						setInsentives(insentives)
					}}
					className='btn btn-sm btn-outline-danger ml-1'
				>
					DELETE
				</button>
			)
		}
	]

	const [sortColumn, setSortColumn] = useState({path: 'name', order: 'asc'})

	const handleSort = sortColumn => {
		setSortColumn(sortColumn)
		setInsentives(sortBy(insentives, sortColumn))
	}
	return (
		<React.Fragment>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
				<h1 className='h2'>Sales Performance Insentive Funds</h1>
				<button
					onClick={() => props.history.replace('/spif/new')}
					className='btn btn-sm btn-grad-primary ml-1'
				>
					<span className='fa fa-plus mr-1'></span>
					Insentive
				</button>
			</div>
			<div className='row mx-2'>
				<Table
					columns={columns}
					data={insentives}
					sortColumn={sortColumn}
					onSort={handleSort}
				/>
			</div>
			<style jsx=''>{`
				.fa-plus {
					margin-top: 0 !important;
				}
			`}</style>
		</React.Fragment>
	)
}

export default SPIF
