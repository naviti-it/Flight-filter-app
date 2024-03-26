import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Slider } from '@mui/material';
import { useDispatch } from 'react-redux';
import { filterByNameAirline, filterByQuantitySegments, filterByRangePrice, sortFlightItems } from '../../state';
import { useEffect, useState } from 'react';
import { airlinesNameArrayObj, quantityCheck, sortLabels } from '../../assets/data/constants';


const FilterFlightsBlock = ({ filteredItems }) => {
    const dispatch = useDispatch();
    const [sortFlights, setSortFlights] = useState(null);
    const [rangePrice, setRangePrice] = useState([0, 150000]);
    const [quantityChecbox, setQuantityChecbox] = useState(quantityCheck);
    const [nameAirline, setNameAirline] = useState(airlinesNameArrayObj);

    const handleChangeSortValue = (e) =>
        setSortFlights(e.target.value);

    const handleChangeQuantity = (id) => {
        const checkboxListQuantity = quantityChecbox;
        const changeCheckboxQuantity = checkboxListQuantity.map((el) => {
            return el.id === id ? { ...el, checked: !el.checked } : el
        })
        setQuantityChecbox(changeCheckboxQuantity)
    }

    const HandleChangeRangePrice = (event, newValue) => {
        setRangePrice(newValue)
    }

    const handleChangeAirline = (id) => {
        const checkboxListAirline = nameAirline;
        const changeCheckboxAirlines = checkboxListAirline.map((el) => {
            return el.id === id ? { ...el, checked: !el.checked } : el
        })
        setNameAirline(changeCheckboxAirlines)
    }

    const filterOnSort = () => {
        if (sortFlights) {
            dispatch(sortFlightItems(sortFlights))
        }
    }
    const filterOnQuantitySegments = () => {
        dispatch(filterByQuantitySegments(quantityChecbox))
    }
    const filterOnRangePrice = () => {
        dispatch(filterByRangePrice(rangePrice))
    }
    const filterOnNameAirline = () => {
        dispatch(filterByNameAirline(nameAirline))
    }

    useEffect(() => {
        filterOnSort()
    }, [sortFlights])

    useEffect(() => {
        filterOnQuantitySegments()
    }, [quantityChecbox])

    useEffect(() => {
        filterOnRangePrice()
    }, [rangePrice])

    useEffect(() => {
        filterOnNameAirline()
    }, [nameAirline])

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
                                    control={<Radio onChange={handleChangeSortValue} />}
                                    label={`- ${el}`} />
                            )
                        })}
                    </RadioGroup>
                </FormControl>

                <FormControl>
                    <FormLabel component="legend" sx={{ fontWeight: "700", marginTop: "20px" }}>Фильтровать</FormLabel>
                    <FormGroup  >
                        {quantityChecbox.map((el, id) => {
                            return (<FormControlLabel
                                key={id}
                                value={el.value}
                                checked={el.checked}
                                control={
                                    <Checkbox
                                        onChange={() => handleChangeQuantity(el.id)}
                                        name={el.value}
                                    />
                                }
                                label={`- ${el.value}`}
                            />)
                        })}
                    </FormGroup>
                </FormControl>

                <FormControl>
                    <FormLabel component="legend" sx={{ fontWeight: "700", margin: "20px 0 40px", paddingRight: '200px' }}>Цена</FormLabel >
                    <Box sx={{ width: '100%' }} margin-="10px 0">
                        <Slider
                            value={rangePrice}
                            onChange={HandleChangeRangePrice}
                            valueLabelDisplay="on"
                            min={0}
                            max={150000}
                            step={1000}
                        />
                    </Box>
                </FormControl>

                <FormControl>
                    <FormLabel component="legend" sx={{ fontWeight: "700", marginTop: "20px" }}>Авиакомпании</FormLabel>
                    <FormGroup>
                        {nameAirline.map((el, id) => {
                            return (<FormControlLabel
                                key={id}
                                value={el.value}
                                checked={el.checked}
                                disabled={filteredItems.findIndex((elem) => elem.flight.carrier.caption === el.value) === -1}
                                control={
                                    <Checkbox
                                        onChange={() => handleChangeAirline(el.id)}
                                    />
                                }
                                label={el.value}
                            />)
                        })}
                    </FormGroup>
                </FormControl>
            </Box>
        </>
    )
}

export default FilterFlightsBlock;