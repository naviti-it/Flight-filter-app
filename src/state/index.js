import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  flightItems: [],
  filteredItems: [],
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {

    setFlightItems: (state, action) => {
      state.flightItems = action.payload
    },


    sortFlightItems: (state, action) => {
      let sortFlightItems;
      let sortFilteredItems;

      if (action.payload === 'по убыванию цены') {

        sortFilteredItems = [...state.filteredItems.sort((a, b) => {
          return (
            b.flight.price.passengerPrices[0].singlePassengerTotal
              .amount -
            a.flight.price.passengerPrices[0].singlePassengerTotal
              .amount
          )
        })]
      }

      sortFlightItems = [...state.flightItems.sort((a, b) => {
        return (
          b.flight.price.passengerPrices[0].singlePassengerTotal
            .amount -
          a.flight.price.passengerPrices[0].singlePassengerTotal
            .amount
        )
      })
      ]

      if (action.payload === 'по возростанию цены') {

        sortFlightItems = [...state.flightItems.sort((a, b) => {
          return (
            a.flight.price.passengerPrices[0].singlePassengerTotal
              .amount -
            b.flight.price.passengerPrices[0].singlePassengerTotal
              .amount
          )
        })
        ];
        sortFilteredItems = [...state.filteredItems.sort((a, b) => {
          return (
            a.flight.price.passengerPrices[0].singlePassengerTotal
              .amount -
            b.flight.price.passengerPrices[0].singlePassengerTotal
              .amount
          )
        })];
      }

      if (action.payload === 'по времени в пути') {
        sortFlightItems = [...state.flightItems.sort((a, b) => {
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
        sortFilteredItems = [...state.filteredItems.sort((a, b) => {
          const durationA = a.flight.legs.reduce(
            (prev, el) => prev + el.duration,
            0
          )
          const durationB = b.flight.legs.reduce(
            (prev, el) => prev + el.duration,
            0
          )
          return durationA - durationB
        })]
      }
      state.filteredItems = state.filteredItems.length ? sortFilteredItems : sortFlightItems
    },


    filterByQuantitySegments: (state, action) => {
      const checkedItems = action.payload.filter((item) => item.checked).map((item) => item.value)
      let filterByQuantitySegments;
      let flightByQuantitySegments;
      const withSegments = checkedItems.includes("1 пересадка")
      const withoutSegments = checkedItems.includes("без пересадок")

      if (checkedItems.length) {
        if (withSegments) {
          filterByQuantitySegments =
            [...state.filteredItems.filter(
              (el) =>
                el.flight.legs[0].segments.length > 1 ||
                el.flight.legs[1].segments.length > 1
            )]
        } else if (withoutSegments) {
          filterByQuantitySegments =
            [...state.filteredItems.filter(
              (el) =>
                el.flight.legs[0].segments.length === 1 &&
                el.flight.legs[1].segments.length === 1
            )]
        }
      }
      if (!checkedItems.length) {
        filterByQuantitySegments = [...state.flightItems]
      }

      if (checkedItems.length) {
        if (withSegments) {
          flightByQuantitySegments =
            [...state.flightItems.filter(
              (el) =>
                el.flight.legs[0].segments.length > 1 ||
                el.flight.legs[1].segments.length > 1
            )]
        } else if (withoutSegments) {
          flightByQuantitySegments =
            [...state.flightItems.filter(
              (el) =>
                el.flight.legs[0].segments.length === 1 &&
                el.flight.legs[1].segments.length === 1
            )]
        }
      }
      state.filteredItems = state.filteredItems.length ? filterByQuantitySegments : flightByQuantitySegments;
    },


    filterByRangePrice: (state, action) => {
      let flightByRangePrice = [...state.flightItems.filter((el) => {
        return (
          el.flight.price.passengerPrices[0].singlePassengerTotal
            .amount >= action.payload[0] &&
          el.flight.price.passengerPrices[0].singlePassengerTotal
            .amount <= action.payload[1]
        )
      })]
      state.filteredItems = flightByRangePrice;
    },


    filterByNameAirline: (state, action) => {
      const checkedItemsAirline = action.payload.filter((item) => item.checked).map((item) => item.value)
      let filterByNameAirline;

      if (checkedItemsAirline.length) {
        filterByNameAirline = [...state.filteredItems.filter((el) => {
          return checkedItemsAirline.includes(el.flight.carrier.caption)
        })]
      }
      state.filteredItems = state.filteredItems.length ? filterByNameAirline : [...state.flightItems]
    }
  }

})

export const {
  setFlightItems,
  sortFlightItems,
  filterByQuantitySegments,
  filterByNameAirline,
  filterByRangePrice
} = filterSlice.actions

export default filterSlice.reducer
