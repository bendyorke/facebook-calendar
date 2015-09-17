all:
	babel --experimental calendar.es6.js -o calendar.js

watch:
	babel --watch --experimental calendar.es6.js -o calendar.js

install:
	npm install -g babel core-js
