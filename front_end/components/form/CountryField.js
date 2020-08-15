import React from 'react';
import countryList from 'react-select-country-list';

const CountryField = ({ id, label, name, value, disabled, onChange, register, errors }) => {
	const countries = countryList().getData();
	return (
		<div>
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
		</div>
	);
};

export default CountryField;
