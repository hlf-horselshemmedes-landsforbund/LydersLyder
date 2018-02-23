TOOL = uglifyjs
OUTPUDIR = dist
OUTPUT = spa.js
SOURCES = src/phaser.js src/howler.min.js src/parameters.js src/utils.js src/animation.js src/animator.js src/menu.js src/game_items.js src/game.js src/end.js src/parent.js src/science.js src/app.js
OPTIONS =

PHONY: build
build:
	mkdir -p ${OUTPUDIR}
	${TOOL} ${SOURCES} ${OPTIONS} -o ${OUTPUDIR}/${OUTPUT}

