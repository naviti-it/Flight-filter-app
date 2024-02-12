import { Box } from '@mui/material';
import { shades } from './../../theme';
import dayjs from 'dayjs';
import 'dayjs/locale/ru'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'

const Segment = ({ legs }) => {
    const firstSegment = legs?.segments[0]
    const lastSegment = legs?.segments.length > 0 ?
        legs.segments[legs?.segments.length - 1] : firstSegment
    const segments = legs?.segments.length > 1 ?
        <Box component='span' sx={{ color: shades.secondary[500] }}>{legs.segments.length - 1} пересадка</Box> : ''

    const getTimeFromMins = (mins) => {
        let hours = Math.trunc(mins / 60);
        let minutes = mins % 60;
        return hours + 'ч ' + minutes + ' мин';
    };
    return (
        <Box
            margin-top="2px"
            padding="5px 0px 3px 10px"
            background="white"
            color="black"
            borderRadius="2px">
            <Box
                margin="5px 16px" fontSize="16px">
                <Box component="span">{firstSegment.departureCity ? firstSegment.departureCity.caption : ''},&nbsp;</Box>
                <Box component="span">{firstSegment.departureAirport.caption}&nbsp;</Box>
                <Box component="span" sx={{ color: shades.primary[500] }} fontSize="14px">({firstSegment.departureAirport.uid})&nbsp;</Box>
                <FontAwesomeIcon sx={{ backgroundColor: shades.primary[500] }} size="1x" icon={faLongArrowAltRight} />&nbsp;
                <Box component="span">{lastSegment.arrivalCity ? lastSegment.arrivalCity.caption : ''},&nbsp;</Box>
                <Box component="span">{lastSegment.arrivalAirport.caption}&nbsp;</Box>
                <Box component="span" sx={{ color: shades.primary[500] }} fontSize="14px">({lastSegment.arrivalAirport.uid})</Box>
            </Box>
            <Box
                height='1px'
                margin='0 5px'
                sx={{ backgroundColor: shades.neutral[500] }} />
            <Box
                margin="5px 16px"
                display="flex"
                justifyContent="space-between"
                alignItems="center">
                <Box>
                    <Box component="span" fontSize="16px">
                        {dayjs(firstSegment.departureDate).format('HH:mm')}&nbsp;
                    </Box>
                    <Box
                        component="span"
                        sx={{ color: shades.primary[500] }}
                        fontSize="14px">
                        {dayjs(firstSegment.arrivalDate).locale('ru').format('D MMM dd')}
                        &nbsp;
                    </Box>
                </Box>
                <Box marginLeft="75px">
                    <FontAwesomeIcon size="1x" icon={faClock} />&nbsp;
                    <Box component="span" >
                        {getTimeFromMins(legs.duration)}
                    </Box>
                </Box>&nbsp;
                <Box>
                    <Box
                        component="span"
                        sx={{ color: shades.primary[500] }}
                        fontSize="14px">
                        {dayjs(lastSegment.arrivalDate).locale('ru').format('D MMM dd')}
                        &nbsp;
                    </Box>
                    <Box component="span" fontSize="16px">
                        {dayjs(lastSegment.arrivalDate).format('HH:mm')}
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{ backgroundColor: shades.neutral[500] }}
                height="1px"
                margin="12px 50px"
                textAlign="center">
                {segments}
            </Box>
            <Box margin="5px 16px">&nbsp;
                <Box component="span">Рейс выполняет:&nbsp;
                    {firstSegment.airline.airlineCode}&nbsp;{firstSegment.airline.caption}</Box>
            </Box>
        </Box>
    )
}
export default Segment;