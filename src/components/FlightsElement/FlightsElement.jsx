import { Box, Typography, Button } from '@mui/material';
import { shades } from './../../theme';
import Segment from './Segment';


const FlightsElement = ({ flight }) => {

    const { carrier, price, legs } = flight

    return (
        <>
            <Box
                sx={{ backgroundColor: shades.primary[500] }}
                display="flex"
                flexDirection="column"
                width="640px"
                marginTop="20px"
                padding="2px"
                boxShadow="0 14px 28px rgba(0, 0, 0, 0.15)"
            >
                <Box
                    sx={{ backgroundColor: shades.primary[500] }}
                    display="flex"
                    margin="0"
                    padding="0px 5px"
                    color="white"
                    justifyContent="space-between"
                    alignItems="center">
                    <Box
                        sx={{ backgroundColor: 'transparent' }}
                        display="flex"
                        alignItems="center"
                        fontSize="18px">
                        <img
                            src={`https://www.skyscanner.net/images/airlines/small/${carrier?.airlineCode}.png`}
                            alt={carrier?.airlineCode}
                            height='30px' />
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-end">
                        <Typography component="span" fontSize="18px">
                            {Math.round(price?.passengerPrices[0]?.singlePassengerTotal?.amount)}
                            &nbsp;
                            {price?.passengerPrices[0]?.singlePassengerTotal?.currency}</Typography>
                        <small>Стоимость расчитана на одного взрослого пассажира</small>
                    </Box>
                </Box>
            </Box>
            <Segment legs={legs[0]} />
            <Segment legs={legs[1]} />
            <Button
                sx={{
                    backgroundColor: shades.secondary[500],
                    color: "white",
                    '&:hover': {
                        backgroundColor: shades.secondary[600]
                    }
                }}
                fullWidth
                margin="0"
                padding="5px"
                fontWeight="500"
                fontSize="14px">
                ВЫБРАТЬ
            </Button>
        </>
    )
}

export default FlightsElement;
