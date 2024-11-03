// select the start game button
document.querySelector(".control-buttons span").onclick = function () {

    // prompt window to ask for name
    let yourName = prompt("what's your name?");

    // if name is empty
    if(yourName == null || yourName == "") {
        // see the name unknown
        document.querySelector(".name span").innerHTML = "Unknown";
    
         // name is not empty
    }else {
        document.querySelector(".name span").innerHTML = yourName;
    }

    // remove splash screen
    document.querySelector(".control-buttons").remove();
};

// effect duration
let duration = 1000;

// select the blockContainer
let blocksContainer = document.querySelector(".memory-game-blocks");

// creat arry ofrom game blocks
let blocks = Array.from(blocksContainer.children);

// creat range of keys
let orderRange = Array.from(Array(blocks.length).keys());

// call shuffle function and play by orderRange
shuffle(orderRange);

// add order css property to game blocks
blocks.forEach((block, index) => {
    // add css order property
    block.style.order = orderRange[index];

    // add click event
    block.addEventListener('click', function() {
        // trigger the flip block function
        flipBlock(block);
    });

});

// flip block function
function flipBlock(selectedBlock) {
    // add class is-flipped
    selectedBlock.classList.add('is-flipped');

    // collect all flipped cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    // if theres two selected blocks
    if(allFlippedBlocks.length == 2) {
        // console.log('two flipped blocks selected')

        // stop clicking function
        stopClicking();

        // check matched blocks function
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }

};

// creat  matched blocks function
function checkMatchedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector('.tries span');

    if(firstBlock.dataset.technology == secondBlock.dataset.technology ) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
    }else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) +1;

        setTimeout(()=> {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        },duration);
    }
    
}

// creat stop clicking function
function stopClicking() {
    // add class no clicking on main container
    blocksContainer.classList.add('no-clicking');

    setTimeout(()=> {
        // remove class no clicking after the duration
        blocksContainer.classList.remove('no-clicking');

    }, duration);
}

//shuffle function
function shuffle(array) {
    // settings vars
    let current = array.length, temp, random;

    while (current > 0) {
        //get random number
        random = Math.floor(Math.random() * current);

        // decrease legnth by one
        current--;
        
        // [1] seve current element in stash
        temp = array[current];

        // [2] current element = randon element
        array[current] = array[random];

        // [3] randon element = get element from stash
        array[random] = temp
    }
    return array;

}
