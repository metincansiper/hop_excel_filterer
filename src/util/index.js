const inplaceShuffle = ( arr ) => {
    const len = arr.length;

    for ( let i = len - 1; i > 0; i-- ) {
        const j = generateRandomInteger( i, len - 1 );
        [ arr[ i ], arr[ j ] ] = [ arr[ j ], arr[ i ] ];
    }
};

const generateRandomInteger = ( lowerLimit, upperLimit ) => {
    return Math.floor( Math.random() * ( upperLimit - lowerLimit + 1 ) ) + lowerLimit;
};

module.exports = { inplaceShuffle, generateRandomInteger };