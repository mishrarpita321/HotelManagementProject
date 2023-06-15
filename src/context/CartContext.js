import React, { createContext, useState } from "react"

const CartContext = createContext()

const CartProvider = ({ children }) => {
    const [selectedRooms, setSelectedRooms] = useState([])
    const [arrivalDate, setArrivalDate] = useState(null)
    const [deptDate, setDeptDate] = useState(null)
    const [guestCount, setGuestCount] = useState(0)

    // const addArrivalDate = (arrivalDate) => {
    //     setSelectedRooms(arrivalDate)
    // }
    // const addDeptDate = (arrivalDate) => {
    //     setDeptDate(arrivalDate)
    // }

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
        setArrivalDate(null)
        setDeptDate(null)
        setGuestCount(0)

    }

    return (
        <CartContext.Provider value={{ selectedRooms, addToCart, removeFromCart, clearCart, arrivalDate, setArrivalDate, deptDate, setDeptDate, guestCount, setGuestCount }}>
            {children}
        </CartContext.Provider>
    )
}

export { CartContext, CartProvider }
