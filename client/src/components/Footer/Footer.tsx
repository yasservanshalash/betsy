import React from 'react'
import OffersSubscription from './OffersSubscription'
import RenewableEnergy from './RenewableEnergy'
import FooterAccordion from './FooterAccordion'
import BottomFooter from './BottomFooter'
import FooterAccordionDesktop from './FooterAccordionDesktop'
import BottomFooterDesktop from './BottomFooterDesktop'

const Footer = () => {
  return (
    <div>
      <OffersSubscription />
      <RenewableEnergy />
      <FooterAccordion />
      <FooterAccordionDesktop />
      <BottomFooter />
      <BottomFooterDesktop />
    </div>
  )
}

export default Footer