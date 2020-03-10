
//ACTIONS  TYPE
const DELETE_REMAINDER= 'delete_remainder';
//action
 const deleteRemainder = remainder =>(
    {
      type:DELETE_REMAINDER,
      playload:remainder
    }
  );
  export default deleteRemainder;