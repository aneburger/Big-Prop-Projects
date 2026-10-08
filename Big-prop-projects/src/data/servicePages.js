import paintingHero from '../assets/painting-service.jpeg';
import interior from '../assets/interior.jpeg';
import exterior from '../assets/exterior.jpeg';
import retail from '../assets/retail.jpeg';
import industrial from '../assets/industrial.jpeg';
import waterproofingHero from '../assets/serviceTypes/waterproofing-hero-image.jpeg';
import roofWaterproofing from '../assets/serviceTypes/roof-waterproofing.jpeg';
import balconyWaterproofing from '../assets/serviceTypes/balcony-waterproofing.jpeg';
import bathroomWaterproofing from '../assets/serviceTypes/bathroom-waterproofing.jpeg';
import foundationWaterproofing from '../assets/serviceTypes/foundation-waterproofing.jpeg';
import roofingHero from '../assets/serviceTypes/roofing-hero-image.jpeg';
import roofRepair from '../assets/serviceTypes/roof-repair.jpeg';
import roofMaintenance from '../assets/serviceTypes/roof-maintenance.jpeg';
import roofInstallation from '../assets/serviceTypes/roof-installation.jpeg';
import renovationsHero from '../assets/serviceTypes/renovations-hero-image.jpeg';
import officeRenovation from '../assets/serviceTypes/office-renovation.jpeg';
import kitchenRenovation from '../assets/serviceTypes/kitchen-renovation.jpeg';
import residentialRenovation from '../assets/serviceTypes/residential-renovation.jpeg';
import alterations from '../assets/serviceTypes/alterations.jpeg';

export const servicePages = {
  painting: {
    title: 'Painting Services',
    hero: paintingHero,
    introduction: 'Different spaces have different needs.\nWe provide the right painting solution for each one.',
    contactPrompt: 'Ready for a fresh coat?',
    types: [
      { title: 'Interior Painting', image: interior, description: 'Refresh and transform your interior spaces with quality finishes and careful attention to detail.' },
      { title: 'Exterior Painting', image: exterior, description: 'Protect and improve the outside of your property with durable finishes made to look good and last.' },
      { title: 'Office & Retail Painting', image: retail, description: 'Create professional, welcoming spaces with painting solutions suited to offices, shops and other commercial environments.' },
      { title: 'Industrial Painting', image: industrial, description: 'Practical, durable painting for industrial environments where preparation, performance and lasting results matter.' },
    ],
  },
  waterproofing: {
    title: 'Waterproofing Services',
    hero: waterproofingHero,
    introduction: "Different areas require different levels of protection. We provide waterproofing services tailored to your property's needs.",
    contactPrompt: 'Ready when you are.',
    types: [
      { title: 'Roof Waterproofing', image: roofWaterproofing, description: 'Protect your roof from leaks and water damage with reliable waterproofing solutions designed to keep your property protected.' },
      { title: 'Balcony & Terrace Waterproofing', image: balconyWaterproofing, description: 'Keep balconies, terraces and other exposed surfaces protected from water penetration with waterproofing solutions designed for lasting protection.' },
      { title: 'Bathroom & Wet Area Waterproofing', image: bathroomWaterproofing, description: 'Prevent moisture from reaching walls and floors with effective waterproofing for bathrooms, showers and other areas regularly exposed to water.' },
      { title: 'Foundation Waterproofing', image: foundationWaterproofing, description: "Help protect foundations, basements and below-ground structures from moisture and water ingress with waterproofing solutions suited to the property's needs." },
    ],
  },
  roofing: {
    title: 'Roof Installation and Maintenance',
    hero: roofingHero,
    introduction: 'A well-maintained roof is essential to protecting your property. We provide practical roofing solutions tailored to your property.',
    contactPrompt: "We're here to help.",
    types: [
      { title: 'Roof Repairs', image: roofRepair, description: 'From damaged roof tiles to leaks and general wear, we take care of the repairs needed to restore your roof and keep your property protected.' },
      { title: 'Roof Maintenance', image: roofMaintenance, description: 'Keep your roof in good condition with regular inspections and preventative maintenance that help identify potential problems before they become costly repairs.' },
      { title: 'Complete Roof Installations', image: roofInstallation, description: 'From new builds to roof replacements, we provide complete roof installations with a focus on durability and lasting protection.' },
    ],
  },
  renovations: {
    title: 'Residential & Commercial Renovations',
    hero: renovationsHero,
    introduction: 'Every property has different needs. We provide residential and commercial renovation services tailored to your space',
    contactPrompt: 'Ready for a fresh start?',
    types: [
      { title: 'Office & Commercial Renovations', image: officeRenovation, description: 'Create functional, professional spaces that work for your business. From office upgrades to retail renovations, we help transform commercial properties to better suit your needs.' },
      { title: 'Kitchen & Bathroom Renovations', image: kitchenRenovation, description: 'Give your kitchen or bathroom a fresh look with practical upgrades, modern finishes and thoughtful improvements that make everyday spaces more functional and enjoyable.' },
      { title: 'Residential Renovations', image: residentialRenovation, description: 'From individual room makeovers to larger home renovations, we help improve and transform your living spaces with quality workmanship and attention to detail.' },
      { title: 'Alterations & Property Upgrades', image: alterations, description: 'Make better use of your existing property with practical alterations and upgrades that improve functionality, refresh outdated spaces and add lasting value.' },
    ],
  },
};
