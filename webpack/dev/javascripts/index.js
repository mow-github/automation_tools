import React from 'react'
import { render } from 'react-dom'
import { module1, module2 } from './lib'

render(
	<div>
		{module1}
		{module2}
	</div>,
	document.getElementById("react-div-container")
);