import { Model } from 'objection';

export default class User extends Model {
	public static tableName = 'users';
}
