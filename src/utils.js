function shuffle_array(arr) {
    const shuffled_copy = [];
    for(let i=arr.length-1; i>=0; --i) {
        const index = Math.floor(Math.random() * arr.length);
        shuffled_copy.push(arr[index]);
        arr.splice(index, 1);
    }

    return shuffled_copy;
}

