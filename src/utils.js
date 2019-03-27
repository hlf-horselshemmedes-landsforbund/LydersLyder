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

// Shuffles the input array
function shuffle_array(arr) {
    const array_copy = arr.slice(0, arr.length);

    for(let i=arr.length-1; i>=0; --i) {
        const index = Math.floor(Math.random() * array_copy.length);
        arr[i] = array_copy[index];
        array_copy.splice(index, 1);
    }
}

function left_pad_string(str, wanted_length, symbol = '0') {
    str = str.toString();
    while(str.length < wanted_length) {
        str = symbol + str;
    }

    return str;
}

function map_range(x, in_min, in_max, out_min, out_max) {
    if(x < in_min)      x = in_min;
    else if(x > in_max) x = in_max;
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function add_button(x, y, sprite, group) {
    return game.add.button(x, y, 'sprites', undefined, undefined, sprite, sprite, sprite, group);
}

