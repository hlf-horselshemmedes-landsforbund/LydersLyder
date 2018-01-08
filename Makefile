TOOL = uglifyjs
OUTPUT = dist/spa.js
SOURCES = src/phaser.js src/app.js
OPTIONS =

PHONY: build
build:
	${TOOL} ${SOURCES} ${OPTIONS} -o ${OUTPUT}

