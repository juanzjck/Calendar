//ACTIONS  TYPE
const CHANGE_REMAINDER = 'change_remainder';


//action
const changeRemainder = remainder =>(
      {
        type:CHANGE_REMAINDER,
        playload:remainder
      } );
      
export default changeRemainder;