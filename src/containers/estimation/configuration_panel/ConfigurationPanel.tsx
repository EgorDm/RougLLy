import {
    Accordion as MuiAccordion,
    AccordionDetails, AccordionProps, AccordionSummary as MuiAccordionSummary, AccordionSummaryProps,
    Autocomplete,
    Box, Checkbox,
    Container,
    FormControl, FormControlLabel, InputAdornment, InputLabel, MenuItem, Select,
    Slider,
    Stack, styled,
    TextField,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import {ModelSelection} from "./ModelSelection";
import {InstanceSelection} from "./InstanceSelection";

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({theme}) => ({
    border: 'none',
    backgroundColor: 'transparent',
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));


const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ExpandMoreIcon sx={{fontSize: '0.9rem'}}/>}
        {...props}
    />
))(({theme}) => ({

    flexDirection: 'row-reverse',
    paddingLeft: 8,
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));


const marks = [
    {
        value: 1,
        label: '3-bit',
    },
    {
        value: 2,
        label: '4-bit',
    },
    {
        value: 3,
        label: '5-bit',
    },
    {
        value: 4,
        label: '6-bit',
    },
    {
        value: 5,
        label: '8-bit',
    },
    {
        value: 6,
        label: '16-bit',
    },
    {
        value: 7,
        label: '32-bit',
    },
];

function valueText(value: number) {
    return `${value}°C`;
}

function ConfigurationPanel() {
    return (
        <Stack>
            <Container maxWidth="sm">
                <Box alignItems="center">
                    <ModelSelection/>
                </Box>
                <Box sx={{pt: 2}} alignItems="center">
                    <InstanceSelection/>
                </Box>
            </Container>
            <Container maxWidth="sm" sx={{pt: 2}}>
                <Accordion variant={'outlined'}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Advanced Settings</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box>
                            <Typography id="track-inverted-slider" gutterBottom>
                                Inverted track
                            </Typography>
                            <Slider
                                track="inverted"
                                aria-labelledby="track-inverted-slider"
                                getAriaValueText={valueText}
                                defaultValue={6}
                                min={1}
                                max={7}
                                marks={marks}
                            />
                        </Box>

                        <FormControl variant="outlined" sx={{minWidth: 120, mt: 2}}>
                            <InputLabel id="demo-simple-select-standard-label">Quantization</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                label="Float Size"
                                value={4}
                            >
                                <MenuItem value={4}>Q5_K_S</MenuItem>
                                <MenuItem value={6}>Q5_K_M</MenuItem>
                                <MenuItem value={5}>Q5_0</MenuItem>
                            </Select>
                        </FormControl>
                        <Stack spacing={1.5} sx={{minWidth: 300, mt: 2}}>
                            <TextField
                                type="number" inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                                value={5}
                                label="Batch Size"
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">
                                        <FormControlLabel control={<Checkbox/>} label="Recommended"
                                                          sx={{ml: 0, mr: 0}}/>
                                    </InputAdornment>,
                                }}
                            />
                        </Stack>
                        <Box>
                            <Typography id="track-inverted-slider" gutterBottom>
                                Utilization
                            </Typography>
                            <Slider
                                track="inverted"
                                aria-labelledby="track-inverted-slider"
                                min={10}
                                max={100}
                                defaultValue={70}
                                step={10}
                                marks
                                valueLabelDisplay="auto"
                            />
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </Container>
        </Stack>
    )
}

export default ConfigurationPanel;