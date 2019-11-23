import React, {useState, useEffect} from 'react'
import Switch from 'react-switch'
import {
	status,
	toggle,
	getCode,
	updateCode
} from './../../../services/smsService'
import {toast} from 'react-toastify'
import {useMedia} from 'react-use'

const SMS = () => {
	const [isChecked, setIsChecked] = useState(false)
	const [code, setCode] = useState('')
	const isMobile = useMedia('(max-width: 600px)')

	useEffect(() => {
		status().then(on => setIsChecked(on))
		getCode().then(code => setCode(code))
	}, [])

	const handleToggle = () => {
		const origChecked = isChecked
		setIsChecked(!isChecked)
		toggle()
			.then(on => {
				setIsChecked(on)
				toast.info(on ? 'SMS is On' : 'SMS is OFF')
			})
			.catch(() => {
				toast.error('SMS status does not updated')
				setIsChecked(origChecked)
			})
	}

	const handleSetKey = e => {
		e.preventDefault()
		updateCode(code)
			.then(() => toast.success('Code has been updated!'))
			.catch(() => toast.error('Code does not updated'))
	}
	return (
		<React.Fragment>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
				<h1 className='h2'>SMS Notification</h1>
				<span
					title={isChecked ? 'Toggle to switch Off' : 'Toggle to switch On'}
				>
					<Switch onChange={handleToggle} checked={isChecked} />
				</span>
			</div>
			<form onSubmit={handleSetKey}>
				<div className='form-group'>
					<label htmlFor='code'>Code</label>
					<div className='row m-0 p-0'>
						<div className={isMobile ? 'col-12 mx-0 px-0' : 'col-4 m-0 p-0'}>
							<input
								type='text'
								name='code'
								value={code}
								onChange={e => setCode(e.currentTarget.value)}
								className='form-control'
							/>
						</div>
					</div>
					<p className='error-message text-danger p-1'>
						{code ? '' : `"Code" is not allowed to be empty!`}
					</p>
					<button type='submit' className='btn btn-grad-primary d-flex mt-0'>
						UPDATE
					</button>
				</div>
			</form>
		</React.Fragment>
	)
}

export default SMS
