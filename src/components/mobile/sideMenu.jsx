import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {theme} from './../../config.json'
import {UserContext, ClientContext} from './../../context'
import auth from './../../services/authService'

const SideMenuMobile = props => {
	const {
		state: {unverify},
		onSetStatus
	} = useContext(UserContext)

	const {
		status: {total, forApproval, lapsed, nearExpiration, due}
	} = useContext(ClientContext)
	return (
		<React.Fragment>
			<div className='mobile-menu m-0 d-flex justify-content-around px-0 py-3'>
				{!auth.canAccess('admin') && (
					<NavLink to='/dashboard' className='fa fa-bar-chart'></NavLink>
				)}
				{auth.canAccess('admin') && (
					<NavLink to='/spif' className='fa fa-trophy'></NavLink>
				)}
				{auth.canAccess('admin', 'general') && (
					<NavLink to='/branches' className='fa fa-home'></NavLink>
				)}
				{!auth.canAccess('promo', 'sales') && (
					<NavLink to='/users' className='fa fa-users'>
						<span className='notif-mobile badge badge-danger px-1 py-0 badge-pill ml-1'>
							{unverify > 9 ? '9+' : unverify === 0 ? '' : unverify}
						</span>
					</NavLink>
				)}

				{!auth.canAccess('admin') && (
					<NavLink to='/clients/enforced' className='fa fa-file'>
						<span className='notif-mobile badge badge-danger px-1 py-0  badge-pill ml-1'>
							{total > 9 ? '9+' : total === 0 ? '' : total}
						</span>
					</NavLink>
				)}

				{auth.canAccess('admin') && (
					<NavLink to='/settings/backup' className='fa fa-gear'></NavLink>
				)}
				<NavLink to='/help' className='fa fa-question'></NavLink>
			</div>
			<style jsx=''>{`
				.mobile-menu {
					position: fixed;
					bottom: 0;
					width: 100%;
					background-color: #343a40;
					z-index: 2;
				}
				.active {
					color: ${theme.secondary} !important;
					cursor: hand;
				}
				a:hover {
					color: ${theme.secondary} !important;
				}
				.fa-file,
				.fa-home,
				.fa-users,
				.fa-bar-chart,
				.fa-gear,
				.fa-question,
				.fa-trophy {
					margin-top: 0 !important;
					margin-bottom: 0 !important;
					color: white;

					font-size: 20px;
				}

				.notif-mobile {
					top: -10px !important;
					left: -8px;
					position: relative;
					border: 2px solid #343a40;
				}
			`}</style>
		</React.Fragment>
	)
}

export default SideMenuMobile
