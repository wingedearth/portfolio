import 'core-js/stable';
import 'regenerator-runtime/runtime';

Promise.resolve().finally();

const sayWelcome = () => 'Good evening.';

console.log(sayWelcome());
