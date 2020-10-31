const { body } = document;
// let count = 0; 
// const ourMemory = {
//     [count]: Array(10000).fill('*');
// }
function changeBackground(number) { 
    // count++
    // ourMemory[count] = Array(10000).fill('*');
    // Check if background already showing 
    let previousBAckground;
    if (body.className) {
        previousBAckground = body.className;
    }
    // reset css class for body
    body.className = ''
    switch(number) {
        case '1': 
            return (previousBAckground === "background-1" ? false : body.classList.add('background-1'));
        case '2': 
            return (previousBAckground === "background-2" ? false : body.classList.add('background-2'));
        case '3': 
            return (previousBAckground === "background-3" ? false : body.classList.add('background-3'));
        default:
            break;
    }
}
// Memory leaks - browser has to remember variables - browser can only hold so much memory
// https://developers.google.com/web/tools/chrome-devtools/memory-problems
// https://developers.google.com/web/tools/chrome-devtools/memory-problems/heap-snapshots