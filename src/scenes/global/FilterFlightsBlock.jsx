import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Slider } from '@mui/material';
import { useDispatch } from 'react-redux';
import { filterByNameAirline, filterByQuantitySegments, filterByRangePrice, sortFlightItems } from '../../state';


const FilterFlightsBlock = ({ items, filter }) => {

    const { rangePrice } = filter

    const airlines = [...new Set(items.map(el => el?.flight?.carrier?.caption))]
    const dispatch = useDispatch();
    const sortLabels = ['по возростанию цены', 'по убыванию цены', 'по времени в пути']

    const HandleChangeFilterRangePrice = (event, newValue) => {
        dispatch(filterByRangePrice(newValue))
    }

    return (
        <>
            <Box
                height="100vh"
                width="320px"
            >

                <FormControl>
                    <FormLabel id="sort-radio-buttons-group" sx={{ fontWeight: "700", marginTop: "20px" }}>Сортировать</FormLabel>
                    <RadioGroup
                    >
                        {sortLabels.map((el, id) => {
                            return (
                                <FormControlLabel
                                    key={id}
                                    value={el}
                                    control={<Radio onChange={(e) => dispatch(sortFlightItems(e.target.value))} />}
                                    label={`- ${el}`} />
                            )
                        })}
                    </RadioGroup>
                </FormControl>

                <FormControl>
                    <FormLabel component="legend" sx={{ fontWeight: "700", marginTop: "20px" }}>Фильтровать</FormLabel>
                    <FormGroup  >
                        <FormControlLabel
                            control={
                                <Checkbox onClick={(e) => dispatch(filterByQuantitySegments({ checked: e.target.checked, name: e.target.name }))} name="1 пересадка" />
                            }
                            label="- 1 пересадка"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox onClick={(e) => dispatch(filterByQuantitySegments({ checked: e.target.checked, name: e.target.name }))} name="без пересадок" />
                            }
                            label="- без пересадок"
                        />
                    </FormGroup>
                </FormControl>

                <FormControl>
                    <FormLabel component="legend" sx={{ fontWeight: "700", marginTop: "20px", paddingRight: '200px' }}>Цена</FormLabel >
                    <Box sx={{ width: '100%' }} margin="20px 0">
                        <Slider
                            value={rangePrice}
                            onChange={HandleChangeFilterRangePrice}
                            valueLabelDisplay="auto"
                            min={0}
                            max={150000}
                            step={1000}

                        />
                    </Box>
                </FormControl>

                <FormControl>
                    <FormLabel component="legend" sx={{ fontWeight: "700", marginTop: "20px" }}>Авиакомпании</FormLabel>
                    <FormGroup>
                        {airlines.map((el, id) => {
                            return (
                                <FormControlLabel
                                    key={id}
                                    control={
                                        <Checkbox onClick={(e) => dispatch(filterByNameAirline({ checked: e.target.checked, name: el }))} name={el} />
                                    }

                                    label={el}
                                />)
                        })}

                    </FormGroup>
                </FormControl>

            </Box>
        </>
    )
}

export default FilterFlightsBlock;