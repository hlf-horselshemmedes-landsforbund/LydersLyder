function Animator() {
    this.group = game.add.group(null, 'Animation', true);
    this.userdata = null;
    this.sprite = null;
    this.animation = null;
    this.animating = false;
    this.last_time = 0;
    this.current_frame_index = 0;
    this.time_on_current_frame = 0;
    this.on_complete = null;

    this.current_volume = -1;
}

Animator.prototype.call_on_complete = function() {
    this.sprite.destroy();

    if(!!this.on_complete) {
        this.on_complete(this.userdata);
    }
}

Animator.prototype.new_animation = function(userdata, anim) {
    this.userdata = userdata;
    this.animation = anim;

    this.sprite = this.group.create(0, 0, anim.get_frame(0));

    this.sprite.alpha = 0;
    const fadeIn = game.add.tween(this.sprite)
        .to({ alpha: 1 }, 250, 'Linear', true);

    fadeIn.onComplete.add(() => {
        this.start();
    });
}

Animator.prototype.start = function() {
    this.animating = true;
    this.last_time = performance.now();
    this.current_frame_index = 0;
    this.time_on_current_frame = 0;
}

Animator.prototype.update = function() {
    if(this.animating) {
        const now = performance.now();
        this.time_on_current_frame += now - this.last_time;
        this.last_time = now;

        if(this.time_on_current_frame >= 100) {
            this.current_frame_index++;
            this.time_on_current_frame = 0;

            if(this.current_frame_index < this.animation.get_num_frames()) {
                this.sprite.loadTexture(this.animation.get_frame(this.current_frame_index));
                const vol = this.animation.noise_events[this.current_frame_index];
                if(vol !== this.current_volume) {
                    this.current_volume = vol;
                    set_noise_volume(vol);
                }
            }
            else {
                this.animating = false;

                const fadeOut = game.add.tween(this.sprite)
                    .to({ alpha: 0 }, 250, 'Linear', true);

                fadeOut.onComplete.add(() => {
                    this.call_on_complete();
                });
            }
        }
    }
}

