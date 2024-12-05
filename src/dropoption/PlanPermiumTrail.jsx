//reports
export const transactionType = [
  { value: "", label: "--Select--" },
  { value: "1", label: "Eligibility" },
  { value: "2", label: "Claim Status" },
  { value: "3", label: "Enhanced Claim Status" }
];
export const transactionType1 = [
  { value: "", label: "--Select--" },
  { value: "1", label: "Eligibility" },
  { value: "2", label: "Claim Status" },
  { value: "3", label: "Complete Claim Status" },
  { value: "4", label: "Benefit Inquiry" },
  { value: "5", label: "Insurance Discovery" },
  { value: "6", label: "MBI" }
];
// master
export const planPremiumTrail = [
  { value: "", label: "--select--" },
  { value: "2", label: "Premium" },
  { value: "3", label: "Trail" }
];

export const rateCategory = [
  { value: "", label: "--select--" },
  { value: "2", label: "NON-PAR" },
  { value: "5", label: "Others" },
  { value: "1", label: "PAR" },
  { value: "3", label: "TRANSITIONAL" }
];

export const enrollmentYesorNO = [
  { value: "1", label: "YES" },
  { value: "0", label: "NO" }
];
export const userActive = [
  { value: "1", label: "ACTIVE" },
  { value: "0", label: "INACTIVE" },
  { value: "2", label: "AUTO DORMANT" },
  { value: "3", label: "BAD ATTEMPT LOCK" },
  { value: "4", label: "BAD SECURITY QUESTION LOCK" }
];
export const activeOrinactive = [
  { value: "1", label: "Active" },
  { value: "0", label: "Inactive" }
];
export const npiType = [
  { value: "1", label: "INDIVIDUAL" },
  { value: "2", label: "ORGANIZATION" },
  { value: "3", label: "UNTESTED" }
];
export const clearingHouseOptions = [
  { value: "", label: "--select--" },
  { value: "1", label: "AVAILITY" },
  { value: "12", label: "AVAILITY VIRGINA" },
  { value: "13", label: "Availity Web Scrapping" },
  { value: "4", label: "Axiom-MCR-Part A" },
  { value: "5", label: "Axiom-MCR-Part B" },
  { value: "3", label: "BCBS DIRECT" },
  { value: "8", label: "BCBS MI" },
  { value: "7", label: "MVP" },
  { value: "2", label: "OFFICE ALLY" },
  { value: "9", label: "PNT" },
  { value: "6", label: "Tricare Direct" },
  { value: "10", label: "TRIZETTO" },
  { value: "11", label: "UHC Enhanced" },
  { value: "14", label: "Zoll" }
];
export const clearingHouseOptionsWords = [
  { value: "", label: "--select--" },
  { value: "AVAILITY", label: "AVAILITY" },
  { value: "AVAILITY VIRGINA", label: "AVAILITY VIRGINA" },
  { value: "Availity Web Scrapping", label: "Availity Web Scrapping" },
  { value: "Axiom-MCR-Part A", label: "Axiom-MCR-Part A" },
  { value: "Axiom-MCR-Part B", label: "Axiom-MCR-Part B" },
  { value: "BCBS DIRECT", label: "BCBS DIRECT" },
  { value: "BCBS MI", label: "BCBS MI" },
  { value: "MVP", label: "MVP" },
  { value: "OFFICE ALLY", label: "OFFICE ALLY" },
  { value: "PNT", label: "PNT" },
  { value: "Tricare Direct", label: "Tricare Direct" },
  { value: "TRIZETTO", label: "TRIZETTO" },
  { value: "UHC Enhanced", label: "UHC Enhanced" },
  { value: "Zoll", label: "Zoll" }
];
export const payer = [
  { value: "1", label: "Commercial" },
  { value: "2", label: "Medicare" },
  { value: "3", label: "BCBS" },
  { value: "4", label: "Medicaid" },
  { value: "5", label: "UHC" },
  { value: "6", label: "Medi-Cal PIN Required" },
  { value: "7", label: "Availity with Tax ID" }
];
export const attempt = [
  { value: "1", label: "ACTIVE" },
  { value: "0", label: "INACTIVE" },
  { value: "2", label: "AUTO DORMANT" },
  { value: "3", label: "BAD ATTEMPT LOCK" },
  { value: "4", label: "BAD SECURITY QUESTION LOCK" }
];
export const eligibility = [
  { value: "", label: "--Select--" },
  { value: "ALL", label: "ALL" },
  { value: "1", label: "ACTIVE" },
  { value: "2", label: "INACTIVE" },
  { value: "3", label: "OTHERS" }
];
export const searchoption = [
  { value: "4", label: "Member ID,DOB" },
  { value: "2", label: "Member ID,DOB,Last name" },
  {
    value: "1",
    label: "Member ID,First name,Last name,DOB"
  },
  {
    value: "5",
    label: "Member ID,First name,Last name,Group number,DOB"
  },
  {
    value: "3",
    label: "Member ID,First name,Last name"
  }
];
export const Submission = [
  { value: "1", label: "API", selected: "selected" },
  { value: "2", label: "Bulk Upload", selected: "selected" },
  { value: "3", label: "Bulk Entry", selected: "selected" },
  { value: "4", label: "Real Time", selected: "selected" }
];

export const Mappingpayername = [
  { value: "1", label: "AETN&&<<>>\"\"''A (60054)" },
  { value: "2", label: "CAREPLUS HEALTH PLAN (CPHP)" },
  { value: "3", label: "UNITEDHEALTHCARE OFF (87726)" },
  { value: "4", label: "GILU (4756)" },
  { value: "5", label: "CIG&&<<>>\"\"''NA (62308)" },
  { value: "6", label: "ARKANSAS MEDICAID (ARMCD)" },
  { value: "7", label: "AETNA ZOLL (00009)" },
  { value: "8", label: "AETNA (6790)" },
  { value: "9", label: "UNITED HEALTHCARE (87726)" },
  { value: "10", label: "AETNA (AETNA)" },
  { value: "11", label: "BLUECROSS&&<<>>\"\"''BLUE SHIELD TX (G84980)" },
  { value: "12", label: "TEST (TEST)" },
  { value: "13", label: "AETNA (6005)" },
  { value: "14", label: "BCBS TX (68069)" },
  { value: "15", label: "TEST PAYER (123456)" },
  { value: "17", label: "HUMANA (61101)" },
  { value: "18", label: "WELLCARE HEALTH PLANS (14163)" },
  { value: "19", label: "OXFORD HEALTH CARE (06111)" },
  { value: "20", label: "BCBS NY (303)" },
  { value: "21", label: "BCBS CA (040)" },
  { value: "22", label: "BCBS GA (101)" },
  { value: "23", label: "AMERI GROUP TX (AGPTX)" },
  { value: "24", label: "BCBS WESTERN NY (BCBSCAIDWNY)" },
  { value: "25", label: "AMERIGROUP ALL (AGPMD)" },
  { value: "26", label: "TEST SAMPLE (6012548)" },
  { value: "27", label: "BCBS CT (ANTHEMCT)" },
  {
    value: "28",
    label: "CIGNA HEALTHSPRING (BRAVO HEALTH ELDER HEALTH) (ELDER)"
  },
  { value: "29", label: "TEST PAYER (TEST123)" },
  { value: "30", label: "OXFORD HEALTH CARE 1234567890 (1234567890)" },
  { value: "31", label: "OXFORD HEALTH CARE 12345678900000 (12345678900000)" },
  { value: "32", label: "SAMP@12 (SS19984)" },
  { value: "33", label: "API TESTING (94984986989849898984)" },
  { value: "34", label: "MCR-TEXAS (04412)" },
  { value: "35", label: "IHS (04412)" },
  { value: "36", label: "VETERAN AFFAIRS (04412)" },
  { value: "37", label: "BCBS IL (G00621)" },
  { value: "38", label: "BCBS - ARIZONA (53589)" },
  { value: "39", label: "AARP (100001)" },
  { value: "40", label: "MVP (141650868)" },
  { value: "41", label: "BCBS MICHIGAN (00710P)" },
  { value: "42", label: "AUN@(:123:) (CAUN123)" },
  { value: "43", label: "EMBLEM HEALTH (EMBLEMHEALTH)" },
  { value: "44", label: "UNITEDHEALTHCARE-TRIZETTO (87726)" },
  { value: "45", label: "AETNA TRIZ (60054)" },
  { value: "46", label: "CIGNA TRIZ (62308)" },
  { value: "47", label: "BCBSTX-TZ (00021)" },
  { value: "48", label: "PASSPORT HEALTH PLAN TRI (61325)" },
  { value: "49", label: "HEALTHSMART BENEFIT SOLUTIONS TRI (37283)" },
  { value: "50", label: "MERITAIN HEALTH TRIZETTO (37299)" },
  { value: "51", label: "CAREFIRST BCBS (190)" },
  {
    value: "52",
    label: "AETNA BETTER HEALTH WEST VIRGINA-SV02 (COVTY00182)"
  },
  {
    value: "53",
    label: "AETNA BETTER HEALTH WEST VIRGINA (COVTY00182)"
  },
  { value: "54", label: "MAGNACARE (10867)" },
  { value: "55", label: "CIG-TEST (62308)" },
  { value: "56", label: "EMPIRE BCBS NEW YORK (803)" },
  { value: "57", label: "AMERICAN NATIONAL INSURANCE COMPANY (ANICO)" },
  { value: "58", label: "UNITED HEALTHCARE ZOLL (00675)" },
  { value: "59", label: "BCBS OF TEXAS-ZOLL (00117)" },
  { value: "60", label: "CIGNA_ZOLL (00239)" },
  { value: "61", label: "HUMANA-ZOLL (00405)" },
  { value: "62", label: "AMERIGROUP-ZOLL (00042)" },
  { value: "63", label: "MOLINA HEALTHCARE TEXAS (20554)" },
  { value: "64", label: "MOLINA HEALTHCARE TEXAS-ZOLL (00503)" },
  { value: "65", label: "AARP MEDICARE SUP (36273)" },
  { value: "66", label: "ALLSAVERS LIFE INSURANCE COMPANY (81400)" },
  {
    value: "67",
    label: "NATIONAL ASSOCIATION OF LETTER CARRIERS (NALC) (00513)"
  },
  { value: "68", label: "UMR WAUSAU (39026)" },
  { value: "69", label: "FLORIDA BLUE (BCBS FLORIDA) (BCBSF)" },
  { value: "70", label: "BCBS - ALABAMA PROFESSIONAL (00510BS)" },
  { value: "71", label: "BRIGHT HEALTHCARE (BRGHT)" },
  {
    value: "72",
    label: "ALLEGIANCE BENEFIT PLAN MANAGEMENT INCORPORATED (81040)"
  },
  {
    value: "73",
    label: "ALLEGIANCE BENEFIT PLAN MANAGEMENT_ZOLL (00027)"
  },
  { value: "74", label: "WEB-TPA (WBTPA)" },
  { value: "75", label: "MOLINA HEALTHCARE OF MICHIGAN (38334)" },
  { value: "76", label: "ANTHEM BCBS MISSOURI (241)" },
  { value: "77", label: "MOLINA HEALTHCARE SOUTH CAROLINA (MLNSC)" },
  { value: "78", label: "BCBS MICHIGAN-AVAI (00710P)" },
  { value: "79", label: "HARVARD PILGRIM HEALTH CARE (HPHC) (100141)" }
  // {
  //   value: "80",
  //   label: "CICNA HEALTHSPRING(BRAVO HEALTH ELDER HEALTH)-GS02(ELDER"
  // },
  // { value: "81", label: "BCBS TENNESSEE(00116)" },
  // { value: "82", label: "BCBS-ALABAMA INSTITUTIONAL(00510BC)" },
  // { value: "83", label: "HEALTH ALLIANCE PLAN(HAMPC)" }
];
