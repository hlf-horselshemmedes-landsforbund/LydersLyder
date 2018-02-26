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

