import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OffersSubscription from './OffersSubscription';
import RenewableEnergy from './RenewableEnergy';
import FooterAccordion from './FooterAccordion';
import BottomFooter from './BottomFooter';
import FooterAccordionDesktop from './FooterAccordionDesktop';
import BottomFooterDesktop from './BottomFooterDesktop';
const Footer = () => {
  return (
    <Box>
        <OffersSubscription />
        <RenewableEnergy />
        <FooterAccordion />
        <FooterAccordionDesktop />
        <BottomFooter />
        <BottomFooterDesktop />
    </Box>

  )
}

export default Footer