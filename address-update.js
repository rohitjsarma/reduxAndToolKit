const redux= require('redux');
const produce= require("immer").produce;
const createStore= redux.createStore;

const UPDATE_ADDRESS="UPDATE_ADDRESS";

function addressUpdate(street){
    return{
        type:UPDATE_ADDRESS,
        payload:street
    }
}

const initialState={
    name:"rohit sharma",
    address:{
        city:"Patna",
        landmark:"DAV",
        state:"Bihar",
        street:"15 A-20"
    }
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case UPDATE_ADDRESS:
            // return{
            //     ...state,
            //     address:{
            //         ...state.address,
            //         street:action.payload
            //     },
            // }
            return produce(state,(draft)=>{
                draft.address.street=action.payload
            })
            default :
             return state;
           
    }
}
const store= redux.createStore(reducer)
console.log("initial state",store.getState());
const unsubscribe=store.subscribe(()=>{
    console.log("Updates state",store.getState());
})

store.dispatch(addressUpdate("Road 15,Madhuri Chowk"));
unsubscribe()