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

function Animation(prefix, frame_time = 100)
{
    this.prefix = prefix;
    this.frames = [];
    this.noise_level_tracker = 0.5;
    this.frame_time = frame_time;
    this.sfx_events = [];
}

Animation.prototype.get_frame = function(i) {
    return `${this.prefix}${this.frames[i]}`;
}

Animation.prototype.get_num_frames = function() {
    return this.frames.length;
}

Animation.prototype.sequence = function() {
    Array.prototype.push.apply(this.frames, arguments);

    return this;
}

Animation.prototype.loop = function() {
    console.assert(arguments.length >= 2);

    const num_iterations = arguments[0];
    for(let i=0; i<num_iterations; ++i) {
        for(let j=1; j<arguments.length; ++j) {
            this.frames.push(arguments[j]);
        }
    }

    return this;
}

Animation.prototype.range = function(start, end) {
    for(let i=start; i<(end+1); ++i) {
        this.frames.push(i);
    }

    return this;
}

Animation.prototype.mute = function(t) {
    this.sfx_events.push({ sfx: 'mute', time: t });
    return this;
}

Animation.prototype.noise_volume = function(t, v) {
    this.sfx_events.push({ sfx: 'noise', time: t, volume: v });
    return this;
}

Animation.prototype.sfx = function(t, s) {
    this.sfx_events.push({ sfx: s, time: t });
    return this;
}

