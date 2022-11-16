install:
	npm ci

publish:
	npm publish --dry-run

gendiff:
	node bin/gendiff

lint:
	npm run lint

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

watch:
	NODE_OPTIONS=--experimental-vm-modules npx jest --watch

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage