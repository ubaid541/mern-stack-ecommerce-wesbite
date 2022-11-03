import { createContext, useReducer, useEffect } from 'react'

const INITIAL_STATE = {
  cart: JSON.parse(localStorage.getItem('cart')) || null,
  loading: false,
  error: null,
}

export const CartContext = createContext(INITIAL_STATE)

const CartReducer = (state, action) => {
  switch (action.type) {
    case 'CART_START':
      return {
        cart: null,
        loading: false,
        error: null,
      }
    case 'CART_UPDATED':
      return {
        cart: action.payload,
        loading: false,
        error: null,
      }
    case 'CART_FAILURE':
      return {
        cart: null,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, INITIAL_STATE)

  // store cart data to localstorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])

  return (

    <CartContext.Provider
      value={{
        cart: state.cart,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
