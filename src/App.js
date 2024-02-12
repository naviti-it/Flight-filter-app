import FlightsElement from "./components/FlightsElement/FlightsElement";
import { Box, Button } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { shades } from './theme';
import FilterFlightsBlock from './scenes/global/FilterFlightsBlock'
import data from './assets/data/flights.json'
import { setFlightItems } from "./state";
import { useEffect, useState } from "react";

function App() {
  const dispatch = useDispatch();
  let { flightItems, filter, filteredItems } = useSelector((state) => state.filter);
  const [visible, setVisible] = useState(2)

  const setFlightItemsData = () => {
    dispatch(setFlightItems(data?.result?.flights))
  }

  const loadMoreFlightItems = () => {
    setVisible((prevValue) => prevValue + 2)
  }

  useEffect(() => {
    setFlightItemsData()
  })

  return (
    <Box display="flex" width="1200px" margin="0 auto" sx={{ backgroundColor: "white" }}>
      <FilterFlightsBlock items={flightItems} filter={filter} />
      <Box>
        {filteredItems.length > 0 ?
          filteredItems.slice(0, visible).map((el, id) => (
            <FlightsElement flight={el?.flight} key={id} />
          )) :
          flightItems.slice(0, visible).map((el, id) => (
            <FlightsElement flight={el?.flight} key={id} />
          ))
        }
        <Box textAlign="center" marginTop="10px">
          <Button
            onClick={loadMoreFlightItems}
            variant="outlined"
            sx={{
              backgroundColor: shades.neutral[200],
              color: 'black',
              padding: '5px 50px',
              '&:hover': {
                backgroundColor: shades.neutral[300]
              }
            }}>
            Показать еще
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
