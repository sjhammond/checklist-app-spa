import { Step } from '../models/step';
import { ProductTier } from '../models/product-tier';

export const Steps: Step[] = [
  {
    id: 1,
    taskId: 1,
    title: "Confirm passwords and settings on existing network and server equipment",
    productTier: ProductTier.Essential,
    infoPath: "Confirm passwords and settings on existing network and server equipment"
  },
  {
    id: 2,
    taskId: 1,
    title: 'Check switches',
    productTier: ProductTier.Essential,
    infoPath: 'Check switches'
  },
  {
    id: 3,
    taskId: 1,
    title: 'Determine IP Address Ranges',
    productTier: ProductTier.Essential,
    infoPath: 'Determine IP address ranges'
  },
  {
    id: 4,
    taskId: 1,
    title: 'Configure the Network',
    productTier: ProductTier.Essential,
    infoPath: 'Configure the Network'
  },
  {
    id: 5,
    taskId: 1,
    title: 'Test the Network',
    productTier: ProductTier.Essential,
    infoPath: 'Test the Network'
  },
  {
    id: 6,
    taskId: 1,
    title: 'Check Network Time Protocol (NTP) Server',
    productTier: ProductTier.Essential,
    infoPath: 'Check Network Time Protocol (NTP) server'
  },
  {
    id: 7,
    taskId: 1,
    title: 'Check Access to Microsoft Active Directory',
    productTier: ProductTier.Essential,
    infoPath: 'Check access to Microsoft Active Directory'
  },
  {
    id: 8,
    taskId: 1,
    title: 'Verify Microsoft SQL server access and permissions',
    productTier: ProductTier.Professional,
    infoPath: 'Verify Microsoft SQL server access and permissions'
  },
  {
    id: 9,
    taskId: 1,
    title: 'Verify access to remote XProtect VMS systems that will be interconnected',
    productTier: ProductTier.Corporate,
    infoPath: 'Verify access to remote XProtect VMS systems that will be interconnected'
  },
  {
    id: 10,
    taskId: 2,
    title: 'Set a static IP address or configure DHCP and hostname',
    productTier: ProductTier.Essential,
    infoPath: 'Set a static IP address or configure DHCP and hostname'
  },
  {
    id: 11,
    taskId: 2,
    title: 'Set administrator account credentials',
    productTier: ProductTier.Essential,
    infoPath: 'Set administrator account credentials'
  },
  {
    id: 12,
    taskId: 2,
    title: 'Verify firmware version with Milestone Supported Devices list',
    productTier: ProductTier.Essential,
    infoPath: 'Verify firmware version with Milestone Supported Devices list'
  },
  {
    id: 13,
    taskId: 2,
    title: 'Mount cameras and other IP hardware devices',
    productTier: ProductTier.Essential,
    infoPath: 'Mount cameras and other IP hardware devices'
  },
  {
    id: 14,
    taskId: 2,
    title: 'Configure additional device settings',
    productTier: ProductTier.Essential,
    infoPath: 'Configure additional device settings'
  },
  {
    id: 15,
    taskId: 2,
    title: 'Install Milestone Screen recorder',
    productTier: ProductTier.Essential,
    infoPath: 'Install Milestone Screen recorder'
  },
  {
    id: 16,
    taskId: 2,
    title: 'Obtain or create server communication encryption certificates',
    productTier: ProductTier.Essential,
    infoPath: 'Obtain or create server communication encryption certificates'
  },
  {
    id: 17,
    taskId: 3,
    title: 'Install operating system environment',
    productTier: ProductTier.Essential,
    infoPath: 'Install operating system environment'
  },
  {
    id: 18,
    taskId: 3,
    title: 'Set and verify network settings',
    productTier: ProductTier.Essential,
    infoPath: 'Set and verify network settings'
  },
  {
    id: 19,
    taskId: 3,
    title: 'Check server access',
    productTier: ProductTier.Essential,
    infoPath: 'Check server access'
  },
  {
    id: 20,
    taskId: 3,
    title: 'Add and verify user accounts and passwords',
    productTier: ProductTier.Essential,
    infoPath: 'Add and verify user accounts and passwords'
  },
  {
    id: 21,
    taskId: 3,
    title: 'Enable remote management, such as Windows Remote Desktop',
    productTier: ProductTier.Essential,
    infoPath: 'Enable remote management, such as Windows Remote Desktop'
  },
  {
    id: 22,
    taskId: 3,
    title: 'Check Server time',
    productTier: ProductTier.Essential,
    infoPath: 'Check Server time'
  },
  {
    id: 23,
    taskId: 3,
    title: 'Install all important Windows Updates',
    productTier: ProductTier.Essential,
    infoPath: 'Install all important Windows Updates'
  },
  {
    id: 24,
    taskId: 3,
    title: 'Check additional server software and settings',
    productTier: ProductTier.Essential,
    infoPath: 'Check additional server software and settings'
  },
  {
    id: 25,
    taskId: 3,
    title: 'Add anti-virus scan exceptions',
    productTier: ProductTier.Essential,
    infoPath: 'Add anti virus scan exceptions (Win Svr)'
  },
  {
    id: 26,
    taskId: 3,
    title: 'Enable SNMP traps',
    productTier: ProductTier.Corporate,
    infoPath: 'Enable SNMP traps'
  },
  {
    id: 27,
    taskId: 4,
    title: 'Prepare storage system',
    productTier: ProductTier.Essential,
    infoPath: 'Prepare storage system'
  },
  {
    id: 28,
    taskId: 4,
    title: 'Verify access to remote storage',
    productTier: ProductTier.Essential,
    infoPath: 'Verify access to remote storage'
  },
  {
    id: 29,
    taskId: 5,
    title: 'Prepare for installation',
    productTier: ProductTier.Essential,
    infoPath: 'Prepare for installation'
  },
  {
    id: 30,
    taskId: 5,
    title: 'Import certificates on the management server',
    productTier: ProductTier.Essential,
    infoPath: 'Import certificates on the management server'
  },
  {
    id: 31,
    taskId: 5,
    title: 'Run the Management Server installer',
    productTier: ProductTier.Essential,
    infoPath: 'Run the Management Server installer'
  },
  {
    id: 32,
    taskId: 5,
    title: 'Select service user account',
    productTier: ProductTier.Essential,
    infoPath: 'Select service user account'
  },
  {
    id: 33,
    taskId: 5,
    title: 'Specify server encryption',
    productTier: ProductTier.Essential,
    infoPath: 'Specify server encryption'
  },
  {
    id: 34,
    taskId: 5,
    title: 'Verify the server is running',
    productTier: ProductTier.Essential,
    infoPath: 'Verify the server is running (Mgmt Svr)'
  },
  {
    id: 35,
    taskId: 6,
    title: 'Prepare for installation',
    productTier: ProductTier.Essential,
    infoPath: 'Prepare for installation (XP Mobile)'
  },
  {
    id: 36,
    taskId: 6,
    title: 'Import certificates on mobile servers',
    productTier: ProductTier.Essential,
    infoPath: 'Import certificates on mobile servers'
  },
  {
    id: 37,
    taskId: 6,
    title: 'Download and run Milestone Mobile server software from the Management Server',
    productTier: ProductTier.Professional,
    infoPath: 'Download and run the XProtect Moble server software from the Management Server'
  },
  {
    id: 38,
    taskId: 6,
    title: 'Specify mobile server encryption',
    productTier: ProductTier.Essential,
    infoPath: 'Specify mobile server encryption'
  },
  {
    id: 39,
    taskId: 6,
    title: 'Specify URL and credentials to connect to the Management Server',
    productTier: ProductTier.Professional,
    infoPath: 'Specify URL and credentials to connect to the Management Server'
  },
  {
    id: 40,
    taskId: 6,
    title: 'Verify the Mobile Server is running',
    productTier: ProductTier.Essential,
    infoPath: 'Verify the server is running (Mobile Svr)'
  },
  {
    id: 41,
    taskId: 7,
    title: 'Prepare for installation',
    productTier: ProductTier.Professional,
    infoPath: 'Prepare for installation (Rec Svr)'
  },
  {
    id: 42,
    taskId: 7,
    title: 'Import certificates on recording servers',
    productTier: ProductTier.Professional,
    infoPath: 'Import certificates on recording servers'
  },
  {
    id: 43,
    taskId: 7,
    title: 'Download and run the XProtect Recording Server installer from the Management Server',
    productTier: ProductTier.Professional,
    infoPath: 'Download and run the XProtect Recording Server installer from the Management Server (Rec Svr)'
  },
  {
    id: 44,
    taskId: 7,
    title: 'Specify recording server encryption',
    productTier: ProductTier.Professional,
    infoPath: 'Specify recording server encryption'
  },
  {
    id: 45,
    taskId: 7,
    title: 'Verify the server is running',
    productTier: ProductTier.Essential,
    infoPath: 'Verify the server is running (Rec Svr)'
  },
  {
    id: 46,
    taskId: 7,
    title: 'Install a different device pack',
    productTier: ProductTier.Essential,
    infoPath: 'Install a different device pack (Rec Svr)'
  },
  {
    id: 47,
    taskId: 7,
    title: 'Add anti-virus scan exceptions',
    productTier: ProductTier.Essential,
    infoPath: 'Add anti virus scan exceptions (Rec Svr)'
  },
  {
    id: 48,
    taskId: 8,
    title: 'Prepare for installation',
    productTier: ProductTier.Expert,
    infoPath: 'Prepare for installation (FO Svr)'
  },
  {
    id: 49,
    taskId: 8,
    title: 'Import certificates on failover recording servers',
    productTier: ProductTier.Expert,
    infoPath: 'Import certificates on failover recording servers'
  },
  {
    id: 50,
    taskId: 8,
    title: 'Download and run the XProtect Recording Server installer from the Management Server',
    productTier: ProductTier.Expert,
    infoPath: 'Download and run the XProtect Recording Server installer from the Management Server (FO Server)'
  },
  {
    id: 51,
    taskId: 8,
    title: 'Specify recording server encryption',
    productTier: ProductTier.Expert,
    infoPath: 'Specify recording server encryption (FO svr)'
  },
  {
    id: 52,
    taskId: 8,
    title: 'Verify the server is running',
    productTier: ProductTier.Expert,
    infoPath: 'Verify the server is running (FO Svr)'
  },
  {
    id: 53,
    taskId: 8,
    title: 'Install a different device pack',
    productTier: ProductTier.Expert,
    infoPath: 'Install a different device pack (FO Svr)'
  },
  {
    id: 54,
    taskId: 8,
    title: 'Add anti-virus scan exceptions',
    productTier: ProductTier.Expert,
    infoPath: 'Add anti virus scan exceptions (FO Svr)'
  },
  {
    id: 55,
    taskId: 9,
    title: 'Prepare for installation',
    productTier: ProductTier.Essential,
    infoPath: 'Prepare for installation (Mgmt Client)'
  },
  {
    id: 56,
    taskId: 9,
    title: 'Import certificates on Management Client workstations',
    productTier: ProductTier.Essential,
    infoPath: 'Import certificates on Management Client workstations'
  },
  {
    id: 57,
    taskId: 9,
    title: 'Download and run the Management Client software from the Management Server',
    productTier: ProductTier.Essential,
    infoPath: 'Download and run the Management Client software from the Management Server (Mgmt Client)'
  },
  {
    id: 58,
    taskId: 10,
    title: 'Log in with the Management Client',
    productTier: ProductTier.Essential,
    infoPath: 'Log in with the Management Client'
  },
  {
    id: 59,
    taskId: 10,
    title: 'Basic authentication',
    productTier: ProductTier.Essential,
    infoPath: 'Basic authentication'
  },
  {
    id: 60,
    taskId: 10,
    title: 'Configure Management Client behavior',
    productTier: ProductTier.Professional,
    infoPath: 'Configure Management Client behavior'
  },
  {
    id: 61,
    taskId: 10,
    title: 'Configure Recording Server timeout settings',
    productTier: ProductTier.Essential,
    infoPath: 'Configure Recording Server timeout settings'
  },
  {
    id: 62,
    taskId: 10,
    title: 'Configure Log Server settings',
    productTier: ProductTier.Essential,
    infoPath: 'Configure Log Server settings'
  },
  {
    id: 63,
    taskId: 10,
    title: 'Configure email notification settings',
    productTier: ProductTier.Essential,
    infoPath: 'Configure email notification settings'
  },
  {
    id: 64,
    taskId: 10,
    title: 'Verify bookmark default behavior',
    productTier: ProductTier.Essential,
    infoPath: 'Verify bookmark default behavior'
  },
  {
    id: 65,
    taskId: 10,
    title: 'Create Evidence Lock profiles',
    productTier: ProductTier.Expert,
    infoPath: 'Create Evidence Lock profiles'
  },
  {
    id: 66,
    taskId: 10,
    title: 'Add Audio Messages',
    productTier: ProductTier.Expert,
    infoPath: 'Add Audio Messages'
  },
  {
    id: 67,
    taskId: 10,
    title: 'Configure Customer Dashboard connectivity',
    productTier: ProductTier.Express,
    infoPath: 'Configure Customer Dashboard connectivity'
  },
  {
    id: 68,
    taskId: 10,
    title: 'Configure alarm and event settings',
    productTier: ProductTier.Express,
    infoPath: 'Configure alarm and event settings'
  },
  {
    id: 69,
    taskId: 10,
    title: 'Generic Event settings',
    productTier: ProductTier.Essential,
    infoPath: 'Generic Event settings'
  },
  {
    id: 70,
    taskId: 11,
    title: 'Review license information',
    productTier: ProductTier.Essential,
    infoPath: 'Review license information'
  },
  {
    id: 71,
    taskId: 11,
    title: 'Activate license',
    productTier: ProductTier.Essential,
    infoPath: 'Activate license (Lic Site)'
  },
  {
    id: 72,
    taskId: 11,
    title: 'Enter and verify the site information',
    productTier: ProductTier.Essential,
    infoPath: 'Enter and verify the site information'
  },
  {
    id: 73,
    taskId: 12,
    title: 'Define failover servers',
    productTier: ProductTier.Expert,
    infoPath: 'Define failover servers'
  },
  {
    id: 74,
    taskId: 12,
    title: 'Review and update recording server information',
    productTier: ProductTier.Expert,
    infoPath: 'Review and update recording server information'
  },  
  {
    id: 75,
    taskId: 12,
    title: 'Configure Recording Server storage settings',
    productTier: ProductTier.Expert,
    infoPath: 'Configure Recording Server storage settings'
  },
  {
    id: 76,
    taskId: 12,
    title: 'Configure archiving',
    productTier: ProductTier.Expert,
    infoPath: 'Configure archiving'
  },
  {
    id: 77,
    taskId: 12,
    title: 'Assign Failover Servers to Recording Servers',
    productTier: ProductTier.Expert,
    infoPath: 'Assign Failover Servers to Recording Servers'
  },
  {
    id: 78,
    taskId: 12,
    title: 'Enable certificates',
    productTier: ProductTier.Expert,
    infoPath: 'Assign Failover Servers to Recording Servers'
  },
  {
    id: 79,
    taskId: 13,
    title: 'Add and name hardware devices',
    productTier: ProductTier.Essential,
    infoPath: 'Add and name hardware devices'
  },
  {
    id: 80,
    taskId: 13,
    title: 'Disable all unused encoder video channels',
    productTier: ProductTier.Essential,
    infoPath: 'Disable all unused encoder video channels'
  },
  {
    id: 81,
    taskId: 14,
    title: 'Name hardware devices',
    productTier: ProductTier.Essential,
    infoPath: 'Name hardware devices'
  },
  {
    id: 82,
    taskId: 14,
    title: 'Name cameras',
    productTier: ProductTier.Essential,
    infoPath: 'Name cameras'
  },
  {
    id: 83,
    taskId: 14,
    title: 'Name microphones and speakers',
    productTier: ProductTier.Essential,
    infoPath: 'Name microphones and speakers'
  },
  {
    id: 84,
    taskId: 14,
    title: 'Name inputs and outputs',
    productTier: ProductTier.Essential,
    infoPath: 'Name inputs and outputs'
  },
  {
    id: 85,
    taskId: 14,
    title: 'Name metadata channels',
    productTier: ProductTier.Essential,
    infoPath: 'Name metadata channels'
  },
  {
    id: 86,
    taskId: 14,
    title: 'Disable unused devices',
    productTier: ProductTier.Essential,
    infoPath: 'Disable unused devices'
  },
  {
    id: 87,
    taskId: 14,
    title: 'Create additional camera, microphone, speaker, input, output, and metadata device groups',
    productTier: ProductTier.Essential,
    infoPath: 'Create additional camera, microphone, speaker, input, output, and metadata device groups'
  },
  {
    id: 88,
    taskId: 14,
    title: 'Add devices to the relevant groups',
    productTier: ProductTier.Essential,
    infoPath: 'Add devices to the relevant groups'
  },
  {
    id: 89,
    taskId: 15,
    title: 'Review and update device information',
    productTier: ProductTier.Essential,
    infoPath: 'Review and update device information'
  },
  {
    id: 90,
    taskId: 15,
    title: 'Configure general camera settings',
    productTier: ProductTier.Essential,
    infoPath: 'Configure general camera settings'
  },
  {
    id: 91,
    taskId: 15,
    title: 'Configure video streams',
    productTier: ProductTier.Essential,
    infoPath: 'Configure video streams'
  },
  {
    id: 92,
    taskId: 15,
    title: 'Configure streams',
    productTier: ProductTier.Essential,
    infoPath: 'Configure streams'
  },
  {
    id: 93,
    taskId: 15,
    title: 'Configure recording',
    productTier: ProductTier.Essential,
    infoPath: 'Configure recording'
  },
  {
    id: 94,
    taskId: 15,
    title: 'Configure 360° lens settings',
    productTier: ProductTier.Essential,
    infoPath: 'Configure 360 lens settings'
  },
  {
    id: 95,
    taskId: 15,
    title: 'Configure privacy masking',
    productTier: ProductTier.Essential,
    infoPath: 'Configure privacy masking'
  },
  {
    id: 96,
    taskId: 15,
    title: 'Configure software Motion Detection',
    productTier: ProductTier.Essential,
    infoPath: 'Configure software Motion Detection'
  },
  {
    id: 97,
    taskId: 15,
    title: 'Configure camera events',
    productTier: ProductTier.Essential,
    infoPath: 'Configure camera events'
  },
  {
    id: 98,
    taskId: 15,
    title: 'Configure PTZ presets',
    productTier: ProductTier.Essential,
    infoPath: 'Configure PTZ presets'
  },
  {
    id: 99,
    taskId: 15,
    title: 'Configure PTZ patrolling',
    productTier: ProductTier.Essential,
    infoPath: 'Configure PTZ patrolling'
  },
  {
    id: 100,
    taskId: 16,
    title: 'Verify microphone settings',
    productTier: ProductTier.Essential,
    infoPath: 'Verify microphone settings'
  },
  {
    id: 101,
    taskId: 16,
    title: 'Verify and adjust microphone recording settings',
    productTier: ProductTier.Essential,
    infoPath: 'Verify and adjust microphone recording settings'
  },
  {
    id: 102,
    taskId: 16,
    title: 'Select microphone recording storage',
    productTier: ProductTier.Essential,
    infoPath: 'Select microphone recording storage'
  },
  {
    id: 103,
    taskId: 16,
    title: 'Configure microphone events',
    productTier: ProductTier.Essential,
    infoPath: 'Configure microphone events'
  },
  {
    id: 104,
    taskId: 16,
    title: 'Verify speaker settings',
    productTier: ProductTier.Essential,
    infoPath: 'Verify speaker settings'
  },
  {
    id: 105,
    taskId: 16,
    title: 'Verify and adjust speaker recording settings',
    productTier: ProductTier.Essential,
    infoPath: 'Verify and adjust speaker recording settings'
  },
  {
    id: 106,
    taskId: 16,
    title: 'Select speaker recording storage',
    productTier: ProductTier.Essential,
    infoPath: 'Select speaker recording storage'
  },
  {
    id: 107,
    taskId: 17,
    title: 'Verify input settings',
    productTier: ProductTier.Essential,
    infoPath: 'Verify input settings'
  },
  {
    id: 108,
    taskId: 17,
    title: 'Configure input events',
    productTier: ProductTier.Essential,
    infoPath: 'Configure input events'
  },
  {
    id: 109,
    taskId: 17,
    title: 'Verify output settings',
    productTier: ProductTier.Essential,
    infoPath: 'Verify output settings'
  },
  {
    id: 110,
    taskId: 17,
    title: 'Test inputs and outputs',
    productTier: ProductTier.Essential,
    infoPath: 'Test inputs and outputs'
  },
  {
    id: 111,
    taskId: 18,
    title: 'Create custom view groups',
    productTier: ProductTier.Essential,
    infoPath: 'Create custom View Groups'
  },
  {
    id: 112,
    taskId: 18,
    title: 'Configure Smart Client Profiles',
    productTier: ProductTier.Professional,
    infoPath: 'Configure Smart Client Profiles'
  },
  {
    id: 113,
    taskId: 18,
    title: 'Configure Matrix recipient details',
    productTier: ProductTier.Essential,
    infoPath: 'Configure Matrix recipient details'
  },
  {
    id: 114,
    taskId: 18,
    title: 'Configure Smart Walls',
    productTier: ProductTier.Expert,
    infoPath: 'Configure Smart Walls'
  },
  {
    id: 115,
    taskId: 19,
    title: 'Create User-defined Events',
    productTier: ProductTier.Essential,
    infoPath: 'Create User-defined Events'
  },
  {
    id: 116,
    taskId: 19,
    title: 'Configure Generic Events',
    productTier: ProductTier.Essential,
    infoPath: 'Configure Generic Events'
  },
  {
    id: 117,
    taskId: 20,
    title: 'Define single and recurring Time Profiles',
    productTier: ProductTier.Essential,
    infoPath: 'Define single and recurring Time Profiles'
  },
  {
    id: 118,
    taskId: 20,
    title: 'Define Day Length time profiles',
    productTier: ProductTier.Essential,
    infoPath: 'Define Day Length time profiles'
  },
  {
    id: 119,
    taskId: 20,
    title: 'Create notification profiles',
    productTier: ProductTier.Essential,
    infoPath: 'Create notification profiles'
  },
  {
    id: 120,
    taskId: 21,
    title: 'Verify default rules',
    productTier: ProductTier.Essential,
    infoPath: 'Verify default rules'
  },
  {
    id: 121,
    taskId: 21,
    title: 'Create video and audio feed start and recording rules',
    productTier: ProductTier.Essential,
    infoPath: 'Create video and audio feed start and recording rules'
  },
  {
    id: 122,
    taskId: 21,
    title: 'Create other installation-specific rules',
    productTier: ProductTier.Essential,
    infoPath: 'Create other installation specific rules'
  },
  {
    id: 123,
    taskId: 21,
    title: 'Create system administrator email notification rules',
    productTier: ProductTier.Essential,
    infoPath: 'Create system administrator email notification rules'
  },
  {
    id: 124,
    taskId: 21,
    title: 'Validate all rules',
    productTier: ProductTier.Essential,
    infoPath: 'Validate all rules'
  },
  {
    id: 125,
    taskId: 22,
    title: 'Verify Windows users and groups',
    productTier: ProductTier.Essential,
    infoPath: 'Verify Windows users and groups'
  },
  {
    id: 126,
    taskId: 22,
    title: 'Create Basic Users',
    productTier: ProductTier.Essential,
    infoPath: 'Create Basic Users'
  },
  {
    id: 127,
    taskId: 22,
    title: 'Create Roles',
    productTier: ProductTier.Essential,
    infoPath: 'Create Roles'
  },
  {
    id: 128,
    taskId: 22,
    title: 'Assign client behavior and time profiles',
    productTier: ProductTier.Expert,
    infoPath: 'Assign client behavior and time profiles'
  },
  {
    id: 129,
    taskId: 22,
    title: 'Configure client permissions and login authorization requirements',
    productTier: ProductTier.Essential,
    infoPath: 'Configure client permissions and login authorization requirements'
  },
  {
    id: 130,
    taskId: 22,
    title: 'Assign users and groups to each role',
    productTier: ProductTier.Essential,
    infoPath: 'Assign users and groups to each role'
  },
  {
    id: 131,
    taskId: 22,
    title: 'Define overall security settings for each role',
    productTier: ProductTier.Essential,
    infoPath: 'Define overall security settings for each role'
  },
  {
    id: 132,
    taskId: 22,
    title: 'Define detail security settings for each role',
    productTier: ProductTier.Essential,
    infoPath: 'Define detail security settings for each role'
  },
  {
    id: 133,
    taskId: 22,
    title: 'Verify effective roles',
    productTier: ProductTier.Essential,
    infoPath: 'Verify effective roles'
  },
  {
    id: 134,
    taskId: 23,
    title: 'Add and remove alarm sounds',
    productTier: ProductTier.Express,
    infoPath: 'Add and remove alarms sounds'
  },
  {
    id: 135,
    taskId: 23,
    title: 'Configure alarm data settings',
    productTier: ProductTier.Express,
    infoPath: 'Configure alarm data settings'
  },
  {
    id: 136,
    taskId: 23,
    title: 'Define alarm definitions',
    productTier: ProductTier.Express,
    infoPath: 'Define alarm definitions'
  },
  {
    id: 137,
    taskId: 24,
    title: 'Verify system performance via System Monitor',
    productTier: ProductTier.Expert,
    infoPath: 'Verify system performance via System Monitor'
  },
  {
    id: 138,
    taskId: 24,
    title: 'Verify connectivity to Customer Dashboard',
    productTier: ProductTier.Express,
    infoPath: 'Verify connectivity to Customer Dashboard'
  },
  {
    id: 139,
    taskId: 24,
    title: 'Verify SNMP trap connectivity',
    productTier: ProductTier.Expert,
    infoPath: 'Verify SNMP trap connectivity'
  },
  {
    id: 140,
    taskId: 24,
    title: 'Check log files',
    productTier: ProductTier.Essential,
    infoPath: 'Check log files'
  },
  {
    id: 141,
    taskId: 25,
    title: 'Install XProtect Mobile server (if not done previously)',
    productTier: ProductTier.Professional,
    infoPath: 'Install XProtect Mobile server'
  },
  {
    id: 142,
    taskId: 25,
    title: 'Configure general settings',
    productTier: ProductTier.Essential,
    infoPath: 'Configure general settings'
  },
  {
    id: 143,
    taskId: 25,
    title: 'Configure connectivity settings',
    productTier: ProductTier.Essential,
    infoPath: 'Configure connectivity settings'
  },
  {
    id: 144,
    taskId: 25,
    title: 'Configure performance settings',
    productTier: ProductTier.Essential,
    infoPath: 'Configure performance settings'
  },
  {
    id: 145,
    taskId: 25,
    title: 'Configure Investigation settings',
    productTier: ProductTier.Essential,
    infoPath: 'Configure Investigation settings'
  },
  {
    id: 146,
    taskId: 25,
    title: 'Configure Video Push',
    productTier: ProductTier.Essential,
    infoPath: 'Configure Video Push'
  },
  {
    id: 147,
    taskId: 25,
    title: 'Configure Push Notifications',
    productTier: ProductTier.Express,
    infoPath: 'Configure Push Notifications'
  },
  {
    id: 148,
    taskId: 26,
    title: 'Add Interconnected systems',
    productTier: ProductTier.Corporate,
    infoPath: 'Add Interconnected systems'
  },
  {
    id: 149,
    taskId: 26,
    title: 'Select Interconnected cameras',
    productTier: ProductTier.Corporate,
    infoPath: 'Select Interconnected cameras'
  },
  {
    id: 150,
    taskId: 26,
    title: 'Verify feed start and recording rules for Interconnected cameras',
    productTier: ProductTier.Corporate,
    infoPath: 'Verify feed start and recording rules for Interconnected cameras'
  },
  {
    id: 151,
    taskId: 26,
    title: 'Verify user permissions to Interconnected cameras',
    productTier: ProductTier.Corporate,
    infoPath: 'Verify user permissions to Interconnected cameras'
  },
  {
    id: 152,
    taskId: 27,
    title: 'Activate license',
    productTier: ProductTier.Essential,
    infoPath: 'Activate license (Lic)'
  },
  {
    id: 153,
    taskId: 27,
    title: 'Enable automatic license activation',
    productTier: ProductTier.Essential,
    infoPath: 'Enable automatic license activation'
  },
  {
    id: 154,
    taskId: 27,
    title: 'Verify license information',
    productTier: ProductTier.Essential,
    infoPath: 'Verify license information'
  },
  {
    id: 155,
    taskId: 28,
    title: 'Check workstation hardware, software, and settings',
    productTier: ProductTier.Essential,
    infoPath: 'Check workstation hardware, software, and settings'
  },
  {
    id: 156,
    taskId: 28,
    title: 'Import certificates on Smart Client workstations',
    productTier: ProductTier.Essential,
    infoPath: 'Import certificates on Smart Client workstations'
  },
  {
    id: 157,
    taskId: 28,
    title: 'Download and run Smart Client installer from the Management Server',
    productTier: ProductTier.Essential,
    infoPath: 'Download and run Smart Client installer from the Management Server'
  },
  {
    id: 158,
    taskId: 28,
    title: 'Create views for each view group',
    productTier: ProductTier.Essential,
    infoPath: 'Create views for each view group'
  },
  {
    id: 159,
    taskId: 28,
    title: 'Verify hardware decoding/performance',
    productTier: ProductTier.Essential,
    infoPath: 'Verify hardware decoding and performance'
  },
  {
    id: 160,
    taskId: 28,
    title: 'Create maps and Smart Map',
    productTier: ProductTier.Essential,
    infoPath: 'Create maps and Smart Map'
  },
  {
    id: 161,
    taskId: 28,
    title: 'Verify user logins and permissions',
    productTier: ProductTier.Essential,
    infoPath: 'Verify user logins and permissions'
  },
  {
    id: 162,
    taskId: 28,
    title: 'Verify audio permissions',
    productTier: ProductTier.Essential,
    infoPath: 'Verify audio permissions'
  },
  {
    id: 163,
    taskId: 28,
    title: 'Verify Smart Wall permissions',
    productTier: ProductTier.Expert,
    infoPath: 'Verify Smart Wall permissions'
  },
  {
    id: 164,
    taskId: 28,
    title: 'Configure Smart Client Options',
    productTier: ProductTier.Essential,
    infoPath: 'Configure Smart Client Options'
  },
  {
    id: 165,
    taskId: 29,
    title: 'Create browser shortcut',
    productTier: ProductTier.Essential,
    infoPath: 'Create browser shortcut'
  },
  {
    id: 166,
    taskId: 29,
    title: 'Verify user logins',
    productTier: ProductTier.Essential,
    infoPath: 'Verify user logins (Web)'
  },
  {
    id: 167,
    taskId: 30,
    title: 'Install app from relevant online marketplace',
    productTier: ProductTier.Essential,
    infoPath: 'Install app from relevant online marketplace'
  },
  {
    id: 168,
    taskId: 30,
    title: 'Verify user logins',
    productTier: ProductTier.Essential,
    infoPath: 'Verify user logins (Mobile Client)'
  },
  {
    id: 169,
    taskId: 30,
    title: 'Test Video Push',
    productTier: ProductTier.Essential,
    infoPath: 'Test Video Push'
  },
  {
    id: 170,
    taskId: 30,
    title: 'Verify Push Notifications',
    productTier: ProductTier.Express,
    infoPath: 'Verify Push Notifications'
  },
  {
    id: 171,
    taskId: 31,
    title: 'Perform a walk test for all cameras with motion detection',
    productTier: ProductTier.Essential,
    infoPath: 'Perform a walk test for all cameras with motion detection'
  },
  {
    id: 172,
    taskId: 31,
    title: 'Create a configuration report',
    productTier: ProductTier.Express,
    infoPath: 'Create a configuration report'
  },
  {
    id: 173,
    taskId: 31,
    title: 'Make a configuration backup',
    productTier: ProductTier.Essential,
    infoPath: 'Make a configuration backup'
  },
  {
    id: 174,
    taskId: 31,
    title: 'Perform Final Acceptance Test',
    productTier: ProductTier.Essential,
    infoPath: 'Perform Final Acceptance Test'
  },
  {
    id: 175,
    taskId: 31,
    title: 'Perform customer operator and staff training',
    productTier: ProductTier.Essential,
    infoPath: 'Perform customer operator and staff training'
  },
  {
    id: 176,
    taskId: 31,
    title: 'Confirm Statement of Work fulfilment',
    productTier: ProductTier.Essential,
    infoPath: 'Confirm Statement of Work fulfilment'
  },
  {
    id: 177,
    taskId: 32,
    title: 'Replace a hardware device',
    productTier: ProductTier.Essential,
    infoPath: 'Replace a hardware device'
  },
  {
    id: 178,
    taskId: 32,
    title: 'Move a hardware device to another Recording Server',
    productTier: ProductTier.Professional,
    infoPath: 'Move a hardware device to another Recording Server'
  },
  {
    id: 179,
    taskId: 32,
    title: 'Save and load a system configuration',
    productTier: ProductTier.Essential,
    infoPath: 'Save and load a system configuration'
  },
  {
    id: 180,
    taskId: 32,
    title: 'Configure the Download Manager',
    productTier: ProductTier.Essential,
    infoPath: 'Configure the Download Manager'
  },
  {
    id: 181,
    taskId: 32,
    title: 'Upgrade the system',
    productTier: ProductTier.Essential,
    infoPath: 'Upgrade the system'
  },
  {
    id: 182,
    taskId: 32,
    title: 'Explain and manage key system behaviors',
    productTier: ProductTier.Essential,
    infoPath: 'Explain and manage key system behaviors'
  },
  {
    id: 183,
    taskId: 32,
    title: 'Perform SQL server maintenance',
    productTier: ProductTier.Essential,
    infoPath: 'Perform SQL server maintenance'
  },
  {
    id: 184,
    taskId: 32,
    title: 'Perform critical server maintenance',
    productTier: ProductTier.Essential,
    infoPath: 'Perform critical server maintenance'
  },
  {
    id: 185,
    taskId: 32,
    title: 'Manage profitability and customer expectations',
    productTier: ProductTier.Essential,
    infoPath: 'Manage profitability and customer expectations'
  },
];
