TOOL = uglifyjs
OUTPUDIR = dist
SHAREDIR = share
SHAREFILES = audio/ dist/ fonts/ images/ index.html style.css
SHAREFILE = spa_final
OUTPUT = spa.js
SOURCES = src/phaser.js src/howler.min.js src/parameters.js src/utils.js src/animation.js src/animator.js src/menu.js src/game_items.js src/game.js src/end.js src/parent.js src/science.js src/app.js
OPTIONS =
DATETIME = $(shell date +%Y%m%d_%H%M%S)# or whatever pattern you desire
#DATETIME = $(date +%Y%m%d_%H%M%S) # or whatever pattern you desire

#echo ${DATETIME}

PHONY: build
build:
	mkdir -p ${OUTPUDIR}
	${TOOL} ${SOURCES} ${OPTIONS} -o ${OUTPUDIR}/${OUTPUT}

# make share file to contain running files.
share:
	mkdir -p ${SHAREDIR}
	tar -cf ${SHAREDIR}/${SHAREFILE}_${DATETIME}.tar ${SHAREFILES}

# clean up make files
clean:
	rm -rf $(OUTPUDIR) $(SHAREDIR)

optimize:
	cp -R images images_optimized
	#cd ./imagesOPT/ ;
	#find ./imagesOPT -name "*.png";
	find ./images_optimized -name '*.png' -print0 -exec pngout -c3 -d8 -y {} {} \;
