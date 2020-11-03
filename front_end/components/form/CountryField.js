import React from 'react';
import countryList from 'react-select-country-list';

const CountryField = ({ id, label, name, value, disabled, onChange, register, errors }) => {
	const countries = countryList().getData();
	return (
		<div>
			<div className='select__container'>
				{label && <label htmlFor={id}>{label}</label>}
				<select defaultValue={value} ref={register} name={name} onChange={onChange} disabled={disabled}>
					{countries.map((country) => (
						<option key={country.value} value={country.value}>
							{country.label}
						</option>
					))}
				</select>
				{errors && errors[name]?.type === 'required' &&
					<p className='input__error'>Ce champs est obligatoire</p>
				}
				<style jsx>{`
					.select__container {
						display: flex;
						flex-direction: column;
					}
					div {
						position: relative;
					}
					label {
						position: absolute;
						top: 0;
						pointer-events: none;
						font-size: 12px;
						color: #a0a0a0;
						text-align: left;
						padding: 6px 16px;
						transition: all 0.2s;
					}
					select {
						font-size: 16px;
						padding: 20px 12px 4px;
						height: 50px;
						width: 100%;
						border: 1px solid #dedede;
						border-radius: 4px;
						background: #fbfbfb;
						margin: 0 0 8px;
					}
					.error select {
						border-color: rgba(237, 67, 55, 1);
						margin: 0 0 24px;
					}
					.error label {
						color: rgba(237, 67, 55, 1);
					}
					.input__error {
						font-style: italic;
						font-size: 12px;
						text-align: left;
						color: #e8616d;
						position: absolute;
						left: 12px;
						bottom: 6px;
						margin: 0;
					}
					.disabled input {
						background: #efefef;
					}
				`}</style>
			</div>
		</div>
	);
};

export default CountryField;
