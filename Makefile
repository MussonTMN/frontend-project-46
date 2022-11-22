install:
	npm ci

publish:
	npm publish --dry-run

gendiff:
	node bin/gendiff

lint:
	npx eslint .

test:
	npx jest

watch:
	npx jest --watch

test-coverage:
	npx jest --coverage