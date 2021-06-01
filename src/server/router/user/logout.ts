import { Router } from 'express';
import { Deps } from '../../../types';
// import authenticated from '../../middleware/authenticated';

export default function logoutRoute(router: Router, deps: Deps): void {
	router.post('/logout', async (req, res) => {});

	// router.post('/logout', authenticated(), async (req, res) => {
	// 	(req.session).destroy();
	// 	res.sendStatus(200);
	// });
};
