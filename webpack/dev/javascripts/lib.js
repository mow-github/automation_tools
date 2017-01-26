import React from 'react'
import word from './words.json'
import '../stylesheets/scss_test.scss'
import '../stylesheets/css_test.css'

export const module1 = (
	<h1 id='title'
		className='css1'>
		{word.text1}
	</h1>
);

export const module2 = (
	<h1 id='title'
		className='scss1'>
		{word.text2}
	</h1>
);