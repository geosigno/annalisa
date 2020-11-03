import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactCountryFlag from 'react-country-flag';
import countryList from 'react-select-country-list';

import { MdEdit } from 'react-icons/md';
import Toast from '../Toast';
import Input from '../form/input';
import Textarea from '../form/Textarea';
import CountryField from '../form/CountryField';
import { getBearer } from '../../helpers/auth';

const ProfileItem = ({ id, label, value, icon, editable = true, type = 'input' }) => {
	const { register, errors, getValues, trigger } = useForm();

	const [currentValue, setCurrentValue] = useState(value);
	const [isEditing, setIsEditing] = useState(false);

	const updateProfile = (data) => {
		const headers = getBearer();
		axios.put('http://localhost:1337/users/me', data, { headers }).then((response) => {
			setIsEditing(false);
			setCurrentValue(response.data[id]);
			toast('Votre profile a été mis à jour!');
		});
	};

	const handleUpdate = async () => {
		const isValid = await trigger(id);
		if (!isValid) return;

		const isNewData = getValues(id) !== currentValue;
		if (!isNewData) {
			setIsEditing(false);
			return;
		}
		const data = {};
		data[id] = getValues(id);
		updateProfile(data);
	};

	return (
		<div className='profileItem'>
			{icon && <div className='profileItem__icon'>{icon}</div>}
			<div className='profileItem__content'>
				{isEditing && editable ? (
					<div>
						{type === 'input' && (
							<Input
								id={id}
								label={label}
								name={id}
								value={currentValue}
								register={register({ required: true })}
								errors={errors}
								autoFocus
								disabled={!editable}
								onBlur={handleUpdate}
							/>
						)}
						{type === 'textarea' && (
							<Textarea
								id={id}
								label={label}
								name={id}
								value={currentValue}
								register={register({ required: true })}
								errors={errors}
								autoFocus
								disabled={!editable}
								onBlur={handleUpdate}
							/>
						)}
						{type === 'country' && (
							<CountryField
								id={id}
								label={label}
								name={id}
								value={currentValue}
								register={register}
								onChange={handleUpdate}
							/>
						)}
					</div>
				) : (
					<div
						className={`profileItem__display ${!editable ? 'disabled' : ''}`}
						onClick={() => editable && setIsEditing(true)}
						onKeyDown={() => editable && setIsEditing(true)}
						role='button'
						tabIndex={0}>
						{type === 'country' ? (
							<p>
								<span>
									<ReactCountryFlag
										className='emojiFlag'
										countryCode={currentValue}
										style={{
											fontSize: '2em',
											lineHeight: '2em'
										}}
										aria-label={currentValue && countryList().getLabel(currentValue)}
									/>
								</span>
								{currentValue ? countryList().getLabel(currentValue) : label}
							</p>
						) : (
							<p>{currentValue}</p>
						)}
						{editable && (
							<div className='profileItem__edit'>
								<MdEdit size='18px' />
							</div>
						)}
					</div>
				)}
			</div>

			<style jsx>{`
				.profileItem {
					display: flex;
					align-items: center;
					height: 50px;
					margin: 0 0 8px;
				}
				.profileItem__icon {
					margin-right: 16px;
				}
				.profileItem__display {
					display: inline-flex;
					align-items: center;
					cursor: pointer;
				}
				.profileItem__display p {
					font-size: 16px;
				}
				.profileItem__display span {
					margin-right: 8px;
				}
				.profileItem__content {
					width: 100%;
				}
				.profileItem__content p {
					margin: 0;
				}
				.profileItem__edit {
					opacity: 0;
					transition: opacity 0.2s;
					will-change: opacity;
					margin-left: 8px;
				}
				.profileItem__display:not(.disabled):hover .profileItem__edit {
					opacity: 1;
				}
			`}</style>
		</div>
	);
};

export default ProfileItem;
