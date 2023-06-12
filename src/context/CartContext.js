import React, { createContext, useState } from "react"

const CartContext = createContext()

const CartProvider = ({ children }) => {
    const [selectedRooms, setSelectedRooms] = useState([])

    const addToCart = (roomNo) => {
        setSelectedRooms((prevSelectedRooms) => [...prevSelectedRooms, roomNo])
    }

    const removeFromCart = (roomNo) => {
        setSelectedRooms((prevSelectedRooms) =>
            prevSelectedRooms.filter((selectedRoom) => selectedRoom !== roomNo)
        )
    }

    const clearCart = () => {
        setSelectedRooms([])
    }

    return (
        <CartContext.Provider value={{ selectedRooms, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

export { CartContext, CartProvider }
