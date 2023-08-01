dev: backend_dev frontend_dev

backend_dev:
	@echo "Building server for development"
	cd backend && npm run dev

frontend_dev:
	@echo "Building client for development"
	cd frontend && npm run dev

clean:
	rm -rf backend/src/public
	rm -rf backend/dist
	rm -rf frontend/dist

clean_db:
	rm -rf backend/*.sqlite

build: clean
	@echo "Building server for production"
	cd backend && npm run build
	cd frontend && npm run build && cp -r dist ../backend/dist/public
