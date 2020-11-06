import express from 'express';
import router from './router';

const port = process.env.PORT || 4000;
const app = express();

// Static paths
app.use(express.static('dist/client'));

app.use(router);

app.on('error', (err) => {
	console.error(err?.message);
});

const server = app.listen(port, () => {
	console.log(`A half-elven druid has conjured a server at port, ${port}.`);
});

process.on('SIGINT', () => {
	server.close((err) => {
		if (err) return process.exit(1);

		process.exit(0);
	});
});
