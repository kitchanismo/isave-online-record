import React, {useEffect} from 'react'
import covid from './cov.json'

const Covid = () => {
	useEffect(() => {
		const male = covid.cases.filter(c => c.sex === 'M').length
		const female = covid.cases.filter(c => c.sex === 'F').length

		const dead = covid.cases.filter(c => c.status.match(/dead.*/gi)).length
		const recovered = covid.cases.filter(c => c.status.match(/recover.*/gi))
			.length
		console.log('Cases', covid.cases.length)
		console.log('Male', male)
		console.log('Female', female)
		console.log('Dead', dead)
		console.log('Recovered', recovered)
	}, [])
	return <h1>hellodsd</h1>
}

export default Covid
