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
    infoPath: 'VerifyMicrosoftSQLserveraccessandpermissions'
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
    taskId: 3,
    title: 'Install operating system environment',
    productTier: ProductTier.Essential,
    infoPath: 'Install operating system environment'
  },
  {
    id: 17,
    taskId: 3,
    title: 'Set and verify network settings',
    productTier: ProductTier.Essential,
    infoPath: 'Set and verify network settings'
  },
  {
    id: 18,
    taskId: 3,
    title: 'Check server access',
    productTier: ProductTier.Essential,
    infoPath: 'Check server access'
  },
  {
    id: 19,
    taskId: 3,
    title: 'Add and verify user accounts and passwords',
    productTier: ProductTier.Essential,
    infoPath: 'Add and verify user accounts and passwords'
  },
  {
    id: 20,
    taskId: 3,
    title: 'Enable remote management, such as Windows Remote Desktop',
    productTier: ProductTier.Essential,
    infoPath: 'Enable remote management, such as Windows Remote Desktop'
  },
  {
    id: 21,
    taskId: 3,
    title: 'Check Server time',
    productTier: ProductTier.Essential,
    infoPath: 'Check Server time'
  },
  {
    id: 22,
    taskId: 3,
    title: 'Install all important Windows Updates',
    productTier: ProductTier.Essential,
    infoPath: 'Install all important Windows Updates'
  },
  {
    id: 23,
    taskId: 3,
    title: 'Check additional server software and settings',
    productTier: ProductTier.Essential,
    infoPath: 'Check additional server software and settings'
  },
  {
    id: 24,
    taskId: 3,
    title: 'Add anti-virus scan exceptions',
    productTier: ProductTier.Essential,
    infoPath: 'Add anti virus scan exceptions (Win Svr)'
  },
  {
    id: 25,
    taskId: 3,
    title: 'Enable SNMP traps',
    productTier: ProductTier.Corporate,
    infoPath: 'Enable SNMP traps'
  },
  {
    id: 26,
    taskId: 4,
    title: 'Prepare storage system',
    productTier: ProductTier.Essential,
    infoPath: 'Prepare storage system'
  },
  {
    id: 27,
    taskId: 4,
    title: 'Verify access to remote storage',
    productTier: ProductTier.Essential,
    infoPath: 'Verify access to remote storage'
  },
  {
    id: 28,
    taskId: 5,
    title: 'Prepare for installation',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 29,
    taskId: 5,
    title: 'Run the Management Server installer',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 30,
    taskId: 5,
    title: 'Verify the Management Server is running',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 31,
    taskId: 6,
    title: 'Download and run Milestone Mobile server software from the Management Server',
    productTier: ProductTier.Professional,
    infoPath: ''
  },
  {
    id: 32,
    taskId: 6,
    title: 'Specify URL and credentials to connect to the Management Server',
    productTier: ProductTier.Professional,
    infoPath: ''
  },
  {
    id: 33,
    taskId: 6,
    title: 'Verify the Mobile Server is running',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 34,
    taskId: 7,
    title: 'Prepare for installation',
    productTier: ProductTier.Professional,
    infoPath: ''
  },
  {
    id: 35,
    taskId: 7,
    title: 'Download and run the XProtect Recording Server installer from the Management Server',
    productTier: ProductTier.Professional,
    infoPath: ''
  },
  {
    id: 36,
    taskId: 7,
    title: 'Verify the server is running',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 37,
    taskId: 7,
    title: 'Install a different device pack',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 38,
    taskId: 7,
    title: 'Add anti-virus scan exceptions',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 39,
    taskId: 8,
    title: 'Prepare for installation',
    productTier: ProductTier.Expert,
    infoPath: ''
  },
  {
    id: 40,
    taskId: 8,
    title: 'Download and run the XProtect Recording Server installer from the Management Server',
    productTier: ProductTier.Expert,
    infoPath: ''
  },
  {
    id: 41,
    taskId: 8,
    title: 'Verify the server is running',
    productTier: ProductTier.Expert,
    infoPath: ''
  },
  {
    id: 42,
    taskId: 8,
    title: 'Install a different device pack',
    productTier: ProductTier.Expert,
    infoPath: ''
  },
  {
    id: 43,
    taskId: 8,
    title: 'Add anti-virus scan exceptions',
    productTier: ProductTier.Expert,
    infoPath: ''
  },
  {
    id: 44,
    taskId: 9,
    title: 'Prepare for installation',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 45,
    taskId: 9,
    title: 'Download and run the Management Client software from the Management Server',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 46,
    taskId: 10,
    title: 'Log in with the Management Client',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 47,
    taskId: 10,
    title: 'Basic authentication',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 48,
    taskId: 10,
    title: 'Configure Management Client behavior',
    productTier: ProductTier.Professional,
    infoPath: ''
  },
  {
    id: 49,
    taskId: 10,
    title: 'Configure Recording Server timeout settings',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 50,
    taskId: 10,
    title: 'Configure Log Server settings',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 51,
    taskId: 10,
    title: 'Configure email notification settings',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 52,
    taskId: 10,
    title: 'Verify bookmark default behavior',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 53,
    taskId: 10,
    title: 'Create Evidence Lock profiles',
    productTier: ProductTier.Expert,
    infoPath: ''
  },
  {
    id: 54,
    taskId: 10,
    title: 'Add Audio Messages',
    productTier: ProductTier.Expert,
    infoPath: ''
  },
  {
    id: 55,
    taskId: 10,
    title: 'Configure Customer Dashboard connectivity',
    productTier: ProductTier.Express,
    infoPath: ''
  },
  {
    id: 56,
    taskId: 10,
    title: 'Configure alarm and event settings',
    productTier: ProductTier.Express,
    infoPath: ''
  },
  {
    id: 57,
    taskId: 10,
    title: 'Generic Event settings',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 58,
    taskId: 11,
    title: 'Review license information',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 59,
    taskId: 11,
    title: 'Activate license',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 60,
    taskId: 11,
    title: 'Enter and verify the site information',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 61,
    taskId: 12,
    title: 'Define failover servers',
    productTier: ProductTier.Expert,
    infoPath: ''
  },
  {
    id: 62,
    taskId: 12,
    title: 'Review and update recording server information',
    productTier: ProductTier.Expert,
    infoPath: ''
  },  
  {
    id: 63,
    taskId: 12,
    title: 'Configure Recording Server storage settings',
    productTier: ProductTier.Expert,
    infoPath: ''
  },
  {
    id: 64,
    taskId: 12,
    title: 'Configure archiving',
    productTier: ProductTier.Expert,
    infoPath: ''
  },
  {
    id: 65,
    taskId: 12,
    title: 'Assign Failover Servers to Recording Servers',
    productTier: ProductTier.Expert,
    infoPath: ''
  },
  {
    id: 66,
    taskId: 13,
    title: 'Add and name hardware devices',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 67,
    taskId: 13,
    title: 'Disable all unused encoder video channels',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 68,
    taskId: 14,
    title: 'Name hardware devices',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 69,
    taskId: 14,
    title: 'Name cameras',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 70,
    taskId: 14,
    title: 'Name microphones and speakers',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 71,
    taskId: 14,
    title: 'Name inputs and outputs',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 72,
    taskId: 14,
    title: 'Name metadata channels',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 73,
    taskId: 14,
    title: 'Disable unused devices',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 74,
    taskId: 14,
    title: 'Create additional camera, microphone, speaker, input, output, and metadata device groups',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 75,
    taskId: 14,
    title: 'Add devices to the relevant groups',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 76,
    taskId: 15,
    title: 'Review and update device information',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 77,
    taskId: 15,
    title: 'Configure device settings and define video streams',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 78,
    taskId: 15,
    title: 'Configure streams',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 79,
    taskId: 15,
    title: 'Configure recording',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 80,
    taskId: 15,
    title: 'Configure 360° lens settings',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 81,
    taskId: 15,
    title: 'Configure privacy masking',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 82,
    taskId: 15,
    title: 'Configure software Motion Detection',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 83,
    taskId: 15,
    title: 'Configure camera events',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 84,
    taskId: 15,
    title: 'Configure PTZ presets',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 85,
    taskId: 15,
    title: 'Configure PTZ patrolling',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 86,
    taskId: 16,
    title: 'Verify microphone settings',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 87,
    taskId: 16,
    title: 'Verify and adjust microphone recording settings',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 88,
    taskId: 16,
    title: 'Select microphone recording storage',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 89,
    taskId: 16,
    title: 'Configure microphone events',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 90,
    taskId: 16,
    title: 'Verify speaker settings',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 91,
    taskId: 16,
    title: 'Verify and adjust speaker recording settings',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 92,
    taskId: 16,
    title: 'Select speaker recording storage',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 93,
    taskId: 17,
    title: 'Verify input settings',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 94,
    taskId: 17,
    title: 'Configure input events',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 95,
    taskId: 17,
    title: 'Verify output settings',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 96,
    taskId: 17,
    title: 'Test inputs and outputs',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 97,
    taskId: 18,
    title: 'Create custom view groups',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 98,
    taskId: 18,
    title: 'Configure Smart Client Profiles',
    productTier: ProductTier.Professional,
    infoPath: ''
  },
  {
    id: 99,
    taskId: 18,
    title: 'Configure Matrix recipient details',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 100,
    taskId: 18,
    title: 'Configure Smart Walls',
    productTier: ProductTier.Expert,
    infoPath: ''
  },
  {
    id: 101,
    taskId: 19,
    title: 'Create User-defined Events',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 102,
    taskId: 19,
    title: 'Configure Generic Events',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 103,
    taskId: 20,
    title: 'Define single and recurring Time Profiles',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 104,
    taskId: 20,
    title: 'Define Day Length time profiles',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 105,
    taskId: 20,
    title: 'Create notification profiles',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 106,
    taskId: 21,
    title: 'Verify defualt rules',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 107,
    taskId: 21,
    title: 'Create video and audio feed start and recording rules',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 108,
    taskId: 21,
    title: 'Create other installation-specific rules',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 109,
    taskId: 21,
    title: 'Create system administrator email notification rules',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 110,
    taskId: 21,
    title: 'Validate all rules',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 111,
    taskId: 22,
    title: 'Verify Windows users and groups',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 112,
    taskId: 22,
    title: 'Create Basic Users',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 113,
    taskId: 22,
    title: 'Create Roles',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 114,
    taskId: 22,
    title: 'Assign client behavior and time profiles',
    productTier: ProductTier.Expert,
    infoPath: ''
  },
  {
    id: 115,
    taskId: 22,
    title: 'Configure client permissions and login authorization requirements',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 116,
    taskId: 22,
    title: 'Assign users and groups to each role',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 117,
    taskId: 22,
    title: 'Define overall security settings for each role',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 118,
    taskId: 22,
    title: 'Define detail security settings for each role',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 119,
    taskId: 22,
    title: 'Verify effective roles',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 120,
    taskId: 23,
    title: 'Add and remove alarm sounds',
    productTier: ProductTier.Express,
    infoPath: ''
  },
  {
    id: 121,
    taskId: 23,
    title: 'Configure alarm data settings',
    productTier: ProductTier.Express,
    infoPath: ''
  },
  {
    id: 122,
    taskId: 23,
    title: 'Define alarm definitions',
    productTier: ProductTier.Express,
    infoPath: ''
  },
  {
    id: 123,
    taskId: 24,
    title: 'Verify system performance via System Monitor',
    productTier: ProductTier.Expert,
    infoPath: ''
  },
  {
    id: 124,
    taskId: 24,
    title: 'Verify connectivity to Customer Dashboard',
    productTier: ProductTier.Express,
    infoPath: ''
  },
  {
    id: 125,
    taskId: 24,
    title: 'Check log files',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 126,
    taskId: 25,
    title: 'Install Milestone Mobile server (if not done previously)',
    productTier: ProductTier.Professional,
    infoPath: ''
  },
  {
    id: 127,
    taskId: 25,
    title: 'Configure general settings',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 128,
    taskId: 25,
    title: 'Configure connectivity settings',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 129,
    taskId: 25,
    title: 'Configure performance settings',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 130,
    taskId: 25,
    title: 'Configure Investigation settings',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 131,
    taskId: 25,
    title: 'Configure Video Push',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 132,
    taskId: 25,
    title: 'Configure Push Notifications',
    productTier: ProductTier.Express,
    infoPath: ''
  },
  {
    id: 133,
    taskId: 26,
    title: 'Add Interconnected systems',
    productTier: ProductTier.Corporate,
    infoPath: ''
  },
  {
    id: 134,
    taskId: 26,
    title: 'Select Interconnected cameras',
    productTier: ProductTier.Corporate,
    infoPath: ''
  },
  {
    id: 135,
    taskId: 26,
    title: 'Verify feed start and recording rules for Interconnected cameras',
    productTier: ProductTier.Corporate,
    infoPath: ''
  },
  {
    id: 136,
    taskId: 26,
    title: 'Verify user permissions to Interconnected cameras',
    productTier: ProductTier.Corporate,
    infoPath: ''
  },
  {
    id: 137,
    taskId: 27,
    title: 'Activate license',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 138,
    taskId: 27,
    title: 'Enable automatic license activation',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 139,
    taskId: 27,
    title: 'Verify license information',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 140,
    taskId: 28,
    title: 'Check workstation hardware, software, and settings',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 141,
    taskId: 28,
    title: 'Download and run Smart Client installer from the Management Server',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 142,
    taskId: 28,
    title: 'Create views for each view group',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 143,
    taskId: 28,
    title: 'Verify hardware decoding/performance',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 144,
    taskId: 28,
    title: 'Create maps and Smart Map',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 145,
    taskId: 28,
    title: 'Verify user logins and permissions',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 146,
    taskId: 28,
    title: 'Verify audio permissions',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 147,
    taskId: 28,
    title: 'Verify Smart Wall permissions',
    productTier: ProductTier.Expert,
    infoPath: ''
  },
  {
    id: 148,
    taskId: 28,
    title: 'Configure Smart Client Options',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 149,
    taskId: 29,
    title: 'Create browser shortcut',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 150,
    taskId: 29,
    title: 'Create browser shortcut',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 151,
    taskId: 29,
    title: 'Verify user logins',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 152,
    taskId: 30,
    title: 'Install app from relevant online marketplace',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 153,
    taskId: 30,
    title: 'Verify user logins',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 154,
    taskId: 30,
    title: 'Test Video Push',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 155,
    taskId: 30,
    title: 'Verify Push Notifications',
    productTier: ProductTier.Express,
    infoPath: ''
  },
  {
    id: 156,
    taskId: 31,
    title: 'Perform a walk test for all cameras with motion detection',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 157,
    taskId: 31,
    title: 'Create a configuration report',
    productTier: ProductTier.Express,
    infoPath: ''
  },
  {
    id: 158,
    taskId: 31,
    title: 'Make a configuration backup',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 159,
    taskId: 31,
    title: 'Perform Final Acceptance Test',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 160,
    taskId: 31,
    title: 'Perform customer operator and staff training',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 161,
    taskId: 31,
    title: 'Confirm Statement of Work fulfilment',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 162,
    taskId: 32,
    title: 'Replace a hardware device',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 163,
    taskId: 32,
    title: 'Move a hardware device to another Recording Server',
    productTier: ProductTier.Professional,
    infoPath: ''
  },
  {
    id: 164,
    taskId: 32,
    title: 'Save and load a system configuration',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 165,
    taskId: 32,
    title: 'Configure the Download Manager',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 166,
    taskId: 32,
    title: 'Upgrade the system',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 167,
    taskId: 32,
    title: 'Explain and manage key system behaviors',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 168,
    taskId: 32,
    title: 'Perform SQL server maintenance',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 169,
    taskId: 32,
    title: 'Perform critical server maintenance',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
  {
    id: 170,
    taskId: 32,
    title: 'Manage profitability and customer expectations',
    productTier: ProductTier.Essential,
    infoPath: ''
  },
];
