

.PHONY: api-build
api-build:
	docker-compose build api

.PHONY: api-run
api-run: api-build
	docker-compose up api

.PHONY: api-lint
api-lint: api-build
	docker-compose up api-lint

.PHONY: api-utests
api-utests: api-build
	docker-compose up api-utests

.PHONY: api-itests
api-itests: api-build
	docker-compose up -d api-test
	docker-compose up api-itests
	docker-compose stop api-test

.PHONY: app-run
app-run:
	docker-compose up -d api
	docker-compose up frontend

.PHONY: frontend-tests
frontend-tests:
	docker-compose up frontend-test

.PHONY: down
down:
	docker-compose down --volumes