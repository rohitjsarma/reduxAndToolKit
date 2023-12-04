const redux= require('redux');
const createStore= redux.createStore;
const bindActionCreators= redux.bindActionCreators;
const combineReducers= redux.combineReducers;


const CAKE_ORDERD="CAKE_ORDERD"
const CAKE_RESTORED="CAKE_RESTORED"
const ICECREAM_ORDERED="ICECREAM_ORDERED"
const ICECREAM_RESTORED="ICECREAM_RESTORED"


function cakeOrder(qty=1){
    return{
        type:CAKE_ORDERD,
        payload:qty
    }
}
function restockCake(qty=1){
    return{
        type:CAKE_RESTORED,
        payload:qty
    }
}

function icecreamOrder(qty=1){
    return{
        type:ICECREAM_ORDERED,
        payload:qty
    }
}

function restoreIce(qty=1){
    return{
        type:ICECREAM_RESTORED,
        payload:qty
    }
}

//(previousState,action)=>new State
const cakeinitialState ={
    numOfCake:10
}
const icecreamInitialState={
    numofIcecream:20
}
const cakereducer=(state=cakeinitialState,action) =>{
    switch(action.type){
        case CAKE_ORDERD:
            return{
             numOfCake:state.numOfCake-1
            }
        case CAKE_RESTORED:
            return {
             numOfCake:state.numOfCake+action.payload
            }
        default:return state
    }
}
const icecreamreducer=(state=icecreamInitialState,action) =>{
    switch(action.type){
        case    ICECREAM_ORDERED:
            return{
             ...state,
             numofIcecream:state.numofIcecream-1
            }
        case ICECREAM_RESTORED:
            return {
             ...state,
             numofIcecream:state.numofIcecream+action.payload
            }
        default:return state
    }
}

const rootReducer= combineReducers({
    cake:cakereducer,
    iceCream:icecreamreducer
})

const store= createStore(rootReducer)
console.log("initail state",store.getState());
const unsubscribe=store.subscribe(()=>console.log("updated store",store.getState()))
// store.dispatch(cakeOrder())
// store.dispatch(cakeOrder())
// store.dispatch(cakeOrder())
// store.dispatch(restockCake(3))

const action= bindActionCreators({cakeOrder,restockCake,icecreamOrder,restoreIce},store.dispatch)
action.cakeOrder()
action.cakeOrder()
action.cakeOrder()
action.restockCake(3)
action.icecreamOrder()
action.icecreamOrder()
action.restoreIce(2)

unsubscribe()


