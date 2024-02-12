import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  flightItems: [],
  filteredItems: [],
  filter: {
    rangePrice: [0, 100000]
  }
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFlightItems: (state, action) => {
      state.flightItems = action.payload
    },

    getRangePrice: (state, action) => {
      state.filter.rangePrice = action.payload
    },

    sortFlightItems: (state, action) => {
      if (action.payload === 'по убыванию цены') {
        state.filteredItems =
          state.filteredItems.length > 0
            ? [
              ...state.filteredItems.slice().sort((a, b) => {
                return (
                  b.flight.price.passengerPrices[0].singlePassengerTotal
                    .amount -
                  a.flight.price.passengerPrices[0].singlePassengerTotal
                    .amount
                )
              })
            ]
            : [
              ...state.flightItems.slice().sort((a, b) => {
                return (
                  b.flight.price.passengerPrices[0].singlePassengerTotal
                    .amount -
                  a.flight.price.passengerPrices[0].singlePassengerTotal
                    .amount
                )
              })
            ]
      }

      if (action.payload === 'по возростанию цены') {
        state.filteredItems =
          state.filteredItems.length > 0
            ? [
              ...state.filteredItems.sort((a, b) => {
                return (
                  a.flight.price.passengerPrices[0].singlePassengerTotal
                    .amount -
                  b.flight.price.passengerPrices[0].singlePassengerTotal
                    .amount
                )
              })
            ]
            : [
              ...state.flightItems.sort((a, b) => {
                return (
                  a.flight.price.passengerPrices[0].singlePassengerTotal
                    .amount -
                  b.flight.price.passengerPrices[0].singlePassengerTotal
                    .amount
                )
              })
            ]
      }

      if (action.payload === 'по времени в пути') {
        state.filteredItems =
          state.filteredItems.length > 0
            ? [
              ...state.filteredItems.sort((a, b) => {
                const durationA = a.flight.legs.reduce(
                  (prev, el) => prev + el.duration,
                  0
                )
                const durationB = b.flight.legs.reduce(
                  (prev, el) => prev + el.duration,
                  0
                )
                return durationA - durationB
              })
            ]
            : [
              ...state.flightItems.slice().sort((a, b) => {
                const durationA = a.flight.legs.reduce(
                  (prev, el) => prev + el.duration,
                  0
                )
                const durationB = b.flight.legs.reduce(
                  (prev, el) => prev + el.duration,
                  0
                )
                return durationA - durationB
              })
            ]
      }
    },

    filterByQuantitySegments: (state, action) => {
      if (action.payload.checked && action.payload.name === '1 пересадка') {
        state.filteredItems =
          state.filteredItems.length > 0
            ? [
              ...state.filteredItems.filter(
                (el) =>
                  el.flight.legs[0].segments.length > 1 ||
                  el.flight.legs[1].segments.length > 1
              )
            ]
            : [
              ...state.flightItems.filter(
                (el) =>
                  el.flight.legs[0].segments.length > 1 ||
                  el.flight.legs[1].segments.length > 1
              )
            ]
      }
      if (action.payload.checked && action.payload.name === 'без пересадок') {
        state.filteredItems =
          state.filteredItems.length > 0
            ? [
              ...state.filteredItems.filter(
                (el) =>
                  el.flight.legs[0].segments.length === 1 &&
                  el.flight.legs[1].segments.length === 1
              )
            ]
            : [
              ...state.flightItems.filter(
                (el) =>
                  el.flight.legs[0].segments.length === 1 &&
                  el.flight.legs[1].segments.length === 1
              )
            ]
      }
      if (!action.payload.checked) {
        state.filteredItems = [
          ...state.filteredItems.filter((el) => {
            if (action.payload.name === '1 пересадка') {
              return (
                el.flight.legs[0].segments.length === 1 &&
                el.flight.legs[1].segments.length === 1
              )
            }
            if (action.payload.name === 'без пересадок') {
              return (
                el.flight.legs[0].segments.length > 1 ||
                el.flight.legs[1].segments.length > 1
              )
            }
          })
        ]
      }
    },

    filterByRangePrice: (state, action) => {
      state.filter.rangePrice = action.payload
      state.filteredItems =
        state.filteredItems.length > 0
          ? [
            ...state.filteredItems.filter((el) => {
              return (
                el.flight.price.passengerPrices[0].singlePassengerTotal
                  .amount >= state.filter.rangePrice[0] &&
                el.flight.price.passengerPrices[0].singlePassengerTotal
                  .amount <= state.filter.rangePrice[1]
              )
            })
          ]
          : [
            ...state.flightItems.filter((el) => {
              return (
                el.flight.price.passengerPrices[0].singlePassengerTotal
                  .amount >= state.filter.rangePrice[0] &&
                el.flight.price.passengerPrices[0].singlePassengerTotal
                  .amount <= state.filter.rangePrice[1]
              )
            })
          ]
    },

    filterByNameAirline: (state, action) => {
      if (action.payload.checked) {
        state.filteredItems =
          state.filteredItems.length > 0
            ? [
              ...state.filteredItems,
              ...state.flightItems.filter((el) => {
                return el.flight.carrier.caption === action.payload.name
              })
            ]
            : [
              ...state.flightItems.filter((el) => {
                return el.flight.carrier.caption === action.payload.name
              })
            ]
      }
      if (!action.payload.checked) {
        state.filteredItems = [
          ...state.filteredItems.filter((el) => {
            return el.flight.carrier.caption !== action.payload.name
          })
        ]
      }
    }
  }
})

export const {
  setFlightItems,
  getRangePrice,
  sortFlightItems,
  filterByQuantitySegments,
  filterByNameAirline,
  filterByRangePrice
} = filterSlice.actions

export default filterSlice.reducer
