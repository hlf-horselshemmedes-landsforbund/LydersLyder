TOOL = uglifyjs
OUTPUDIR = dist
OUTPUT = spa.js
SOURCES = src/phaser.js src/menu.js src/game.js src/end.js src/app.js
OPTIONS =

PHONY: build
build:
	mkdir -p ${OUTPUDIR}
	${TOOL} ${SOURCES} ${OPTIONS} -o ${OUTPUDIR}/${OUTPUT}

