import { setLocale } from 'yup';

setLocale({
	mixed: { required: 'Required' },
	string: {
		email: 'Must be a valid email address',
		url: 'Must be a valid URL',
	},
	number: {
		min: 'Must have at least ${min} characters',
		max: 'Cannot be longer than ${max} characters',
	},
});
