TOOL = uglifyjs
OUTPUDIR = dist
SHAREDIR = share
SHAREFILES = audio/ dist/ fonts/ images/ index.html style.css
SHAREFILE = spa_final
OUTPUT = spa.js

# To enable the 'science' view, add src/science.js _before_ src/app.js. Also uncomment the sections in app.js and end.js as noted in those files
SOURCES = src/phaser.js src/howler.min.js src/parameters.js src/utils.js src/animation.js src/animator.js src/menu.js src/game_items.js src/game.js src/end.js src/parent.js src/app.js
OPTIONS =
DATETIME = $(shell date +%Y%m%d_%H%M%S)

PHONY: build
build:
	mkdir -p ${OUTPUDIR}
	${TOOL} ${SOURCES} ${OPTIONS} -o ${OUTPUDIR}/${OUTPUT}

# make share file to contain running files.
PHONY: share
share:
	mkdir -p ${SHAREDIR}
	tar -cf ${SHAREDIR}/${SHAREFILE}_${DATETIME}.tar ${SHAREFILES}

# clean up make files
PHONY: clean
clean:
	rm -rf $(OUTPUDIR) $(SHAREDIR)

PHONY: optimize
optimize:
	cp -R images images_optimized
	find ./images_optimized -name '*.png' -print0 -exec pngout -c3 -d8 -y {} {} \;

