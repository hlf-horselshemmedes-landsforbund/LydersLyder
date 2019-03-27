/**
 * Lyders Lyder
 *
 * Copyright (c) Able Magic AS
 * All rights reserved.
 *
 * MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
 * to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

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

    for(const event in anim.sfx_events) {
        event.played = false;
    }

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
    this.start_time = performance.now();
    this.current_frame_index = 0;
    this.time_on_current_frame = 0;
}

Animator.prototype.update = function() {
    if(this.animating) {
        const now = performance.now();
        this.time_on_current_frame += now - this.last_time;
        this.last_time = now;

        const time_since_start = performance.now() - this.start_time;

        for(let i=this.animation.sfx_events.length-1; i >= 0; --i) {
            const event = this.animation.sfx_events[i];
            if(!(event.played) && time_since_start >= event.time) {
                event.played = true;
                if(event.sfx === 'mute') {
                    set_noise_volume(0);
                }
                else if(event.sfx === 'noise') {
                    set_noise_volume(event.volume);
                }
                else {
                    audio_clips[event.sfx].play();
                }
            }
        }

        if(this.time_on_current_frame >= 100) {
            this.current_frame_index++;
            this.time_on_current_frame = 0;

            if(this.current_frame_index < this.animation.get_num_frames()) {
                this.sprite.loadTexture(this.animation.get_frame(this.current_frame_index));
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

