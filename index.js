const redux= require('redux');
const createStore= redux.createStore;


const CAKE_ORDERD="CAKE_ORDERD"


function cakeOrder(){
    return{
        type:CAKE_ORDERD,
        quantity:1
    }
}

//(previousState,action)=>new State
const initialState ={
    numOfCake:10
}

const reducer=(state=initialState,action) =>{
    switch(action.type){
        case CAKE_ORDERD:
            return{
             numOfCake:state.numOfCake-1
            }
        default:return state
    }
}

const store= createStore(reducer)
console.log("initail state",store.getState());
const unsubscribe=store.subscribe(()=>console.log("updated store",store.getState()))
store.dispatch(cakeOrder())
store.dispatch(cakeOrder())
store.dispatch(cakeOrder())

unsubscribe()


