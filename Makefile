install:
	npm ci

publish:
	npm publish --dry-run

gendiff:
	node bin/gendiff

lint:
	npm run lint

test:
	npx jest

watch:
	npx jest --watch

test-coverage:
	npx jest --coverage