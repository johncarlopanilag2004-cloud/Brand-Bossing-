import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
let parsedPort = 3000;
if (process.env.PORT) {
  parsedPort = parseInt(process.env.PORT, 10);
} else {
  const portArgIndex = process.argv.indexOf('--port');
  if (portArgIndex !== -1 && process.argv[portArgIndex + 1]) {
    parsedPort = parseInt(process.argv[portArgIndex + 1], 10);
  }
}
const PORT = isNaN(parsedPort) ? 3000 : parsedPort;

// Middleware for JSON body parsing
app.use(express.json());

// Universal CORS support so Netlify, mobile devices, and cross-origin clients can submit leads
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Database file setup
const DB_DIR = path.join(__dirname, 'data', 'db');
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const LEADS_FILE = path.join(DB_DIR, 'leads.json');
const TRANSACTIONS_FILE = path.join(DB_DIR, 'transactions.json');
const AUDITS_FILE = path.join(DB_DIR, 'audits.json');
const EVENTS_FILE = path.join(DB_DIR, 'events.json');

// Helper to read and write JSON files safely
function readJson<T>(filePath: string, defaultData: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8');
  return defaultData;
}

function writeJson<T>(filePath: string, data: T): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
}

// Initial Seed Data if fresh
const INITIAL_LEADS = [
  {
    id: 'lead-ormoc-101',
    source: 'booking_modal',
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    businessName: 'The Backyard Grind Cafe',
    ownerName: 'Kristine Mae Alcantara',
    phone: '0917 842 1993',
    email: 'kristine@thebackyardgrind.ph',
    barangay: 'Cogon',
    businessType: 'Food & Beverage / Cafe / Resto',
    meetingPreference: 'in-person',
    date: '2026-10-14',
    timeSlot: '02:00 PM – 02:45 PM',
    notes: 'Interested in the ₱2,500 MSME Growth Plan. Want to boost weekend brunch foot traffic from tourists coming via FastCat.',
    packageInterested: 'Ormoc MSME Growth Plan (₱2,500/mo)',
    status: 'closed_client',
    adminNotes: 'Converted! Subscribed to monthly ₱2,500 retainer via GCash.',
    estimatedValue: 2500,
  },
  {
    id: 'lead-ormoc-102',
    source: 'package_cta',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    businessName: 'Valencia Queen Pineapple Delicacies',
    ownerName: 'Eduardo Gomez',
    phone: '0928 554 9012',
    email: 'valenciapineapple.ormoc@gmail.com',
    barangay: 'Valencia',
    businessType: 'Pasalubong / Delicacies & Souvenirs',
    meetingPreference: 'virtual',
    date: '2026-10-15',
    timeSlot: '10:00 AM – 10:45 AM',
    notes: 'We want our dried pineapple and tarts ranked higher when travelers search pasalubong near Ormoc Port.',
    packageInterested: 'Ormoc MSME Growth Plan (₱2,500/mo)',
    status: 'closed_client',
    adminNotes: 'Paid first month ₱2,500. Meta ads launching Friday.',
    estimatedValue: 2500,
  },
  {
    id: 'lead-ormoc-103',
    source: 'audit_tool',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    businessName: 'Ormoc Precision Dental Clinic',
    ownerName: 'Dr. Raymond Chu, DMD',
    phone: '0919 778 3211',
    email: 'ormocsmiledental@yahoo.com',
    barangay: 'Ormoc Centro / Poblacion',
    businessType: 'Health Clinic / Dental / Wellness',
    meetingPreference: 'in-person',
    date: '2026-10-16',
    timeSlot: '04:00 PM – 04:45 PM',
    notes: 'Audit score was 42/100. Need Google Maps 3-Pack placement and automated Messenger replies for evening bookings.',
    packageInterested: 'Ormoc MSME Growth Plan (₱2,500/mo)',
    status: 'call_scheduled',
    adminNotes: 'Dr. Chu prefers in-person coffee chat at Ormoc Centro.',
    estimatedValue: 2500,
  },
  {
    id: 'lead-ormoc-104',
    source: 'contact_form',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 42).toISOString(),
    businessName: 'Linao Moto Parts & Supply',
    ownerName: 'Carlos Tan',
    phone: '0995 120 4455',
    email: 'carlostan.moto@gmail.com',
    barangay: 'Linao',
    businessType: 'Auto Care / Motorcycle Parts',
    meetingPreference: 'virtual',
    date: '2026-10-13',
    timeSlot: '03:00 PM – 03:45 PM',
    notes: 'Competitor in Tambulilid is running Facebook ads. We need Meta ads targeting riders in Ormoc & Albuera.',
    packageInterested: 'Ormoc MSME Growth Plan (₱2,500/mo)',
    status: 'closed_client',
    adminNotes: 'Closed! Paid ₱2,500 via Maya. Onboarding completed.',
    estimatedValue: 2500,
  },
];

const INITIAL_TRANSACTIONS = [
  {
    id: 'tx-2026-009',
    date: '2026-10-12',
    clientBusiness: 'The Backyard Grind Cafe',
    clientOwner: 'Kristine Mae Alcantara',
    barangay: 'Cogon',
    planName: 'Ormoc MSME Growth Plan',
    amount: 2500,
    paymentMethod: 'GCash',
    referenceNo: 'GCASH-90214821',
    orNumber: 'OR-BB-2026-089',
    status: 'Paid & Active',
    nextRenewalDate: '2026-11-12',
  },
  {
    id: 'tx-2026-008',
    date: '2026-10-10',
    clientBusiness: 'Linao Moto Parts & Supply',
    clientOwner: 'Carlos Tan',
    barangay: 'Linao',
    planName: 'Ormoc MSME Growth Plan',
    amount: 2500,
    paymentMethod: 'Maya',
    referenceNo: 'MAYA-77182914',
    orNumber: 'OR-BB-2026-088',
    status: 'Paid & Active',
    nextRenewalDate: '2026-11-10',
  },
  {
    id: 'tx-2026-007',
    date: '2026-10-09',
    clientBusiness: 'Valencia Queen Pineapple Delicacies',
    clientOwner: 'Eduardo Gomez',
    barangay: 'Valencia',
    planName: 'Ormoc MSME Growth Plan',
    amount: 2500,
    paymentMethod: 'BDO Online',
    referenceNo: 'BDO-REF-449102',
    orNumber: 'OR-BB-2026-087',
    status: 'Paid & Active',
    nextRenewalDate: '2026-11-09',
  },
  {
    id: 'tx-2026-006',
    date: '2026-10-07',
    clientBusiness: 'Ormoc Smile Dental Studio',
    clientOwner: 'Dr. Raymond Chu, DMD',
    barangay: 'Ormoc Centro / Poblacion',
    planName: 'Ormoc MSME Growth Plan',
    amount: 2500,
    paymentMethod: 'BPI Online',
    referenceNo: 'BPI-TX-3381920',
    orNumber: 'OR-BB-2026-086',
    status: 'Paid & Active',
    nextRenewalDate: '2026-11-07',
  },
];

// Initialize seed data
readJson(LEADS_FILE, INITIAL_LEADS);
readJson(TRANSACTIONS_FILE, INITIAL_TRANSACTIONS);
readJson(AUDITS_FILE, []);
readJson(EVENTS_FILE, []);

// ============================================================================
// API ROUTES (Accessible across ALL devices worldwide)
// ============================================================================

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'Brand|Bossing Agency API',
    location: 'Ormoc City, Leyte',
    timestamp: new Date().toISOString(),
  });
});

// GET all leads
app.get('/api/leads', (_req: Request, res: Response) => {
  const leads = readJson(LEADS_FILE, INITIAL_LEADS);
  res.json(leads);
});

// POST new lead from ANY device (e.g., mobile phones, laptops, tablets)
app.post('/api/leads', (req: Request, res: Response) => {
  const body = req.body;
  if (!body || !body.businessName) {
    return res.status(400).json({ error: 'businessName is required' });
  }

  const currentLeads = readJson(LEADS_FILE, INITIAL_LEADS);
  const newLead = {
    ...body,
    id: body.id || `lead-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: body.createdAt || new Date().toISOString(),
    status: body.status || 'new',
    estimatedValue: body.estimatedValue || 2500,
  };

  const updated = [newLead, ...currentLeads];
  writeJson(LEADS_FILE, updated);
  console.log(`[LEAD RECEIVED from device]: ${newLead.businessName} (${newLead.phone})`);
  res.status(201).json(newLead);
});

// PATCH lead status or admin notes
app.patch('/api/leads/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, adminNotes } = req.body;

  const currentLeads = readJson(LEADS_FILE, INITIAL_LEADS);
  let found = false;

  const updated = currentLeads.map((l: any) => {
    if (l.id === id) {
      found = true;
      return {
        ...l,
        status: status !== undefined ? status : l.status,
        adminNotes: adminNotes !== undefined ? adminNotes : l.adminNotes,
      };
    }
    return l;
  });

  if (!found) {
    return res.status(404).json({ error: 'Lead not found' });
  }

  writeJson(LEADS_FILE, updated);
  res.json({ success: true, id, status, adminNotes });
});

// DELETE lead
app.delete('/api/leads/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const currentLeads = readJson(LEADS_FILE, INITIAL_LEADS);
  const updated = currentLeads.filter((l: any) => l.id !== id);
  writeJson(LEADS_FILE, updated);
  res.json({ success: true, deletedId: id });
});

// GET & POST Transactions (Purchases)
app.get('/api/transactions', (_req: Request, res: Response) => {
  const txs = readJson(TRANSACTIONS_FILE, INITIAL_TRANSACTIONS);
  res.json(txs);
});

app.post('/api/transactions', (req: Request, res: Response) => {
  const body = req.body;
  const currentTx = readJson(TRANSACTIONS_FILE, INITIAL_TRANSACTIONS);
  const newTx = {
    ...body,
    id: body.id || `tx-${Date.now().toString().slice(-6)}`,
    date: body.date || new Date().toISOString().split('T')[0],
  };

  const updated = [newTx, ...currentTx];
  writeJson(TRANSACTIONS_FILE, updated);
  res.status(201).json(newTx);
});

// GET & POST Audits
app.get('/api/audits', (_req: Request, res: Response) => {
  const audits = readJson(AUDITS_FILE, []);
  res.json(audits);
});

app.post('/api/audits', (req: Request, res: Response) => {
  const body = req.body;
  const currentAudits = readJson(AUDITS_FILE, []);
  const newAudit = {
    ...body,
    id: body.id || `audit-${Date.now()}`,
    createdAt: body.createdAt || new Date().toISOString(),
  };

  const updated = [newAudit, ...currentAudits];
  writeJson(AUDITS_FILE, updated);
  res.status(201).json(newAudit);
});

// ============================================================================
// MOUNT VITE OR STATIC FRONTEND
// ============================================================================
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    // Development mode: Mount Vite middleware
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: PORT },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: Serve pre-built static assets from dist
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Brand|Bossing Server] Listening on http://0.0.0.0:${PORT}`);
    console.log(`[Brand|Bossing Database] Central leads database initialized at ${LEADS_FILE}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
