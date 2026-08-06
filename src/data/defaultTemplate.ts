import { CompanyConfig, LegalTerms, ScopeCategory, Proposal } from '../types';

export const DEFAULT_COMPANY_CONFIG: CompanyConfig = {
  companyName: "July's Quality Construction & Remodeling L.L.C.",
  tagline: "Licensed Builder • Remodeler Since 1992 • State Licensed & Insured",
  address: "P.O. Box 386 • Clio, Michigan 48420",
  phone: "810-845-1778",
  email: "julysconstruction@hotmail.com",
  website: "www.julysconstruction.com",
  licenseNumber: "License# 2101104482",
  logoUrl: "",
};

export const DEFAULT_LEGAL_TERMS: LegalTerms = {
  agreementText: `Payment Note: Any adjustments to the contract price are to be applied toward the final balance, unless otherwise noted with a change order. Unforeseen carpentry, electrical, plumbing, heating, and cooling will be discussed with homeowner and a change order signed. Work will be figured at time and material.`,
  paymentSchedule: `Total for all work described above: $
Due at signing of contract: $
Due at start of job: $
Due upon completion of job: $`,
  dueAtSigning: "",
  dueAtStart: "",
  dueUponCompletion: "",
  warrantyInfo: "All work performed by July's Quality Construction & Remodeling L.L.C. comes with state-licensed craftsmanship guarantee.",
  contractorTitle: "July's Quality Construction Representative",
  clientTitle: "Homeowner / Client",
};

export const DEFAULT_CATEGORIES: ScopeCategory[] = [
  {
    id: "cat-1",
    name: "General Description of Work",
    description: "Overall description and summary of the renovation or construction project",
    isConfirmed: false,
    items: []
  },
  {
    id: "cat-2",
    name: "MATERIAL DESCRIPTION",
    description: "Key materials, lumber specs, products, and finish selections",
    isConfirmed: false,
    items: []
  },
  {
    id: "cat-3",
    name: "DEMOLITION",
    description: "Tear-down, debris containment, and site prep",
    isConfirmed: false,
    items: []
  },
  {
    id: "cat-4",
    name: "ELECTRICAL",
    description: "Wiring, breakers, switches, outlets, and lighting fixtures",
    isConfirmed: false,
    items: []
  },
  {
    id: "cat-5",
    name: "PLUMBING",
    description: "Supply lines, drainage, valves, and fixture hookups",
    isConfirmed: false,
    items: []
  },
  {
    id: "cat-6",
    name: "CARPENTRY",
    description: "Structural framing, trim, crown molding, doors, and cabinet installation",
    isConfirmed: false,
    items: []
  },
  {
    id: "cat-7",
    name: "ALLOWANCES FIGURED IN PRICE OF JOB",
    description: "Pre-budgeted fixture, tile, or item allowances included in contract quote",
    isConfirmed: false,
    items: []
  },
  {
    id: "cat-8",
    name: "HOMEOWNER TO SUPPLY",
    description: "Materials, appliances, or fixtures provided directly by the property owner",
    isConfirmed: false,
    items: []
  }
];

export const SAMPLE_PROPOSAL: Proposal = {
  id: "prop-new-001",
  title: "New Construction Contract",
  createdAt: new Date().toISOString().split('T')[0],
  updatedAt: new Date().toISOString().split('T')[0],
  status: "draft",
  clientInfo: {
    clientName: "",
    address: "",
    phone: "",
    email: "",
    projectSite: "",
    proposalNumber: `JQC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    proposalDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    salesRep: "July (Owner & Lead Builder)"
  },
  categories: DEFAULT_CATEGORIES,
  legalTerms: DEFAULT_LEGAL_TERMS,
  companyConfig: DEFAULT_COMPANY_CONFIG,
  totalEstimate: "",
  notes: ""
};

