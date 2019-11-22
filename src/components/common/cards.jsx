import React, {Component} from 'react'
import Card from './card'
import _ from 'lodash'

const Cards = ({items, columns, props}) => {
	const renderData = (item, column) => {
		if (column.content) return column.content(item)

		return _.get(item, column.path)
	}
	return (
		<React.Fragment>
			{items.map(item => (
				<div key={item.id} className='card mb-2' style={{width: 'auto'}}>
					<div className='card-body text-center'>
						{columns.map(column => (
							<React.Fragment>
								<p className='card-title'>{column.label}:</p>
								<p className='card-subtitle mb-2 text-secondary'>
									{renderData(item, column)}
								</p>
							</React.Fragment>
						))}
					</div>
				</div>
			))}
		</React.Fragment>
	)
}

export default Cards
