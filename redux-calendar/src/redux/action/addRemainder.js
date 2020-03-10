//ACTIONS  TYPE
const ADD_REMAINDER= 'add_remainder';
//Action
const addRemainder = remainder =>({
    type:ADD_REMAINDER,
    playload:remainder
  });

export default addRemainder;