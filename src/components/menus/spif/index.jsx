import React, {Component} from 'react'

const SPIF = props => {
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

			<style jsx=''>{`
				.fa-plus {
					margin-top: 0 !important;
				}
			`}</style>
		</React.Fragment>
	)
}

export default SPIF
