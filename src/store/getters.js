export default {
// 总数量
  totalCount(state){
    return state.shopCart.reduce((total,food)=>{
      return total+food.count
    },0)
  },
  totalPrice (state) {
    return state.shopCart.reduce((preTotal, food) => {
      return preTotal + food.count*food.price
    }, 0)
  }

}
