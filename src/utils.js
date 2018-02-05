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

