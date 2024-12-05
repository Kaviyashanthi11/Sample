// menuItems.js
import ClientApprovalImg from "../../../../images/client_approval.webp";
import ClientListImg from "../../../../images/client_creation.png";
import MastersImg from "../../../../images/master.png";
import TrialApprovalImg from "../../../../images/client_approval.png";
import RejectedListImg from "../../../../images/client_approval.png";
import ApiImg from "../../../../images/master.png";
import DashboardImg from "../../../../images/dashboard.png";
import CrManagementImg from "../../../../images/master.png";
import ClaimStatusImg from "../../../../images/claim_status.png";
import EligibilityImg from "../../../../images/Eligibility.png";
import AdminImg from "../../../../images/admin.png";
import ReportsImg from "../../../../images/report.png";
// menuItems.js
export const itemsRole1 = [
  {
    text: "Client Approval",
    link: "/client",
    image: ClientApprovalImg
  },
  {
    text: "Client List",
    link: "/client-list",
    image: ClientListImg,
    submenu: [
      { text: "Premium", link: "/client-list/premium" },
      { text: "Trial", link: "/client-list/trial" }
    ]
  },
  {
    text: "Masters",
    link: "/masters",
    image: MastersImg,
    submenu: [
      { text: "Eligibility Payer Master", link: "/eligibility" },
      {
        text: "Claim Status Payer Master",
        link: "/claim"
      },
      { text: "Clearing House", link: "/clearing" },
      { text: "Rate Category", link: "/rate" },
      {
        text: "Eligibility Payer Enrollment",
        link: "/enrollment"
      },
      {
        text: "Claim Status Payer Enrollment",
        link: "/claimenrollment"
      },
      { text: "Holiday Master", link: "/holiday" },
      { text: "Maintenance Master", link: "/maintenance" },
      { text: "Plan Master", link: "/plan" },
      { text: "User Master", link: "/user" },
      {
        text: "Practice Provider Management Master",
        link: "/practice"
      },
      { text: "Claim Status Mapping", link: "/claimmap" },
      {
        text: "Weekly Transaction Summary Mailing List",
        link: "/weekly"
      },
      {
        text: "Enhanced Claim Status Payer Master",
        link: "/enhanced"
      },
      { text: "User Management", link: "/usermanage" }
    ]
  },
  { text: "Trial Approval", link: "/trial-approval", image: TrialApprovalImg },
  {
    text: "Reports",
    link: "/reports",
    image: ReportsImg,
    submenu: [
      { text: "Active Premium Customers", link: "/activepre" },
      { text: "Active Trial Customers", link: "/activetrial" },
      { text: "Inactive Customers", link: "/inactive" },
      { text: "User By Customers", link: "/reports/user-by-customers" },
      { text: "Transaction Report", link: "/reports/transaction" },
      {
        text: "Suspended List-Claim Status",
        link: "/reports/suspended-list-claim-status"
      },
      { text: "IP Track", link: "/reports/ip-track" },
      {
        text: "Suspended List-Eligibility",
        link: "/reports/suspended-eligibility"
      },
      { text: "Batch Running", link: "/reports/batch-running" },
      { text: "Batch Download", link: "/reports/batch-download" },
      {
        text: "Suspended List-Complete Claim Status",
        link: "/reports/suspended-complete-claim-status"
      },
      { text: "Payerwise Transaction", link: "/reports/payerwise-transaction" },
      { text: "Web Scrapping", link: "/reports/web-scrapping" },
      { text: "Suspended List-MBI", link: "/reports/suspended-mbi" }
    ]
  },
  { text: "Rejected List", link: "/rejected-list", image: RejectedListImg },
  {
    text: "API",
    link: "/api",
    image: ApiImg,
    submenu: [
      { text: "Claimstatus", link: "/api/claimstatus" },
      { text: "Claimstatus RealTime", link: "/api/claimstatus-realtime" },
      { text: "Eligibility", link: "/api/eligibility" },
      { text: "Eligibility RealTime", link: "/api/eligibility-realtime" },
      { text: "Insurance Discovery", link: "/api/insurance-discovery" },
      { text: "NPI", link: "/api/npi" }
    ]
  },
  { text: "Dashboard", link: "/dashboard", image: DashboardImg },
  { text: "CR Management", link: "/cr-management", image: CrManagementImg }
];

export const itemsRole2 = [
  {
    text: "Admin",
    link: "/admin",
    image: AdminImg,
    submenu: [
      { text: "User Management", link: "/admin/user-management" },
      { text: "Practice Creation", link: "/admin/practice-creation" },
      { text: "User vs Client", link: "/admin/user-vs-client" },
      { text: "Password Management", link: "/admin/password-management" },
      { text: "Group", link: "/admin/group" },
      {
        text: "Group vs Practice Mapping",
        link: "/admin/group-practice-mapping"
      }
    ]
  },
  {
    text: "Reports",
    link: "/reports",
    image: ReportsImg,
    submenu: [
      { text: "Transaction", link: "/reports/transaction" },
      { text: "Batch Wise", link: "/reports/batch-wise" },
      {
        text: "Insurance Wise Summary",
        link: "/reports/insurance-wise-summary"
      },
      { text: "Claim Status", link: "/reports/claim-status" },
      { text: "User Productivity", link: "/reports/user-productivity" },
      { text: "Transaction By Date", link: "/reports/transaction-by-date" },
      { text: "Suspended Eligibility", link: "/reports/suspended-eligibility" }
    ]
  }
];

export const itemsRole3 = [
  {
    text: "Client Approval",
    link: "/client-approval",
    image: ClientApprovalImg
  },
  {
    text: "Masters",
    link: "/masters",
    image: MastersImg,

    submenu: [
      { text: "User vs Client", link: "/masters/user-vs-client" },
      { text: "Eligibility Payer Master", link: "/masters/eligibility-payer" },
      {
        text: "Claim Status Payer Master",
        link: "/masters/claim-status-payer"
      },
      { text: "Clearing House", link: "/masters/clearing-house" },
      { text: "Rate Category", link: "/masters/rate-category" },
      {
        text: "Eligibility Payer Enrollment",
        link: "/masters/eligibility-payer-enrollment"
      },
      {
        text: "Claim Status Payer Enrollment",
        link: "/masters/claim-status-payer-enrollment"
      },
      { text: "Plan Master", link: "/masters/plan" },
      { text: "Holiday Master", link: "/masters/holiday" },
      { text: "Maintenance Master", link: "/masters/maintenance" },
      { text: "User Master", link: "/masters/user" },
      { text: "Invoice Price Master", link: "/masters/invoice-price" },
      {
        text: "Practice Provider Management Master",
        link: "/masters/practice-provider"
      },
      { text: "Claim Status Mapping", link: "/masters/claim-status-mapping" },
      {
        text: "Weekly Transaction Summary Mailing List",
        link: "/masters/weekly-transaction-summary"
      },
      {
        text: "Enhanced Claim Status Payer Master",
        link: "/masters/enhanced-claim-status"
      },
      { text: "User Management", link: "/masters/user-management" }
    ]
  },
  {
    text: "Reports",
    link: "/reports",
    image: ReportsImg,
    submenu: [
      { text: "Active Premium Customers", link: "/reports/active-premium" },
      { text: "Active Trail Customers", link: "/reports/active-trial" },
      { text: "Inactive Customers", link: "/reports/inactive" },
      { text: "User By Customers", link: "/reports/user-by-customers" },
      { text: "Transaction Report", link: "/reports/transaction" },
      {
        text: "Suspended List - Claim Status",
        link: "/reports/suspended-claim-status"
      },
      { text: "IP Track", link: "/reports/ip-track" },
      {
        text: "Suspended List - Eligibility",
        link: "/reports/suspended-eligibility"
      },
      { text: "Batch Running", link: "/reports/batch-running" },
      { text: "Batch Download", link: "/reports/batch-download" },
      { text: "Batch", link: "/reports/batch" },
      {
        text: "Suspended List - Complete Claim Status",
        link: "/reports/suspended-complete-claim-status"
      },
      { text: "Payerwise Transaction", link: "/reports/payerwise-transaction" },
      {
        text: "Suspended List - Insurance Discovery",
        link: "/reports/suspended-insurance-discovery"
      },
      { text: "invoice-report", link: "/reports/invoice-report" },
      { text: "Suspended List-MBI", link: "/reports/suspended-mbi" }
    ]
  }
];

export const itemsRole4 = [
  {
    text: "Dashboard",
    link: "/dashboard",
    image: DashboardImg
  },
  {
    image: EligibilityImg,
    text: "Eligibility",
    submenu: [
      {
        text: "Real Time",
        link: "/real-time"
      },
      {
        text: "File upload by Payer",
        link: "/file-upload-by-payer"
      },
      {
        text: "Data Entry",
        link: "/data-entry"
      },
      {
        text: "Ignored List",
        link: "/ignored-list"
      },
      {
        text: "Suspended Eligibility - Current Month",
        link: "/suspended-eligibility-current-month "
      }
    ]
  },
  {
    image: EligibilityImg,
    text: "Benefit Inquiry",
    submenu: [
      {
        text: "Real Time",
        link: "/real-time"
      },
      {
        text: "Bulk upload",
        link: "/bulk-upload"
      },
      {
        text: "Data Entry",
        link: "/data-entry"
      },
      {
        text: "Batch View",
        link: "/batch-view"
      },
      {
        text: "Suspended Eligibility - Current Month ",
        link: "/suspended-eligibility-current-month "
      }
    ]
  },
  {
    image: ClaimStatusImg,
    text: "Claim Status",
    submenu: [
      {
        text: "Real Time",
        link: "/real-time"
      },
      {
        text: "Bulk upload",
        link: "/bulk-upload"
      },
      {
        text: "Data Entry",
        link: "/data-entry"
      },
      {
        text: "Batch View",
        link: "/batch-view"
      },
      {
        text: "Suspended Eligibility - Current Month ",
        link: "/suspended-eligibility-current-month "
      }
    ]
  },
  {
    image: ClaimStatusImg,
    text: "Complete Claim Status",
    submenu: [
      {
        text: "Real Time",
        link: "/real-time"
      },
      {
        text: "Bulk upload",
        link: "/bulk-upload"
      },

      {
        text: "Batch View",
        link: "/batch-view"
      },
      {
        text: "Suspended Eligibility - Current Month ",
        link: "/suspended-eligibility-current-month "
      },
      {
        text: "File upload multi payer",
        link: "/file-upload-multi-payer"
      }
    ]
  },
  {
    image: AdminImg,
    text: "Master",
    submenu: [
      {
        text: "Provider Management",
        link: "/provider-management"
      }
    ]
  },
  {
    image: ReportsImg,
    text: "Reports",
    submenu: [
      {
        text: "Batch Wise",
        link: "/batch-wise"
      },
      {
        text: "Claim Status",
        link: "/claim-status"
      },
      {
        text: "Insurance Wise Summary",
        link: "/insurance-wise-summary"
      },
      {
        text: "Transaction",
        link: "/transaction"
      },
      {
        text: "Claim Status Transaction",
        link: "/claim-status-transaction"
      },
      {
        text: "Suspended List - Claim Status",
        link: "/reports/suspended-list-claim-Status"
      },
      {
        text: "Suspended List - Eligibility",
        link: "/reports/suspended-list-eligibility"
      },
      {
        text: "Suspended List - Insurance Discovery",
        link: "/reports/suspended-list-insurance-Discovery"
      },
      {
        text: "Suspended List-MBI",
        link: "/reports/suspended-list-mbi"
      }
    ]
  }
];
