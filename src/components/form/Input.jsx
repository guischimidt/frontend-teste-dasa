import '../../styles/components/form/input.sass';

function Input({
	type,
	text,
	name,
	handleOnChange,
	value,
	required,
	maxLength
}) {
	return (
		<div className='form_control'>
			<input
				type={type}
				name={name}
				id={name}
				onChange={handleOnChange}
				value={value}
				required={required}
				maxLength={maxLength}
			/>
			<label htmlFor={name}>{text}</label>
		</div>
	);
}

export default Input;